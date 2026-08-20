/**
 * Header.tsx — Navigation Header สำหรับ YudNing
 *
 * อัปเดต Session 14 (Version 1.2): เพิ่ม Authentication State
 * - เมื่อยังไม่ Login: แสดงปุ่ม "เข้าสู่ระบบ"
 * - เมื่อ Login แล้ว: แสดง avatar/ชื่อผู้ใช้ + dropdown menu พร้อม Logout
 *
 * รักษา Design เดิมให้มากที่สุด — เพิ่มเฉพาะส่วน Auth ด้านขวาสุด
 */

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, LogIn, LogOut, ChevronDown, Bookmark, History, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import yudningLogo from '../../assets/branding/yudning-logo-main.png';

// navLinks moved inside component for translation

// ─── Helper: ดึง display name จาก user object ─────────────────────────────────

function getUserDisplayName(user: { email?: string; user_metadata?: { full_name?: string; name?: string } } | null): string {
  if (!user) return '';
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'ผู้ใช้'
  );
}

function getUserAvatarUrl(user: { user_metadata?: { avatar_url?: string; picture?: string } } | null): string | null {
  if (!user) return null;
  return user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
}

// ─── UserMenu Component ───────────────────────────────────────────────────────

interface UserMenuProps {
  onClose: () => void;
}

function UserMenu({ onClose }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = getUserDisplayName(user);
  const email = user?.email ?? '';

  // ─── Handle Sign Out ───────────────────────────────────────────────────────

  async function handleSignOut() {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch {
      // signOut ไม่ควร throw ใน normal case — ถ้า error ให้ ignore และ close menu
      onClose();
    }
  }

  // ─── Close on outside click ────────────────────────────────────────────────

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // ─── Close on Escape ──────────────────────────────────────────────────────

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="เมนูผู้ใช้"
      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card-hover)] border border-[var(--color-border)] z-50 animate-fade-in overflow-hidden"
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-sm font-medium text-[var(--color-text-main)] truncate">{displayName}</p>
        {email && (
          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{email}</p>
        )}
      </div>

      {/* Actions */}
      <div className="py-1 border-b border-[var(--color-border)]">
        <Link
          to="/practice"
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition-colors duration-200"
        >
          <Calendar size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
          {t('userMenu.practiceLog')}
        </Link>
        <Link
          to="/history"
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition-colors duration-200"
        >
          <History size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
          {t('userMenu.learningHistory')}
        </Link>
        <Link
          to="/saved"
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition-colors duration-200"
        >
          <Bookmark size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
          {t('userMenu.savedContent')}
        </Link>
      </div>
      <div className="py-1">
        <button
          id="header-btn-signout"
          role="menuitem"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition-colors duration-200 focus-visible:outline-none focus-visible:bg-[var(--color-background)]"
        >
          <LogOut size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
          {t('auth.logout')}
        </button>
      </div>
    </div>
  );
}

// ─── Avatar Component ─────────────────────────────────────────────────────────

interface UserAvatarProps {
  user: { email?: string; user_metadata?: { full_name?: string; name?: string; avatar_url?: string; picture?: string } } | null;
  size?: number;
}

function UserAvatar({ user, size = 32 }: UserAvatarProps) {
  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initial = displayName.charAt(0).toUpperCase() || 'U';

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`รูปโปรไฟล์ของ ${displayName}`}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
        onError={(e) => {
          // Fallback ถ้าโหลดรูปไม่ได้
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-medium text-xs"
    >
      {initial}
    </div>
  );
}

