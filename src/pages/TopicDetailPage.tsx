import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { topics } from '../data/topics';
import { categories } from '../data/categories';
import { videos } from '../data/videos';
import type { Video } from '../types/video';
import { StatusBadge } from '../components/common/StatusBadge';
import { VideoCard } from '../components/videos/VideoCard';
import { VideoPlayer } from '../components/videos/VideoPlayer';
import { TimestampList } from '../components/videos/TimestampList';
import { TopicCard } from '../components/topics/TopicCard';
import { usePageSEO } from '../hooks/usePageSEO';
import {
  ChevronRight, Home, BookOpen, AlertTriangle,
  ListChecks, HelpCircle, ArrowRight, ChevronDown, ChevronUp,
} from 'lucide-react';

const levelLabel: Record<string, string> = {
  beginner: 'ผู้เริ่มต้น',
  intermediate: 'ระดับกลาง',
  advanced: 'ขั้นสูง',
};

/* ─── RelatedVideosSection ───────────────────────────────────────────────── */

/**
 * RelatedVideosSection
 * แสดงวิดีโอที่เกี่ยวข้อง พร้อม VideoPlayer และ TimestampList
 *
 * - ถ้ามีวิดีโอเดียว: แสดง VideoPlayer + TimestampList ทันที
 * - ถ้ามีหลายวิดีโอ: แสดง VideoCard list ด้านบน
 *   และ VideoPlayer + TimestampList ของวิดีโอที่เลือก
 */
function RelatedVideosSection({ videos: relatedVideos, topicId }: { videos: Video[]; topicId: string }) {
  const [selectedId, setSelectedId] = useState<string>(relatedVideos[0]?.id ?? '');
  const [startSeconds, setStartSeconds] = useState<number | undefined>(undefined);
  const [isTimestampsOpen, setIsTimestampsOpen] = useState(true);

  const selectedVideo = relatedVideos.find((v) => v.id === selectedId) ?? relatedVideos[0];
  if (!selectedVideo) return null;

  const topicTimestamps = selectedVideo.timestamps.filter((ts) =>
    ts.topicIds.includes(topicId)
  );

  const handleTimestampClick = (seconds: number) => {
    setStartSeconds(seconds);
    const player = document.getElementById('video-player-section');
    if (player) {
      player.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section aria-labelledby="videos-heading" className="mb-8">
      <h2 id="videos-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-4">
        วิดีโอที่เกี่ยวข้อง
      </h2>

      {relatedVideos.length > 1 && (
        <div className="space-y-2 mb-4">
          {relatedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isSelected={video.id === selectedId}
              onSelect={() => {
                setSelectedId(video.id);
                setStartSeconds(undefined);
              }}
            />
          ))}
        </div>
      )}

      <div id="video-player-section" className="mb-4">
        <VideoPlayer
          key={`${selectedVideo.id}-${startSeconds}`}
          youtubeId={selectedVideo.youtubeId}
          title={selectedVideo.title}
          startSeconds={startSeconds}
        />
        <p className="text-xs text-[var(--color-text-muted)] mt-2 text-center">
          {selectedVideo.title}
          {selectedVideo.channelName && (
            <> · <span className="font-medium">{selectedVideo.channelName}</span></>
          )}
        </p>
      </div>

      {topicTimestamps.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsTimestampsOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-left mb-2 group"
            aria-expanded={isTimestampsOpen}
            aria-controls="timestamps-panel"
          >
            <span className="text-sm font-medium text-[var(--color-text-main)]">
              ช่วงเวลาที่เกี่ยวข้องในวิดีโอนี้ ({topicTimestamps.length} ช่วง)
            </span>
            <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
              {isTimestampsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {isTimestampsOpen && (
            <div id="timestamps-panel">
              <TimestampList
                youtubeId={selectedVideo.youtubeId}
                timestamps={selectedVideo.timestamps}
                filterTopicId={topicId}
                onTimestampClick={handleTimestampClick}
              />
            </div>
          )}
        </div>
      )}

      {relatedVideos.length === 1 && (
        <div className="mt-4">
          <VideoCard video={selectedVideo} />
        </div>
      )}
    </section>
  );
}

/* ─── TopicDetailPage ────────────────────────────────────────────────────── */

