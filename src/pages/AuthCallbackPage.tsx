/**
 * AuthCallbackPage.tsx — หน้ารับ callback จาก Supabase Email Confirmation
 *
 * ปัญหาที่แก้:
 * Supabase Email Confirmation redirect มาพร้อม token ใน URL query params:
 *   ?token_hash=xxx&type=email
 *
 * HashRouter ไม่ได้ทำให้ Supabase SDK detect token จาก URL อัตโนมัติ
 * เพราะ SDK คาดว่า token จะอยู่ใน fragment (#access_token=...) สำหรับ OAuth
 * แต่ Email Confirmation ใช้ query params + PKCE flow ต่างออกไป
 *
 * หน้านี้:
 * 1. ดึง token_hash และ type จาก URL query params
 * 2. เรียก supabase.auth.verifyOtp() เพื่อ exchange token เป็น session
 * 3. Redirect ไป / เมื่อสำเร็จ หรือ /login พร้อม error เมื่อล้มเหลว
 *
 * Route: /auth/callback
 * emailRedirectTo ต้องชี้มาที่ URL นี้
 */

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type CallbackStatus = 'processing' | 'success' | 'error';

export function AuthCallbackPage() {
  const [status, setStatus] = useState<CallbackStatus>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function handleEmailCallback() {
      // ดึง params จาก URL ที่ Supabase ส่งมา
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // กรณี Supabase ส่ง error กลับมาใน URL
      if (errorParam) {
        setErrorMessage(errorDescription ?? errorParam);
        setStatus('error');
        setTimeout(() => navigate('/login', { replace: true }), 3000);
        return;
      }

      // กรณีไม่มี token_hash — อาจเป็น direct navigation ไม่ใช่ callback จริง
      if (!tokenHash || !type) {
        navigate('/', { replace: true });
        return;
      }

      // Exchange token_hash เป็น session ผ่าน Supabase SDK
      // type จะเป็น 'email' สำหรับ email confirmation
      //              'recovery' สำหรับ password reset (future use)
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as 'email' | 'recovery' | 'invite' | 'email_change',
        });

        if (error) {
          setErrorMessage(getErrorMessage(error.message));
          setStatus('error');
          setTimeout(() => navigate('/login', { replace: true }), 3000);
          return;
        }

        // สำเร็จ — Supabase SDK จะ update session อัตโนมัติ
        // onAuthStateChange ใน AuthContext จะ detect และ update user state
        setStatus('success');
        setTimeout(() => navigate('/', { replace: true }), 1500);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';
        setErrorMessage(getErrorMessage(message));
        setStatus('error');
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      }
    }

    handleEmailCallback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount — searchParams ณ เวลา mount คือค่าจาก URL จริง

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-sm bg-[var(--color-surface)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-8 text-center animate-fade-in">
        {status === 'processing' && (
          <>
            <Loader2
              size={40}
              className="animate-spin text-[var(--color-primary)] mx-auto mb-4"
              aria-hidden="true"
            />
            <h1 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
              กำลังยืนยันอีเมล...
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              กรุณารอสักครู่
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle
              size={40}
              className="text-[var(--color-success)] mx-auto mb-4"
              aria-hidden="true"
            />
            <h1 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
              ยืนยันอีเมลสำเร็จ!
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              กำลังพาคุณเข้าสู่เว็บไซต์...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle
              size={40}
              className="text-[var(--color-error)] mx-auto mb-4"
              aria-hidden="true"
            />
            <h1 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
              ยืนยันอีเมลไม่สำเร็จ
            </h1>
            <p className="text-sm text-[var(--color-error)] mb-3">
              {errorMessage || 'ลิงก์อาจหมดอายุหรือใช้งานไปแล้ว'}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              กำลังพาคุณไปหน้าเข้าสู่ระบบ...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Error Message Mapping ─────────────────────────────────────────────────────

function getErrorMessage(msg: string): string {
  if (msg.includes('Token has expired') || msg.includes('expired'))
    return 'ลิงก์ยืนยันอีเมลหมดอายุแล้ว กรุณาสมัครใหม่หรือขอลิงก์ใหม่';
  if (msg.includes('already been used') || msg.includes('invalid'))
    return 'ลิงก์นี้ถูกใช้งานไปแล้ว กรุณาเข้าสู่ระบบโดยตรง';
  if (msg.includes('network') || msg.includes('fetch'))
    return 'ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง';
  return msg || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง';
}
