import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedContent } from '../../contexts/SavedContentContext';
import { useTranslation } from 'react-i18next';

interface SaveButtonProps {
  contentId: string;
  contentType: 'topic' | 'video';
  className?: string;
  showLabel?: boolean;
}

export function SaveButton({ contentId, contentType, className = '', showLabel = false }: SaveButtonProps) {
  const { user } = useAuth();
  const { isContentSaved, toggleSave } = useSavedContent();
  const navigate = useNavigate();
  const [isToggling, setIsToggling] = useState(false);
  const { t } = useTranslation();

  const saved = isContentSaved(contentId, contentType);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      const confirmLogin = window.confirm(t('common.loginRequiredToSave', 'คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถบันทึกเนื้อหาได้ ต้องการเข้าสู่ระบบตอนนี้หรือไม่?'));
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleSave(contentId, contentType);
    } catch (error) {
      console.error('[YudNing] Save action failed', error);
      alert(t('common.saveError', 'เกิดข้อผิดพลาดในการบันทึกเนื้อหา กรุณาลองใหม่อีกครั้ง'));
    } finally {
      setIsToggling(false);
    }
  };

  const baseClasses = `inline-flex items-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded ${className}`;
  const colorClasses = saved
    ? 'text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]'
    : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isToggling}
      aria-label={saved ? t('common.unsaveAction', 'ยกเลิกการบันทึก') : t('common.saveAction', 'บันทึกเนื้อหา')}
      className={`${baseClasses} ${colorClasses}`}
      title={saved ? t('common.saved') : t('common.saveAction', 'บันทึกเนื้อหา')}
    >
      {isToggling ? (
        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      ) : (
        <Bookmark
          size={16}
          aria-hidden="true"
          className={saved ? 'fill-current' : 'fill-transparent'}
        />
      )}
      {showLabel && (
        <span className="text-sm font-medium">
          {saved ? t('common.saved') : t('common.save')}
        </span>
      )}
    </button>
  );
}
