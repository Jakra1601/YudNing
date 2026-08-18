/**
 * AuthContext.tsx — Authentication Context สำหรับ YudNing
 *
 * ครอบ App ด้วย AuthProvider เพื่อให้ทุก component เข้าถึง auth state ได้
 * Session management จัดการโดย Supabase SDK อัตโนมัติ ไม่มี token storage เอง
 *
 * Supported methods:
 * - Google OAuth (signInWithGoogle)
 * - LINE OAuth / OIDC (signInWithLine) — Supabase Custom Provider: custom:line
 * - Email / Password Sign In (signInWithEmail)
 * - Email / Password Sign Up (signUpWithEmail)
 * - Sign Out (signOut)
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { AuthContextValue } from '../types/auth';

// ─── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ดึง session ปัจจุบันทันทีที่ mount (restore session หลัง page reload)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Subscribe to auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // ไม่ต้อง setIsLoading ที่นี่ เพราะ getSession() จัดการ initial load แล้ว
    });

    // Cleanup subscription เมื่อ component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ─── Auth Actions ─────────────────────────────────────────────────────────────

  /**
   * Login ด้วย Google OAuth
   * Supabase จัดการ redirect flow ทั้งหมด — redirect กลับมาที่ origin หลัง login
   */
  async function signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // redirect กลับมาที่หน้าแรกหลัง OAuth flow เสร็จ
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  }

  /**
   * Login ด้วย LINE ผ่าน Supabase Custom OIDC Provider
   * Provider Identifier ใน Supabase Dashboard: custom:line
   * Supabase จัดการ redirect flow ทั้งหมด — redirect กลับมาที่ origin + pathname หลัง login
   *
   * หมายเหตุ: 'custom:line' เป็น literal ที่ถูกต้องตาม Provider type (`custom:${string}`)
   * ใน @supabase/auth-js ตั้งแต่ v2.x — ไม่ต้อง cast
   */
  async function signInWithLine(): Promise<void> {
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'custom:line',
      options: { redirectTo },
    });
    if (error) throw error;
  }

  /**
   * Login ด้วย Email + Password
   */
  async function signInWithEmail(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  /**
   * สมัครบัญชีด้วย Email + Password
   * Supabase จะส่ง Confirmation Email ตามที่ตั้งค่าไว้ใน Dashboard
   *
   * emailRedirectTo ต้องชี้ไปยัง /#/auth/callback เพื่อให้ HashRouter รับ callback ได้
   * - Local dev:   http://localhost:5173/#/auth/callback
   * - Production:  https://jakra1601.github.io/YudNing/#/auth/callback
   *
   * หมายเหตุ: ต้องเพิ่ม URL นี้ใน Supabase Dashboard → Authentication → URL Configuration → Redirect URLs
   */
  async function signUpWithEmail(email: string, password: string): Promise<void> {
    // สร้าง callback URL ที่ใช้ hash fragment (#) เพื่อให้ HashRouter route ได้ถูกต้อง
    const callbackUrl = `${window.location.origin}${window.location.pathname}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callbackUrl,
      },
    });
    if (error) throw error;
  }

  /**
   * Logout และล้าง session — Supabase SDK จัดการล้าง token ให้อัตโนมัติ
   */
  async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // ─── Context Value ────────────────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithLine,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useAuth — hook สำหรับเข้าถึง auth state และ actions
 *
 * @example
 * const { user, isLoading, signInWithGoogle, signOut } = useAuth();
 *
 * @throws Error ถ้าใช้นอก AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      '[YudNing] useAuth ต้องใช้ภายใน <AuthProvider>\n' +
      'ตรวจสอบว่า AuthProvider ครอบ component ที่เรียก useAuth()'
    );
  }
  return context;
}
