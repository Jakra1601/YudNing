/**
 * auth.ts — TypeScript types สำหรับ Authentication
 *
 * ใช้ข้อมูลจาก Supabase Auth session โดยตรง
 * ไม่ duplicate ข้อมูลที่ Supabase SDK จัดการอยู่แล้ว
 */

import type { User, Session } from '@supabase/supabase-js';

// Re-export Supabase types ที่ใช้บ่อยในโปรเจกต์
export type { User, Session };

/**
 * สถานะของ Auth ที่ AuthContext จะ expose ให้ component ต่างๆ
 */
export interface AuthState {
  /** null = ยังโหลดอยู่, User object = login แล้ว, หรือ undefined = ยังไม่ได้ login */
  user: User | null;
  /** true ขณะที่กำลังตรวจสอบ session จาก Supabase (initial load) */
  isLoading: boolean;
}

/**
 * ฟังก์ชันที่ AuthContext expose ให้ใช้งาน
 */
export interface AuthActions {
  /** Login ด้วย Google OAuth — redirect ไป Google แล้วกลับมาที่ origin */
  signInWithGoogle: () => Promise<void>;
  /** Login ด้วย LINE — ใช้ Supabase Custom OIDC Provider (custom:line) */
  signInWithLine: () => Promise<void>;
  /** Login ด้วย Email + Password */
  signInWithEmail: (email: string, password: string) => Promise<void>;
  /** สมัครบัญชีด้วย Email + Password */
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  /** Logout และล้าง session */
  signOut: () => Promise<void>;
}

/** Combined type ที่ component ใช้ผ่าน useAuth() */
export type AuthContextValue = AuthState & AuthActions;
