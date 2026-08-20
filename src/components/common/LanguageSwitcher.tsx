import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(newLang);
  };

  if (isMobile) {
    return (
      <button
        onClick={toggleLanguage}
        className="w-full flex items-center justify-between px-4 py-3 mt-1 border-t border-[var(--color-border)] text-sm font-medium text-[var(--color-text-main)] hover:bg-gray-50 transition-colors"
        aria-label="เปลี่ยนภาษา / Change Language"
      >
        <span>Language / ภาษา</span>
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-background)] rounded-full border border-[var(--color-border)]">
          <span className={i18n.language === 'th' ? 'font-bold text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}>TH</span>
          <span className="text-[var(--color-border)] text-xs">|</span>
          <span className={i18n.language === 'en' ? 'font-bold text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}>EN</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-btn)] border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-background)] text-[13px] font-medium text-[var(--color-text-main)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      aria-label="เปลี่ยนภาษา / Change Language"
      title="Switch Language"
    >
      <span className={i18n.language === 'th' ? 'font-bold' : 'text-[var(--color-text-muted)]'}>TH</span>
      <span className="text-[var(--color-border)]">|</span>
      <span className={i18n.language === 'en' ? 'font-bold' : 'text-[var(--color-text-muted)]'}>EN</span>
    </button>
  );
}
