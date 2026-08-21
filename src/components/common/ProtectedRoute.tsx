import { useTranslation } from 'react-i18next';
/**
 * ProtectedRoute.tsx — Guard component สำหรับ routes ที่ต้องการ Authentication
 *
 * พฤติกรรม:
 * - ระหว่างตรวจ session: แสดง loading spinner
 * - ไม่มี session: redirect ไป /login
 * - มี session: render children ตามปกติ
 *
 * ใช้ session management ของ Supabase SDK (ผ่าน useAuth) เท่านั้น
 */

import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { t } = useTranslation();

  const { user, isLoading } = useAuth();
  const location = useLocation();

  // ─── Loading State ────────────────────────────────────────────────────────────
  // ขณะตรวจ session เริ่มต้น (initial load) ให้แสดง spinner แทนการ redirect ทันที
  // เพื่อป้องกัน flash redirect เมื่อมี session อยู่แล้ว
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
          <Loader2
            size={28}
            className="animate-spin text-[var(--color-primary)]"
            aria-hidden="true"
          />
          <p className="text-sm">{t('common.authCheck.checking', 'กำลังตรวจสอบสถานะ...')}</p>
        </div>
      </div>
    );
  }

  // ─── Not Authenticated ────────────────────────────────────────────────────────
  // เก็บ current path ใน state เพื่อ redirect กลับหลัง login (future enhancement)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ─── Authenticated ────────────────────────────────────────────────────────────
  return <>{children}</>;
}
