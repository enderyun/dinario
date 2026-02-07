import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, getTodayDate } from '../utils/formatCurrency';
import type { IngresoDiario } from '../types';

// ============================================
// COMPONENTE FORMULARIO DE INGRESOS DIARIOS
// ============================================

interface DailyIncomeFormProps {
  ingresosMes: IngresoDiario[];
  onAgregar: (ingreso: Omit<IngresoDiario, 'id'>) => void;
  onEliminar: (id: number) => void;
}

export function DailyIncomeForm({ ingresosMes, onAgregar, onEliminar }: DailyIncomeFormProps) {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(getTodayDate());

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    const montoNumero = parseFloat(monto);
    
    if (isNaN(montoNumero) || montoNumero <= 0) {
      return;
    }
    
    onAgregar({
      fecha,
      monto: montoNumero,
      descripcion: descripcion.trim() || 'Daily income',
    });
    
    // Limpiar formulario
    setMonto('');
    setDescripcion('');
    setFecha(getTodayDate());
  }

  // Calcular total del mes
  const totalMes = ingresosMes.reduce((sum, ingreso) => sum + ingreso.monto, 0);

  return (
    <div className="space-y-6">
      {/* Formulario */}
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
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="e.g., 150"
              className="input-field"
              min="0"
              step="1"
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
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="e.g., Freelance work"
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
      
      {/* Historial del mes */}
      {ingresosMes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-600">Ingresos del mes</h4>
            <span className="text-sm font-bold text-emerald-600">
              Total: {formatCurrency(totalMes)}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ingresosMes.map((ingreso) => (
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
