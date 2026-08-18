import { supabase } from '../lib/supabase';

export interface MeditationSessionRow {
  id: string;
  user_id: string;
  practiced_at: string;
  duration_minutes: number;
  note: string | null;
  created_at: string;
}

export type CreateMeditationSessionInput = Omit<MeditationSessionRow, 'id' | 'user_id' | 'created_at'>;

/**
 * ดึงประวัติการปฏิบัติ (Meditation Practice Log)
 */
export async function getMeditationSessions(userId: string): Promise<MeditationSessionRow[]> {
  const { data, error } = await supabase
    .from('meditation_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('practiced_at', { ascending: false });

  if (error) {
    console.error('[YudNing] Failed to fetch meditation sessions:', error);
    throw error;
  }

  return data as MeditationSessionRow[];
}

/**
 * บันทึกประวัติการปฏิบัติ
 */
export async function createMeditationSession(userId: string, input: CreateMeditationSessionInput): Promise<MeditationSessionRow> {
  const { data, error } = await supabase
    .from('meditation_sessions')
    .insert([
      {
        user_id: userId,
        practiced_at: input.practiced_at,
        duration_minutes: input.duration_minutes,
        note: input.note ? input.note.trim() : null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('[YudNing] Failed to create meditation session:', error);
    throw error;
  }

  return data as MeditationSessionRow;
}

/**
 * ลบประวัติการปฏิบัติ (ลบได้เฉพาะของตัวเองด้วย match)
 */
export async function deleteMeditationSession(userId: string, sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('meditation_sessions')
    .delete()
    .match({ id: sessionId, user_id: userId });

  if (error) {
    console.error('[YudNing] Failed to delete meditation session:', error);
    throw error;
  }
}