export function TopicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = topics.find((t) => t.slug === slug);

  usePageSEO({
    title: topic ? topic.title : 'ไม่พบหัวข้อ',
    description: topic
      ? `เรียนรู้เรื่อง “${topic.title}” — ${topic.shortAnswer} จากช่อง YouTube ธรรมะ โฆษก`
      : undefined,
  });

  if (!topic) {
    return (
      <main id="main-content" className="py-16">
        <div className="container-content text-center">
          <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
          <h1 className="text-xl font-bold text-[var(--color-text-main)] mb-2">
            ไม่พบหัวข้อนี้
          </h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            หัวข้อที่คุณกำลังมองหาอาจยังไม่ถูกเพิ่มเข้ามา หรือ URL อาจไม่ถูกต้อง
          </p>
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
          >
            <BookOpen size={15} />
            ดูหัวข้อทั้งหมด
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === topic.categoryId);
  const relatedVideos = videos.filter((v) => topic.relatedVideoIds.includes(v.id));
  const relatedTopics = topics.filter((t) => topic.relatedTopicIds.includes(t.id));

  return (
    <main id="main-content" className="py-8 sm:py-12">
      <div className="container-content">
        <nav aria-label="เส้นทางหน้า" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-6 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1">
            <Home size={13} />
            หน้าแรก
          </Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link to="/topics" className="hover:text-[var(--color-primary)] transition-colors duration-200">
            หัวข้อทั้งหมด
          </Link>
          {category && (
            <>
              <ChevronRight size={13} aria-hidden="true" />
              <Link
                to={`/topics?category=${category.slug}`}
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={13} aria-hidden="true" />
          <span className="text-[var(--color-text-main)] truncate max-w-[180px]" aria-current="page">
            {topic.title}
          </span>
        </nav>

        {topic.status !== 'verified' && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4 mb-6" role="alert">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                {topic.status === 'placeholder'
                  ? 'ข้อมูลตัวอย่าง — ยังไม่ผ่านการตรวจสอบจากวิดีโอต้นฉบับ'
                  : 'เนื้อหานี้อยู่ระหว่างการตรวจสอบกับวิดีโอต้นฉบับ'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                ห้ามนำไปอ้างอิงจนกว่าจะผ่านการตรวจสอบจากช่อง YouTube "ธรรมะ โฆษก"
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-medium text-[var(--color-text-muted)] bg-gray-100 px-2 py-0.5 rounded">
              {levelLabel[topic.level] ?? topic.level}
            </span>
            <StatusBadge status={topic.status} />
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[var(--color-text-muted)] bg-[var(--color-background)] border border-[var(--color-border)] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight">
            {topic.title}
          </h1>
        </div>

        <section aria-labelledby="short-answer-heading" className="mb-8">
          <div className="bg-[var(--color-primary-soft)] border border-[#C8DDD9] rounded-[var(--radius-card)] p-5">
            <h2 id="short-answer-heading" className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-2">
              คำตอบสั้น ๆ
            </h2>
            <p className="text-[var(--color-text-main)] font-medium leading-relaxed">
              {topic.shortAnswer}
            </p>
          </div>
        </section>

        {topic.description && topic.description !== 'ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ' && (
          <section aria-labelledby="explanation-heading" className="mb-8">
            <h2 id="explanation-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3">
              คำอธิบาย
            </h2>
            <div className="prose text-[var(--color-text-muted)] leading-relaxed">
              <p>{topic.description}</p>
            </div>
          </section>
        )}

        {topic.keyPoints.length > 0 && topic.keyPoints[0] !== 'ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ' && (
          <section aria-labelledby="keypoints-heading" className="mb-8">
            <h2 id="keypoints-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2">
              <ListChecks size={18} className="text-[var(--color-primary)]" />
              สาระสำคัญ
            </h2>
            <ul className="space-y-2">
              {topic.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {topic.practicalSteps.length > 0 && topic.practicalSteps[0] !== 'ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ' && (
          <section aria-labelledby="steps-heading" className="mb-8">
            <h2 id="steps-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3">
              สิ่งที่ลองทำได้
            </h2>
            <ol className="space-y-2">
              {topic.practicalSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                  <span className="w-6 h-6 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {relatedVideos.length > 0 && (
          <RelatedVideosSection videos={relatedVideos} topicId={topic.id} />
        )}

        {topic.relatedQuestions.length > 0 && (
          <section aria-labelledby="questions-heading" className="mb-8">
            <h2 id="questions-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2">
              <HelpCircle size={18} className="text-[var(--color-primary)]" />
              คำถามที่เกี่ยวข้อง
            </h2>
            <ul className="space-y-2">
              {topic.relatedQuestions.map((q, idx) => (
                <li key={idx}>
                  <Link
                    to={`/search?q=${encodeURIComponent(q)}`}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 group"
                  >
                    <ArrowRight size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                    {q}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTopics.length > 0 && (
          <section aria-labelledby="related-heading" className="mb-8">
            <h2 id="related-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-4">
              หัวข้อที่ควรศึกษาต่อ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTopics.map((t) => (
                <TopicCard key={t.id} topic={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
