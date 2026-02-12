import Dexie, { type EntityTable } from 'dexie';
import type { Configuracion, Ingreso, Deuda, Ahorro } from './types';

// ============================================
// BASE DE DATOS DINARIO (IndexedDB con Dexie)
// ============================================

class DinarioDB extends Dexie {
  configuracion!: EntityTable<Configuracion, 'id'>;
  ingresos!: EntityTable<Ingreso, 'id'>;
  deudas!: EntityTable<Deuda, 'id'>;
  ahorros!: EntityTable<Ahorro, 'id'>;

  constructor() {
    super('DinarioDB');
    
    // Versión anterior (mantener por si acaso, aunque no migramos datos complejos aquí)
    this.version(2).stores({
      configuracion: '++id, tipoIngreso, salarioMensual, tasaImpuestos',
      ingresosDiarios: '++id, fecha, monto, descripcion',
      deudas: '++id, nombre, monto, diaPago',
    });

    // Nueva versión 3
    this.version(3).stores({
      configuracion: '++id, tasaImpuestos',
      ingresos: '++id, fecha, monto, descripcion', // Renombrado de ingresosDiarios
      deudas: '++id, nombre, monto, fecha', // Cambiado diaPago por fecha
      ahorros: '++id, fecha, monto, descripcion' // Nueva tabla
    });
  }
}

export const db = new DinarioDB();

// ============================================
// VALORES POR DEFECTO
// ============================================

export const DEFAULT_CONFIGURACION: Omit<Configuracion, 'id'> = {
  tasaImpuestos: 0.00, // El usuario lo configura a su gusto
};
