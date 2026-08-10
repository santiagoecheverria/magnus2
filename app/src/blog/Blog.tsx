import { useState } from 'react';
import { blogPosts } from './posts';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';

interface BlogProps {
  onPostClick: (slug: string) => void;
}

export default function Blog({ onPostClick }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Todos', count: blogPosts.length },
    { id: 'b2c', label: 'Adultos Mayores', count: blogPosts.filter(p => p.category === 'b2c').length },
    { id: 'b2b', label: 'Inversionistas', count: blogPosts.filter(p => p.category === 'b2b').length },
    { id: 'general', label: 'General', count: blogPosts.filter(p => p.category === 'general').length },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B2F33] to-[#1B6E6A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/80 mb-4">
              Blog Magnus
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Conocimiento que transforma
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Artículos, guías y análisis sobre planificación patrimonial, 
              inversiones inmobiliarias y bienestar para adultos mayores.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D5] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E0D5] rounded-xl focus:border-[#1B6E6A] focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#C47A4A] text-white'
                      : 'bg-[#F4EFE6] text-[#4B5563] hover:bg-[#E5E0D5]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-[#6B7280]">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  onClick={() => onPostClick(post.slug)}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group ${
                    index === 0 && selectedCategory === 'all' ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  {/* Image Placeholder */}
                  <div className={`bg-gradient-to-br from-[#1B6E6A]/20 to-[#C47A4A]/20 ${
                    index === 0 && selectedCategory === 'all' ? 'h-64' : 'h-48'
                  } flex items-center justify-center`}>
                    <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#1B6E6A]">M</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      post.category === 'b2c' 
                        ? 'bg-[#1B6E6A]/10 text-[#1B6E6A]' 
                        : post.category === 'b2b'
                        ? 'bg-[#C47A4A]/10 text-[#C47A4A]'
                        : 'bg-[#0B2F33]/10 text-[#0B2F33]'
                    }`}>
                      {post.categoryLabel}
                    </span>

                    {/* Title */}
                    <h2 className={`font-bold text-[#0B2F33] mb-3 group-hover:text-[#C47A4A] transition-colors ${
                      index === 0 && selectedCategory === 'all' ? 'text-2xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#4B5563] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('es-CL', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#E5E0D5]">
                      <div className="w-10 h-10 bg-[#1B6E6A]/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#1B6E6A]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0B2F33] text-sm">{post.author}</p>
                        <p className="text-xs text-[#6B7280]">{post.authorRole}</p>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-[#C47A4A] font-medium group-hover:gap-3 transition-all">
                      <span>Leer artículo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B2F33]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Recibe nuestros artículos en tu email
          </h2>
          <p className="text-white/70 mb-8">
            Suscríbete para recibir contenido exclusivo sobre planificación patrimonial, 
            inversiones y bienestar para adultos mayores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-[#C47A4A]"
            />
            <button className="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
