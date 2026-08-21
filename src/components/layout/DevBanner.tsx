import { useTranslation, Trans } from 'react-i18next';
import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

const BANNER_KEY = 'yudning_dev_banner_closed';

/**
 * DevBanner — แสดงข้อความแจ้งสถานะการพัฒนาเว็บไซต์
 * ผู้ใช้งานสามารถปิดได้ โดยเก็บสถานะใน sessionStorage
 */
export function DevBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem(BANNER_KEY);
    if (!closed) setVisible(true);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(BANNER_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="banner"
      aria-label={t('devBanner.ariaLabel', 'แจ้งสถานะการพัฒนา')}
      className="bg-[var(--color-primary-soft)] border-b border-[#C8DDD9] animate-fade-in"
    >
      <div className="container-wide py-2.5 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 text-sm text-[var(--color-primary)]">
          <Info size={15} className="shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p>
            <Trans i18nKey="devBanner.message" components={[<strong key="0" />]}>
              <strong key="0">เว็บไซต์อยู่ระหว่างการพัฒนา ขณะนี้กำลังทยอยเพิ่มเนื้อหาจากช่อง YouTube "ธรรมะ โฆษก" ทุกข้อมูลจะได้รับการตรวจสอบจากวิดีโอต้นฉบับก่อนเผยแพร่ เพื่อให้ข้อมูลถูกต้องและน่าเชื่อถือที่สุด</strong> เนื้อหาบางส่วนอาจยังไม่ครบถ้วน และหัวข้อที่ยังไม่ผ่านการตรวจสอบจากวิดีโอต้นฉบับจะแสดงสถานะไว้อย่างชัดเจน
            </Trans>
          </p>
        </div>
        <button
          onClick={handleClose}
          aria-label={t('devBanner.closeAria', 'ปิดการแจ้งเตือน')}
          className="shrink-0 p-1 rounded text-[var(--color-primary)] hover:bg-[#C8DDD9] transition-colors duration-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
