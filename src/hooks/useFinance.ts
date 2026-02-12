import { useLiveQuery } from 'dexie-react-hooks';
import { db, DEFAULT_CONFIGURACION } from '../db';
import { getCurrentMonthRange } from '../utils/formatCurrency';
import type { Configuracion, Ingreso, Deuda, Ahorro } from '../types';

// ============================================
// HOOK PRINCIPAL DE FINANZAS
// ============================================

export function useFinance() {
  const { startDate, endDate } = getCurrentMonthRange();

  // ----------------------------------------
  // OBTENER DATOS DE LA BASE DE DATOS
  // ----------------------------------------
  
  const configuracion = useLiveQuery(
    () => db.configuracion.toCollection().first()
  );
  
  // Ingresos del mes actual
  const ingresos = useLiveQuery(
    () => db.ingresos
      .where('fecha')
      .between(startDate, endDate, true, true)
      .reverse() // Mostrar más recientes primero
      .toArray()
  ) ?? [];

  // Gastos/Deudas del mes actual
  const gastos = useLiveQuery(
    () => db.deudas
      .where('fecha')
      .between(startDate, endDate, true, true)
      .reverse() // Mostrar más recientes primero
      .toArray()
  ) ?? [];

  // Ahorros (Total acumulado histórico o del mes? El usuario dijo "ahorros totales", pero si descontamos del neto...)
  // Si descontamos del Ingreso Neto (que es mensual), ¿deberíamos descontar solo los ahorros hechos ESTE MES?
  // User: "del ingreso neto, pasar dinero restante a esta nueva sección" -> movimiento de flujo.
  // Interpretación: 
  // - Neto Mensual = Bruto Mensual - Gastos Mensuales - Ahorros Mensuales.
  // - Ahorros Totales = Suma de todos los ahorros históricos.
  // Vamos a filtrar ahorros del mes para el cálculo de Neto, y traer todos para el Total.
  
  const todosLosAhorros = useLiveQuery(
    () => db.ahorros
      .orderBy('fecha')
      .reverse()
      .toArray()
  ) ?? [];

  const ahorrosMesActual = todosLosAhorros.filter(a => 
    a.fecha >= startDate && a.fecha <= endDate
  );
  
  // ----------------------------------------
  // VALORES CALCULADOS
  // ----------------------------------------
  
  const tasaImpuestos = configuracion?.tasaImpuestos ?? DEFAULT_CONFIGURACION.tasaImpuestos;
  
  // 1. Ingreso Bruto (Suma de ingresos del mes)
  const ingresoBruto = ingresos.reduce(
    (total, ingreso) => total + ingreso.monto, 
    0
  );

  // 2. Total Gastos (Suma de deudas/gastos del mes)
  const totalGastos = gastos.reduce(
    (total, gasto) => total + gasto.monto, 
    0
  );

  // 3. Ahorros del Mes
  const totalAhorrosMes = ahorrosMesActual.reduce(
    (total, ahorro) => total + ahorro.monto,
    0
  );
  
  // 4. Ingreso Neto (Bruto - Gastos - Ahorros del Mes)
  // El usuario pidió que el ahorro se descuente del ingreso neto. 
  // Asumimos que "Ingreso Neto" aquí funciona como "Disponible Real".
  const ingresoNeto = ingresoBruto - totalGastos - totalAhorrosMes;
  
  // 5. Total Ahorros (Acumulado Histórico)
  const totalAhorros = todosLosAhorros.reduce(
    (total, ahorro) => total + ahorro.monto,
    0
  );

  // ----------------------------------------
  // FUNCIONES PARA MODIFICAR DATOS
  // ----------------------------------------
  
  async function guardarConfiguracion(data: Omit<Configuracion, 'id'>): Promise<void> {
    const existente = await db.configuracion.toCollection().first();
    if (existente?.id) {
      await db.configuracion.update(existente.id, data);
    } else {
      await db.configuracion.add(data);
    }
  }
  
  async function agregarIngreso(ingreso: Omit<Ingreso, 'id'>): Promise<void> {
    await db.ingresos.add(ingreso);
  }
  
  async function eliminarIngreso(id: number): Promise<void> {
    await db.ingresos.delete(id);
  }
  
  async function agregarGasto(gasto: Omit<Deuda, 'id'>): Promise<void> {
    await db.deudas.add(gasto);
  }
  
  async function eliminarGasto(id: number): Promise<void> {
    await db.deudas.delete(id);
  }

  async function agregarAhorro(ahorro: Omit<Ahorro, 'id'>): Promise<void> {
    await db.ahorros.add(ahorro);
  }

  async function eliminarAhorro(id: number): Promise<void> {
    await db.ahorros.delete(id);
  }
  
  async function resetearDatos(): Promise<void> {
    await db.configuracion.clear();
    await db.ingresos.clear();
    await db.deudas.clear();
    await db.ahorros.clear();
  }

  // ----------------------------------------
  // RETORNAR VALORES Y FUNCIONES
  // ----------------------------------------
  
  return {
    // Datos crudos
    configuracion,
    ingresos, // Ya vienen ordenados por fecha desc
    gastos,   // Ya vienen ordenados por fecha desc
    ahorros: todosLosAhorros, // Todos los ahorros para historial
    
    // Valores calculados
    tasaImpuestos,
    ingresoBruto,
    totalGastos,
    ingresoNeto,
    totalAhorros,
    
    // Funciones
    guardarConfiguracion,
    agregarIngreso,
    eliminarIngreso,
    agregarGasto,
    eliminarGasto,
    agregarAhorro,
    eliminarAhorro,
    resetearDatos,
  };
}
