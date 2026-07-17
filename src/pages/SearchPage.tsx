import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { topics } from '../data/topics';
import { TopicCard } from '../components/topics/TopicCard';
import { Search, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

const EXAMPLE_QUERIES = [
  'ง่วง', 'ฟุ้งซ่าน', 'ปวดขา', 'วางใจ', 'นึกภาพไม่ออก', 'สมาธิ',
];

export function SearchPage() {
  usePageSEO({
    title: 'ค้นหา',
    description:
      'ค้นหาหัวข้อสมาธิด้วยภาษาธรรมชาติ เช่น นั่งแล้วง่วงทำอย่างไร ใจฟุ้งซ่าน วางใจอย่างไร — YudNing',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const { query, setQuery, results } = useSearch(topics);

  // Sync URL param → search state
  useEffect(() => {
    if (urlQuery) setQuery(urlQuery);
  }, [urlQuery, setQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-2">
            ค้นหา
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            ค้นหาด้วยภาษาธรรมชาติ เช่น "นั่งแล้วง่วงทำอย่างไร" หรือ "วิธีวางใจ"
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8" role="search">
          <label htmlFor="search-input" className="sr-only">
            ค้นหาหัวข้อสมาธิ
          </label>
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="พิมพ์คำถามหรือปัญหาที่กำลังเจอ..."
              className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-card)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] shadow-[var(--shadow-card)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)] transition-all duration-200"
              autoFocus
            />
          </div>
        </form>

        {/* Results */}
        {query.trim() ? (
          results.length > 0 ? (
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                พบ <strong>{results.length}</strong> ผลลัพธ์สำหรับ "
                <strong className="text-[var(--color-text-main)]">{query}</strong>"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(({ item }) => (
                  <TopicCard key={item.id} topic={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
              <p className="font-medium text-[var(--color-text-main)] mb-1">
                ไม่พบผลลัพธ์สำหรับ "{query}"
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                ลองใช้คำอื่น หรือเลือกจากตัวอย่างด้านล่าง
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {EXAMPLE_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-sm text-[var(--color-primary)] bg-[var(--color-primary-soft)] border border-[#C8DDD9] px-3 py-1.5 rounded-full hover:bg-[#C8DDD9] transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            {/* Example queries */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
                ตัวอย่างคำค้นหา
              </h2>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] px-3 py-1.5 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse all */}
            <div className="text-center pt-4">
              <Link
                to="/topics"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
              >
                หรือสำรวจหัวข้อทั้งหมด
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
