import { 
  Wallet, 
  TrendingDown, 
  PiggyBank, 
  CreditCard,
  Trash2
} from 'lucide-react';
import { useFinance } from '../hooks/useFinance';
import { KpiCard } from '../components/KpiCard';
import { formatCurrency } from '../utils/formatCurrency';
import { useMemo } from 'react';

// ============================================
// PÁGINA PRINCIPAL (HOME)
// ============================================

interface Movimiento {
  id: number;
  tipo: 'ingreso' | 'gasto' | 'ahorro';
  fecha: string;
  monto: number;
  descripcion?: string; // Ingreso/Ahorro tienen desc, Gasto tiene nombre
  nombre?: string;
}

function HomePage() {
  const {
    ingresoBruto,
    totalGastos,
    ingresoNeto,
    totalAhorros,
    gastos,
    ingresos,
    ahorros, // Traemos todos, pero filtramos luego si queremos solo mes
    eliminarGasto,
    eliminarIngreso,
    eliminarAhorro
  } = useFinance();

  // Unificar y ordenar movimientos del mes (o recientes)
  const movimientos = useMemo(() => {
    const lista: Movimiento[] = [];
    
    ingresos.forEach(i => {
      if (i.id) lista.push({ ...i, tipo: 'ingreso', id: i.id });
    });
    
    gastos.forEach(g => {
      if (g.id) lista.push({ ...g, tipo: 'gasto', id: g.id });
    });

    // Podríamos incluir ahorros del mes también si queremos ver el flujo completo
    // Pero 'ahorros' viene con todos. Filtremos por fechas de los otros si coinciden, 
    // o simplemente mostremos los últimos.
    // Para simplificar "Movimientos del mes", usemos la misma ventana de tiempo que ingresos/gastos 
    // (que ya vienen filtrados por hook useFinance).
    // El hook useFinance devuelve 'ahorros' totales. 
    // Vamos a filtrar los ahorros que sean del mismo mes que los ingresos[0] (si hay).
    // O mejor, ordenamos todo por fecha descendente.
    // Nota: 'ahorros' traídos por useFinance son TODOS. 
    
    ahorros.forEach(a => {
       if (a.id) lista.push({ ...a, tipo: 'ahorro', id: a.id });
    });

    return lista.sort((a, b) => {
      // Orden descendente por fecha (más reciente primero)
      // Si a > b (ej: 2026-02-12 > 2026-02-01), devuelve -1 para poner a(febrero) antes que b(enero)
      if (a.fecha > b.fecha) return -1;
      if (a.fecha < b.fecha) return 1;
      // Si tienen la misma fecha, ordenar por ID (asumiendo ID incremental) descendente para que el último agregado salga primero
      return b.id - a.id;
    });
  }, [ingresos, gastos, ahorros]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* KPI Cards Section */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Ingreso Bruto"
            value={ingresoBruto}
            subtitle="Total ingresos este mes"
            variant="income"
            icon={<Wallet className="h-5 w-5" />}
          />
          
          <KpiCard
            title="Gastos / Deudas"
            value={totalGastos}
            subtitle={`${gastos.length} registros este mes`}
            variant="expense"
            icon={<TrendingDown className="h-5 w-5" />}
          />

          <KpiCard
            title="Ahorros Totales"
            value={totalAhorros}
            subtitle="Fondo acumulado"
            variant="savings"
            icon={<PiggyBank className="h-5 w-5" />}
          />
          
          <KpiCard
            title="Ingreso Neto"
            value={ingresoNeto}
            subtitle="Bruto - Gastos - Ahorros"
            variant="available"
            icon={<CreditCard className="h-5 w-5" />}
          />
        </section>

        {/* Movimientos Recientes */}
        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <CreditCard className="h-5 w-5 text-gray-500" />
              Movimientos recientes
            </h2>
          </div>
          
          {movimientos.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No hay movimientos registrados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th scope="col" className="px-4 py-3">Fecha</th>
                    <th scope="col" className="px-4 py-3">Descripción / Nombre</th>
                    <th scope="col" className="px-4 py-3 text-center">Tipo</th>
                    <th scope="col" className="px-4 py-3 text-right">Monto</th>
                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {movimientos.map((mov) => {
                    const esIngreso = mov.tipo === 'ingreso';
                    const esGasto = mov.tipo === 'gasto';
                    const esAhorro = mov.tipo === 'ahorro';
                    
                    let colorClase = 'text-gray-900';
                    let signo = '';
                    if (esIngreso) { colorClase = 'text-emerald-600'; signo = '+'; }
                    if (esGasto) { colorClase = 'text-red-600'; signo = '-'; }
                    if (esAhorro) { colorClase = 'text-violet-600'; signo = ''; } // Ahorro sale del neto pero se acumula
                    
                    return (
                      <tr key={`${mov.tipo}-${mov.id}`} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">{mov.fecha}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {mov.descripcion || mov.nombre}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`
                            inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize
                            ${esIngreso ? 'bg-emerald-100 text-emerald-800' : ''}
                            ${esGasto ? 'bg-red-100 text-red-800' : ''}
                            ${esAhorro ? 'bg-violet-100 text-violet-800' : ''}
                          `}>
                            {mov.tipo}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-right font-medium ${colorClase}`}>
                          {signo}{formatCurrency(mov.monto)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              if (esIngreso) eliminarIngreso(mov.id);
                              if (esGasto) eliminarGasto(mov.id);
                              if (esAhorro) eliminarAhorro(mov.id);
                            }}
                            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default HomePage;
