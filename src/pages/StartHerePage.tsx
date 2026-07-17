import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

const steps = [
  {
    number: 1,
    title: 'ทำความเข้าใจสมาธิ',
    description: 'เรียนรู้ความหมายของสมาธิ ทำไมจึงควรฝึก และไม่จำเป็นต้องมีประสบการณ์มาก่อน',
    topicIds: [
      { label: 'สมาธิคืออะไร', slug: 'what-is-meditation' },
    ],
  },
  {
    number: 2,
    title: 'เตรียมร่างกาย',
    description: 'เลือกสถานที่ จัดท่านั่ง วางมือ และผ่อนคลายร่างกายก่อนเริ่ม',
    topicIds: [
      { label: 'ท่านั่งสมาธิสำหรับผู้เริ่มต้น', slug: 'sitting-posture' },
      { label: 'วิธีผ่อนคลายร่างกายก่อนนั่ง', slug: 'body-relaxation' },
    ],
  },
  {
    number: 3,
    title: 'เริ่มฝึกใจ',
    description: 'ปล่อยวางความกังวล ทำใจให้สบาย ไม่บังคับใจ และไม่คาดหวังผล',
    topicIds: [
      { label: 'วิธีวางใจเบื้องต้น', slug: 'how-to-place-mind' },
      { label: 'ไม่ควรคาดหวังผลอย่างไร', slug: 'no-expectations' },
    ],
  },
  {
    number: 4,
    title: 'รับมือกับสิ่งที่เกิดขึ้น',
    description: 'เรียนรู้วิธีรับมือกับอาการต่าง ๆ ที่อาจเกิดขึ้นระหว่างนั่ง เช่น ง่วง ฟุ้งซ่าน ปวด',
    topicIds: [
      { label: 'นั่งสมาธิแล้วง่วง', slug: 'drowsy-during-meditation' },
      { label: 'ใจฟุ้งซ่าน ควรทำอย่างไร', slug: 'restless-mind' },
      { label: 'นั่งแล้วปวดขา', slug: 'leg-pain' },
    ],
  },
  {
    number: 5,
    title: 'สร้างความสม่ำเสมอ',
    description: 'เริ่มจากเวลาสั้น ๆ เลือกเวลาที่เหมาะสม ฝึกทุกวัน และไม่เปรียบเทียบกับผู้อื่น',
    topicIds: [
      { label: 'ควรนั่งสมาธิกี่นาที', slug: 'how-long-to-meditate' },
      { label: 'ฝึกสมาธิให้ต่อเนื่องได้อย่างไร', slug: 'consistent-practice' },
    ],
  },
];

export function StartHerePage() {
  usePageSEO({
    title: 'เริ่มต้นที่นี่',
    description:
      'ไม่เคยนั่งสมาธิมาก่อน? เริ่มต้นที่นี่ — คู่มือนั่งสมาธิสำหรับผู้เริ่มต้น 5 ขั้นตอน จากช่อง YouTube ธรรมะ โฆษก',
  });
  return (
    <main id="main-content" className="py-10 sm:py-14">
      <div className="container-content">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[var(--color-primary)] tracking-wide mb-2">
            สำหรับผู้เริ่มต้น
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] mb-3">
            เริ่มต้นที่นี่
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            ไม่รู้ว่าควรเริ่มจากตรงไหน? ไม่เป็นไร เราจัดเนื้อหาเป็นขั้นตอนให้แล้ว
            ค่อย ๆ อ่านและฝึกไปทีละขั้นได้เลยครับ
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <article
              key={step.number}
              className="bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)] animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
              aria-labelledby={`step-${step.number}-title`}
            >
              {/* Step Number */}
              <div className="flex items-start gap-4">
                <span
                  className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0"
                  aria-label={`ขั้นตอนที่ ${step.number}`}
                >
                  {step.number}
                </span>
                <div className="flex-1">
                  <h2
                    id={`step-${step.number}-title`}
                    className="text-lg font-semibold text-[var(--color-text-main)] mb-1.5"
                  >
                    {step.title}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Related Topics */}
                  <div className="space-y-2">
                    {step.topicIds.map((topic) => (
                      <Link
                        key={topic.slug}
                        to={`/topics/${topic.slug}`}
                        className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
                      >
                        <CheckCircle
                          size={15}
                          className="text-[var(--color-primary-soft)] [&>circle]:fill-[var(--color-primary)] [&>path]:stroke-white shrink-0"
                        />
                        <span className="underline-offset-2 group-hover:underline">
                          {topic.label}
                        </span>
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform duration-200"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Continue to Learn */}
        <div className="mt-10 text-center bg-[var(--color-primary-soft)] rounded-[var(--radius-card)] p-8">
          <h2 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">
            พร้อมเรียนรู้ต่อแล้ว?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            เข้าสู่เส้นทางการเรียนรู้ที่ออกแบบมาสำหรับระดับของคุณ
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-[var(--radius-btn)] font-medium transition-colors duration-200"
          >
            สำรวจเส้นทางการเรียนรู้
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
