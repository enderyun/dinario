// ============================================
// UTILIDAD PARA FORMATEAR MONEDA (USD)
// ============================================

/**
 * Formatea un número como moneda en dólares estadounidenses
 * @param value - Número a formatear
 * @returns String formateado (ej: "$1,500")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Obtiene el mes y año actual en formato legible
 * @returns String con el mes y año (ej: "February 2026")
 */
export function getCurrentDate(): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 * @returns String con la fecha (ej: "2026-02-06")
 */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Obtiene el primer y último día del mes actual
 * @returns Objeto con startDate y endDate
 */
export function getCurrentMonthRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
  
  return { startDate, endDate };
}
