import { ExternalLink, Clock, Check } from 'lucide-react';
import { createYouTubeTimestampUrl } from '../../utils/youtube';
import type { Video } from '../../types/video';
import { SaveButton } from '../common/SaveButton';
import { useTranslation } from 'react-i18next';
import { getLocalizedVideo } from '../../i18n/contentResolver';

interface VideoCardProps {
  video: Video;
  /** แสดง highlight border เมื่อเป็นวิดีโอที่กำลังเล่นอยู่ */
  isSelected?: boolean;
  /** Callback เมื่อผู้ใช้เลือกวิดีโอนี้ (สำหรับ multi-video selector) */
  onSelect?: () => void;
  /** Highlight Timestamp ID ที่ต้องการเน้น */
  highlightTimestampId?: string;
  /** แสดงรายการช่วงเวลาที่เกี่ยวข้องหรือไม่ (ค่าเริ่มต้น: true) */
  showTimestamps?: boolean;
}

/**
 * VideoCard — แสดงข้อมูลวิดีโอในรูปแบบการ์ด
 *
 * รองรับทั้งโหมดปกติ และโหมด selectable (ใช้ใน RelatedVideosSection)
 * เมื่อ `onSelect` ถูกส่งเข้ามา การ์ดจะกลายเป็น interactive element
 */
export function VideoCard({ video: sourceVideo, isSelected, onSelect, highlightTimestampId, showTimestamps = true }: VideoCardProps) {
  const { i18n } = useTranslation();
  const video = getLocalizedVideo(sourceVideo, i18n.language);

  const thumbnailUrl = video.thumbnailUrl ||
    `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

  const isPlaceholder = video.youtubeId === 'PLACEHOLDER_ID';

  const cardClasses = [
    'bg-white rounded-[var(--radius-card)] border overflow-hidden shadow-[var(--shadow-card)] transition-all duration-200',
    isSelected
      ? 'border-[var(--color-primary)] shadow-[var(--shadow-card-hover)]'
      : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)]',
    onSelect ? 'cursor-pointer' : '',
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onSelect) onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={onSelect ? handleClick : undefined}
      onKeyDown={onSelect ? handleKeyDown : undefined}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? isSelected : undefined}
      aria-label={onSelect ? `เลือกวิดีโอ: ${video.title}` : undefined}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        {!isPlaceholder ? (
          <img
            src={thumbnailUrl}
            alt={`ภาพตัวอย่างวิดีโอ: ${video.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-soft)]">
            <span className="text-sm text-[var(--color-text-muted)]">ตัวอย่างวิดีโอ</span>
          </div>
        )}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
            <Clock size={10} />
            {video.duration}
          </span>
        )}
        {/* Selected indicator */}
        {isSelected && (
          <span
            className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center"
            aria-hidden="true"
          >
            <Check size={13} />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-xs text-[var(--color-text-muted)]">{video.channelName}</p>
          {!isPlaceholder && (
            <SaveButton contentId={video.id} contentType="video" className="-mt-1" />
          )}
        </div>
        <h4 className="font-semibold text-[var(--color-text-main)] leading-snug mb-2">
          {video.title}
        </h4>
        {video.description &&
          video.description !== 'ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ' && (
            <p className="text-sm text-[var(--color-text-muted)] mb-3 line-clamp-2">
              {video.description}
            </p>
          )}

        {/* Timestamps */}
        {showTimestamps && video.timestamps.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">
              ช่วงเวลาที่เกี่ยวข้อง:
            </p>
            <ul className="space-y-1.5">
              {video.timestamps.map((ts) => (
                <li key={ts.id}>
                  <a
                    href={
                      isPlaceholder
                        ? '#'
                        : createYouTubeTimestampUrl(video.youtubeId, ts.startSeconds)
                    }
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                    onClick={(e) => {
                      e.stopPropagation(); // ไม่ให้คลิก timestamp trigger card selection
                      if (isPlaceholder) e.preventDefault();
                    }}
                    aria-label={`เปิด YouTube ที่ ${Math.floor(ts.startSeconds / 60)}:${String(ts.startSeconds % 60).padStart(2, '0')} — ${ts.label}`}
                    className={`flex items-start gap-2 text-sm hover:text-[var(--color-primary)] transition-colors duration-200 ${
                      highlightTimestampId === ts.id
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-[var(--color-text-muted)]'
                    }`}
                  >
                    <span className="font-mono text-xs bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      {Math.floor(ts.startSeconds / 60)}:
                      {String(ts.startSeconds % 60).padStart(2, '0')}
                    </span>
                    <span className="line-clamp-1">{ts.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Watch button */}
        {!isPlaceholder && (
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`ดูวิดีโอ "${video.title}" บน YouTube`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
          >
            <ExternalLink size={14} />
            ดูวิดีโอต้นฉบับ
          </a>
        )}
      </div>
    </div>
  );
}
