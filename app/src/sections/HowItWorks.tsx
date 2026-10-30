import { ClipboardCheck, Search, Phone, FileCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Completa tu pre-registro',
    description: 'Ingresa los datos de tu propiedad (ciudad, comuna, rol) y tus datos de contacto. Toma menos de 5 minutos.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Revisamos tu información',
    description: 'Nuestro equipo analiza los datos de tu propiedad para determinar si aplica al programa Magnus.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Te contactamos',
    description: 'Un especialista te llamará para explicarte una propuesta personalizada según tu situación.',
    icon: Phone,
  },
  {
    number: '04',
    title: 'Avanzas si te interesa',
    description: 'Si la propuesta te convence, recibirás asesoría legal y apoyo en toda la documentación.',
    icon: FileCheck,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#1B6E6A]/10 rounded-full text-sm font-medium text-[#1B6E6A] mb-4">
            El proceso
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2F33] mb-4">
            Así funciona Magnus
          </h2>
          <p className="text-lg text-[#4B5563]">
            Menos burocracia, más claridad. En solo 4 pasos simples puedes 
            empezar a transformar el valor de tu propiedad en bienestar.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="card-magnus relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-2 w-12 h-12 bg-[#8A4E2E] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#1B6E6A]/10 rounded-xl flex items-center justify-center mb-4 mt-4">
                <step.icon className="w-7 h-7 text-[#1B6E6A]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0B2F33] mb-3">
                {step.title}
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#E5E0D5]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#C47A4A] rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#3D4E52] inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-[#1B6E6A] rounded-full" />
            El pre-registro no te obliga a nada. Solo nos permite contactarte al lanzamiento.
          </p>
        </div>
      </div>
    </section>
  );
}
