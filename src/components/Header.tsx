import { Link } from 'react-router';
import { Wallet } from 'lucide-react';

import { NavBar } from './NavBar';
import { getCurrentDate } from '../utils/formatCurrency';

// ============================================
// COMPONENTE HEADER
// ============================================

export function Header() {
  const currentDate = getCurrentDate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-emerald-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dinario</h1>
              <p className="text-xs text-gray-400">{currentDate}</p>
            </div>
          </Link>
          <div className="hidden md:block">
            <NavBar />
          </div>
        </div>
      </div>
    </header>
  );
}
