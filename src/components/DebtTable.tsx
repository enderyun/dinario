import { Trash2, Calendar, CreditCard } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import type { Deuda } from '../types';

// ============================================
// COMPONENTE TABLA DE DEUDAS
// ============================================

interface DebtTableProps {
  deudas: Deuda[];
  onEliminar: (id: number) => void;
}

export function DebtTable({ deudas, onEliminar }: DebtTableProps) {
  // Estado vacío
  if (deudas.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        <CreditCard className="mx-auto mb-2 h-12 w-12 opacity-50" />
        <p>No hay deudas registradas</p>
        <p className="text-sm">Agrega una usando el formulario</p>
      </div>
    );
  }

  // Tabla con deudas
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
            <th className="pb-3 font-medium">Nombre</th>
            <th className="pb-3 font-medium">Monto</th>
            <th className="pb-3 font-medium">Dia</th>
            <th className="pb-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {deudas.map((deuda) => (
            <tr key={deuda.id} className="group">
              <td className="py-3 font-medium text-gray-800">
                {deuda.nombre}
              </td>
              <td className="py-3 text-red-600">
                {formatCurrency(deuda.monto)}
              </td>
              <td className="py-3 text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Dia {deuda.diaPago}
                </span>
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => deuda.id && onEliminar(deuda.id)}
                  className="p-2 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200 hover:bg-red-600"
                  title="Delete debt"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
