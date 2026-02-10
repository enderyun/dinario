import { useState } from 'react';
import { DollarSign, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useFinance } from '../hooks/useFinance';
import { DebtForm } from '../components/DebtForm';
import { DailyIncomeForm } from '../components/DailyIncomeForm';
import { MonthlyIncomeForm } from '../components/MonthlyIncomeForm';
import type { IngresoDiario, Deuda } from '../types';

// ============================================
// CONTENIDO DEL FORMULARIO (Se reinicia con la key)
// ============================================

interface ContentProps {
  tipoIngreso: 'mensual' | 'diario';
  ingresosMesActual: IngresoDiario[];
  agregarDeuda: (d: Omit<Deuda, 'id'>) => Promise<void>;
  agregarIngresoDiario: (i: Omit<IngresoDiario, 'id'>) => Promise<void>;
  eliminarIngresoDiario: (id: number) => Promise<void>;
}

function AddTransactionContent({ 
  tipoIngreso, 
  ingresosMesActual, 
  agregarDeuda, 
  agregarIngresoDiario, 
  eliminarIngresoDiario 
}: ContentProps) {
  const [activeTab, setActiveTab] = useState<'income' | 'debt'>('income');
  
  // Estado local para el toggle de tipo de ingreso
  // Gracias al patrón de 'key' en el padre, esto se inicializa con el valor correcto de la BD
  const [incomeType, setIncomeType] = useState<'diario' | 'mensual'>(tipoIngreso);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Agregar transacción</h1>
        </div>

        {/* Tabs Principales: Ingreso vs Deuda */}
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
            Ingreso
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
            Deuda / Gasto
          </button>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          {activeTab === 'income' ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-emerald-500" />
                    Ingresos
                  </h2>
                  
                  {/* Toggle Diario/Mensual dentro de Ingresos */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setIncomeType('diario')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        incomeType === 'diario' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Diario
                    </button>
                    <button
                      onClick={() => setIncomeType('mensual')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        incomeType === 'mensual' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Mensual
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  {incomeType === 'diario' 
                    ? 'Registra tus ingresos de hoy.' 
                    : 'Configura tu salario mensual fijo.'}
                </p>
              </div>

              {incomeType === 'diario' ? (
                <DailyIncomeForm
                  ingresosMes={ingresosMesActual}
                  onAgregar={agregarIngresoDiario}
                  onEliminar={eliminarIngresoDiario}
                />
              ) : (
                <MonthlyIncomeForm />
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-red-500" />
                  Deuda / Gasto
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Agrega una nueva deuda o gasto recurrente.
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

// ============================================
// PÁGINA CONTENEDOR (Controla la sincronización)
// ============================================

function AddTransactionPage() {
  const finance = useFinance();
  
  // Usamos el ID de la configuración como key. 
  // Cuando la base de datos carga, el ID cambia y el formulario se reinicia con los valores correctos.
  const renderKey = finance.configuracion?.id ? `ready-${finance.configuracion.id}` : 'initial';

  return <AddTransactionContent key={renderKey} {...finance} />;
}

export default AddTransactionPage;
