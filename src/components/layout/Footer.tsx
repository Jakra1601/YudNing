import { Link } from 'react-router-dom';
import { Leaf, ExternalLink, Youtube } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-auto">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
              <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white">
                <Leaf size={16} />
              </span>
              <div className="leading-none">
                <span className="block font-bold text-[var(--color-text-main)] font-sans">YudNing</span>
                <span className="block text-xs text-[var(--color-text-muted)]">Stillness for Everyone</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
              คลังความรู้เรื่องการนั่งสมาธิ รวบรวมและเรียบเรียงจากช่อง YouTube{' '}
              <strong className="text-[var(--color-text-main)]">ธรรมะ โฆษก</strong>
            </p>
            <a
              href="https://www.youtube.com/@dhammakhosok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
            >
              <Youtube size={15} />
              ช่อง YouTube ต้นฉบับ
              <ExternalLink size={12} />
            </a>
          </div>

          {/* สำรวจ */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-3">สำรวจ</h3>
            <ul className="space-y-2">
              {[
                { to: '/start', label: 'เริ่มต้นที่นี่' },
                { to: '/learn', label: 'เรียนรู้' },
                { to: '/topics', label: 'หัวข้อทั้งหมด' },
                { to: '/library', label: 'คลังสมาธิ' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ข้อมูล */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-3">ข้อมูล</h3>
            <ul className="space-y-2">
              {[
                { to: '/faq', label: 'คำถามที่พบบ่อย' },
                { to: '/about', label: 'เกี่ยวกับเรา' },
                { to: '/search', label: 'ค้นหา' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            <strong>Disclaimer:</strong> เว็บไซต์นี้จัดทำขึ้นเพื่อรวบรวมและช่วยให้เข้าถึงเนื้อหาได้ง่ายขึ้น
            เนื้อหาต้นฉบับและสิทธิ์ในวิดีโอเป็นของเจ้าของช่อง YouTube ธรรมะ โฆษก
            YudNing ไม่ใช่เว็บไซต์ทางการของช่อง
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            © {year} YudNing — เนื้อหาบางส่วนอยู่ระหว่างการตรวจสอบจากวิดีโอต้นฉบับ
          </p>
        </div>
      </div>
    </footer>
  );
}
