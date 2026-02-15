import { useState } from 'react';
import { useFinance } from './useFinance';
import type { Configuracion } from '../types';

export function useSettingsForm() {
  const { configuracion, guardarConfiguracion } = useFinance();
  
  const [tasaImpuestos, setTasaImpuestos] = useState(
    configuracion ? (configuracion.tasaImpuestos * 100).toString() : ''
  );
  
  const [guardado, setGuardado] = useState(false);

  const handleSave = async (e?: SubmitEvent, overrides?: Partial<Configuracion>) => {
    if (e) e.preventDefault();
    
    const impuestosNumero = parseFloat(tasaImpuestos) || 0;
    
    await guardarConfiguracion({
      tasaImpuestos: impuestosNumero / 100,
      ...overrides
    });
    
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return {
    tasaImpuestos,
    setTasaImpuestos,
    guardado,
    handleSave,
    isLoading: !configuracion
  };
}
