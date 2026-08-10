import { Wallet, Home, Users, Clock, HeartHandshake, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Wallet,
    title: 'Ingreso mensual fijo',
    description: 'Recibe pagos mensuales estables por hasta 20 años. Una fuente de ingresos confiable para tu día a día.',
    highlight: true,
  },
  {
    icon: Home,
    title: 'Pago inicial opcional',
    description: 'Posibilidad de recibir un monto inicial para saldar deudas, refaccionar tu casa o cubrir gastos importantes.',
    highlight: true,
  },
  {
    icon: Users,
    title: 'Pagos heredables',
    description: 'Tus seres queridos continuarán recibiendo los beneficios. Tranquilidad para ti y tu familia.',
    highlight: true,
  },
  {
    icon: Clock,
    title: 'Tú decides los plazos',
    description: 'Flexibilidad para elegir el período que mejor se adapte a tus necesidades y proyectos.',
    highlight: false,
  },
  {
    icon: HeartHandshake,
    title: 'Acompañamiento personal',
    description: 'Un especialista te guiará en cada paso del proceso, respondiendo todas tus dudas.',
    highlight: false,
  },
  {
    icon: Shield,
    title: 'Transparencia total',
    description: 'Sin letras chicas ni sorpresas. Te explicamos todo de forma clara y sencilla.',
    highlight: false,
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#C47A4A]/10 rounded-full text-sm font-medium text-[#C47A4A] mb-4">
            Ventajas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2F33] mb-4">
            Lo que obtienes con Magnus
          </h2>
          <p className="text-lg text-[#4B5563]">
            Diseñado para transformar el valor de tu propiedad en bienestar real, 
            sin complicaciones ni preocupaciones.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card-magnus ${
                benefit.highlight
                  ? 'border-2 border-[#C47A4A]/30 relative overflow-hidden'
                  : ''
              }`}
            >
              {benefit.highlight && (
                <div className="absolute top-0 right-0 bg-[#C47A4A] text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Principal
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  benefit.highlight
                    ? 'bg-[#C47A4A]/20'
                    : 'bg-[#1B6E6A]/10'
                }`}
              >
                <benefit.icon
                  className={`w-7 h-7 ${
                    benefit.highlight ? 'text-[#C47A4A]' : 'text-[#1B6E6A]'
                  }`}
                />
              </div>

              <h3 className="text-xl font-semibold text-[#0B2F33] mb-3">
                {benefit.title}
              </h3>

              <p className="text-[#4B5563] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl text-[#0B2F33] font-medium italic mb-4">
              "Tu casa sigue siendo tu refugio, pero ahora también es tu sustento."
            </p>
            <footer className="text-[#6B7280]">
              — El equipo Magnus
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
