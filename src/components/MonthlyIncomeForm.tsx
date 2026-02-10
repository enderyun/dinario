import { Percent, Check } from 'lucide-react';
import { useSettingsForm } from '../hooks/useSettingsForm';

export function MonthlyIncomeForm() {
  const {
    salarioMensual,
    setSalarioMensual,
    tasaImpuestos,
    setTasaImpuestos,
    guardado,
    handleSave,
  } = useSettingsForm();

  // We want to force 'mensual' type when using this form, essentially.
  // The hook initializes with the current config.
  // If we are in this form, we probably want to ensure type is 'mensual' on save.
  
  const onSubmit = (e: React.FormEvent) => {
    handleSave(e, { tipoIngreso: 'mensual' });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Salario mensual */}
      <div>
        <label 
          htmlFor="salary" 
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Salario mensual (bruto)
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

      {/* Tasa de impuestos */}
      <div>
        <label 
          htmlFor="tax-rate" 
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Tasa de impuestos
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
          Este porcentaje se deducirá de tu ingreso bruto
        </p>
      </div>

      <button 
        type="submit" 
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {guardado ? (
          <>
            <Check className="h-5 w-5" />
            Guardado
          </>
        ) : (
          'Guardar Configuración Mensual'
        )}
      </button>
    </form>
  );
}
