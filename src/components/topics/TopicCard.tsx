import { Link } from 'react-router-dom';
import type { Topic } from '../../types/topic';
import { StatusBadge } from '../common/StatusBadge';
import { ChevronRight, BookOpen } from 'lucide-react';

const levelLabel: Record<string, string> = {
  beginner: 'ผู้เริ่มต้น',
  intermediate: 'ระดับกลาง',
  advanced: 'ขั้นสูง',
};

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      to={`/topics/${topic.slug}`}
      className="group block bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none"
      aria-label={`อ่านเรื่อง ${topic.title}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-[var(--color-text-muted)] bg-gray-100 px-2 py-0.5 rounded">
          {levelLabel[topic.level] ?? topic.level}
        </span>
        <StatusBadge status={topic.status} />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[var(--color-text-main)] leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
        {topic.title}
      </h3>

      {/* Short Answer */}
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-3">
        {topic.shortAnswer}
      </p>

      {/* Tags */}
      {topic.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {topic.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-text-muted)] bg-[var(--color-background)] px-2 py-0.5 rounded border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Read more */}
      <div className="flex items-center gap-1 text-sm text-[var(--color-primary)] font-medium">
        <BookOpen size={14} />
        <span>อ่านเพิ่มเติม</span>
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </div>
    </Link>
  );
}
