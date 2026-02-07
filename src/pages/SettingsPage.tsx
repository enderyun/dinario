import { useState } from 'react';
import { Settings, DollarSign, Percent, Trash2, Check } from 'lucide-react';
import { useFinance } from '../hooks/useFinance';
import type { Configuracion } from '../types';

// ============================================
// COMPONENTE FORMULARIO DE CONFIGURACIÓN
// ============================================

interface SettingsFormProps {
  initialConfig: Configuracion | undefined;
  onSave: (config: Omit<Configuracion, 'id'>) => Promise<void>;
}

function SettingsForm({ initialConfig, onSave }: SettingsFormProps) {
  // Inicializamos el estado solo una vez con los valores iniciales
  const [tipoIngreso, setTipoIngreso] = useState<'mensual' | 'diario'>(
    initialConfig?.tipoIngreso ?? 'mensual'
  );
  const [salarioMensual, setSalarioMensual] = useState(
    initialConfig?.salarioMensual?.toString() ?? ''
  );
  const [tasaImpuestos, setTasaImpuestos] = useState(
    initialConfig ? (initialConfig.tasaImpuestos * 100).toString() : ''
  );
  
  const [guardado, setGuardado] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const salarioNumero = parseFloat(salarioMensual) || 0;
    const impuestosNumero = parseFloat(tasaImpuestos) || 0;
    
    await onSave({
      tipoIngreso,
      salarioMensual: salarioNumero,
      tasaImpuestos: impuestosNumero / 100,
    });
    
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo de ingreso */}
      <div>
        <label className="block mb-3 text-sm font-medium text-gray-600">
          Income Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTipoIngreso('mensual')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${tipoIngreso === 'mensual' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-gray-200 hover:border-gray-300 text-gray-600'}
            `}
          >
            <DollarSign className="h-6 w-6 mx-auto mb-2" />
            <p className="font-medium">Monthly</p>
            <p className="text-xs opacity-70">Fixed salary</p>
          </button>
          
          <button
            type="button"
            onClick={() => setTipoIngreso('diario')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${tipoIngreso === 'diario' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-gray-200 hover:border-gray-300 text-gray-600'}
            `}
          >
            <DollarSign className="h-6 w-6 mx-auto mb-2" />
            <p className="font-medium">Daily</p>
            <p className="text-xs opacity-70">Variable income</p>
          </button>
        </div>
      </div>

      {/* Salario mensual */}
      {tipoIngreso === 'mensual' && (
        <div>
          <label 
            htmlFor="salary" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Monthly Salary (Gross)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              id="salary"
              type="number"
              value={salarioMensual}
              onChange={(e) => setSalarioMensual(e.target.value)}
              placeholder="e.g., 5000"
              className="input-field pl-8"
              min="0"
              step="100"
            />
          </div>
        </div>
      )}

      {/* Tasa de impuestos */}
      <div>
        <label 
          htmlFor="tax-rate" 
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Tax Rate
        </label>
        <div className="relative">
          <input
            id="tax-rate"
            type="number"
            value={tasaImpuestos}
            onChange={(e) => setTasaImpuestos(e.target.value)}
            placeholder="e.g., 15"
            className="input-field pr-10"
            min="0"
            max="100"
            step="1"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Percent className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          This percentage will be deducted from your gross income
        </p>
      </div>

      <button 
        type="submit" 
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {guardado ? (
          <>
            <Check className="h-5 w-5" />
            Saved!
          </>
        ) : (
          'Save Settings'
        )}
      </button>
    </form>
  );
}

// ============================================
// PÁGINA DE CONFIGURACIÓN (CONTAINER)
// ============================================

function SettingsPage() {
  const {
    configuracion,
    guardarConfiguracion,
    resetearDatos,
  } = useFinance();

  const [confirmReset, setConfirmReset] = useState(false);

  async function handleReset() {
    if (confirmReset) {
      await resetearDatos();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  }

  // Si no hay configuración cargada aún (o es undefined al inicio),
  // podríamos mostrar un loading. Dexie useLiveQuery retorna undefined mientras carga.
  // Sin embargo, para evitar parpadeos, podemos renderizar el form con valores default,
  // pero lo ideal es esperar. 
  // Para solucionar el tema del "setState in useEffect", usamos el patrón "key"
  // para reiniciar el componente Form cuando la configuración llega.
  
  // Usamos un fallback si configuracion es undefined
  const configKey = configuracion ? `loaded-${configuracion.id}` : 'loading';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Configuración principal */}
        <section className="rounded-2xl bg-white p-6 shadow-md mb-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-800">
            <Settings className="h-5 w-5 text-emerald-500" />
            Income Settings
          </h2>
          
          <SettingsForm 
            key={configKey} 
            initialConfig={configuracion} 
            onSave={guardarConfiguracion} 
          />
        </section>

        {/* Zona de peligro */}
        <section className="rounded-2xl bg-white p-6 shadow-md border-2 border-red-100">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            This action will delete all your data including settings, income, and debts. 
            This cannot be undone.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={`
              w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${confirmReset 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-red-100 text-red-600 hover:bg-red-200'}
            `}
          >
            {confirmReset ? 'Click again to confirm' : 'Reset All Data'}
          </button>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
