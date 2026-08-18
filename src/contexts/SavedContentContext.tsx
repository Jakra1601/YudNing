import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getSavedContent, saveContent, unsaveContent, SavedContentRow } from '../services/savedContent';

interface SavedContentContextValue {
  savedItems: SavedContentRow[];
  isLoading: boolean;
  isContentSaved: (contentId: string, contentType: 'topic' | 'video') => boolean;
  toggleSave: (contentId: string, contentType: 'topic' | 'video') => Promise<void>;
}

const SavedContentContext = createContext<SavedContentContextValue | null>(null);

export function SavedContentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState<SavedContentRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ดึงข้อมูลเมื่อผู้ใช้เปลี่ยน หรือ login/logout
  useEffect(() => {
    let isMounted = true;

    if (!user) {
      setSavedItems([]); // Reset state on logout
      return;
    }

    async function fetchSavedContent() {
      setIsLoading(true);
      try {
        const data = await getSavedContent(user!.id);
        if (isMounted) {
          setSavedItems(data);
        }
      } catch (error) {
        console.error('[YudNing] Failed to fetch saved content:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSavedContent();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isContentSaved = useCallback(
    (contentId: string, contentType: 'topic' | 'video') => {
      return savedItems.some(
        (item) => item.content_id === contentId && item.content_type === contentType
      );
    },
    [savedItems]
  );

  const toggleSave = useCallback(
    async (contentId: string, contentType: 'topic' | 'video') => {
      if (!user) return; // Guest action should be handled at UI level

      const alreadySaved = isContentSaved(contentId, contentType);

      try {
        if (alreadySaved) {
          // Optimistic UI update could be added here if needed, but per requirements we stick to reliable update.
          // For now, we update state after success or use optimistic. Let's do after success for Version 1.
          await unsaveContent(user.id, contentId, contentType);
          setSavedItems((prev) => 
            prev.filter(item => !(item.content_id === contentId && item.content_type === contentType))
          );
        } else {
          await saveContent(user.id, contentId, contentType);
          // Instead of refetching all, just add a local mock to the state to avoid roundtrip.
          // But since we need created_at to be accurate (and id), we might want to refetch or prepend a fake one.
          // Let's prepend a fake one for instant UI update.
          const newItem: SavedContentRow = {
            id: 'temp-' + Date.now(),
            user_id: user.id,
            content_id: contentId,
            content_type: contentType,
            created_at: new Date().toISOString(),
          };
          setSavedItems((prev) => [newItem, ...prev]);
        }
      } catch (error) {
        console.error('[YudNing] Failed to toggle save:', error);
        throw error;
      }
    },
    [user, isContentSaved]
  );

  const value: SavedContentContextValue = {
    savedItems,
    isLoading,
    isContentSaved,
    toggleSave,
  };

  return (
    <SavedContentContext.Provider value={value}>
      {children}
    </SavedContentContext.Provider>
  );
}

export function useSavedContent(): SavedContentContextValue {
  const context = useContext(SavedContentContext);
  if (!context) {
    throw new Error('useSavedContent must be used within a SavedContentProvider');
  }
  return context;
}
