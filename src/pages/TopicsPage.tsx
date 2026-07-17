import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { topics } from '../data/topics';
import { categories } from '../data/categories';
import { TopicCard } from '../components/topics/TopicCard';
import { BookOpen } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { EmptyState } from '../components/common/EmptyState';

export function TopicsPage() {
  usePageSEO({
    title: 'หัวข้อทั้งหมด',
    description:
      'สำรวจหัวข้อสมาธิทั้งหมด จัดหมวดหมู่ตามปัญหาและประสบการณ์ — เรียบเรียงจากช่อง YouTube ธรรมะ โฆษก',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'all';

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return topics;
    return topics.filter((t) => {
      const cat = categories.find((c) => c.slug === activeCategory);
      return cat ? t.categoryId === cat.id : true;
    });
  }, [activeCategory]);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-2">
            หัวข้อทั้งหมด
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {topics.length} หัวข้อ · เรียบเรียงจากช่อง YouTube ธรรมะ โฆษก
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="กรองตามหมวดหมู่"
        >
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none ${
              activeCategory === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
            }`}
          >
            ทั้งหมด ({topics.length})
          </button>
          {categories.map((cat) => {
            const count = topics.filter((t) => t.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none ${
                  activeCategory === cat.slug
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Topics Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen size={40} />}
            title="ยังไม่มีหัวข้อในหมวดนี้"
            description="ลองเลือกหมวดหมู่อื่น หรือดูหัวข้อทั้งหมด"
          />
        )}
      </div>
    </main>
  );
}
