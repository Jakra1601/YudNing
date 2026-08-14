/**
 * supabase.ts — Supabase client สำหรับ YudNing
 *
 * ใช้ Publishable Key (anon key) เท่านั้น — ปลอดภัยสำหรับ frontend
 * ห้ามใช้ service_role key หรือ JWT secret ใน client-side code
 *
 * Session management จัดการโดย Supabase SDK อัตโนมัติ
 * ห้ามเก็บ token เองด้วย localStorage หรือ sessionStorage
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    '[YudNing] Missing Supabase environment variables.\n' +
    'ตรวจสอบว่า .env.local มี VITE_SUPABASE_URL และ VITE_SUPABASE_PUBLISHABLE_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
