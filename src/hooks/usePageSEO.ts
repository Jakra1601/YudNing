import { useEffect } from 'react';

interface PageSEOOptions {
  /** Title ของหน้า — จะถูก append ด้วย " | YudNing" โดยอัตโนมัติ */
  title: string;
  /** Meta description ของหน้า */
  description?: string;
}

const SITE_NAME = 'YudNing';
const DEFAULT_DESCRIPTION =
  'YudNing — คลังความรู้เรื่องการนั่งสมาธิ รวบรวมจากช่อง YouTube ธรรมะ โฆษก ค้นหาคำตอบ อ่านบทสรุป และเชื่อมไปยังวิดีโอต้นฉบับได้ทุกหัวข้อ';

/**
 * usePageSEO
 * Hook สำหรับตั้งค่า document.title และ meta description ของแต่ละหน้า
 * ไม่ต้องพึ่ง react-helmet-async — ทำงานผ่าน DOM โดยตรง
 */
export function usePageSEO({ title, description }: PageSEOOptions): void {
  useEffect(() => {
    // Set document title
    document.title = `${title} | ${SITE_NAME}`;

    // Set meta description
    const desc = description ?? DEFAULT_DESCRIPTION;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', desc);
      document.head.appendChild(metaDesc);
    }

    // Set og:title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} | ${SITE_NAME}`);
    }

    // Set og:description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }

    // Restore defaults on unmount
    return () => {
      document.title = `${SITE_NAME} — Stillness for Everyone`;
    };
  }, [title, description]);
}
