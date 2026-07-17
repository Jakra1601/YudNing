export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
}

export interface FAQ {
  id: string;
  question: string;
  shortAnswer: string;
  fullAnswer?: string;
  relatedTopicId?: string;
  sourceVideoIds: string[];
  tags: string[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topicIds: string[];
}
