import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Sprout, ChevronRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { topics } from '../data/topics';
import { categories } from '../data/categories';
import { TopicCard } from '../components/topics/TopicCard';
import { ContinueLearningSection } from '../components/learning/ContinueLearningSection';
import { usePageSEO } from '../hooks/usePageSEO';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { SearchAutocompleteDropdown } from '../components/search/SearchAutocompleteDropdown';
import { useEffect } from 'react';

const FEATURED_TOPIC_IDS = [
  'topic-01', 'topic-02', 'topic-06', 'topic-07', 'topic-05', 'topic-08',
];

const EXAMPLE_QUERIES = [
  'นั่งแล้วง่วงทำอย่างไร',
  'ใจฟุ้งซ่าน',
  'ควรวางใจตรงไหน',
  'นั่งสมาธิกี่นาที',
  'ปวดขาขณะนั่ง',
  'นึกภาพไม่ออก',
];

export function HomePage() {
  const { t } = useTranslation();
  
  usePageSEO({
    title: t('home.seoTitle'),
    description: t('home.seoDescription'),
  });
  const [query, setQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const suggestions = useSearchSuggestions(query);

  useEffect(() => {
    setSelectedIndex(-1);
    if (query.trim().length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownVisible || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault();
        const suggestion = suggestions[selectedIndex];
        if (suggestion.targetId) {
          navigate(`/topics/${suggestion.targetId}`);
        } else {
          navigate(`/faq`);
        }
        setDropdownVisible(false);
      }
      // If selectedIndex < 0, let it bubble to form submit
    } else if (e.key === 'Escape') {
      setDropdownVisible(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const featuredTopics = FEATURED_TOPIC_IDS
    .map((id) => topics.find((t) => t.id === id))
    .filter(Boolean) as typeof topics;

  return (
    <main id="main-content">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="bg-gradient-to-b from-[var(--color-primary-soft)] to-[var(--color-background)] py-8 sm:py-24"
      >
        <div className="container-content text-center">
          <p className="text-sm font-medium text-[var(--color-primary)] tracking-widest mb-3 uppercase">
            {t('home.eyebrow')}
          </p>
          <h1
            id="hero-heading"
            className="text-[26px] sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] leading-[1.3] sm:leading-tight mb-3 sm:mb-4"
          >
            {t('home.heroTitle')}
          </h1>
          <p className="text-[15px] sm:text-lg text-[var(--color-text-muted)] mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            <Trans i18nKey="home.heroSubtitle" components={[<strong className="text-[var(--color-text-main)]" key="0" />]} />
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mb-5 sm:mb-6"
            role="search"
            aria-label="ค้นหาหัวข้อสมาธิ"
          >
            <label htmlFor="hero-search" className="sr-only">
              {t('home.searchLabel')}
            </label>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                aria-hidden="true"
              />
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (query.trim().length > 0) setDropdownVisible(true);
                }}
                placeholder={t('home.searchPlaceholder')}
                className="w-full pl-12 pr-24 py-4 text-base bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-card)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] shadow-[var(--shadow-card)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)] transition-all duration-200"
                autoComplete="off"
                role="combobox"
                aria-expanded={dropdownVisible}
                aria-controls="search-dropdown-home"
                aria-autocomplete="list"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-[var(--radius-btn)] text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                {t('home.searchButton')}
              </button>
              <SearchAutocompleteDropdown
                id="search-dropdown-home"
                suggestions={suggestions}
                isVisible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
                onSelect={() => {
                  setDropdownVisible(false);
                }}
                selectedIndex={selectedIndex}
                className="text-left"
              />
            </div>
          </form>

          {/* Example queries */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10" aria-label="ตัวอย่างคำค้นหา">
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => navigate(`/search?q=${encodeURIComponent(q)}`)}
                className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] px-3 py-1.5 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/start"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-3 sm:px-6 rounded-[var(--radius-btn)] font-medium transition-colors duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none whitespace-nowrap text-[15px] sm:text-base"
            >
              <Sprout size={18} />
              {t('home.startMeditating')}
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[var(--color-text-main)] px-5 py-3 sm:px-6 rounded-[var(--radius-btn)] font-medium border border-[var(--color-border)] transition-colors duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none whitespace-nowrap text-[15px] sm:text-base"
            >
              <BookOpen size={18} />
              {t('home.exploreAllTopics')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Continue Learning ────────────────────────────────────── */}
      <ContinueLearningSection />

      {/* ─── Featured Topics ──────────────────────────────────────── */}
      <section aria-labelledby="featured-heading" className="py-10 sm:py-14">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h2
                id="featured-heading"
                className="text-[19px] sm:text-2xl font-bold text-[var(--color-text-main)]"
              >
                {t('home.featuredTopics')}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                {t('home.featuredDesc')}
              </p>
            </div>
            <Link
              to="/topics"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
            >
              {t('home.viewAll')}
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>

          <div className="mt-4 text-center sm:hidden">
            <Link
              to="/topics"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
            >
              {t('home.viewAllTopics')} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Beginner Section ────────────────────────────────────── */}
      <section
        aria-labelledby="beginner-heading"
        className="py-10 sm:py-14 bg-white border-y border-[var(--color-border)]"
      >
        <div className="container-content text-center">
          <span className="inline-block text-3xl mb-4" aria-hidden="true">🌱</span>
          <h2
            id="beginner-heading"
            className="text-[19px] sm:text-2xl font-bold text-[var(--color-text-main)] mb-3"
          >
            {t('home.newToMeditation')}
          </h2>
          <p className="text-[15px] sm:text-base text-[var(--color-text-muted)] mb-6 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
            {t('home.newToMeditationDesc')}
          </p>
          <Link
            to="/start"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 sm:px-6 py-3 rounded-[var(--radius-btn)] font-medium transition-colors duration-200 shadow-sm whitespace-nowrap text-[15px] sm:text-base"
          >
            {t('nav.startHere')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Categories ──────────────────────────────────────────── */}
      <section aria-labelledby="categories-heading" className="py-10 sm:py-14">
        <div className="container-wide">
          <h2
            id="categories-heading"
            className="text-[19px] sm:text-2xl font-bold text-[var(--color-text-main)] mb-5 sm:mb-6"
          >
            {t('home.categories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/topics?category=${cat.slug}`}
                className="flex items-center gap-3 bg-white p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none"
              >
                <span
                  className="w-10 h-10 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-200"
                  aria-hidden="true"
                >
                  <BookOpen size={18} />
                </span>
                <div>
                  <p className="font-medium text-[var(--color-text-main)] leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Daily Practice ──────────────────────────────────────── */}
      <section
        aria-labelledby="daily-heading"
        className="py-8 sm:py-10 bg-[var(--color-primary-soft)] border-t border-[#C8DDD9]"
      >
        <div className="container-content text-center">
          <h2
            id="daily-heading"
            className="text-base font-semibold text-[var(--color-primary)] mb-2"
          >
            {t('home.dailyAdviceTitle')}
          </h2>
          <p className="text-[var(--color-text-main)] text-lg">
            {t('home.dailyAdviceMain')}
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {t('home.dailyAdviceSub')}
          </p>
        </div>
      </section>
    </main>
  );
}
