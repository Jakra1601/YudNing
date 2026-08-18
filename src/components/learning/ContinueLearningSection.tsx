import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getLearningHistory, mapActivityToLocalContent } from '../../services/learningActivity';
import { TopicCard } from '../topics/TopicCard';
import { VideoCard } from '../videos/VideoCard';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type MappedContent = NonNullable<ReturnType<typeof mapActivityToLocalContent>>;

export function ContinueLearningSection() {
  const { user } = useAuth();
  const [contentList, setContentList] = useState<MappedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchContinueLearning() {
      if (!user) return;
      try {
        setIsLoading(true);
        // ดึงมา 10 รายการเพื่อเผื่อเนื้อหาบางอันถูกลบออกจาก Local Data
        const history = await getLearningHistory(user.id, 10);
        
        if (!isMounted) return;

        // Map กับ Local Data และกรองเนื้อหาที่หาไม่เจอออก
        const validContent = history
          .map(mapActivityToLocalContent)
          .filter((item): item is MappedContent => item !== null)
          .slice(0, 2); // เอาแค่ 2 รายการแรกที่ยัง valid อยู่

        setContentList(validContent);
      } catch (error) {
        console.error('[YudNing] Failed to fetch continue learning:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchContinueLearning();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // ซ่อน Section นี้ถ้าเป็น Guest หรือโหลดเสร็จแล้วไม่มีเนื้อหา
  if (!user || (!isLoading && contentList.length === 0)) {
    return null;
  }

  return (
    <section aria-labelledby="continue-learning-heading" className="py-14 bg-white border-b border-[var(--color-border)]">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="continue-learning-heading" className="text-xl sm:text-2xl font-bold text-[var(--color-text-main)] flex items-center gap-2">
              <PlayCircle size={24} className="text-[var(--color-primary)]" />
              เรียนรู้ต่อจากที่ค้างไว้
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              เนื้อหาล่าสุดที่คุณเพิ่งเข้าชม
            </p>
          </div>
          <Link
            to="/history"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
          >
            ประวัติทั้งหมด
            <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
            <div className="h-32 bg-gray-100 rounded-[var(--radius-card)]" />
            <div className="h-32 bg-gray-100 rounded-[var(--radius-card)] hidden sm:block" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contentList.map((item) => (
              <div key={item.activity.id}>
                {item.type === 'topic' ? (
                  <TopicCard topic={item.data} />
                ) : (
                  <VideoCard video={item.data} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-center sm:hidden">
          <Link
            to="/history"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
          >
            ประวัติทั้งหมด <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
