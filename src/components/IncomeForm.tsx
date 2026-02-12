import { useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, getTodayDate } from '../utils/formatCurrency';
import type { Ingreso } from '../types';

// ============================================
// COMPONENTE FORMULARIO DE INGRESOS
// ============================================

interface IncomeFormProps {
  ingresos: Ingreso[];
  onAgregar: (ingreso: Omit<Ingreso, 'id'>) => void;
  onEliminar: (id: number) => void;
}

export function IncomeForm({ ingresos, onAgregar, onEliminar }: IncomeFormProps) {
  // Usamos refs para evitar re-renders en cada tecla presionada
  const montoRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    const montoVal = montoRef.current?.value || '';
    const descVal = descripcionRef.current?.value || '';
    const fechaVal = fechaRef.current?.value || getTodayDate();
    
    const montoNumero = parseFloat(montoVal);
    
    if (isNaN(montoNumero) || montoNumero <= 0) {
      return;
    }
    
    onAgregar({
      fecha: fechaVal,
      monto: montoNumero,
      descripcion: descVal.trim() || 'Ingreso',
    });
    
    // Limpiar formulario manualment
    if (montoRef.current) montoRef.current.value = '';
    if (descripcionRef.current) descripcionRef.current.value = '';
    // No reseteamos fecha para facilitar ingresos multiples del mismo dia
  }

  // Calcular total
  const total = ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="income-amount" 
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Monto
            </label>
            <input
              id="income-amount"
              type="number"
              ref={montoRef}
              placeholder="e.g., 1500"
              className="input-field"
              min="0"
              step="1"
              defaultValue=""
            />
          </div>
          
          <div>
            <label 
              htmlFor="income-date" 
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Fecha
            </label>
            <input
              id="income-date"
              type="date"
              ref={fechaRef}
              defaultValue={getTodayDate()}
              className="input-field"
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="income-description" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Descripción (opcional)
          </label>
          <input
            id="income-description"
            type="text"
            ref={descripcionRef}
            placeholder="e.g., Salario, Freelance, Venta..."
            className="input-field"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Agregar ingreso
        </button>
      </form>
      
      {/* Historial */}
      {ingresos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-600">Ingresos recientes</h4>
            <span className="text-sm font-bold text-emerald-600">
              Total: {formatCurrency(total)}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ingresos.map((ingreso) => (
              <div 
                key={ingreso.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {formatCurrency(ingreso.monto)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {ingreso.fecha} - {ingreso.descripcion}
                  </p>
                </div>
                <button
                  onClick={() => ingreso.id && onEliminar(ingreso.id)}
                  className="p-1.5 rounded bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 
                             transition-opacity hover:bg-red-200"
                  type="button"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
