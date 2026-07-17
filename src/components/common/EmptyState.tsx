import type { ReactNode } from 'react';

interface EmptyStateProps {
  /** Emoji หรือ icon ตกแต่ง (ตัวเลือก) */
  icon?: ReactNode;
  /** หัวข้อหลักของ empty state */
  title: string;
  /** คำอธิบายเพิ่มเติม (ตัวเลือก) */
  description?: string;
  /** ปุ่มหรือ action ที่ต้องการแสดง (ตัวเลือก) */
  action?: ReactNode;
  /** ขนาดของ padding — ค่าเริ่มต้นคือ 'default' */
  size?: 'compact' | 'default' | 'large';
}

const sizeStyles: Record<NonNullable<EmptyStateProps['size']>, string> = {
  compact: 'py-8',
  default: 'py-14',
  large: 'py-20',
};

/**
 * EmptyState
 * Component สำหรับแสดง state ว่าง เช่น ไม่มีผลการค้นหา ไม่มีข้อมูล ฯลฯ
 *
 * @example
 * <EmptyState
 *   icon={<Search size={40} />}
 *   title="ไม่พบผลลัพธ์"
 *   description="ลองใช้คำค้นหาอื่น"
 *   action={<button>ดูทั้งหมด</button>}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'default',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizeStyles[size]}`}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div
          className="mb-4 text-[var(--color-border)]"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <p className="text-base font-medium text-[var(--color-text-main)] mb-1.5">
        {title}
      </p>

      {description && (
        <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed mb-5">
          {description}
        </p>
      )}

      {action && !description && <div className="mt-5">{action}</div>}
      {action && description && <div>{action}</div>}
    </div>
  );
}
