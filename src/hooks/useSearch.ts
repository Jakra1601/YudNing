import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import type { Topic } from '../types/topic';
import { useTranslation } from 'react-i18next';
import { getLocalizedTopic } from '../i18n/contentResolver';

interface SearchResult {
  item: Topic;
  score?: number;
}

/**
 * useSearch — Custom hook สำหรับค้นหา Topics ด้วย Fuse.js
 * รองรับการค้นหาภาษาไทยและภาษาอื่นๆ ด้วย keyword matching
 */
export function useSearch(topics: Topic[]) {
  const [query, setQuery] = useState('');
  const { i18n } = useTranslation();

  const localizedTopics = useMemo(() => {
    return topics.map(t => getLocalizedTopic(t, i18n.language));
  }, [topics, i18n.language]);

  const fuse = useMemo(
    () =>
      new Fuse(localizedTopics, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'shortAnswer', weight: 1.5 },
          { name: 'searchKeywords', weight: 2 },
          { name: 'tags', weight: 1.5 },
          { name: 'description', weight: 1 },
          { name: 'keyPoints', weight: 1 },
          { name: 'relatedQuestions', weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 1,
      }),
    [localizedTopics]
  );

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    return fuse.search(query.trim());
  }, [fuse, query]);

  return { query, setQuery, results };
}
