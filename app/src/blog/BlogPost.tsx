import { getPostBySlug, getRelatedPosts } from './posts';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
  onPostClick: (slug: string) => void;
}

export default function BlogPost({ slug, onBack, onPostClick }: BlogPostProps) {
  const post = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#0B2F33] mb-4">Artículo no encontrado</h1>
          <button onClick={onBack} className="btn-primary">
            <ArrowLeft className="w-5 h-5" />
            Volver al blog
          </button>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#0B2F33] hover:text-[#C47A4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al blog</span>
            </button>
            <img
              src="/magnus_wordmark_primary.png"
              alt="Magnus"
              className="h-8 w-auto"
            />
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Article Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B2F33] to-[#1B6E6A]">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            post.category === 'b2c' 
              ? 'bg-[#1B6E6A]/30 text-white' 
              : post.category === 'b2b'
              ? 'bg-[#C47A4A]/30 text-white'
              : 'bg-white/20 text-white'
          }`}>
            {post.categoryLabel}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-white/80 mb-8">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-white">{post.author}</p>
                <p className="text-sm">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.date).toLocaleDateString('es-CL', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime} de lectura
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image Placeholder */}
          <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-[#1B6E6A]/20 to-[#C47A4A]/20 rounded-2xl mb-12 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-[#1B6E6A]">M</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-[#0B2F33] mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-[#0B2F33] mt-8 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('|')) {
                // Table rendering would go here
                return (
                  <div key={index} className="my-6 overflow-x-auto">
                    <pre className="bg-[#F4EFE6] p-4 rounded-lg text-sm">
                      {paragraph}
                    </pre>
                  </div>
                );
              }
              return (
                <p key={index} className="text-[#4B5563] leading-relaxed mb-4">
                  {paragraph.split('**').map((part, i) => 
                    i % 2 === 0 ? part : <strong key={i} className="text-[#0B2F33]">{part}</strong>
                  )}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D5]">
            <p className="text-sm text-[#6B7280] mb-3">Etiquetas:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#F4EFE6] rounded-full text-sm text-[#4B5563]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-[#E5E0D5]">
            <p className="text-sm text-[#6B7280] mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir:
            </p>
            <div className="flex gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0B2F33] mb-8">
              Artículos relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <article
                  key={relatedPost.id}
                  onClick={() => onPostClick(relatedPost.slug)}
                  className="bg-[#F4EFE6] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                >
                  <div className="h-40 bg-gradient-to-br from-[#1B6E6A]/20 to-[#C47A4A]/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1B6E6A]">M</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                      relatedPost.category === 'b2c' 
                        ? 'bg-[#1B6E6A]/10 text-[#1B6E6A]' 
                        : relatedPost.category === 'b2b'
                        ? 'bg-[#C47A4A]/10 text-[#C47A4A]'
                        : 'bg-[#0B2F33]/10 text-[#0B2F33]'
                    }`}>
                      {relatedPost.categoryLabel}
                    </span>
                    <h3 className="font-semibold text-[#0B2F33] group-hover:text-[#C47A4A] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B2F33]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Te interesa liberar el valor de tu propiedad?
          </h2>
          <p className="text-white/70 mb-8">
            Descubre cuánto podrías recibir mensualmente con nuestra calculadora 
            o pre-regístrate para ser contactado por un especialista.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onBack} className="btn-primary">
              Ir al simulador
            </button>
            <button onClick={onBack} className="btn-secondary border-white text-white hover:bg-white hover:text-[#0B2F33]">
              Pre-registrarme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