// ─── Main Header Component ────────────────────────────────────────────────────

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { t } = useTranslation();

  const navLinks = [
    { to: '/start', label: t('nav.startHere') },
    { to: '/learn', label: t('nav.learn') },
    { to: '/topics', label: t('nav.topics') },
    { to: '/library', label: t('nav.library') },
    { to: '/faq', label: t('nav.faq') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ปิด mobile menu เมื่อ route เปลี่ยน
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  // ─── Render Auth Section ──────────────────────────────────────────────────

  function renderAuthSection(isMobile = false) {
    // ระหว่างโหลด session: แสดง placeholder เพื่อไม่ให้ layout กระโดด
    if (authLoading) {
      return (
        <div
          className={`${isMobile ? 'w-full h-9' : 'w-24 h-8'} rounded-[var(--radius-btn)] bg-[var(--color-background)] animate-pulse`}
          aria-hidden="true"
        />
      );
    }

    if (user) {
      // ─── Logged In State ───────────────────────────────────────────────────
      if (isMobile) {
        return (
          <div className="border-t border-[var(--color-border)] pt-3 mt-1">
            <div className="flex items-center gap-3 px-4 py-2 mb-1">
              <UserAvatar user={user} size={28} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-main)] truncate">
                  {getUserDisplayName(user)}
                </p>
                {user.email && (
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{user.email}</p>
                )}
              </div>
            </div>
            <Link
              to="/practice"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-text-main)] hover:bg-gray-50 transition-colors rounded-[var(--radius-btn)]"
            >
              <Calendar size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
              {t('userMenu.practiceLog')}
            </Link>
            <Link
              to="/history"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-text-main)] hover:bg-gray-50 transition-colors rounded-[var(--radius-btn)]"
            >
              <History size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
              {t('userMenu.learningHistory')}
            </Link>
            <Link
              to="/saved"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-text-main)] hover:bg-gray-50 transition-colors rounded-[var(--radius-btn)]"
            >
              <Bookmark size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
              {t('userMenu.savedContent')}
            </Link>
            <button
              id="header-mobile-signout"
              onClick={async () => {
                try {
                  await signOut();
                } catch { /* ignore */ }
                setMenuOpen(false);
                navigate('/');
              }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-text-main)] hover:bg-gray-50 transition-colors rounded-[var(--radius-btn)]"
            >
              <LogOut size={15} aria-hidden="true" className="text-[var(--color-text-muted)]" />
              {t('auth.logout')}
            </button>
          </div>
        );
      }

      // Desktop logged-in
      return (
        <div className="relative">
          <button
            id="header-user-menu-btn"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
            aria-label={`เมนูผู้ใช้: ${getUserDisplayName(user)}`}
            className="flex items-center gap-2 px-2 py-1 rounded-[var(--radius-btn)] hover:bg-[var(--color-background)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            <UserAvatar user={user} size={28} />
            <span className="text-sm font-medium text-[var(--color-text-main)] max-w-[120px] truncate hidden xl:block">
              {getUserDisplayName(user)}
            </span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`text-[var(--color-text-muted)] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {userMenuOpen && (
            <UserMenu onClose={() => setUserMenuOpen(false)} />
          )}
        </div>
      );
    }

    // ─── Not Logged In State ─────────────────────────────────────────────────
    if (isMobile) {
      return (
        <div className="border-t border-[var(--color-border)] pt-3 mt-1">
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-[var(--radius-btn)] transition-colors duration-200"
          >
            <LogIn size={15} aria-hidden="true" />
            {t('auth.login')}
          </NavLink>
        </div>
      );
    }

    // Desktop not logged in
    return (
      <NavLink
        id="header-btn-login"
        to="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 shrink-0"
      >
        <LogIn size={14} aria-hidden="true" />
        {t('auth.login')}
      </NavLink>
    );
  }


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
            <img
              src={yudningLogo}
              alt=""
              aria-hidden="true"
              className="w-14 h-14 object-contain transition-transform duration-200 group-hover:scale-105"
            />
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
                placeholder={t('header.searchPlaceholder')}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
              />
            </div>
          </form>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            {renderAuthSection(false)}
          </div>

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
                  placeholder={t('header.searchPlaceholder')}
                  className="w-full pl-9 pr-3 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors duration-200"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200 ${
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
                `px-4 py-3 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200 mt-1 border-t border-[var(--color-border)] pt-3 ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`
              }
            >
              {t('nav.about')}
            </NavLink>

            <LanguageSwitcher isMobile={true} />

            {/* Mobile Auth Section */}
            {renderAuthSection(true)}
          </div>
        </div>
      )}
    </header>
  );
}
