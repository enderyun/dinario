import type { ReactNode } from 'react';
import type { KpiVariant } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

// ============================================
// COMPONENTE KPI CARD
// ============================================

interface KpiCardProps {
  title: string;
  value: number;
  subtitle?: string;
  variant: KpiVariant;
  icon: ReactNode;
}

export function KpiCard({ title, value, subtitle, variant, icon }: KpiCardProps) {
  // Clases según la variante
  const variantClasses: Record<KpiVariant, string> = {
    income: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    expense: 'bg-gradient-to-br from-red-500 to-red-600',
    available: 'bg-gradient-to-br from-blue-500 to-blue-600', // Net Income (Blue)
    savings: 'bg-gradient-to-br from-violet-500 to-violet-600', // Savings (Purple)
  };

  return (
    <div 
      className={`
        rounded-2xl p-6 text-white shadow-lg 
        transition-transform duration-300 hover:scale-[1.02]
        ${variantClasses[variant]}
      `}
    >
      {/* Título con ícono */}
      <div className="flex items-center gap-2 mb-2 text-white/80">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      {/* Valor */}
      <p className="text-2xl font-bold">
        {formatCurrency(value)}
      </p>
      
      {/* Subtítulo opcional */}
      {subtitle && (
        <p className="mt-1 text-xs text-white/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
