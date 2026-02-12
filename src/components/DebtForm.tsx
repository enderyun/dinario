import { useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { Plus } from 'lucide-react';
import type { Deuda } from '../types';
import { getTodayDate } from '../utils/formatCurrency';

// ============================================
// COMPONENTE FORMULARIO DE DEUDAS / GASTOS
// ============================================

interface DebtFormProps {
  onAgregar: (deuda: Omit<Deuda, 'id'>) => void;
}

export function DebtForm({ onAgregar }: DebtFormProps) {
  const nombreRef = useRef<HTMLInputElement>(null);
  const montoRef = useRef<HTMLInputElement>(null);
  const fechaRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    // Obtener valores actuales
    const nombreVal = nombreRef.current?.value || '';
    const montoVal = montoRef.current?.value || '';
    const fechaVal = fechaRef.current?.value || getTodayDate();
    
    // Validar campos
    const montoNumero = parseFloat(montoVal);
    
    if (!nombreVal.trim()) {
      return;
    }
    
    if (isNaN(montoNumero) || montoNumero <= 0) {
      return;
    }
    
    // Agregar deuda/gasto
    onAgregar({
      nombre: nombreVal.trim(),
      monto: montoNumero,
      fecha: fechaVal,
    });
    
    // Limpiar formulario
    if (nombreRef.current) nombreRef.current.value = '';
    if (montoRef.current) montoRef.current.value = '';
    // No reseteamos fecha
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre de la deuda */}
      <div>
        <label 
          htmlFor="debt-name" 
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Nombre del gasto / deuda
        </label>
        <input
          id="debt-name"
          type="text"
          ref={nombreRef}
          placeholder="e.g., Compras, Renta, Tarjeta..."
          className="input-field"
          defaultValue=""
        />
      </div>
      
      {/* Monto y Fecha */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="debt-amount" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Monto
          </label>
          <input
            id="debt-amount"
            type="number"
            ref={montoRef}
            placeholder="e.g., 500"
            className="input-field"
            min="0"
            step="10"
            defaultValue=""
          />
        </div>
        
        <div>
          <label 
            htmlFor="debt-date" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Fecha
          </label>
          <input
            id="debt-date"
            type="date"
            ref={fechaRef}
            defaultValue={getTodayDate()}
            className="input-field"
          />
        </div>
      </div>
      
      {/* Botón de agregar */}
      <button 
        type="submit" 
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Agregar gasto
      </button>
    </form>
  );
}
