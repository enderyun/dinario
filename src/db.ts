import Dexie, { type EntityTable } from 'dexie';
import type { Configuracion, IngresoDiario, Deuda } from './types';

// ============================================
// BASE DE DATOS DINARIO (IndexedDB con Dexie)
// ============================================

class DinarioDB extends Dexie {
  configuracion!: EntityTable<Configuracion, 'id'>;
  ingresosDiarios!: EntityTable<IngresoDiario, 'id'>;
  deudas!: EntityTable<Deuda, 'id'>;

  constructor() {
    super('DinarioDB');
    
    this.version(2).stores({
      configuracion: '++id, tipoIngreso, salarioMensual, tasaImpuestos',
      ingresosDiarios: '++id, fecha, monto, descripcion',
      deudas: '++id, nombre, monto, diaPago',
    });
  }
}

export const db = new DinarioDB();

// ============================================
// VALORES POR DEFECTO
// ============================================

export const DEFAULT_CONFIGURACION: Omit<Configuracion, 'id'> = {
  tipoIngreso: 'mensual',
  salarioMensual: 0,
  tasaImpuestos: 0.00, // Esto hay que quitarlo, o buscar una manera de que el usuario sea 
  // el que ingrese el porcentaje de impuestos que se le descuenta de su salario. Probablemente 
  // se elimine porque la idea central es agregar los ingresos netos, no el bruto.
};
