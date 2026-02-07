import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

// ============================================
// LAZY LOADING DE PÁGINAS
// ============================================

const HomePage = lazy(() => import('./pages/HomePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const AddTransactionPage = lazy(() => import('./pages/AddTransactionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ============================================
// COMPONENTE DE CARGA
// ============================================

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function App() {
  return (
    <>
      <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTransactionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      <Footer />
    </>
  );
}

export default App;
