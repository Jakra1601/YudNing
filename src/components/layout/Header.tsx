import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { to: '/start', label: 'เริ่มต้นที่นี่' },
  { to: '/learn', label: 'เรียนรู้' },
  { to: '/topics', label: 'หัวข้อทั้งหมด' },
  { to: '/library', label: 'คลังสมาธิ' },
  { to: '/faq', label: 'คำถามที่พบบ่อย' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ปิด mobile menu เมื่อ route เปลี่ยน
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : 'border-b border-[var(--color-border)]'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="YudNing หน้าแรก"
          >
            <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105">
              <Leaf size={16} strokeWidth={2} />
            </span>
            <div className="leading-none">
              <span className="block font-bold text-[var(--color-text-main)] text-lg tracking-tight font-sans">
                YudNing
              </span>
              <span className="block text-[10px] text-[var(--color-text-muted)] tracking-wide">
                Stillness for Everyone
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="เมนูหลัก">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-gray-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 flex-1 max-w-xs"
            role="search"
          >
            <label htmlFor="header-search" className="sr-only">
              ค้นหาหัวข้อสมาธิ
            </label>
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                aria-hidden="true"
              />
              <input
                id="header-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหา..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
              />
            </div>
          </form>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-[var(--color-border)] bg-white animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="เมนูนำทาง"
        >
          <div className="container-wide py-4 flex flex-col gap-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-3" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                ค้นหาหัวข้อสมาธิ
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="mobile-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาหัวข้อสมาธิ..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-main)] hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200 mt-1 border-t border-[var(--color-border)] pt-3 ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`
              }
            >
              เกี่ยวกับเรา
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
