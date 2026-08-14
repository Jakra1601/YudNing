/**
 * LoginPage.tsx — หน้า Login สำหรับ YudNing
 *
 * รองรับ:
 * - Sign in with Google (OAuth)
 * - Email / Password Sign In
 * - Email / Password Sign Up
 * - Loading State
 * - Error Message ที่เข้าใจง่าย
 *
 * สอดคล้องกับ Design System: สี, font, radius, shadow จาก global.css
 * ใช้ session management ของ Supabase SDK ที่มีอยู่แล้ว
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePageSEO } from '../hooks/usePageSEO';
import logoMain from '../assets/branding/yudning-logo-main.png';

// ─── Types ─────────────────────────────────────────────────────────────────────

type AuthMode = 'signin' | 'signup';

// ─── Error Message Mapping ──────────────────────────────────────────────────────

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';

  const msg = (error as { message?: string }).message ?? '';

  // Supabase error messages → Thai friendly messages
  if (msg.includes('Invalid login credentials'))
    return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
  if (msg.includes('Email not confirmed'))
    return 'กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ (ตรวจสอบกล่องจดหมาย)';
  if (msg.includes('User already registered'))
    return 'อีเมลนี้ถูกลงทะเบียนไว้แล้ว กรุณาเข้าสู่ระบบหรือใช้อีเมลอื่น';
  if (msg.includes('Password should be at least'))
    return 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
  if (msg.includes('Unable to validate email address'))
    return 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
  if (msg.includes('signup is disabled'))
    return 'ขณะนี้ระบบสมัครสมาชิกปิดอยู่ชั่วคราว';
  if (msg.includes('rate limit') || msg.includes('too many requests'))
    return 'คำขอมากเกินไป กรุณารอสักครู่แล้วลองอีกครั้ง';
  if (msg.includes('network') || msg.includes('fetch'))
    return 'ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง';

  return msg || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง';
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function LoginPage() {
  usePageSEO({
    title: 'เข้าสู่ระบบ | YudNing',
    description: 'เข้าสู่ระบบ YudNing เพื่อเข้าถึงฟีเจอร์ส่วนตัวของคุณ',
  });

  const { user, isLoading: authLoading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Redirect ถ้า login แล้ว
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Reset state เมื่อสลับ mode
  function handleModeSwitch(newMode: AuthMode) {
    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
  }

  // ─── Google OAuth ─────────────────────────────────────────────────────────────

  async function handleGoogleSignIn() {
    setErrorMsg('');
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Supabase จะ redirect ออกไป — ไม่ต้อง navigate เอง
    } catch (err) {
      setErrorMsg(getErrorMessage(err));
      setIsGoogleLoading(false);
    }
  }

  // ─── Email / Password Submit ──────────────────────────────────────────────────

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email.trim(), password);
        // onAuthStateChange จะ update user → useEffect จะ redirect
      } else {
        await signUpWithEmail(email.trim(), password);
        setSuccessMsg('สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Loading State (ตรวจ session เริ่มต้น) ────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
          <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-sm">กำลังตรวจสอบสถานะ...</p>
        </div>
      </div>
    );
  }

  const isAnyLoading = isSubmitting || isGoogleLoading;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] px-4 py-12">
      {/* ─── Card ─────────────────────────────────────────── */}
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] animate-fade-in-up"
        role="main"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-[var(--color-border)]">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src={logoMain} alt="YudNing Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text-main)] font-sans">YudNing</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Stillness for Everyone</p>

          {/* Mode Toggle */}
          <div className="flex mt-5 bg-[var(--color-background)] rounded-[var(--radius-btn)] p-1 gap-1">
            <button
              id="login-tab-signin"
              type="button"
              onClick={() => handleModeSwitch('signin')}
              disabled={isAnyLoading}
              className={`flex-1 py-1.5 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-200 ${
                mode === 'signin'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
              aria-pressed={mode === 'signin'}
            >
              เข้าสู่ระบบ
            </button>
            <button
              id="login-tab-signup"
              type="button"
              onClick={() => handleModeSwitch('signup')}
              disabled={isAnyLoading}
              className={`flex-1 py-1.5 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
              aria-pressed={mode === 'signup'}
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-4">

          {/* ─── Error / Success Alert ──────────────────────── */}
          {errorMsg && (
            <div
              role="alert"
              className="flex items-start gap-3 p-3.5 rounded-[var(--radius-sm)] bg-red-50 border border-red-200 text-[var(--color-error)] text-sm animate-fade-in"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div
              role="alert"
              className="flex items-start gap-3 p-3.5 rounded-[var(--radius-sm)] bg-green-50 border border-green-200 text-[var(--color-success)] text-sm animate-fade-in"
            >
              <span>{successMsg}</span>
            </div>
          )}

          {/* ─── Google OAuth Button ────────────────────────── */}
          <button
            id="login-btn-google"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isAnyLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Chrome size={16} aria-hidden="true" />
            )}
            {isGoogleLoading
              ? 'กำลังเชื่อมต่อ...'
              : mode === 'signin'
              ? 'เข้าสู่ระบบด้วย Google'
              : 'สมัครด้วย Google'}
          </button>

          {/* ─── Divider ─────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-muted)]">หรือ</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* ─── Email / Password Form ──────────────────────── */}
          <form onSubmit={handleEmailSubmit} noValidate className="flex flex-col gap-3">
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5"
              >
                อีเมล
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="กรอกอีเมลของคุณ"
                  required
                  disabled={isAnyLoading}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5"
              >
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder={mode === 'signup' ? 'อย่างน้อย 6 ตัวอักษร' : 'กรอกรหัสผ่าน'}
                  required
                  disabled={isAnyLoading}
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  disabled={isAnyLoading}
                  aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
                >
                  {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              id="login-btn-submit"
              type="submit"
              disabled={isAnyLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-1 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
              {isSubmitting
                ? mode === 'signin'
                  ? 'กำลังเข้าสู่ระบบ...'
                  : 'กำลังสมัคร...'
                : mode === 'signin'
                ? 'เข้าสู่ระบบ'
                : 'สมัครสมาชิก'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            การเข้าสู่ระบบถือว่าคุณยอมรับ{' '}
            <span className="text-[var(--color-text-main)]">นโยบายความเป็นส่วนตัว</span>
            {' '}ของ YudNing
          </p>
        </div>
      </div>

      {/* Back to Home Link */}
      <a
        href="#/"
        className="mt-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
      >
        ← กลับหน้าแรก
      </a>
    </div>
  );
}
