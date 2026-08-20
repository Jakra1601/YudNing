import { useState, useEffect } from 'react';
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
import { ChevronRight, Home, BookOpen, AlertTriangle, ListChecks, HelpCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SaveButton } from '../components/common/SaveButton';
import { useAuth } from '../contexts/AuthContext';
import { trackActivity } from '../services/learningActivity';

// Level label mapping is now handled via i18n t(`level.${topic.level}`)
// Keep this comment for context or future use.

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

  const { t } = useTranslation();

  return (
    <section aria-labelledby="videos-heading" className="mb-8">
      <h2 id="videos-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-4">
        {t('topicDetail.relatedVideos')}
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
          videoId={selectedVideo.id}
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
              {t('topicDetail.timestamps', { count: topicTimestamps.length })}
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

import { getLocalizedTopic, getLocalizedVideo } from '../i18n/contentResolver';

/* ─── TopicDetailPage ────────────────────────────────────────────────────── */

export function TopicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sourceTopic = topics.find((t) => t.slug === slug);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const topic = sourceTopic ? getLocalizedTopic(sourceTopic, i18n.language) : undefined;

  usePageSEO({
    title: topic ? topic.title : t('topicDetail.notFoundTitle'),
    description: topic
      ? `เรียนรู้เรื่อง “${topic.title}” — ${topic.shortAnswer} จากช่อง YouTube ธรรมะ โฆษก`
      : undefined,
  });

  useEffect(() => {
    if (topic && user) {
      trackActivity(user.id, topic.id, 'topic').catch(console.error);
    }
  }, [topic?.id, user?.id]);

  if (!topic) {
    return (
      <main id="main-content" className="py-16">
        <div className="container-content text-center">
          <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
          <h1 className="text-xl font-bold text-[var(--color-text-main)] mb-2">
            {t('topicDetail.notFoundTitle')}
          </h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            {t('topicDetail.notFoundDesc')}
          </p>
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
          >
            <BookOpen size={15} />
            {t('topicDetail.viewAllTopics')}
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === topic.categoryId);
  const relatedVideos = videos
    .filter((v) => topic.relatedVideoIds.includes(v.id))
    .map((v) => getLocalizedVideo(v, i18n.language));
  const relatedTopics = topics.filter((t) => topic.relatedTopicIds.includes(t.id));

  return (
    <main id="main-content" className="py-8 sm:py-12">
      <div className="container-content">
        <nav aria-label={t('topicDetail.breadcrumbAria')} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-6 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1">
            <Home size={13} />
            {t('topicDetail.home')}
          </Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link to="/topics" className="hover:text-[var(--color-primary)] transition-colors duration-200">
            {t('topicDetail.allTopics')}
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
          <span className="text-[var(--color-text-main)] truncate flex-1 min-w-0" aria-current="page">
            {topic.title}
          </span>
        </nav>

        {topic.status !== 'verified' && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4 mb-6" role="alert">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                {topic.status === 'placeholder'
                  ? t('topicDetail.alertPlaceholder')
                  : t('topicDetail.alertUnverified')}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {t('topicDetail.alertCaution')}
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-text-muted)] bg-gray-100 px-2 py-0.5 rounded">
                {t(`level.${topic.level}`)}
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
            <SaveButton contentId={topic.id} contentType="topic" showLabel className="bg-white border border-[var(--color-border)] px-3 py-1.5 shadow-sm hover:shadow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight">
            {topic.title}
          </h1>
        </div>

        <section aria-labelledby="short-answer-heading" className="mb-8">
          <div className="bg-[var(--color-primary-soft)] border border-[#C8DDD9] rounded-[var(--radius-card)] p-5">
            <h2 id="short-answer-heading" className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-2">
              {t('topicDetail.shortAnswer')}
            </h2>
            <p className="text-[var(--color-text-main)] font-medium leading-relaxed">
              {topic.shortAnswer}
            </p>
          </div>
        </section>

        {topic.description && topic.description !== 'ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ' && (
          <section aria-labelledby="explanation-heading" className="mb-8">
            <h2 id="explanation-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3">
              {t('topicDetail.explanation')}
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
              {t('topicDetail.keyPoints')}
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



        {relatedVideos.length > 0 && (
          <RelatedVideosSection videos={relatedVideos} topicId={topic.id} />
        )}

        {topic.relatedQuestions.length > 0 && (
          <section aria-labelledby="questions-heading" className="mb-8">
            <h2 id="questions-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2">
              <HelpCircle size={18} className="text-[var(--color-primary)]" />
              {t('topicDetail.relatedQuestions')}
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
              {t('topicDetail.furtherStudy')}
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
