import { Mail, MapPin, Phone, MessageCircle, Shield, Lock, Linkedin, Facebook, Instagram, BookOpen } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from '../config/contact';

interface FooterProps {
  onBlogClick?: () => void;
  onHomeClick?: () => void;
}

export default function Footer({ onBlogClick, onHomeClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2F33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/magnus_wordmark_inverse.png"
              alt="Magnus - Hipoteca Inversa Chile"
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/70 mb-4 max-w-md">
              Transformamos el valor acumulado de tu hogar en bienestar real. 
              Ingresos mensuales fijos por hasta 20 años con tu propiedad.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#E3A579]" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#1B6E6A]" />
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/soymagnus/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="LinkedIn Magnus"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity opacity-60"
                aria-label="Facebook Magnus (próximamente)"
                title="Próximamente"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity opacity-60"
                aria-label="Instagram Magnus (próximamente)"
                title="Próximamente"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onHomeClick}
                  className="text-white/70 hover:text-[#E3A579] transition-colors text-left"
                >
                  Inicio
                </button>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  onClick={(e) => { e.preventDefault(); onHomeClick?.(); }}
                  className="text-white/70 hover:text-[#E3A579] transition-colors"
                >
                  Cómo funciona
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  onClick={(e) => { e.preventDefault(); onHomeClick?.(); }}
                  className="text-white/70 hover:text-[#E3A579] transition-colors"
                >
                  Beneficios
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); onHomeClick?.(); }}
                  className="text-white/70 hover:text-[#E3A579] transition-colors"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <button
                  onClick={onBlogClick}
                  className="text-white/70 hover:text-[#E3A579] transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="text-white/70 hover:text-[#E3A579] transition-colors flex items-center gap-2"
                  aria-label={`Llamar a Magnus al ${CONTACT_PHONE_DISPLAY}`}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#E3A579] transition-colors flex items-center gap-2"
                  aria-label="Escribir a Magnus por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="text-white/70 hover:text-[#E3A579] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  Av. Isidora Goyenechea 3.000<br />
                  Las Condes, Santiago<br />
                  Chile
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} Magnus. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                Términos de servicio
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                Política de privacidad
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 py-6">
          <p className="text-white/70 text-xs text-center max-w-4xl mx-auto">
            Los valores mostrados en esta página son referenciales y estimados. 
            Los montos finales, plazos y condiciones dependen de la evaluación 
            específica de cada propiedad y situación personal. El pre-registro 
            no constituye una oferta vinculante. Magnus se reserva el derecho 
            de determinar la elegibilidad de cada propiedad según sus criterios 
            internos. Valor UF referencial: $39.708,63.
          </p>
        </div>
      </div>
    </footer>
  );
}
