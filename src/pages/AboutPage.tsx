import { Link } from 'react-router-dom';
import { ExternalLink, Youtube, Shield, BookOpen } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

export function AboutPage() {
  usePageSEO({
    title: 'เกี่ยวกับ YudNing',
    description:
      'YudNing — คลังความรู้เรื่องการนั่งสมาธิ รวบรวมและเรียบเรียงข้อมูลจากช่อง YouTube ธรรมะ โฆษก Stillness for Everyone',
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            เกี่ยวกับ YudNing
          </h1>
          <p className="text-lg text-[var(--color-primary)] font-medium">
            Stillness for Everyone
          </p>
        </div>

        {/* About */}
        <section aria-labelledby="about-heading" className="mb-10">
          <div className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3 mb-4">
              <span className="w-10 h-10 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </span>
              <h2 id="about-heading" className="text-lg font-semibold text-[var(--color-text-main)] mt-2">
                YudNing คืออะไร
              </h2>
            </div>
            <div className="space-y-3 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                <strong className="text-[var(--color-text-main)]">YudNing (หยุดนิ่ง)</strong> คือพื้นที่เรียนรู้เรื่องการนั่งสมาธิ
                ที่เชื่อว่าความสงบเป็นสิ่งที่ทุกคนเริ่มต้นได้
              </p>
              <p>
                เว็บไซต์นี้รวบรวมและเรียบเรียงข้อมูลจากช่อง YouTube{' '}
                <strong className="text-[var(--color-text-main)]">ธรรมะ โฆษก</strong>{' '}
                เพื่อให้ผู้ใช้งานค้นหาคำตอบ ศึกษาหัวข้อ
                และกลับไปดูเนื้อหาต้นฉบับได้อย่างสะดวก
              </p>
              <p>
                YudNing ไม่ใช่เว็บไซต์สอนสมาธิ แต่เป็น{' '}
                <strong className="text-[var(--color-text-main)]">คลังความรู้</strong>{' '}
                ที่ช่วยให้ค้นหาและเข้าถึงเนื้อหาต้นฉบับได้ง่ายขึ้น
              </p>
            </div>
          </div>
        </section>

        {/* Source */}
        <section aria-labelledby="source-heading" className="mb-10">
          <div className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3 mb-4">
              <span className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Youtube size={18} />
              </span>
              <h2 id="source-heading" className="text-lg font-semibold text-[var(--color-text-main)] mt-2">
                แหล่งข้อมูล
              </h2>
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              เนื้อหาทั้งหมดในเว็บไซต์อ้างอิงจากช่อง YouTube{' '}
              <strong className="text-[var(--color-text-main)]">ธรรมะ โฆษก</strong> เพียงแหล่งเดียว
              เพื่อให้เนื้อหามีทิศทางเดียวกัน สามารถตรวจสอบที่มาได้
              และไม่เกิดความสับสนจากแหล่งข้อมูลหลายแหล่ง
            </p>
            <a
              href="https://www.youtube.com/@dhammakhosok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200"
            >
              <Youtube size={15} />
              ช่อง YouTube ธรรมะ โฆษก
              <ExternalLink size={13} />
            </a>
          </div>
        </section>

        {/* Dev Status */}
        <section aria-labelledby="status-heading" className="mb-10">
          <div className="bg-amber-50 rounded-[var(--radius-card)] border border-amber-200 p-6">
            <h2 id="status-heading" className="text-base font-semibold text-amber-800 mb-2">
              สถานะการพัฒนา
            </h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              เว็บไซต์อยู่ในช่วงเริ่มต้นพัฒนา (Version 1.0) ข้อมูลบางหัวข้ออาจยังเป็นข้อมูลตัวอย่าง
              และจะถูกแทนที่ด้วยเนื้อหาจริงเมื่อผ่านการตรวจสอบกับวิดีโอต้นฉบับแล้ว
            </p>
            <p className="text-sm text-amber-700 mt-2">
              หัวข้อที่ยังไม่ผ่านการตรวจสอบจะแสดงป้าย{' '}
              <strong>"⚠ ข้อมูลตัวอย่าง"</strong> ไว้อย่างชัดเจน
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section aria-labelledby="disclaimer-heading" className="mb-10">
          <div className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-10 h-10 rounded-lg bg-gray-100 text-[var(--color-text-muted)] flex items-center justify-center shrink-0">
                <Shield size={18} />
              </span>
              <h2 id="disclaimer-heading" className="text-lg font-semibold text-[var(--color-text-main)] mt-2">
                ข้อกำหนดและการอ้างอิง
              </h2>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              <p>
                เว็บไซต์นี้จัดทำขึ้นเพื่อรวบรวมและช่วยให้เข้าถึงเนื้อหาได้ง่ายขึ้น
                เนื้อหาต้นฉบับและสิทธิ์ในวิดีโอเป็นของเจ้าของช่อง YouTube ธรรมะ โฆษก
              </p>
              <p>
                YudNing ไม่ใช่เว็บไซต์ทางการของช่อง และไม่ได้รับการรับรองจากเจ้าของช่อง
              </p>
              <p>
                ทุกการอ้างอิงในเว็บไซต์จะระบุแหล่งที่มาไว้อย่างชัดเจน
                และสามารถกลับไปดูเนื้อหาต้นฉบับได้ทุกหัวข้อ
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-btn)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </main>
  );
}
