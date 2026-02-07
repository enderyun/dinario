import { Link, useLocation } from 'react-router';
import { Wallet, Home, Settings, PlusCircle } from 'lucide-react';
import { getCurrentDate } from '../utils/formatCurrency';

// ============================================
// COMPONENTE HEADER
// ============================================

export function Header() {
  const location = useLocation();
  const currentDate = getCurrentDate();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };
  
  const linkClasses = (path: string): string => {
    const baseClasses = 'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200';
    
    if (isActive(path)) {
      return `${baseClasses} bg-emerald-500 text-white`;
    }
    
    return `${baseClasses} text-gray-600 hover:bg-gray-100`;
  };

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
          
          {/* Navegación */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link to="/" className={linkClasses('/')}> {/* HomePage */}
              <Home className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>

            <Link to="/add" className={linkClasses('/add')}> {/* AddTransactionPage */}
              <PlusCircle className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Agregar</span>
            </Link>
            
            <Link to="/settings" className={linkClasses('/settings')}> {/* SettingsPage */}
              <Settings className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
