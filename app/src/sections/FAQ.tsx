import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from '../config/contact';

const faqs = [
  {
    question: '¿Esto me obliga a algo?',
    answer: 'No, absolutamente nada. El pre-registro es solo para que podamos contactarte cuando lancemos Magnus y explicarte las opciones disponibles. Registrar tus datos no significa que debas avanzar con el proceso. Tú decides en cada paso si quieres continuar o no.',
  },
  {
    question: '¿Qué pasa con mis datos?',
    answer: 'Tus datos se usan exclusivamente para evaluar si tu propiedad aplica al programa y para contactarte sobre Magnus. No los compartimos con terceros ni los usamos para otros fines. Puedes pedirnos que eliminemos tu información en cualquier momento escribiendo a hola@soymagnus.com.',
  },
  {
    question: '¿Qué significa que los pagos sean heredables?',
    answer: 'Significa que si algo te pasara, tus seres queridos (herederos designados) continuarían recibiendo los pagos mensuales según lo acordado. Es una forma de asegurar el bienestar de tu familia incluso después de ti.',
  },
  {
    question: '¿Puedo recibir un pago inicial?',
    answer: 'Sí, dependiendo del valor de tu propiedad y tu situación, podrías recibir un pago inicial (también llamado "pie") para saldar deudas, refaccionar tu casa, cubrir gastos médicos u otros objetivos importantes. El monto máximo es el 10% del valor de tasación de tu propiedad.',
  },
  {
    question: '¿Cuánto demoran en contactarme?',
    answer: 'Una vez que lancemos oficialmente, nos pondremos en contacto contigo dentro de las primeras 48 horas hábiles. Te llamaremos al teléfono que nos proporcionaste y también te enviaremos un email confirmando que recibimos tu pre-registro.',
  },
  {
    question: '¿Qué tipo de propiedades aplican?',
    answer: 'Generalmente evaluamos casas y departamentos en buen estado, ubicados en zonas urbanas con valor de tasación desde 5.000 UF. Cada propiedad se evalúa de manera individual considerando su ubicación, estado, documentación y otros factores. El pre-registro nos ayuda a determinar si tu propiedad podría calificar.',
  },
  {
    question: '¿Pierdo mi propiedad con Magnus?',
    answer: 'Tu mantienes el uso prioritario de tu propiedad mediante un contrato de arriendo que dura al menos la duración total pactada en la Compra-Venta. Magnus se hará cargo de la compra de tu propiedad. De esta manera, logras acceder al valor acumulado de tu propiedad mientras sigues viviendo en ella. La estructura legal específica te la explicaremos en detalle cuando te contactemos, pero es más simple de lo que suena.',
  },
  {
    question: '¿Necesito que mis hijos estén de acuerdo?',
    answer: 'No es obligatorio, pero sí recomendamos conversarlo con tu familia. Por eso, cuando te contactemos, ofrecemos la posibilidad de incluir a tus hijos o herederos en la conversación. La transparencia es fundamental para nosotros.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section section-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#1B6E6A]/10 rounded-full text-sm font-medium text-[#1B6E6A] mb-4">
            <HelpCircle className="w-4 h-4 inline mr-2" />
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2F33] mb-4">
            Resolvemos tus dudas
          </h2>
          <p className="text-lg text-[#4B5563]">
            Estas son las preguntas más comunes que recibimos. 
            Si no encuentras tu respuesta, escríbenos.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-[#0B2F33] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1B6E6A] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 fade-in">
                  <div className="pt-2 border-t border-[#E5E0D5]">
                    <p className="text-[#4B5563] leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-[#0B2F33] mb-3">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-[#4B5563] mb-6">
            Estamos aquí para ayudarte. Llámanos o escríbenos y te responderemos
            lo antes posible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT_PHONE_HREF}
              className="btn-primary inline-flex"
              aria-label={`Llamar a Magnus al ${CONTACT_PHONE_DISPLAY}`}
            >
              <Phone className="w-5 h-5" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="btn-secondary inline-flex"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
