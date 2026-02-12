import { useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, getTodayDate } from '../utils/formatCurrency';
import type { Ahorro } from '../types';

// ============================================
// COMPONENTE FORMULARIO DE AHORROS
// ============================================

interface SavingsFormProps {
  ahorros: Ahorro[]; // Historial completo o del mes
  onAgregar: (ahorro: Omit<Ahorro, 'id'>) => void;
  onEliminar: (id: number) => void;
}

export function SavingsForm({ ahorros, onAgregar, onEliminar }: SavingsFormProps) {
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
      descripcion: descVal.trim() || 'Ahorro',
    });
    
    // Limpiar formulario
    if (montoRef.current) montoRef.current.value = '';
    if (descripcionRef.current) descripcionRef.current.value = '';
  }

  // Filtrar últimos 5 para mostrar
  const ultimosAhorros = ahorros.slice(0, 5);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="savings-amount" 
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Monto a Ahorrar
            </label>
            <input
              id="savings-amount"
              type="number"
              ref={montoRef}
              placeholder="e.g., 200"
              className="input-field"
              min="0"
              step="1"
              defaultValue=""
            />
          </div>
          
          <div>
            <label 
              htmlFor="savings-date" 
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Fecha
            </label>
            <input
              id="savings-date"
              type="date"
              ref={fechaRef}
              defaultValue={getTodayDate()}
              className="input-field"
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="savings-description" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Descripción (opcional)
          </label>
          <input
            id="savings-description"
            type="text"
            ref={descripcionRef}
            placeholder="e.g., Para vacaciones..."
            className="input-field"
            defaultValue=""
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="h-5 w-5" />
          Agregar Ahorro
        </button>
      </form>
      
      {/* Historial Reciente */}
      {ultimosAhorros.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-600">Ahorros recientes</h4>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ultimosAhorros.map((ahorro) => (
              <div 
                key={ahorro.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {formatCurrency(ahorro.monto)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {ahorro.fecha} - {ahorro.descripcion}
                  </p>
                </div>
                <button
                  onClick={() => ahorro.id && onEliminar(ahorro.id)}
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
