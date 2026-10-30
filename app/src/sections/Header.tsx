import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '../config/contact';

interface HeaderProps {
  onRegisterClick: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Cómo funciona', id: 'como-funciona' },
    { label: 'Beneficios', id: 'beneficios' },
    { label: 'Preguntas frecuentes', id: 'faq' },
    { label: 'Pre-registro', id: 'pre-registro' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center"
          >
            <img
              src="/magnus_wordmark_primary.png"
              alt="Magnus"
              className="h-10 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link text-sm lg:text-base"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-2 text-[#0B2F33] font-semibold hover:text-[#8A4E2E] transition-colors text-sm lg:text-base"
              aria-label={`Llamar a Magnus al ${CONTACT_PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <button
              onClick={onRegisterClick}
              className="btn-primary btn-small"
            >
              Registrarme
            </button>
          </div>

          {/* Llamar - Mobile (siempre visible, junto al menú) */}
          <a
            href={CONTACT_PHONE_HREF}
            className="md:hidden ml-auto mr-1 p-2 rounded-lg text-[#0B2F33] hover:bg-gray-100 transition-colors"
            aria-label={`Llamar a Magnus al ${CONTACT_PHONE_DISPLAY}`}
          >
            <Phone className="w-6 h-6" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#0B2F33]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0B2F33]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-link text-left py-3 px-4 hover:bg-gray-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={CONTACT_PHONE_HREF}
                className="nav-link text-left py-3 px-4 hover:bg-gray-50 rounded-lg flex items-center gap-2 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <button
                onClick={() => {
                  onRegisterClick();
                  setIsMobileMenuOpen(false);
                }}
                className="btn-primary mx-4 mt-4"
              >
                Registrarme
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
