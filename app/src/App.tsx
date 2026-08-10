import { useState, useCallback, useEffect } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Benefits from './sections/Benefits';
import Trust from './sections/Trust';
import Calculator from './sections/Calculator';
import RegistrationForm from './sections/RegistrationForm';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import Blog from './blog/Blog';
import BlogPost from './blog/BlogPost';
import './App.css';

type ViewType = 'landing' | 'blog' | 'blog-post';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentPostSlug, setCurrentPostSlug] = useState<string>('');

  const openForm = useCallback(() => {
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const scrollToHowItWorks = useCallback(() => {
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navigateToBlog = useCallback(() => {
    setCurrentView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToPost = useCallback((slug: string) => {
    setCurrentPostSlug(slug);
    setCurrentView('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToLanding = useCallback(() => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update Header navigation based on current view
  useEffect(() => {
    if (currentView === 'landing') {
      document.title = 'Magnus | Ingresos mensuales con tu propiedad - Hipoteca Inversa Chile';
    } else if (currentView === 'blog') {
      document.title = 'Blog Magnus | Conocimiento sobre planificación patrimonial';
    } else if (currentView === 'blog-post') {
      document.title = 'Artículo | Blog Magnus';
    }
  }, [currentView]);

  // Render different views
  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return (
          <>
            <Blog onPostClick={navigateToPost} />
            <Footer onBlogClick={navigateToBlog} onHomeClick={navigateToLanding} />
          </>
        );
      case 'blog-post':
        return (
          <>
            <BlogPost 
              slug={currentPostSlug} 
              onBack={navigateToBlog} 
              onPostClick={navigateToPost}
            />
            <Footer onBlogClick={navigateToBlog} onHomeClick={navigateToLanding} />
          </>
        );
      default:
        return (
          <>
            <main>
              <Hero 
                onRegisterClick={openForm} 
                onLearnMoreClick={scrollToHowItWorks}
              />
              <HowItWorks />
              <Benefits />
              <Trust />
              <Calculator />
              <section id="pre-registro" className="section">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-[#0B2F33] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B6E6A]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C47A4A]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    <div className="relative z-10">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Listo para transformar tu patrimonio en bienestar?
                      </h2>
                      <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Pre-regístrate ahora y sé de los primeros en conocer Magnus. 
                        Sin costo, sin compromiso, con todos los datos protegidos.
                      </p>
                      <button
                        onClick={openForm}
                        className="btn-primary text-lg px-8 py-4"
                      >
                        Pre-registrarme ahora
                      </button>
                      <p className="text-white/60 text-sm mt-6 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Tus datos están seguros y protegidos
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <FAQ />
            </main>
            <Footer onBlogClick={navigateToBlog} onHomeClick={navigateToLanding} />
            <FloatingCTA onClick={openForm} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {currentView === 'landing' && <Header onRegisterClick={openForm} />}
      {renderContent()}
      <RegistrationForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  );
}

// Floating CTA Component
function FloatingCTA({ onClick }: { onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center gap-2 pr-4 border border-[#E5E0D5]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 bg-[#F4EFE6] rounded-full flex items-center justify-center hover:bg-[#E5E0D5] transition-colors"
          aria-label="Volver arriba"
        >
          <svg className="w-5 h-5 text-[#0B2F33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <span className="text-sm text-[#4B5563] hidden sm:inline">
          ¿Interesado?
        </span>
        <button
          onClick={onClick}
          className="btn-primary btn-small"
        >
          Pre-registrarme
        </button>
      </div>
    </div>
  );
}

export default App;
