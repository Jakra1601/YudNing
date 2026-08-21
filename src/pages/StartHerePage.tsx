import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageSEO } from '../hooks/usePageSEO';
import { topics } from '../data/topics';
import { getLocalizedTopic } from '../i18n/contentResolver';

const stepsData = [
  {
    number: 1,
    titleKey: 'startHere.p1Title',
    descKey: 'startHere.p1Desc',
    topicSlugs: ['what-is-meditation'],
  },
  {
    number: 2,
    titleKey: 'startHere.p2Title',
    descKey: 'startHere.p2Desc',
    topicSlugs: ['sitting-posture', 'body-relaxation'],
  },
  {
    number: 3,
    titleKey: 'startHere.p3Title',
    descKey: 'startHere.p3Desc',
    topicSlugs: ['how-to-place-mind', 'no-expectations'],
  },
  {
    number: 4,
    titleKey: 'startHere.p4Title',
    descKey: 'startHere.p4Desc',
    topicSlugs: ['drowsy-during-meditation', 'restless-mind', 'leg-pain'],
  },
  {
    number: 5,
    titleKey: 'startHere.p5Title',
    descKey: 'startHere.p5Desc',
    topicSlugs: ['how-long-to-meditate', 'consistent-practice'],
  },
];

export function StartHerePage() {
  const { t, i18n } = useTranslation();

  usePageSEO({
    title: t('start.seoTitle'),
    description: t('start.seoDescription'),
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[var(--color-primary)] tracking-wide mb-2">
            {t('start.eyebrow')}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            {t('start.title')}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            {t('start.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {stepsData.map((step, idx) => (
            <article
              key={step.number}
              className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-4 sm:p-6 shadow-[var(--shadow-card)] animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
              aria-labelledby={`step-${step.number}-title`}
            >
              {/* Step Number */}
              <div className="flex items-start gap-3 sm:gap-4">
                <span
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0"
                  aria-label={t('start.stepLabel', { number: step.number })}
                >
                  {step.number}
                </span>
                <div className="flex-1">
                  <h2
                    id={`step-${step.number}-title`}
                    className="text-base sm:text-lg font-semibold text-[var(--color-text-main)] mb-1.5"
                  >
                    {t(step.titleKey)}
                  </h2>
                  <p className="text-[13px] sm:text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    {t(step.descKey)}
                  </p>

                  {/* Related Topics */}
                  <div className="space-y-2">
                    {step.topicSlugs.map((slug) => {
                      const sourceTopic = topics.find((t) => t.slug === slug);
                      if (!sourceTopic) return null;
                      const localizedTopic = getLocalizedTopic(sourceTopic, i18n.language);
                      
                      return (
                        <Link
                          key={slug}
                          to={`/topics/${slug}`}
                          className="flex items-center gap-2 text-[13px] sm:text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
                        >
                          <CheckCircle
                            size={15}
                            className="text-[var(--color-primary-soft)] [&>circle]:fill-[var(--color-primary)] [&>path]:stroke-white shrink-0"
                          />
                          <span className="underline-offset-2 group-hover:underline">
                            {localizedTopic.title}
                          </span>
                          <ChevronRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform duration-200"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Continue to Learn */}
        <div className="mt-10 text-center bg-[var(--color-primary-soft)] rounded-[var(--radius-card)] p-8">
          <h2 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
            {t('start.readyTitle')}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {t('start.readyDesc')}
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 sm:px-6 py-3 rounded-[var(--radius-btn)] font-medium transition-colors duration-200 whitespace-nowrap text-[15px] sm:text-base"
          >
            {t('start.exploreLearn')}
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
