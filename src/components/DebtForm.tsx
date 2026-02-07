import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Deuda } from '../types';

// ============================================
// COMPONENTE FORMULARIO DE DEUDAS
// ============================================

interface DebtFormProps {
  onAgregar: (deuda: Omit<Deuda, 'id'>) => void;
}

export function DebtForm({ onAgregar }: DebtFormProps) {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [diaPago, setDiaPago] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    // Validar campos
    const montoNumero = parseFloat(monto);
    const diaNumero = parseInt(diaPago, 10);
    
    if (!nombre.trim()) {
      return;
    }
    
    if (isNaN(montoNumero) || montoNumero <= 0) {
      return;
    }
    
    if (isNaN(diaNumero) || diaNumero < 1 || diaNumero > 31) {
      return;
    }
    
    // Agregar deuda
    onAgregar({
      nombre: nombre.trim(),
      monto: montoNumero,
      diaPago: diaNumero,
    });
    
    // Limpiar formulario
    setNombre('');
    setMonto('');
    setDiaPago('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre de la deuda */}
      <div>
        <label 
          htmlFor="debt-name" 
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Debt Name
        </label>
        <input
          id="debt-name"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="e.g., Credit Card"
          className="input-field"
        />
      </div>
      
      {/* Monto y día de pago */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="debt-amount" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Monthly Amount
          </label>
          <input
            id="debt-amount"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="e.g., 500"
            className="input-field"
            min="0"
            step="10"
          />
        </div>
        
        <div>
          <label 
            htmlFor="debt-day" 
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Payment Day
          </label>
          <input
            id="debt-day"
            type="number"
            value={diaPago}
            onChange={(e) => setDiaPago(e.target.value)}
            placeholder="1-31"
            className="input-field"
            min="1"
            max="31"
          />
        </div>
      </div>
      
      {/* Botón de agregar */}
      <button 
        type="submit" 
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Debt
      </button>
    </form>
  );
}
