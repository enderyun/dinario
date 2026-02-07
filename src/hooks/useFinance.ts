import { useLiveQuery } from 'dexie-react-hooks';
import { db, DEFAULT_CONFIGURACION } from '../db';
import { getCurrentMonthRange } from '../utils/formatCurrency';
import type { Configuracion, IngresoDiario, Deuda } from '../types';

// ============================================
// HOOK PRINCIPAL DE FINANZAS
// ============================================

export function useFinance() {
  // ----------------------------------------
  // OBTENER DATOS DE LA BASE DE DATOS
  // ----------------------------------------
  
  const configuracion = useLiveQuery(
    () => db.configuracion.toCollection().first()
  );
  
  const deudas = useLiveQuery(
    () => db.deudas.toArray()
  ) ?? [];
  
  // Ingresos del mes actual
  const { startDate, endDate } = getCurrentMonthRange();
  const ingresosMesActual = useLiveQuery(
    () => db.ingresosDiarios
      .where('fecha')
      .between(startDate, endDate, true, true)
      .toArray()
  ) ?? [];

  // ----------------------------------------
  // VALORES CALCULADOS
  // ----------------------------------------
  
  const tipoIngreso = configuracion?.tipoIngreso ?? 'mensual';
  const salarioMensual = configuracion?.salarioMensual ?? 0;
  const tasaImpuestos = configuracion?.tasaImpuestos ?? DEFAULT_CONFIGURACION.tasaImpuestos;
  
  // Calcular ingreso bruto mensual
  let ingresoBrutoMensual: number;
  if (tipoIngreso === 'mensual') {
    ingresoBrutoMensual = salarioMensual;
  } else {
    // Sumar todos los ingresos del mes
    ingresoBrutoMensual = ingresosMesActual.reduce(
      (total, ingreso) => total + ingreso.monto, 
      0
    );
  }
  
  // Calcular ingreso neto (después de impuestos)
  const ingresoNeto = ingresoBrutoMensual * (1 - tasaImpuestos);
  
  // Calcular total de deudas/gastos fijos
  const totalDeudas = deudas.reduce(
    (total, deuda) => total + deuda.monto, 
    0
  );
  
  // Calcular dinero disponible
  const disponible = ingresoNeto - totalDeudas;

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
  
  async function agregarIngresoDiario(ingreso: Omit<IngresoDiario, 'id'>): Promise<void> {
    await db.ingresosDiarios.add(ingreso);
  }
  
  async function eliminarIngresoDiario(id: number): Promise<void> {
    await db.ingresosDiarios.delete(id);
  }
  
  async function agregarDeuda(deuda: Omit<Deuda, 'id'>): Promise<void> {
    await db.deudas.add(deuda);
  }
  
  async function eliminarDeuda(id: number): Promise<void> {
    await db.deudas.delete(id);
  }
  
  async function resetearDatos(): Promise<void> {
    await db.configuracion.clear();
    await db.ingresosDiarios.clear();
    await db.deudas.clear();
  }

  // ----------------------------------------
  // RETORNAR VALORES Y FUNCIONES
  // ----------------------------------------
  
  return {
    // Datos crudos
    configuracion,
    deudas,
    ingresosMesActual,
    
    // Valores calculados
    tipoIngreso,
    salarioMensual,
    tasaImpuestos,
    ingresoBrutoMensual,
    ingresoNeto,
    totalDeudas,
    disponible,
    
    // Funciones
    guardarConfiguracion,
    agregarIngresoDiario,
    eliminarIngresoDiario,
    agregarDeuda,
    eliminarDeuda,
    resetearDatos,
  };
}
