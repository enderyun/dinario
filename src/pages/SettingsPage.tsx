import { useState } from 'react';
import { Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useFinance } from '../hooks/useFinance';

// ============================================
// PÁGINA DE CONFIGURACIÓN
// ============================================

function SettingsPage() {
  const { resetearDatos } = useFinance();
  const [confirmReset, setConfirmReset] = useState(false);

  async function handleReset() {
    if (confirmReset) {
      await resetearDatos();
      setConfirmReset(false);
      // Optional: Redirect to home or show success message
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
        </div>

        {/* Zona de peligro */}
        <section className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-red-500">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Zona de peligro
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Aquí puedes reiniciar la aplicación a su estado original. 
            Esta acción eliminará todos tus ingresos, deudas y configuraciones guardadas de forma permanente.
          </p>
          
          <button
            type="button"
            onClick={handleReset}
            className={`
              w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200
              ${confirmReset 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg scale-[1.02]' 
                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'}
            `}
          >
            <Trash2 className="h-5 w-5" />
            {confirmReset ? '¿Estás seguro? Haz clic para confirmar' : 'Eliminar todos los datos y reiniciar'}
          </button>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
