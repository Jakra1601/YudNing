import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faq';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageSEO } from '../hooks/usePageSEO';

import { getLocalizedFAQ } from '../i18n/contentResolver';

import { topics } from '../data/topics';

interface FAQItemProps {
  faq: typeof faqs[0];
}

function FAQItem({ faq: sourceFAQ }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const faq = getLocalizedFAQ(sourceFAQ, i18n.language);
  const relatedTopic = faq.relatedTopicId ? topics.find(t => t.id === faq.relatedTopicId) : null;
  const targetSlug = relatedTopic?.slug;

  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full flex items-center justify-between gap-3 p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none"
      >
        <span className="font-medium text-[var(--color-text-main)] leading-snug">
          {faq.question === 'ทำไมบางวันใจสงบแต่บางวันไม่สงบ' ? (
            <>
              <span className="block sm:inline">ทำไมบางวันใจสงบ</span>{' '}
              <span className="block sm:inline">แต่บางวันไม่สงบ</span>
            </>
          ) : (
            faq.question
          )}
        </span>
        {open
          ? <ChevronUp size={18} className="text-[var(--color-primary)] shrink-0" />
          : <ChevronDown size={18} className="text-[var(--color-text-muted)] shrink-0" />}
      </button>

      {open && (
        <div
          id={`faq-answer-${faq.id}`}
          className="px-5 pb-5 bg-white border-t border-[var(--color-border)] animate-fade-in"
        >
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-3 mb-3">
            {faq.shortAnswer}
          </p>
          {targetSlug && (
            <Link
              to={`/topics/${targetSlug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
            >
              {t('faq.readMore')}
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  const { t } = useTranslation();

  usePageSEO({
    title: t('faq.seoTitle'),
    description: t('faq.seoDescription'),
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            {t('faq.title')}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3" role="list">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>

        {/* More questions */}
        <div className="mt-10 text-center bg-[var(--color-primary-soft)] rounded-[var(--radius-card)] p-8">
          <h2 className="text-base font-semibold text-[var(--color-text-main)] mb-2">
            {t('faq.moreQuestions')}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            <span className="block sm:inline">{t('faq.searchTopics1')}</span>{' '}
            <span className="block sm:inline">{t('faq.searchTopics2')}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-4 py-2 rounded-[var(--radius-btn)] text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
            >
              {t('common.search')}
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center gap-1.5 bg-white border border-[var(--color-border)] text-[var(--color-text-main)] px-4 py-2 rounded-[var(--radius-btn)] text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              {t('nav.topics')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
