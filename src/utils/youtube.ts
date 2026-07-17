/**
 * สร้าง YouTube URL พร้อม Timestamp
 * @param youtubeId - YouTube Video ID
 * @param startSeconds - ช่วงเวลาเริ่มต้น (วินาที)
 */
export function createYouTubeTimestampUrl(
  youtubeId: string,
  startSeconds: number
): string {
  return `https://www.youtube.com/watch?v=${youtubeId}&t=${startSeconds}s`;
}

/**
 * สร้าง YouTube Embed URL
 * @param youtubeId - YouTube Video ID
 * @param startSeconds - ช่วงเวลาเริ่มต้น (วินาที) ถ้ามี
 */
export function createYouTubeEmbedUrl(
  youtubeId: string,
  startSeconds?: number
): string {
  const base = `https://www.youtube.com/embed/${youtubeId}`;
  if (startSeconds !== undefined && startSeconds > 0) {
    return `${base}?start=${startSeconds}`;
  }
  return base;
}

/**
 * สร้าง YouTube Thumbnail URL
 * @param youtubeId - YouTube Video ID
 */
export function getYouTubeThumbnailUrl(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
}

/**
 * แปลงวินาทีเป็นรูปแบบ mm:ss หรือ hh:mm:ss
 * @param totalSeconds - จำนวนวินาทีทั้งหมด
 */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
