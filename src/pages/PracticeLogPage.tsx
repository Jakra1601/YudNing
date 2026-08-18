import { useState, useEffect } from 'react';
import { Calendar, Clock, Trash2, PlusCircle, History, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePageSEO } from '../hooks/usePageSEO';
import {
  MeditationSessionRow,
  getMeditationSessions,
  createMeditationSession,
  deleteMeditationSession,
} from '../services/meditationSession';

// Helper: Get current local time as YYYY-MM-DDTHH:mm for datetime-local input
function getCurrentLocalDateTimeString() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function PracticeLogPage() {
  usePageSEO({
    title: 'บันทึกการปฏิบัติ | YudNing',
    description: 'บันทึกการนั่งสมาธิและดูประวัติการปฏิบัติของคุณ',
  });

  const { user } = useAuth();
  
  // State for History
  const [sessions, setSessions] = useState<MeditationSessionRow[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  
  // State for Form
  const [practicedAt, setPracticedAt] = useState(getCurrentLocalDateTimeString());
  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load History
  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!user) return;
      try {
        setIsLoadingHistory(true);
        const data = await getMeditationSessions(user.id);
        if (isMounted) setSessions(data);
      } catch (error) {
        console.error('[YudNing] Load history error:', error);
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [user]);

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!user) return;

    // Validation
    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      setFormError('กรุณาระบุระยะเวลาให้ถูกต้อง (มากกว่า 0 นาที)');
      return;
    }
    
    if (!practicedAt) {
      setFormError('กรุณาระบุวันและเวลา');
      return;
    }

    // validate valid date
    const parsedDate = new Date(practicedAt);
    if (isNaN(parsedDate.getTime())) {
      setFormError('รูปแบบวันและเวลาไม่ถูกต้อง');
      return;
    }

    try {
      setIsSubmitting(true);
      // Convert local string to ISO UTC
      const isoDateTime = parsedDate.toISOString();
      
      const newSession = await createMeditationSession(user.id, {
        practiced_at: isoDateTime,
        duration_minutes: durationNum,
        note: note || null,
      });

      // Update state and sort by practiced_at DESC
      setSessions((prev) => {
        const updated = [newSession, ...prev];
        return updated.sort(
          (a, b) => new Date(b.practiced_at).getTime() - new Date(a.practiced_at).getTime()
        );
      });
      
      // Reset form (keep practicedAt near current to save time for next entry, or just reset to now)
      setDuration('');
      setNote('');
      setPracticedAt(getCurrentLocalDateTimeString());
      setFormSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setFormSuccess(false), 3000);
      
    } catch (error) {
      setFormError('เกิดข้อผิดพลาดในการบันทึก กรุณาลองอีกครั้ง');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (sessionId: string) => {
    if (!user) return;
    if (!window.confirm('คุณต้องการลบประวัตินี้ใช่หรือไม่?')) return;

    try {
      await deleteMeditationSession(user.id, sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบ กรุณาลองอีกครั้ง');
      console.error(error);
    }
  };

  return (
    <main id="main-content" className="py-8 sm:py-12 min-h-[70vh]">
      <div className="container-content max-w-3xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight mb-2 flex items-center gap-2">
            <Calendar size={28} className="text-[var(--color-primary)]" />
            บันทึกการปฏิบัติ
          </h1>
          <p className="text-[var(--color-text-muted)]">
            บันทึกเวลาที่คุณได้ฝึกฝนนั่งสมาธิ และดูประวัติย้อนหลังได้ที่นี่
          </p>
        </div>

        {/* Form Section */}
        <section aria-labelledby="add-session-heading" className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-5 sm:p-6 mb-10 shadow-sm">
          <h2 id="add-session-heading" className="text-lg font-semibold text-[var(--color-text-main)] mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-[var(--color-secondary)]" />
            เพิ่มบันทึกใหม่
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Alerts */}
            {formError && (
              <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-[var(--color-error)] text-sm rounded-[var(--radius-sm)]">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            
            {formSuccess && (
              <div role="alert" className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-[var(--color-success)] text-sm rounded-[var(--radius-sm)]">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>บันทึกการปฏิบัติสำเร็จ</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date/Time */}
              <div>
                <label htmlFor="practicedAt" className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">
                  วันและเวลา
                </label>
                <input
                  id="practicedAt"
                  type="datetime-local"
                  required
                  value={practicedAt}
                  onChange={(e) => setPracticedAt(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors disabled:opacity-60"
                />
              </div>
              
              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">
                  ระยะเวลา (นาที)
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="เช่น 15"
                    disabled={isSubmitting}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">
                บันทึกเพิ่มเติม (ไม่บังคับ)
              </label>
              <textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="ความรู้สึก, อุปสรรค, หรือสิ่งที่ได้เรียนรู้จากการนั่งสมาธิครั้งนี้"
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] transition-colors disabled:opacity-60 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  'บันทึกการปฏิบัติ'
                )}
              </button>
            </div>
          </form>
        </section>

        {/* History Section */}
        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="text-xl font-bold text-[var(--color-text-main)] mb-4 flex items-center gap-2">
            <History size={20} className="text-[var(--color-text-muted)]" />
            ประวัติการปฏิบัติของคุณ
          </h2>

          {isLoadingHistory ? (
            <div className="py-12 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
              <div className="w-8 h-8 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin mb-3"></div>
              <p className="text-sm">กำลังโหลดประวัติ...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="py-12 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] text-center shadow-sm">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-[var(--color-text-main)] font-medium mb-1">ยังไม่มีประวัติการปฏิบัติ</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                เริ่มต้นฝึกสมาธิและเพิ่มบันทึกครั้งแรกของคุณได้เลย
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {sessions.map((session) => {
                const dateObj = new Date(session.practiced_at);
                const formattedDate = dateObj.toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                const formattedTime = dateObj.toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={session.id} className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-shadow hover:shadow-sm">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="font-semibold text-[var(--color-text-main)]">
                          {formattedDate}
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                          <Clock size={14} />
                          {formattedTime} น.
                        </span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2 py-0.5 rounded">
                          {session.duration_minutes} นาที
                        </span>
                      </div>
                      
                      {session.note && (
                        <p className="text-sm text-[var(--color-text-muted)] whitespace-pre-wrap mt-2 bg-gray-50 p-3 rounded-[var(--radius-sm)]">
                          {session.note}
                        </p>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleDelete(session.id)}
                      className="shrink-0 self-end sm:self-start p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                      aria-label="ลบบันทึก"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        
      </div>
    </main>
  );
}
