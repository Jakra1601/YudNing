import { Clock, ExternalLink, PlayCircle } from 'lucide-react';
import type { VideoTimestamp } from '../../types/video';
import { createYouTubeTimestampUrl, formatDuration } from '../../utils/youtube';

interface TimestampListProps {
  /** YouTube Video ID ของวิดีโอต้นฉบับ */
  youtubeId: string;
  /** รายการ Timestamp */
  timestamps: VideoTimestamp[];
  /** Topic ID ที่ต้องการกรอง (ถ้าไม่ระบุ แสดงทั้งหมด) */
  filterTopicId?: string;
  /** เมื่อ User คลิก Timestamp จะเรียก callback นี้ด้วย startSeconds */
  onTimestampClick?: (startSeconds: number) => void;
}

/**
 * TimestampList — แสดงรายการ Timestamp ของวิดีโอ
 *
 * แต่ละ Timestamp มีปุ่ม 2 แบบ:
 *  1. คลิกเพื่อ jump ใน VideoPlayer บนหน้าเดิม (onTimestampClick)
 *  2. คลิกเพื่อเปิดวิดีโอ YouTube ที่ timestamp นั้นโดยตรง
 */
export function TimestampList({
  youtubeId,
  timestamps,
  filterTopicId,
  onTimestampClick,
}: TimestampListProps) {
  const filtered = filterTopicId
    ? timestamps.filter((ts) => ts.topicIds.includes(filterTopicId))
    : timestamps;

  if (filtered.length === 0) {
    return null;
  }

  const isPlaceholder = youtubeId === 'PLACEHOLDER_ID' || !youtubeId;

  return (
    <section aria-labelledby="timestamps-heading">
      <h2
        id="timestamps-heading"
        className="text-lg font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2"
      >
        <Clock size={18} className="text-[var(--color-primary)]" />
        ช่วงเวลาที่เกี่ยวข้อง
      </h2>

      <ol className="space-y-2" aria-label="รายการช่วงเวลาในวิดีโอ">
        {filtered.map((ts) => {
          const timeLabel = formatDuration(ts.startSeconds);
          const endLabel = ts.endSeconds ? `–${formatDuration(ts.endSeconds)}` : '';
          const watchUrl = isPlaceholder ? '#' : createYouTubeTimestampUrl(youtubeId, ts.startSeconds);

          return (
            <li
              key={ts.id}
              className="flex items-start gap-3 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-3 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card)] transition-all duration-200 group"
            >
              {/* Timestamp Badge */}
              <span
                className="shrink-0 font-mono text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2 py-1 rounded mt-0.5 min-w-[52px] text-center"
                aria-label={`เวลา ${timeLabel}`}
              >
                {timeLabel}{endLabel}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-main)] leading-snug mb-0.5">
                  {ts.label}
                </p>
                {ts.summary && (
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {ts.summary}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Play in player (ถ้ามี callback) */}
                {onTimestampClick && !isPlaceholder && (
                  <button
                    type="button"
                    onClick={() => onTimestampClick(ts.startSeconds)}
                    title={`เล่นจาก ${timeLabel}`}
                    aria-label={`เล่นวิดีโอจากช่วงเวลา ${timeLabel} — ${ts.label}`}
                    className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-colors duration-200"
                  >
                    <PlayCircle size={16} />
                  </button>
                )}

                {/* Open in YouTube */}
                {!isPlaceholder ? (
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`เปิด YouTube ที่ ${timeLabel}`}
                    aria-label={`เปิดวิดีโอบน YouTube ที่ช่วงเวลา ${timeLabel} — ${ts.label}`}
                    className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-colors duration-200"
                  >
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span
                    className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-border)]"
                    aria-hidden="true"
                    title="รอข้อมูลวิดีโอต้นฉบับ"
                  >
                    <ExternalLink size={14} />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
