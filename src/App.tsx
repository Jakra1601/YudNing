import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DevBanner } from './components/layout/DevBanner';
import { HomePage } from './pages/HomePage';
import { StartHerePage } from './pages/StartHerePage';
import { LearnPage } from './pages/LearnPage';
import { TopicsPage } from './pages/TopicsPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { LibraryPage } from './pages/LibraryPage';
import { SearchPage } from './pages/SearchPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Skip to main content (Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm font-medium"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>

      <DevBanner />
      <Header />

      <main className="flex-1" id="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start" element={<StartHerePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:slug" element={<TopicDetailPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Version 1.2 — Authentication */}
            <Route path="/login" element={<LoginPage />} />
            {/* Supabase Email Confirmation callback — รับ token_hash จาก email link */}
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
