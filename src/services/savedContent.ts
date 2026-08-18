import { supabase } from '../lib/supabase';

export interface SavedContentRow {
  id: string;
  user_id: string;
  content_id: string;
  content_type: 'topic' | 'video';
  created_at: string;
}

/**
 * ดึงรายการ Saved Content ทั้งหมดของ user_id ปัจจุบัน
 * (ยึดตาม auth token เป็นหลัก แต่รับ userId มาเพื่ออ้างอิงให้ชัดเจน หรือใช้ RLS เป็นตัวบังคับอยู่แล้ว)
 */
export async function getSavedContent(userId: string): Promise<SavedContentRow[]> {
  const { data, error } = await supabase
    .from('user_saved_content')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data as SavedContentRow[];
}

/**
 * บันทึกเนื้อหา (ถ้าเซฟแล้ว Constraint UNIQUE จะทำให้ error ซึ่งจัดการได้หรือใช้ upsert / insert ignore)
 */
export async function saveContent(userId: string, contentId: string, contentType: 'topic' | 'video'): Promise<boolean> {
  const { error } = await supabase
    .from('user_saved_content')
    .insert([
      {
        user_id: userId,
        content_id: contentId,
        content_type: contentType,
      },
    ]);

  if (error) {
    // รหัส 23505 คือ unique_violation ซึ่งแปลว่า save ไปแล้ว
    if (error.code === '23505') {
      return true; // ถือว่าบันทึกแล้วสำเร็จ
    }
    throw error;
  }
  
  return true;
}

/**
 * ยกเลิกการบันทึกเนื้อหา
 */
export async function unsaveContent(userId: string, contentId: string, contentType: 'topic' | 'video'): Promise<boolean> {
  const { error } = await supabase
    .from('user_saved_content')
    .delete()
    .match({
      user_id: userId,
      content_id: contentId,
      content_type: contentType,
    });

  if (error) {
    throw error;
  }
  
  return true;
}
