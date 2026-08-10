import { ArrowRight, Shield, ChevronDown } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onLearnMoreClick: () => void;
}

export default function Hero({ onRegisterClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#1B6E6A] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#C47A4A] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B6E6A]/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#1B6E6A]" />
              <span className="text-sm font-medium text-[#1B6E6A]">
                Próximo lanzamiento en Chile
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2F33] leading-tight mb-6">
              Tu casa te cuidó toda la vida.
              <span className="text-[#C47A4A]"> Ahora es su turno.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#4B5563] mb-8 max-w-xl mx-auto lg:mx-0">
              Recibe ingresos mensuales fijos por hasta 20 años con tu propiedad. 
              Opción de pago inicial para ordenar tus finanzas. 
              Sin perder tu hogar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <button
                onClick={onRegisterClick}
                className="btn-primary"
              >
                Pre-registrarme
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onLearnMoreClick}
                className="btn-secondary"
              >
                Entender cómo funciona
              </button>
            </div>

            {/* Trust Microcopy */}
            <p className="text-sm text-[#6B7280] flex items-center justify-center lg:justify-start gap-2">
              <Shield className="w-4 h-4 text-[#1B6E6A]" />
              Sin costo. Sin compromiso. Datos protegidos.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '560px' }}>
              <img
                src="/couple-happy.jpg"
                alt="Pareja de adultos mayores felices en su hogar"
                className="w-full h-full object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C47A4A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#C47A4A]">$</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Ingreso mensual estimado</p>
                    <p className="text-xl font-bold text-[#0B2F33]">
                      Desde $1.400.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-[#1B6E6A]/10 rounded-2xl" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex justify-center mt-16">
          <button
            onClick={onLearnMoreClick}
            className="flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#1B6E6A] transition-colors"
          >
            <span className="text-sm">Conoce más</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
