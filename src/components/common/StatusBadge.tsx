import { useTranslation } from 'react-i18next';
import type { Topic } from '../../types/topic';

interface StatusBadgeProps {
  topic: Topic;
  className?: string;
}

/**
 * StatusBadge — แสดงสถานะการตรวจสอบข้อมูล
 * ใช้ใน TopicCard และ TopicDetailPage เพื่อความโปร่งใส
 */
export function StatusBadge({ topic, className = '' }: StatusBadgeProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  
  const sourceStatus = topic.sourceStatus ?? topic.status;
  const isFallback = topic.isFallback ?? false;
  const translationStatus = topic.translationStatus;

  let labelKey = '';
  let badgeClass = '';

  if (!isEn || isFallback) {
    if (sourceStatus === 'placeholder') {
      labelKey = 'status.placeholder';
      badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
    } else if (sourceStatus === 'draft') {
      labelKey = 'status.draft';
      badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
    } else {
      labelKey = 'status.verified';
      badgeClass = 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[#C8DDD9]';
    }
  } else {
    // English UI with translation
    if (sourceStatus === 'placeholder') {
      labelKey = 'status.placeholder';
      badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
    } else if (translationStatus === 'draft') {
      labelKey = 'status.translationDraft';
      badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
    } else if (translationStatus === 'verified') {
      labelKey = 'status.translationVerified';
      badgeClass = 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[#C8DDD9]';
    } else {
      labelKey = 'status.translationDraft';
      badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeClass} ${className}`}
    >
      {t(labelKey)}
    </span>
  );
}
