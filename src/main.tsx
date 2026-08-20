import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './i18n';
import './styles/global.css';
import { SavedContentProvider } from './contexts/SavedContentContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <SavedContentProvider>
          <App />
        </SavedContentProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
