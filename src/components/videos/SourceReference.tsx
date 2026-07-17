import { ExternalLink, Youtube } from 'lucide-react';

interface SourceReferenceProps {
  videoTitle: string;
  channelName: string;
  youtubeUrl: string;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

/**
 * SourceReference — แสดงแหล่งอ้างอิงวิดีโอต้นฉบับ
 * ใช้ในทุกหน้าที่มีเนื้อหาจากช่อง YouTube ธรรมะ โฆษก
 */
export function SourceReference({
  videoTitle,
  channelName,
  youtubeUrl,
  startLabel,
  endLabel,
  className = '',
}: SourceReferenceProps) {
  return (
    <aside
      aria-label="แหล่งอ้างอิง"
      className={`bg-[var(--color-primary-soft)] border border-[#C8DDD9] rounded-[var(--radius-card)] p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white shrink-0">
          <Youtube size={15} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[var(--color-primary)] mb-0.5">แหล่งอ้างอิง</p>
          <p className="text-sm font-semibold text-[var(--color-text-main)] leading-snug mb-0.5">
            {videoTitle}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">ช่อง: {channelName}</p>
          {(startLabel || endLabel) && (
            <p className="text-xs text-[var(--color-text-muted)] mb-2">
              ช่วงเวลา: {startLabel}{endLabel ? `–${endLabel}` : ''}
            </p>
          )}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
          >
            <ExternalLink size={12} />
            ดูวิดีโอต้นฉบับ
          </a>
        </div>
      </div>
    </aside>
  );
}
