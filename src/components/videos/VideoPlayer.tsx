import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { createYouTubeEmbedUrl, createYouTubeTimestampUrl, getYouTubeThumbnailUrl } from '../../utils/youtube';
import { useAuth } from '../../contexts/AuthContext';
import { trackActivity } from '../../services/learningActivity';

interface VideoPlayerProps {
  /** YouTube Video ID */
  youtubeId: string;
  /** ชื่อวิดีโอ — ใช้สำหรับ aria-label */
  title: string;
  /** ช่วงเวลาเริ่มต้น (วินาที) */
  startSeconds?: number;
  /** ความสูงของ Player — default "aspect-video" (16:9) */
  className?: string;
  /** Video ID (Local Content) สำหรับใช้ Track Activity */
  videoId?: string;
}

/**
 * VideoPlayer — ฝัง YouTube iframe แบบ Lazy Loading
 *
 * ก่อนคลิก: แสดง Thumbnail + ปุ่ม Play
 * หลังคลิก: โหลด iframe จริง เพื่อไม่ให้หน้าช้าเมื่อมีวิดีโอหลายตัว
 *
 * หลักการ: ผู้ใช้ต้องคลิกเองถึงจะโหลด iframe
 * ทำให้หน้าโหลดเร็วขึ้นและไม่เสียแบนด์วิธโดยไม่จำเป็น
 */
export function VideoPlayer({ youtubeId, title, startSeconds, className = '', videoId }: VideoPlayerProps) {
  const { t } = useTranslation();

  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  const handlePlay = () => {
    setIsPlaying(true);
    // Track เมื่อ Member explicitly activates/opens the video player
    if (user && videoId) {
      trackActivity(user.id, videoId, 'video').catch(console.error);
    }
  };

  const thumbnailUrl = getYouTubeThumbnailUrl(youtubeId);
  const embedUrl = createYouTubeEmbedUrl(youtubeId, startSeconds);
  const watchUrl = createYouTubeTimestampUrl(youtubeId, startSeconds ?? 0);

  // ถ้าเป็น placeholder ไม่แสดง player จริง
  const isPlaceholder = youtubeId === 'PLACEHOLDER_ID' || !youtubeId;

  if (isPlaceholder) {
    return (
      <div
        className={`relative w-full aspect-video bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-card)] flex items-center justify-center ${className}`}
        role="img"
        aria-label={t('videos.videoPreviewAria', 'วิดีโอตัวอย่าง')}
      >
        <div className="text-center px-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-border)] flex items-center justify-center mx-auto mb-3">
            <Play size={20} className="text-[var(--color-text-muted)] ml-0.5" />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('videos.videoPreviewTitle', 'วิดีโอตัวอย่าง')}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('videos.waitingData', 'รอการเพิ่มข้อมูลจากวิดีโอต้นฉบับ')}</p>
        </div>
      </div>
    );
  }

  const iframeSrc = embedUrl.includes('?') 
    ? `${embedUrl}&autoplay=1&rel=0&modestbranding=1`
    : `${embedUrl}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`relative w-full aspect-video rounded-[var(--radius-card)] overflow-hidden bg-black ${className}`}>
        {isPlaying ? (
          /* iframe จะโหลดเมื่อผู้ใช้คลิก Play เท่านั้น */
          <iframe
            src={iframeSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
        ) : (
          /* Lazy Thumbnail — แสดงก่อนคลิก */
          <button
            type="button"
            onClick={handlePlay}
            aria-label={t('videos.playVideoAria', { title, defaultValue: 'เล่นวิดีโอ: ' + title })}
            className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={t('videos.coverAria', { title, defaultValue: 'ภาพปกวิดีโอ: ' + title })}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Overlay */}
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" aria-hidden="true" />

            {/* Play Button */}
            <span
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-lg">
                <Play size={28} className="text-[var(--color-primary)] ml-1.5 fill-[var(--color-primary)]" />
              </span>
            </span>

            {/* Timestamp label (ถ้ามี) */}
            {startSeconds !== undefined && startSeconds > 0 && (
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono" aria-hidden="true">
                {t('videos.startAt', { time: `${Math.floor(startSeconds / 60)}:${String(startSeconds % 60).padStart(2, '0')}`, defaultValue: 'เริ่มที่ ' + Math.floor(startSeconds / 60) + ':' + String(startSeconds % 60).padStart(2, '0') })}
              </span>
            )}
          </button>
        )}

        {/* Open in YouTube Button (แสดงเสมอ) */}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('videos.openOnYoutubeAria', { title, defaultValue: 'เปิด ' + title + ' บน YouTube' })}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={11} />
          YouTube
        </a>
      </div>

      {/* Fallback Message & Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[var(--color-surface)] p-3 rounded-[var(--radius-card)] border border-[var(--color-border)] gap-3">
        <p className="text-sm text-[var(--color-text-muted)] text-center sm:text-left">
          {t('videos.cannotPlay', 'หากวิดีโอไม่สามารถเล่นได้ กรุณารับชมบน YouTube')}
        </p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-sm font-medium rounded-md transition-colors w-full sm:w-auto justify-center"
        >
          <Play size={16} className="fill-white" />
          รับชมบน YouTube
        </a>
      </div>
    </div>
  );
}
