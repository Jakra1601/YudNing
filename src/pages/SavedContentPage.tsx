import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, LayoutGrid, List } from 'lucide-react';
import { useSavedContent } from '../contexts/SavedContentContext';
import { topics } from '../data/topics';
import { videos } from '../data/videos';
import { TopicCard } from '../components/topics/TopicCard';
import { VideoCard } from '../components/videos/VideoCard';
import { usePageSEO } from '../hooks/usePageSEO';
import type { Topic } from '../types/topic';
import type { Video } from '../types/video';

type SavedItem =
  | { type: 'topic'; data: Topic; savedAt: string }
  | { type: 'video'; data: Video; savedAt: string };

export function SavedContentPage() {
  usePageSEO({
    title: 'เนื้อหาที่บันทึกไว้ | YudNing',
    description: 'เนื้อหาสมาธิที่ถูกบันทึกไว้เป็นรายการโปรดของคุณ',
  });

  const { savedItems, isLoading } = useSavedContent();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Map database entries to local content and sort by created_at DESC
  const resolvedItems = useMemo(() => {
    const items: SavedItem[] = [];

    for (const item of savedItems) {
      if (item.content_type === 'topic') {
        const topicData = topics.find((t) => t.id === item.content_id);
        if (topicData) {
          items.push({ type: 'topic', data: topicData, savedAt: item.created_at });
        }
      } else if (item.content_type === 'video') {
        const videoData = videos.find((v) => v.id === item.content_id);
        if (videoData) {
          items.push({ type: 'video', data: videoData, savedAt: item.created_at });
        }
      }
    }

    // Sort by savedAt DESC
    items.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

    return items;
  }, [savedItems]);

  return (
    <main id="main-content" className="py-8 sm:py-12 min-h-[70vh]">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight mb-1 flex items-center gap-2">
              <Bookmark size={24} className="text-[var(--color-primary)]" />
              เนื้อหาที่บันทึกไว้
            </h1>
            <p className="text-[var(--color-text-muted)]">
              รายการหัวข้อสมาธิและวิดีโอที่คุณบันทึกไว้
            </p>
          </div>

          <div className="flex bg-[var(--color-background)] rounded-[var(--radius-btn)] p-1 border border-[var(--color-border)] w-max">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
              aria-label="แสดงแบบกริด"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
              aria-label="แสดงแบบรายการ"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && resolvedItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        ) : resolvedItems.length === 0 ? (
          /* Empty State */
          <div className="py-16 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] text-center shadow-sm">
            <Bookmark size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
              ยังไม่มีเนื้อหาที่บันทึกไว้
            </h3>
            <p className="text-[var(--color-text-muted)] mb-6 max-w-sm mx-auto">
              คุณสามารถกดไอคอนบันทึกที่หัวข้อหรือวิดีโอ เพื่อเก็บไว้อ่านหรือดูในภายหลังได้ที่นี่
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/topics"
                className="px-4 py-2 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                ดูหัวข้อทั้งหมด
              </Link>
              <Link
                to="/library"
                className="px-4 py-2 rounded-[var(--radius-btn)] bg-gray-100 text-[var(--color-text-main)] text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ดูคลังสมาธิ
              </Link>
            </div>
          </div>
        ) : (
          /* List State */
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4 max-w-3xl'}>
            {resolvedItems.map((item, index) => {
              // using unique key fallback in case of bugs
              const key = `${item.type}-${item.type === 'topic' ? item.data.id : (item.data as Video).id}-${index}`;
              
              if (item.type === 'topic') {
                return <TopicCard key={key} topic={item.data as Topic} />;
              } else {
                return <VideoCard key={key} video={item.data as Video} showTimestamps={false} />;
              }
            })}
          </div>
        )}
      </div>
    </main>
  );
}
