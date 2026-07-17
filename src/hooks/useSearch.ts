import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import type { Topic } from '../types/topic';

interface SearchResult {
  item: Topic;
  score?: number;
}

/**
 * useSearch — Custom hook สำหรับค้นหา Topics ด้วย Fuse.js
 * รองรับการค้นหาภาษาไทยด้วย keyword matching
 */
export function useSearch(topics: Topic[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(topics, {
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
    [topics]
  );

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    return fuse.search(query.trim());
  }, [fuse, query]);

  return { query, setQuery, results };
}
