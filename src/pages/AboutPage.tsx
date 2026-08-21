import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ExternalLink, Youtube, Shield, BookOpen } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

export function AboutPage() {
  const { t } = useTranslation();

  usePageSEO({
    title: t('aboutPage.seoTitle'),
    description: t('aboutPage.seoDescription'),
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            {t('aboutPage.breadcrumb', 'เกี่ยวกับ YudNing')}
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
                {t('aboutPage.whatIsYudning', 'YudNing คืออะไร')}
              </h2>
            </div>
            <div className="space-y-3 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                <Trans i18nKey="aboutPage.desc1_1" components={[<strong key="0" className="text-[var(--color-text-main)]" />]}>
                  <strong key="0" className="text-[var(--color-text-main)]">YudNing (หยุดนิ่ง)</strong> is a space for learning meditation,
                </Trans>{' '}
                {t('aboutPage.desc1_2', 'believing that peace is something everyone can start with.')}
              </p>
              <p>
                {t('aboutPage.desc2_1', 'This website collects and organizes information from the YouTube channel')}{' '}
                <Trans i18nKey="aboutPage.desc2_2" components={[<strong key="0" className="text-[var(--color-text-main)]" />]}>
                  <strong key="0" className="text-[var(--color-text-main)]">ธรรมะ โฆษก</strong>
                </Trans>{' '}
                {t('aboutPage.desc2_3', 'so users can find answers, study topics,')}
                {' '}{t('aboutPage.desc2_4', 'and conveniently revisit original content.')}
              </p>
              <p>
                {t('aboutPage.desc3_1', 'YudNing is not a meditation teaching website, but a')}{' '}
                <Trans i18nKey="aboutPage.desc3_2" components={[<strong key="0" className="text-[var(--color-text-main)]" />]}>
                  <strong key="0" className="text-[var(--color-text-main)]">knowledge repository</strong>
                </Trans>{' '}
                {t('aboutPage.desc3_3', 'that helps users easily search and access original content.')}
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
                {t('aboutPage.dataSource', 'แหล่งข้อมูล')}
              </h2>
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              {t('aboutPage.dataDesc1', 'All content on the website references the YouTube channel')}{' '}
              <Trans i18nKey="aboutPage.dataDesc2" components={[<strong key="0" className="text-[var(--color-text-main)]" />]}>
                <strong key="0" className="text-[var(--color-text-main)]">ธรรมะ โฆษก</strong> as its single source,
              </Trans>{' '}
              {t('aboutPage.dataDesc3', 'to ensure consistent direction and verifiable origins,')}
              {' '}{t('aboutPage.dataDesc4', 'avoiding confusion from multiple sources.')}
            </p>
            <a
              href="https://www.youtube.com/@dhammakhosok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200"
            >
              <Youtube size={15} />
              {t('aboutPage.channelName', 'ช่อง YouTube: ธรรมะ โฆษก')}
              <ExternalLink size={13} />
            </a>
          </div>
        </section>

        {/* Dev Status */}
        <section aria-labelledby="status-heading" className="mb-10">
          <div className="bg-amber-50 rounded-[var(--radius-card)] border border-amber-200 p-6">
            <h2 id="status-heading" className="text-base font-semibold text-amber-800 mb-2">
              {t('aboutPage.devStatus', 'สถานะการพัฒนา')}
            </h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              {t('aboutPage.devDesc1', 'The website is in early development (Version 1.0). Some topics may still be placeholder data')}
              {' '}{t('aboutPage.devDesc2', 'and will be replaced with actual content once verified against original videos.')}
            </p>
            <p className="text-sm text-amber-700 mt-2">
              {t('aboutPage.devDesc3', 'Unverified topics will clearly display the label')}{' '}
              <Trans i18nKey="aboutPage.devDesc4" components={[<strong key="0" />]}>
                <strong key="0">"⚠ Placeholder Data"</strong>.
              </Trans>
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
                {t('aboutPage.terms', 'ข้อกำหนดและการอ้างอิง')}
              </h2>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              <p>
                {t('aboutPage.terms1', 'This website was created to compile and improve access to content.')}
                {' '}{t('aboutPage.terms2', 'Original content and video rights belong to the owner of the YouTube channel ธรรมะ โฆษก.')}
              </p>
              <p>
                {t('aboutPage.terms3', 'YudNing is not the official website of the channel and is not endorsed by the channel owner.')}
              </p>
              <p>
                {t('aboutPage.terms4', 'All references on the website clearly cite their sources,')}
                {' '}{t('aboutPage.terms5', 'and users can easily return to the original content for every topic.')}
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
            {t('aboutPage.backToHome', 'กลับหน้าแรก')}
          </Link>
        </div>
      </div>
    </main>
  );
}
