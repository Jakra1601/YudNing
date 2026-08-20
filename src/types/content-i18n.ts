import type { TopicStatus } from './topic';

export interface TopicTranslation {
  title?: string;
  shortAnswer?: string;
  description?: string;
  keyPoints?: string[];
  practicalSteps?: string[];
  relatedQuestions?: string[];
  status?: TopicStatus;
}

export interface FAQTranslation {
  question?: string;
  shortAnswer?: string;
  fullAnswer?: string;
}

export interface VideoTimestampTranslation {
  label?: string;
  summary?: string;
}

export interface VideoTranslation {
  title?: string;
  description?: string;
  timestamps?: Record<string, VideoTimestampTranslation>;
}
