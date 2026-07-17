import { Link } from 'react-router-dom';
import { learningPaths } from '../data/faq';
import { topics } from '../data/topics';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

const levelConfig = {
  beginner: { label: 'ผู้เริ่มต้น', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  intermediate: { label: 'ระดับกลาง', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  advanced: { label: 'ขั้นสูง', color: 'text-purple-700 bg-purple-50 border-purple-200' },
};

export function LearnPage() {
  usePageSEO({
    title: 'เรียนรู้',
    description:
      'เส้นทางการเรียนรู้สมาธิสำหรับทุกระดับ — Beginner Path, Common Problems Path และ Deeper Practice Path จากช่อง YouTube ธรรมะ โฆษก',
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-[var(--color-primary)] tracking-wide mb-2">
            เส้นทางการเรียนรู้
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            เรียนรู้
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            เลือกเส้นทางที่เหมาะกับคุณ แล้วเรียนรู้ไปทีละหัวข้ออย่างเป็นขั้นตอน
          </p>
        </div>

        {/* Learning Paths */}
        <div className="space-y-6">
          {learningPaths.map((path, idx) => {
            const pathTopics = path.topicIds
              .map((id) => topics.find((t) => t.id === id))
              .filter(Boolean) as typeof topics;

            const lvl = levelConfig[path.level];

            return (
              <article
                key={path.id}
                className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)] animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
                aria-labelledby={`path-${path.id}-title`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Layers size={18} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2
                        id={`path-${path.id}-title`}
                        className="font-semibold text-[var(--color-text-main)] text-lg"
                      >
                        {path.title}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${lvl.color}`}>
                        {lvl.label}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                </div>

                {/* Topic list */}
                <ol className="space-y-2 mb-5">
                  {pathTopics.map((topic, tIdx) => (
                    <li key={topic.id}>
                      <Link
                        to={`/topics/${topic.slug}`}
                        className="flex items-center gap-3 text-sm hover:text-[var(--color-primary)] text-[var(--color-text-muted)] group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
                      >
                        <span className="w-6 h-6 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-xs font-medium flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary-soft)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                          {tIdx + 1}
                        </span>
                        <span className="group-hover:underline underline-offset-2">
                          {topic.title}
                        </span>
                        <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ol>

                <Link
                  to={`/topics/${pathTopics[0]?.slug ?? ''}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
                >
                  <BookOpen size={15} />
                  เริ่มต้นเส้นทางนี้
                  <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Browse all topics */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)] mb-3">
            หรือสำรวจหัวข้อทั้งหมดตามหมวดหมู่
          </p>
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-main)] hover:text-[var(--color-primary)] px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200"
          >
            หัวข้อทั้งหมด
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
