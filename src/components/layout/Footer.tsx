import { Link } from 'react-router-dom';
import { ExternalLink, Youtube } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import yudningLogo from '../../assets/branding/yudning-logo-main.png';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-auto">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
              <img
                src={yudningLogo}
                alt=""
                aria-hidden="true"
                className="w-9 h-9 object-contain"
              />
              <div className="leading-none">
                <span className="block font-bold text-[var(--color-text-main)] font-sans">YudNing</span>
                <span className="block text-xs text-[var(--color-text-muted)]">Stillness for Everyone</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
              <Trans i18nKey="footer.brandDesc" components={[<strong className="text-[var(--color-text-main)]" key="0" />]} />
            </p>
            <a
              href="https://www.youtube.com/@dhammakhosok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
            >
              <Youtube size={15} />
              {t('footer.youtubeLink')}
              <ExternalLink size={12} />
            </a>
          </div>

          {/* สำรวจ */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-3">{t('footer.explore')}</h3>
            <ul className="space-y-2">
              {[
                { to: '/start', label: t('nav.startHere') },
                { to: '/learn', label: t('nav.learn') },
                { to: '/topics', label: t('nav.topics') },
                { to: '/library', label: t('nav.library') },
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
            <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-3">{t('footer.info')}</h3>
            <ul className="space-y-2">
              {[
                { to: '/faq', label: t('nav.faq') },
                { to: '/about', label: t('nav.about') },
                { to: '/search', label: t('nav.search') },
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
            <Trans i18nKey="footer.disclaimer" components={[<strong key="0" />]} />
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            {t('footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
