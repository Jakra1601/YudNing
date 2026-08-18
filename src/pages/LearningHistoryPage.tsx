import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, LayoutGrid, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getLearningHistory, mapActivityToLocalContent } from '../services/learningActivity';
import { TopicCard } from '../components/topics/TopicCard';
import { VideoCard } from '../components/videos/VideoCard';
import { usePageSEO } from '../hooks/usePageSEO';

type MappedContent = NonNullable<ReturnType<typeof mapActivityToLocalContent>>;

export function LearningHistoryPage() {
  usePageSEO({
    title: 'ประวัติการเรียนรู้ | YudNing',
    description: 'ประวัติการเข้าชมเนื้อหาสมาธิของคุณ',
  });

  const { user } = useAuth();
  const [historyItems, setHistoryItems] = useState<MappedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let isMounted = true;

    async function fetchHistory() {
      if (!user) return;
      try {
        setIsLoading(true);
        const history = await getLearningHistory(user.id);
        
        if (!isMounted) return;

        const validContent = history
          .map(mapActivityToLocalContent)
          .filter((item): item is MappedContent => item !== null);

        setHistoryItems(validContent);
      } catch (error) {
        console.error('[YudNing] Failed to fetch learning history:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <main id="main-content" className="py-8 sm:py-12 min-h-[70vh]">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight mb-1 flex items-center gap-2">
              <History size={24} className="text-[var(--color-primary)]" />
              ประวัติการเรียนรู้
            </h1>
            <p className="text-[var(--color-text-muted)]">
              รายการหัวข้อสมาธิและวิดีโอที่คุณเพิ่งเข้าชม
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
        {isLoading && historyItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        ) : historyItems.length === 0 ? (
          /* Empty State */
          <div className="py-16 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] text-center shadow-sm">
            <History size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
              คุณยังไม่มีประวัติการเข้าชมเนื้อหา
            </h3>
            <p className="text-[var(--color-text-muted)] mb-6 max-w-sm mx-auto">
              เริ่มต้นเรียนรู้การนั่งสมาธิผ่านหัวข้อหรือวิดีโอ ประวัติการเข้าชมจะมาแสดงที่นี่โดยอัตโนมัติ
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/topics"
                className="px-4 py-2 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                ดูหัวข้อทั้งหมด
              </Link>
            </div>
          </div>
        ) : (
          /* List State */
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4 max-w-3xl'}>
            {historyItems.map((item, index) => {
              const key = `${item.activity.id}-${index}`;
              
              if (item.type === 'topic') {
                return <TopicCard key={key} topic={item.data} />;
              } else {
                return <VideoCard key={key} video={item.data} />;
              }
            })}
          </div>
        )}
      </div>
    </main>
  );
}
