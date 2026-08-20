import { useState, useMemo } from 'react';
import { topics } from '../data/topics';
import { categories } from '../data/categories';
import { videos } from '../data/videos';
import { TopicCard } from '../components/topics/TopicCard';
import { VideoCard } from '../components/videos/VideoCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { EmptyState } from '../components/common/EmptyState';

export function LibraryPage() {
  usePageSEO({
    title: 'คลังสมาธิ',
    description:
      'คลังสมาธิ — รวบรวมหัวข้อและวิดีโอทั้งหมดจากช่อง YouTube ธรรมะ โฆษก ค้นหา กรอง และเรียนรู้ได้ด้วยตัวเอง',
  });
  const [tab, setTab] = useState<'topics' | 'videos'>('topics');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const catMatch = categoryFilter === 'all' || (() => {
        const cat = categories.find((c) => c.slug === categoryFilter);
        return cat ? t.categoryId === cat.id : true;
      })();
      const lvlMatch = levelFilter === 'all' || t.level === levelFilter;
      return catMatch && lvlMatch;
    });
  }, [categoryFilter, levelFilter]);

  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-2">
            คลังสมาธิ
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            หัวข้อและวิดีโอทั้งหมดจากช่อง YouTube ธรรมะ โฆษก
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[var(--color-border)] overflow-x-auto whitespace-nowrap hide-scrollbar">
          {[
            { key: 'topics', label: `หัวข้อ (${topics.length})` },
            { key: 'videos', label: `วิดีโอ (${videos.filter(v => v.youtubeId !== 'PLACEHOLDER_ID').length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'topics' | 'videos')}
              aria-selected={tab === t.key}
              role="tab"
              className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] ${
                tab === t.key
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters (Topics only) */}
        {tab === 'topics' && (
          <div className="flex flex-wrap gap-3 mb-6" aria-label="ตัวกรอง">
            {/* Category */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[var(--color-text-muted)]" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm border border-[var(--color-border)] rounded-[var(--radius-btn)] px-3 py-1.5 bg-white text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
                aria-label="กรองตามหมวดหมู่"
              >
                <option value="all">ทุกหมวดหมู่</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-sm border border-[var(--color-border)] rounded-[var(--radius-btn)] px-3 py-1.5 bg-white text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
              aria-label="กรองตามระดับ"
            >
              <option value="all">ทุกระดับ</option>
              <option value="beginner">ผู้เริ่มต้น</option>
              <option value="intermediate">ระดับกลาง</option>
              <option value="advanced">ขั้นสูง</option>
            </select>

            {/* Result count */}
            <span className="text-sm text-[var(--color-text-muted)] flex items-center">
              {filteredTopics.length} หัวข้อ
            </span>
          </div>
        )}

        {/* Content */}
        {tab === 'topics' ? (
          filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search size={40} />}
              title="ไม่พบหัวข้อที่ตรงกับตัวกรอง"
              description="ลองเปลี่ยนตัวกรองหมวดหมู่หรือระดับ"
              size="compact"
            />
          )
        ) : (
          <div>
            <div className="bg-[var(--color-primary-soft)] border border-[#C8DDD9] rounded-[var(--radius-card)] p-5 mb-6">
              <p className="text-sm text-[var(--color-primary)] font-medium">
                🎬 วิดีโอในคลังจะถูกเพิ่มเมื่อผ่านการตรวจสอบกับช่อง YouTube "ธรรมะ โฆษก" แล้ว
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
