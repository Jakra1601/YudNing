/// <reference types="vite/client" />

/**
 * Type declarations สำหรับ Vite Environment Variables ที่ใช้ใน YudNing
 *
 * ตัวแปรทุกตัวต้องขึ้นต้นด้วย VITE_ เพื่อให้ Vite expose ไปยัง client bundle
 * ห้ามนำ Secret หรือ service-role key มาใส่ที่นี่หรือใน .env.local
 */
interface ImportMetaEnv {
  /** Supabase Project URL เช่น https://xxxx.supabase.co */
  readonly VITE_SUPABASE_URL: string;
  /** Supabase Publishable Key (anon key) — ปลอดภัยสำหรับ frontend */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
