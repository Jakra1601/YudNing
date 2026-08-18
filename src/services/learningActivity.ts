import { supabase } from '../lib/supabase';
import { topics } from '../data/topics';
import { videos } from '../data/videos';

export interface LearningActivityRow {
  id: string;
  user_id: string;
  content_id: string;
  content_type: 'topic' | 'video';
  first_viewed_at: string;
  last_viewed_at: string;
}

/**
 * บันทึกประวัติการเข้าชม (Learning Activity)
 * - INSERT ข้อมูลใหม่พร้อม first_viewed_at และ last_viewed_at
 * - หากมีข้อมูลอยู่แล้ว (ได้ Error 23505 จาก UNIQUE constraint) จะสั่ง UPDATE เฉพาะ last_viewed_at
 * - first_viewed_at ของ row เดิมจะไม่ถูก overwrite
 * - ต้อง handle concurrent/duplicate request อย่างปลอดภัยตาม constraint ที่มีอยู่
 */
export async function trackActivity(userId: string, contentId: string, contentType: 'topic' | 'video'): Promise<void> {
  const now = new Date().toISOString();

  // พยายาม INSERT ก่อน
  const { error: insertError } = await supabase
    .from('user_learning_activity')
    .insert([
      {
        user_id: userId,
        content_id: contentId,
        content_type: contentType,
        first_viewed_at: now,
        last_viewed_at: now,
      },
    ]);

  // รหัส 23505 คือ unique_violation หมายถึงเคยบันทึกไปแล้ว (ป้องกัน duplicate rows)
  if (insertError) {
    if (insertError.code === '23505') {
      // UPDATE เฉพาะ last_viewed_at โดยไม่แตะ first_viewed_at
      const { error: updateError } = await supabase
        .from('user_learning_activity')
        .update({ last_viewed_at: now })
        .match({
          user_id: userId,
          content_id: contentId,
          content_type: contentType,
        });

      if (updateError) {
        console.error('[YudNing] Failed to update learning activity:', updateError);
      }
    } else {
      console.error('[YudNing] Failed to track learning activity (insert):', insertError);
    }
  }
}

/**
 * ดึงประวัติการเข้าชม (Learning History) เรียงจากล่าสุด
 */
export async function getLearningHistory(userId: string, limit?: number): Promise<LearningActivityRow[]> {
  let query = supabase
    .from('user_learning_activity')
    .select('*')
    .eq('user_id', userId)
    .order('last_viewed_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[YudNing] Failed to fetch learning history:', error);
    throw error;
  }

  return data as LearningActivityRow[];
}

/**
 * Utility เพื่อ Map row กลับไปยังข้อมูล Local (Topic / Video)
 * - คืนค่า null หาก content_id ไม่พบใน Local (อาจถูกลบ)
 */
export function mapActivityToLocalContent(row: LearningActivityRow) {
  if (row.content_type === 'topic') {
    const topic = topics.find((t) => t.id === row.content_id);
    return topic ? { type: 'topic' as const, data: topic, activity: row } : null;
  } else if (row.content_type === 'video') {
    const video = videos.find((v) => v.id === row.content_id);
    return video ? { type: 'video' as const, data: video, activity: row } : null;
  }
  return null;
}
