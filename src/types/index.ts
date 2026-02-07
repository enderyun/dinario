// ============================================
// TIPOS PARA DINARIO PWA
// ============================================

/**
 * Configuración general del usuario
 */
export interface Configuracion {
  id?: number;
  tipoIngreso: 'mensual' | 'diario';
  salarioMensual: number;
  tasaImpuestos: number; // Ej: 0.15 para 15%
}

/**
 * Ingreso diario (cuando tipoIngreso = 'diario')
 */
export interface IngresoDiario {
  id?: number;
  fecha: string; // Formato: YYYY-MM-DD
  monto: number;
  descripcion: string;
}

/**
 * Deuda o gasto fijo mensual
 */
export interface Deuda {
  id?: number;
  nombre: string;
  monto: number;
  diaPago: number;
}

/**
 * Variantes para las KPI Cards
 */
export type KpiVariant = 'income' | 'expense' | 'available';
