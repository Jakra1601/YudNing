import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { topics } from '../data/topics';
import { faqs } from '../data/faq';
import { useTranslation } from 'react-i18next';
import { getLocalizedTopic, getLocalizedFAQ } from '../i18n/contentResolver';

export type SuggestionType = 'topic' | 'faq';

export interface SearchSuggestion {
  id: string;
  type: SuggestionType;
  title: string;
  targetId?: string; // For routing, e.g. topic ID
}

export function useSearchSuggestions(query: string, limit = 5) {
  const { i18n } = useTranslation();

  const fuse = useMemo(() => {
    const list: SearchSuggestion[] = [
      ...topics.map(t => {
        const loc = getLocalizedTopic(t, i18n.language);
        return { id: t.id, type: 'topic' as SuggestionType, title: loc.title, targetId: t.slug };
      }),
      ...faqs.map(f => {
        const loc = getLocalizedFAQ(f, i18n.language);
        const relatedTopic = topics.find(t => t.id === f.relatedTopicId);
        return { id: f.id, type: 'faq' as SuggestionType, title: loc.question, targetId: relatedTopic?.slug };
      })
    ];
    return new Fuse(list, {
      keys: ['title'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 1,
    });
  }, [i18n.language]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const uniqueMap = new Map<string, SearchSuggestion>();
    
    // Deduplicate exact same titles
    for (const r of fuse.search(query.trim())) {
      if (!uniqueMap.has(r.item.title)) {
        uniqueMap.set(r.item.title, r.item);
      }
      if (uniqueMap.size >= limit) break;
    }
    return Array.from(uniqueMap.values());
  }, [fuse, query, limit]);

  return suggestions;
}
