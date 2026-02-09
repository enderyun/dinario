import { Link } from 'react-router';
import { Home, PlusCircle, Settings } from 'lucide-react';

export function NavBar() {
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
    <>
      {/* Navegación */}
      <nav className="flex justify-evenly items-center">
        <Link to="/" className={linkClasses('/')}> {/* HomePage */}
          <Home className="h-7 w-7 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>

        <Link to="/add" className={linkClasses('/add')}> {/* AddTransactionPage */}
          <PlusCircle className="h-7 w-7 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Link>
              
        <Link to="/settings" className={linkClasses('/settings')}> {/* SettingsPage */}
          <Settings className="h-7 w-7 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Configuración</span>
        </Link>
      </nav>
    </>
  );
}