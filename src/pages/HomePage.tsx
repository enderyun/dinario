import { Wallet, TrendingDown, PiggyBank, CreditCard } from 'lucide-react';
import { useFinance } from '../hooks/useFinance';
import { KpiCard } from '../components/KpiCard';
import { DebtTable } from '../components/DebtTable';

// ============================================
// PÁGINA PRINCIPAL (HOME)
// ============================================

function HomePage() {
  const {
    ingresoNeto,
    totalDeudas,
    disponible,
    tasaImpuestos,
    deudas,
    eliminarDeuda,
  } = useFinance();

  // Calcular porcentaje de impuestos para mostrar
  const impuestosPorcentaje = Math.round(tasaImpuestos * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* KPI Cards */}
        <section className="grid gap-4 sm:grid-cols-3 mb-8">
          <KpiCard
            title="Ingreso neto"
            value={ingresoNeto}
            subtitle={`Impuestos (${impuestosPorcentaje}%)`}
            variant="income"
            icon={<Wallet className="h-5 w-5" />}
          />
          
          <KpiCard
            title="Gastos fijos"
            value={totalDeudas}
            subtitle={`${deudas.length} deudas`}
            variant="expense"
            icon={<TrendingDown className="h-5 w-5" />}
          />
          
          <KpiCard
            title="Disponible"
            value={disponible}
            subtitle="Para ahorrar o gastar"
            variant="available"
            icon={<PiggyBank className="h-5 w-5" />}
          />
        </section>

        {/* Resumen de deudas */}
        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              Tus deudas
            </h2>
          </div>
          <DebtTable deudas={deudas} onEliminar={eliminarDeuda} />
        </section>
      </div>
    </div>
  );
}

export default HomePage;
