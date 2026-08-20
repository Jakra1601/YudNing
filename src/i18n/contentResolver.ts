import type { Topic } from '../types/topic';
import type { FAQ } from '../types/category';
import type { Video } from '../types/video';
import { topicsEn } from '../data/i18n/en/topics';
import { faqsEn } from '../data/i18n/en/faq';
import { videosEn } from '../data/i18n/en/videos';

export function getLocalizedTopic(topic: Topic, locale: string): Topic {
  if (locale !== 'en') return topic;
  
  const translation = topicsEn[topic.id];
  if (!translation) return topic;

  return {
    ...topic,
    title: translation.title && translation.title.trim() !== '' ? translation.title : topic.title,
    shortAnswer: translation.shortAnswer && translation.shortAnswer.trim() !== '' ? translation.shortAnswer : topic.shortAnswer,
    description: translation.description && translation.description.trim() !== '' ? translation.description : topic.description,
    keyPoints: translation.keyPoints && translation.keyPoints.length > 0 ? translation.keyPoints : topic.keyPoints,
    practicalSteps: translation.practicalSteps && translation.practicalSteps.length > 0 ? translation.practicalSteps : topic.practicalSteps,
    relatedQuestions: translation.relatedQuestions && translation.relatedQuestions.length > 0 ? translation.relatedQuestions : topic.relatedQuestions,
    status: translation.status || 'draft',
  };
}

export function getLocalizedFAQ(faq: FAQ, locale: string): FAQ {
  if (locale !== 'en') return faq;

  const translation = faqsEn[faq.id];
  if (!translation) return faq;

  return {
    ...faq,
    question: translation.question && translation.question.trim() !== '' ? translation.question : faq.question,
    shortAnswer: translation.shortAnswer && translation.shortAnswer.trim() !== '' ? translation.shortAnswer : faq.shortAnswer,
    fullAnswer: translation.fullAnswer && translation.fullAnswer.trim() !== '' ? translation.fullAnswer : faq.fullAnswer,
  };
}

export function getLocalizedVideo(video: Video, locale: string): Video {
  if (locale !== 'en') return video;

  const translation = videosEn[video.id];
  if (!translation) return video;

  return {
    ...video,
    title: translation.title && translation.title.trim() !== '' ? translation.title : video.title,
    description: translation.description && translation.description.trim() !== '' ? translation.description : video.description,
    timestamps: video.timestamps.map(ts => {
      const tsTranslation = translation.timestamps?.[ts.id];
      if (!tsTranslation) return ts;
      return {
        ...ts,
        label: tsTranslation.label && tsTranslation.label.trim() !== '' ? tsTranslation.label : ts.label,
        summary: tsTranslation.summary && tsTranslation.summary.trim() !== '' ? tsTranslation.summary : ts.summary,
      };
    })
  };
}
