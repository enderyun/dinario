// ============================================
// TIPOS PARA DINARIO PWA
// ============================================

/**
 * Configuración general del usuario
 */
export interface Configuracion {
  id?: number;
  tasaImpuestos: number; // Ej: 0.15 para 15%
}

/**
 * Ingreso (Transacción puntual)
 */
export interface Ingreso {
  id?: number;
  fecha: string; // Formato: YYYY-MM-DD
  monto: number;
  descripcion: string;
}

/**
 * Deuda o gasto (Transacción puntual)
 */
export interface Deuda {
  id?: number;
  nombre: string;
  monto: number;
  fecha: string; // Formato: YYYY-MM-DD
}

/**
 * Ahorro
 */
export interface Ahorro {
  id?: number;
  fecha: string;
  monto: number;
  descripcion: string;
}

/**
 * Variantes para las KPI Cards
 */
export type KpiVariant = 'income' | 'expense' | 'available' | 'savings';
