import type { TopicStatus } from '../../types/topic';

interface StatusBadgeProps {
  status: TopicStatus;
  className?: string;
}

const statusConfig: Record<TopicStatus, { label: string; className: string }> = {
  placeholder: {
    label: '⚠ ข้อมูลตัวอย่าง',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  draft: {
    label: '📝 กำลังตรวจสอบ',
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  verified: {
    label: '✓ ตรวจสอบแล้ว',
    className: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[#C8DDD9]',
  },
};

/**
 * StatusBadge — แสดงสถานะการตรวจสอบข้อมูล
 * ใช้ใน TopicCard และ TopicDetailPage เพื่อความโปร่งใส
 */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
