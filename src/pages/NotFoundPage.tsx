import { Link } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

// ============================================
// PÁGINA 404 (NOT FOUND)
// ============================================

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-gray-500 mb-6">Page not found</p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
