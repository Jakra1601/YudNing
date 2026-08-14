import { Link } from 'react-router-dom';
import { Home, Search, BookOpen } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import yudningLogo from '../assets/branding/yudning-logo-main.png';

export function NotFoundPage() {
  usePageSEO({
    title: 'ไม่พบหน้านี้ (404)',
    description: 'ไม่พบหน้าที่คุณกำลังมองหา ลองกลับไปยังหน้าแรกหรือค้นหาหัวข้อสมาธิที่ YudNing',
  });
  return (
    <main id="main-content" className="py-20 sm:py-28">
      <div className="container-content text-center">
        <img
          src={yudningLogo}
          alt=""
          aria-hidden="true"
          className="w-20 h-20 object-contain mx-auto mb-6"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
          ไม่พบหน้านี้
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-sm mx-auto leading-relaxed mb-8">
          หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือ URL อาจไม่ถูกต้อง
          ไม่ต้องกังวล เราช่วยพาคุณกลับได้เลย
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2.5 rounded-[var(--radius-btn)] font-medium transition-colors duration-200"
          >
            <Home size={16} />
            หน้าแรก
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] px-5 py-2.5 rounded-[var(--radius-btn)] font-medium transition-colors duration-200"
          >
            <Search size={16} />
            ค้นหา
          </Link>
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] px-5 py-2.5 rounded-[var(--radius-btn)] font-medium transition-colors duration-200"
          >
            <BookOpen size={16} />
            หัวข้อทั้งหมด
          </Link>
        </div>
      </div>
    </main>
  );
}
