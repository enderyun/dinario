import { useState } from 'react';
import { DollarSign, CreditCard, ArrowLeft, PiggyBank } from 'lucide-react';
import { Link } from 'react-router';
import { useFinance } from '../hooks/useFinance';
import { DebtForm } from '../components/DebtForm';
import { IncomeForm } from '../components/IncomeForm';
import { SavingsForm } from '../components/SavingsForm';
import type { Ingreso, Deuda, Ahorro } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { Trash2 } from 'lucide-react';

// ============================================
// COMPONENTES MEMOIZADOS (Evita re-renders del padre)
// ============================================

// Componente para mostrar lista reciente en DebtForm (ya que DebtTable es tabla completa)
// Lo integramos aquí o lo pasamos a DebtForm. 
// Por simplicidad, vamos a mostrar la lista de deudas recientes debajo del formulario DEBT
// dentro del mismo DebtForm o aquí? 
// El usuario pidió: "Feedback de que en efecto se agrego" -> Lista reciente.
// Vamos a modificar DebtForm para que acepte la lista, igual que IncomeForm.

// ============================================
// CONTENIDO PRINCIPAL
// ============================================

interface ContentProps {
  ingresos: Ingreso[];
  gastos: Deuda[];
  ahorros: Ahorro[];
  agregarGasto: (d: Omit<Deuda, 'id'>) => Promise<void>;
  eliminarGasto: (id: number) => Promise<void>;
  agregarIngreso: (i: Omit<Ingreso, 'id'>) => Promise<void>;
  eliminarIngreso: (id: number) => Promise<void>;
  agregarAhorro: (a: Omit<Ahorro, 'id'>) => Promise<void>;
  eliminarAhorro: (id: number) => Promise<void>;
}

function AddTransactionContent({ 
  ingresos, 
  gastos,
  ahorros,
  agregarGasto, 
  eliminarGasto,
  agregarIngreso, 
  eliminarIngreso,
  agregarAhorro,
  eliminarAhorro
}: ContentProps) {
  const [activeTab, setActiveTab] = useState<'income' | 'debt' | 'savings'>('income');
  
  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Agregar</h1>
        </div>

        {/* Tabs */}
        <div className="flex p-1 mb-6 bg-white rounded-xl shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('income')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'income' 
                ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <DollarSign className="h-4 w-4" />
            Ingreso
          </button>
          <button
            onClick={() => setActiveTab('debt')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'debt' 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <CreditCard className="h-4 w-4" />
            Gasto
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'savings' 
                ? 'bg-violet-50 text-violet-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <PiggyBank className="h-4 w-4" />
            Ahorro
          </button>
        </div>

        {/* Contenido del Tab Activo */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          {activeTab === 'income' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                  Ingresos
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Registra dinero que entra.
                </p>
              </div>

              <IncomeForm
                ingresos={ingresos}
                onAgregar={agregarIngreso}
                onEliminar={eliminarIngreso}
              />
            </div>
          )}

          {activeTab === 'debt' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-red-500" />
                  Gastos
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Registra dinero que sale (compras, facturas, etc).
                </p>
              </div>
              
              <DebtForm onAgregar={agregarGasto} />
              
              {/* Lista Reciente de Gastos (Manual aquí ya que DebtForm no tenía lista) */}
              {gastos.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-6">
                   <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-600">Gastos recientes</h4>
                   </div>
                   <div className="space-y-2 max-h-48 overflow-y-auto">
                     {gastos.slice(0, 5).map((gasto) => (
                       <div key={gasto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                         <div>
                            <p className="text-sm font-medium text-gray-800">{formatCurrency(gasto.monto)}</p>
                            <p className="text-xs text-gray-400">{gasto.fecha} - {gasto.nombre}</p>
                         </div>
                         <button
                           onClick={() => gasto.id && eliminarGasto(gasto.id)}
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
          )}

          {activeTab === 'savings' && (
             <div>
               <div className="mb-6">
                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                   <PiggyBank className="h-6 w-6 text-violet-500" />
                   Ahorros
                 </h2>
                 <p className="text-sm text-gray-500 mt-1">
                   Mueve dinero a tus fondos de ahorro.
                 </p>
               </div>
               
               <SavingsForm 
                 ahorros={ahorros} 
                 onAgregar={agregarAhorro} 
                 onEliminar={eliminarAhorro}
               />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// PÁGINA CONTENEDOR
// ============================================

function AddTransactionPage() {
  const finance = useFinance();
  
  // Usamos el ID de la configuración como key.
  const renderKey = finance.configuracion?.id ? `ready-${finance.configuracion.id}` : 'initial';

  return <AddTransactionContent key={renderKey} {...finance} />;
}

export default AddTransactionPage;
