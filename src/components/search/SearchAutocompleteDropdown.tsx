import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchSuggestion } from '../../hooks/useSearchSuggestions';
import { FileText, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchAutocompleteDropdownProps {
  id?: string;
  suggestions: SearchSuggestion[];
  isVisible: boolean;
  onClose: () => void;
  onSelect?: () => void;
  selectedIndex: number;
  className?: string;
}

export function SearchAutocompleteDropdown({
  id,
  suggestions,
  isVisible,
  onClose,
  onSelect,
  selectedIndex,
  className = 'left-0 right-0',
}: SearchAutocompleteDropdownProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Allow mousedown to happen before closing so click events on items trigger first.
      // If we use mousedown, it fires before onClick, effectively cancelling the click.
      // A better approach is to use the setTimeout trick in the parent onBlur, OR 
      // handle click outside carefully. We'll use mousedown but check if the target is inside.
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  if (!isVisible || suggestions.length === 0) return null;

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.targetId) {
      navigate(`/topics/${suggestion.targetId}`);
    } else {
      navigate(`/faq`);
    }
    if (onSelect) onSelect();
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      id={id}
      className={`absolute top-full mt-1 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card-hover)] z-[100] max-h-[60vh] overflow-y-auto ${className}`}
      role="listbox"
    >
      <ul className="py-1">
        {suggestions.map((suggestion, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={`${suggestion.type}-${suggestion.id}`}
              role="option"
              aria-selected={isSelected}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                isSelected ? 'bg-[var(--color-primary-soft)]' : 'hover:bg-gray-50'
              }`}
              onClick={(e) => {
                e.preventDefault(); // prevent input blur issues
                handleSuggestionClick(suggestion);
              }}
              onMouseDown={(e) => e.preventDefault()} // extremely important for preventing blur race condition!
            >
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[var(--color-text-main)] line-clamp-2 md:truncate">
                  {suggestion.title}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-[11px] font-medium text-[var(--color-text-muted)] bg-gray-100 px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                {suggestion.type === 'topic' ? (
                  <>
                    <FileText size={10} />
                    <span>{t('searchPage.typeTopic', 'หัวข้อ')}</span>
                  </>
                ) : (
                  <>
                    <HelpCircle size={10} />
                    <span>{t('searchPage.typeFAQ', 'คำถาม')}</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
