import { Shield, Lock, UserCheck, Eye, Mail, Phone } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from '../config/contact';

export default function Trust() {
  return (
    <section className="section section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '504px' }}>
              <img
                src="/senior-happy.jpg"
                alt="Adulto mayor tranquilo en su hogar"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-6 -left-6 w-full h-full bg-[#C47A4A]/10 rounded-2xl" />
            
            {/* Trust Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl max-w-xs hidden lg:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1B6E6A]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1B6E6A]" />
                </div>
                <span className="font-semibold text-[#0B2F33]">Tu tranquilidad primero</span>
              </div>
              <p className="text-sm text-[#3D4E52]">
                Solo usamos tus datos para contactarte sobre Magnus. Nada más.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 bg-[#1B6E6A]/10 rounded-full text-sm font-medium text-[#1B6E6A] mb-4">
              Confianza y seguridad
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2F33] mb-6">
              Tu información está protegida
            </h2>
            
            <p className="text-lg text-[#4B5563] mb-8">
              Entendemos que compartir datos de tu propiedad y personales 
              requiere confianza. Por eso, te lo explicamos todo con claridad.
            </p>

            {/* Trust Points */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1B6E6A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#1B6E6A]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B2F33] mb-1">
                    ¿Qué pasa con mis datos?
                  </h3>
                  <p className="text-[#4B5563]">
                    Solo los usamos para evaluar si tu propiedad aplica y contactarte 
                    sobre Magnus. No los compartimos con terceros. Puedes pedir que 
                    los eliminemos en cualquier momento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#C47A4A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-[#8A4E2E]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B2F33] mb-1">
                    ¿Con quién hablaré?
                  </h3>
                  <p className="text-[#4B5563]">
                    Un especialista de nuestro equipo te llamará para explicarte 
                    la propuesta. Sin presión, sin técnicismos. Solo conversación 
                    clara y honesta.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1B6E6A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-[#1B6E6A]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B2F33] mb-1">
                    El pre-registro no te obliga a nada
                  </h3>
                  <p className="text-[#4B5563]">
                    Registrar tus datos no significa que debas avanzar. Es solo 
                    para que podamos contactarte cuando lancemos y explicarte 
                    las opciones disponibles.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-[#E5E0D5]">
              <p className="text-sm text-[#3D4E52] mb-4">
                ¿Tienes dudas antes de registrar tus datos?
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center gap-2 text-[#1B6E6A] hover:text-[#8A4E2E] transition-colors font-medium"
                  aria-label={`Llamar a Magnus al ${CONTACT_PHONE_DISPLAY}`}
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="inline-flex items-center gap-2 text-[#1B6E6A] hover:text-[#8A4E2E] transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
