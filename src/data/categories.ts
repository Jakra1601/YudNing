import type { Category } from '../types/category';

export const categories: Category[] = [
  {
    id: 'cat-beginner',
    slug: 'beginner',
    name: 'ผู้เริ่มต้น',
    description: 'สำหรับผู้ที่เพิ่งเริ่มสนใจการนั่งสมาธิ',
    icon: 'Sprout',
  },
  {
    id: 'cat-problems',
    slug: 'problems',
    name: 'ปัญหาระหว่างนั่ง',
    description: 'แนวทางรับมือกับอุปสรรคที่พบระหว่างการฝึก',
    icon: 'HelpCircle',
  },
  {
    id: 'cat-mind',
    slug: 'mind',
    name: 'การวางใจ',
    description: 'วิธีวางใจและรักษาสมาธิอย่างเป็นธรรมชาติ',
    icon: 'Heart',
  },
  {
    id: 'cat-experience',
    slug: 'experience',
    name: 'ประสบการณ์ภายใน',
    description: 'ทำความเข้าใจกับสิ่งที่เกิดขึ้นระหว่างนั่งสมาธิ',
    icon: 'Sparkles',
  },
  {
    id: 'cat-after',
    slug: 'after',
    name: 'หลังนั่งสมาธิ',
    description: 'การดูแลใจและนำความสงบไปใช้ในชีวิตประจำวัน',
    icon: 'Sun',
  },
];
