import { useState, useMemo } from 'react';
import { Calculator as CalcIcon, Info, TrendingUp } from 'lucide-react';

// Valor UF actualizado según Excel
const UF_VALUE = 39708.63;

export default function Calculator() {
  // Estados del formulario - valores iniciales según Excel
  const [tasacionUF, setTasacionUF] = useState<number>(10000);
  const [pieUF, setPieUF] = useState<number>(500);
  const [cuotas, setCuotas] = useState<number>(120);

  // Cálculos memoizados según fórmula del Excel
  const resultados = useMemo(() => {
    // Validaciones
    const pieMaximo = Math.floor(tasacionUF * 0.1);
    const pieValido = Math.min(pieUF, pieMaximo);
    const cuotasValidas = Math.max(60, Math.min(240, cuotas));
    
    // PASO 1: Aplicar descuento del 2.4% al valor de tasación
    // Valor ajustado = Tasación × (1 - 0.024)
    const valorTasacionPesos = tasacionUF * UF_VALUE;
    const valorAjustadoPesos = valorTasacionPesos * (1 - 0.024);
    
    // PASO 2: Restar el Pie
    // Monto a financiar = Valor ajustado - Pie
    const piePesos = pieValido * UF_VALUE;
    const montoFinanciarPesos = valorAjustadoPesos - piePesos;
    
    // PASO 3: Calcular cuota base (dividir por cuotas)
    // Cuota base = Monto a financiar / Cuotas
    const cuotaBasePesos = montoFinanciarPesos / cuotasValidas;
    
    // PASO 4: Calcular valor del arriendo (0.5% mensual del valor de tasación)
    // Arriendo = Tasación × 0.5%
    const arriendoEstimado = valorTasacionPesos * 0.005;
    
    // PASO 5: Liquidación mensual = Cuota base - Arriendo - Gestión administrativa
    // Gestión administrativa: 2,4 UF mensuales
    const gestionAdministrativa = 2.4 * UF_VALUE;
    const liquidacionMensual = cuotaBasePesos - arriendoEstimado - gestionAdministrativa;
    
    // Pago mensual total (lo que recibe el usuario)
    const pagoMensualTotal = liquidacionMensual + arriendoEstimado;
    
    return {
      cuotaMensual: Math.round(liquidacionMensual),
      arriendoEstimado: Math.round(arriendoEstimado),
      pagoMensualTotal: Math.round(pagoMensualTotal),
      pieMaximo,
      cuotasValidas,
      pieValido,
      valorAjustado: Math.round(valorAjustadoPesos),
      montoFinanciar: Math.round(montoFinanciarPesos),
    };
  }, [tasacionUF, pieUF, cuotas]);

  // Formatear números
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatUF = (value: number): string => {
    return `${value.toLocaleString('es-CL')} UF`;
  };

  return (
    <section className="section" id="simulador">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-[#C47A4A]/10 rounded-full text-sm font-medium text-[#8A4E2E] mb-4">
            <CalcIcon className="w-4 h-4 inline mr-2" />
            Simulador
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2F33] mb-4">
            ¿Cuánto podría recibir?
          </h2>
          <p className="text-lg text-[#4B5563]">
            Ajusta los valores para obtener una referencia de cuánto podrías 
            recibir mensualmente con Magnus.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Controls */}
          <div className="card-magnus">
            <h3 className="text-xl font-semibold text-[#0B2F33] mb-6">
              Ajusta los valores
            </h3>

            {/* Tasación */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="label-magnus">
                  Valor de tasación de tu propiedad
                </label>
                <span className="text-[#1B6E6A] font-semibold">
                  {formatUF(tasacionUF)}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="500"
                value={tasacionUF}
                onChange={(e) => setTasacionUF(Number(e.target.value))}
                className="slider-magnus mb-3"
              />
              <div className="flex justify-between text-xs text-[#3D4E52]">
                <span>3.000 UF</span>
                <span>15.000 UF</span>
              </div>
              <p className="helper-text mt-2">
                <Info className="w-4 h-4 inline mr-1" />
                Rango: 3.000 a 15.000 UF. Valor estimado de tu propiedad en el mercado.
              </p>
            </div>

            {/* Pie */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="label-magnus">
                  Pago inicial que necesitas
                </label>
                <span className="text-[#1B6E6A] font-semibold">
                  {formatUF(pieUF)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={resultados.pieMaximo}
                step="100"
                value={Math.min(pieUF, resultados.pieMaximo)}
                onChange={(e) => setPieUF(Number(e.target.value))}
                className="slider-magnus mb-3"
              />
              <div className="flex justify-between text-xs text-[#3D4E52]">
                <span>0 UF</span>
                <span>Máx: {formatUF(resultados.pieMaximo)} (10%)</span>
              </div>
              <p className="helper-text mt-2">
                <Info className="w-4 h-4 inline mr-1" />
                Máximo 10% del valor de tasación. Para deudas u otros gastos.
              </p>
            </div>

            {/* Cuotas */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <label className="label-magnus">
                  Plazo en meses
                </label>
                <span className="text-[#1B6E6A] font-semibold">
                  {cuotas} meses
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="240"
                step="12"
                value={cuotas}
                onChange={(e) => setCuotas(Number(e.target.value))}
                className="slider-magnus mb-3"
              />
              <div className="flex justify-between text-xs text-[#3D4E52]">
                <span>5 años (60)</span>
                <span>20 años (240)</span>
              </div>
              <p className="helper-text mt-2">
                <Info className="w-4 h-4 inline mr-1" />
                Entre 5 y 20 años. A mayor plazo, menor cuota mensual.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            {/* Main Result */}
            <div className="result-box">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-[#E3A579]" />
                <span className="text-lg text-white/80">Ingreso mensual estimado</span>
              </div>
              <div className="result-amount mb-2">
                {formatCurrency(resultados.pagoMensualTotal)}
              </div>
              <p className="text-white/70 text-sm">
                Aproximadamente {(resultados.pagoMensualTotal / UF_VALUE).toFixed(1)} UF mensuales
              </p>
            </div>

            {/* Breakdown */}
            <div className="card-magnus">
              <h4 className="text-lg font-semibold text-[#0B2F33] mb-4">
                Desglose del pago mensual
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[#E5E0D5]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1B6E6A]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#1B6E6A] font-semibold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#0B2F33]">Liquidación mensual</p>
                      <p className="text-sm text-[#3D4E52]">Transferencia a tu cuenta</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#0B2F33]">
                    {formatCurrency(resultados.cuotaMensual)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C47A4A]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#8A4E2E] font-semibold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#0B2F33]">Monto por arriendo</p>
                      <p className="text-sm text-[#3D4E52]">Uso de la propiedad</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#0B2F33]">
                    {formatCurrency(resultados.arriendoEstimado)}
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#1B6E6A]/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#0B2F33] mb-4">
                Resumen de tu simulación
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#3D4E52]">Valor propiedad</p>
                  <p className="font-semibold text-[#0B2F33]">
                    {formatCurrency(tasacionUF * UF_VALUE)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#3D4E52]">Pago inicial</p>
                  <p className="font-semibold text-[#0B2F33]">
                    {formatCurrency(resultados.pieValido * UF_VALUE)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#3D4E52]">Plazo</p>
                  <p className="font-semibold text-[#0B2F33]">
                    {Math.floor(cuotas / 12)} años
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#3D4E52]">Total recibido</p>
                  <p className="font-semibold text-[#8A4E2E]">
                    {formatCurrency(resultados.pagoMensualTotal * cuotas + resultados.pieValido * UF_VALUE)}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[#3D4E52] text-center">
              <Info className="w-4 h-4 inline mr-1" />
              Estos valores son referenciales. Los montos finales dependen de la 
              evaluación específica de tu propiedad y situación.
            </p>
            <p className="text-xs text-[#3D4E52] text-center italic">
              * El valor de la cuota es reajustado en UF mensualmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
