import { Shield } from 'lucide-react';

// ============================================
// COMPONENTE FOOTER
// ============================================

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          {/* Mensaje de privacidad */}
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>All data is stored locally. Your privacy is protected.</span>
          </div>
          
          {/* Versión */}
          <div>
            <span>Dinario v0.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
