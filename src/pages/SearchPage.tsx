import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { topics } from '../data/topics';
import { TopicCard } from '../components/topics/TopicCard';
import { Search, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { usePageSEO } from '../hooks/usePageSEO';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { SearchAutocompleteDropdown } from '../components/search/SearchAutocompleteDropdown';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';



export function SearchPage() {
  const { t } = useTranslation();

  usePageSEO({
    title: t('searchPage.seoTitle'),
    description: t('searchPage.seoDescription'),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const { query, setQuery, results } = useSearch(topics);

  // Sync URL param → search state
  useEffect(() => {
    if (urlQuery) setQuery(urlQuery);
  }, [urlQuery, setQuery]);

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
    } else if (e.key === 'Escape') {
      setDropdownVisible(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-2">
            {t('searchPage.title')}
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            {t('searchPage.subtitle')}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8" role="search">
          <label htmlFor="search-input" className="sr-only">
            {t('searchPage.searchLabel')}
          </label>
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.trim().length > 0) setDropdownVisible(true);
              }}
              placeholder={t('searchPage.placeholder')}
              className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-card)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] shadow-[var(--shadow-card)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)] transition-all duration-200"
              autoFocus
              autoComplete="off"
              role="combobox"
              aria-expanded={dropdownVisible}
              aria-controls="search-dropdown-page"
              aria-autocomplete="list"
            />
            <SearchAutocompleteDropdown
              id="search-dropdown-page"
              suggestions={suggestions}
              isVisible={dropdownVisible}
              onClose={() => setDropdownVisible(false)}
              onSelect={() => {
                setDropdownVisible(false);
              }}
              selectedIndex={selectedIndex}
            />
          </div>
        </form>

        {/* Results */}
        {query.trim() ? (
          results.length > 0 ? (
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                <Trans 
                  i18nKey="searchPage.foundResults" 
                  values={{ count: results.length, query }}
                  components={[<strong key="0" />, <strong className="text-[var(--color-text-main)]" key="1" />]} 
                />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(({ item }) => (
                  <TopicCard key={item.id} topic={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
              <p className="font-medium text-[var(--color-text-main)] mb-1">
                {t('searchPage.noResults', { query })}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                {t('searchPage.tryDifferent')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {(t('searchPage.exampleQueriesList', { returnObjects: true }) as string[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-sm text-[var(--color-primary)] bg-[var(--color-primary-soft)] border border-[#C8DDD9] px-3 py-1.5 rounded-full hover:bg-[#C8DDD9] transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            {/* Example queries */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
                {t('searchPage.exampleQueries')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(t('searchPage.exampleQueriesList', { returnObjects: true }) as string[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] px-3 py-1.5 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse all */}
            <div className="text-center pt-4">
              <Link
                to="/topics"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
              >
                {t('searchPage.orExploreAll')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
