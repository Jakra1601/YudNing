export type TopicLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * status field — สถานะการตรวจสอบข้อมูล
 * - placeholder: ข้อมูลตัวอย่างสำหรับทดสอบการแสดงผล ยังไม่มีเนื้อหาจริง
 * - draft: มีเนื้อหาแล้วแต่ยังไม่ผ่านการตรวจสอบจากวิดีโอต้นฉบับ
 * - verified: เนื้อหาตรวจสอบกับวิดีโอจากช่อง YouTube ธรรมะ โฆษก ครบถ้วนแล้ว
 */
export type TopicStatus = 'placeholder' | 'draft' | 'verified';

export interface Topic {
  id: string;
  slug: string;
  title: string;
  shortAnswer: string;
  description: string;
  categoryId: string;
  level: TopicLevel;
  status: TopicStatus;
  keyPoints: string[];
  practicalSteps: string[];
  relatedVideoIds: string[];
  relatedTopicIds: string[];
  relatedQuestions: string[];
  tags: string[];
  searchKeywords: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
