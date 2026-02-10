import { useState } from 'react';
import { useFinance } from './useFinance';
import type { Configuracion } from '../types';

export function useSettingsForm() {
  const { configuracion, guardarConfiguracion } = useFinance();
  
  // Inicializamos el estado con los valores de configuración si existen
  const [tipoIngreso, setTipoIngreso] = useState<'mensual' | 'diario'>(
    configuracion?.tipoIngreso ?? 'mensual'
  );
  
  const [salarioMensual, setSalarioMensual] = useState(
    configuracion?.salarioMensual?.toString() ?? ''
  );
  
  const [tasaImpuestos, setTasaImpuestos] = useState(
    configuracion ? (configuracion.tasaImpuestos * 100).toString() : ''
  );
  
  const [guardado, setGuardado] = useState(false);

  const handleSave = async (e?: React.FormEvent, overrides?: Partial<Configuracion>) => {
    if (e) e.preventDefault();
    
    const salarioNumero = parseFloat(salarioMensual) || 0;
    const impuestosNumero = parseFloat(tasaImpuestos) || 0;
    
    await guardarConfiguracion({
      tipoIngreso,
      salarioMensual: salarioNumero,
      tasaImpuestos: impuestosNumero / 100,
      ...overrides
    });
    
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return {
    tipoIngreso,
    setTipoIngreso,
    salarioMensual,
    setSalarioMensual,
    tasaImpuestos,
    setTasaImpuestos,
    guardado,
    handleSave,
    isLoading: !configuracion
  };
}
