import { useState } from 'react';
import { DollarSign, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useFinance } from '../hooks/useFinance';
import { DebtForm } from '../components/DebtForm';
import { DailyIncomeForm } from '../components/DailyIncomeForm';

// ============================================
// PÁGINA PARA AGREGAR TRANSACCIONES
// ============================================

function AddTransactionPage() {
  const {
    tipoIngreso,
    ingresosMesActual,
    agregarDeuda,
    agregarIngresoDiario,
    eliminarIngresoDiario,
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'income' | 'debt'>('income');

  // Si el ingreso es mensual, no se pueden agregar ingresos diarios,
  // así que forzamos la tab de deuda si 'income' estaba seleccionado.
  const showIncomeTab = tipoIngreso === 'diario';
  const currentTab = showIncomeTab ? activeTab : 'debt';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Add Transaction</h1>
        </div>

        {/* Tabs */}
        {showIncomeTab && (
          <div className="flex p-1 mb-6 bg-white rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('income')}
              className={`
                flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${activeTab === 'income' 
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <DollarSign className="h-4 w-4" />
              Daily Income
            </button>
            <button
              onClick={() => setActiveTab('debt')}
              className={`
                flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${activeTab === 'debt' 
                  ? 'bg-red-50 text-red-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <CreditCard className="h-4 w-4" />
              Debt / Expense
            </button>
          </div>
        )}

        {/* Contenido */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          {currentTab === 'income' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                  Add Daily Income
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Record your earnings for today.
                </p>
              </div>
              <DailyIncomeForm
                ingresosMes={ingresosMesActual}
                onAgregar={agregarIngresoDiario}
                onEliminar={eliminarIngresoDiario}
              />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-red-500" />
                  Add Debt
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add a new recurring debt or expense.
                </p>
              </div>
              <DebtForm onAgregar={agregarDeuda} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTransactionPage;
