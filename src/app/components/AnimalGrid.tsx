import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { articles, categories, Article } from '../data/articles';
import { Search, Filter, Sparkles, Grid3x3, List, SortAsc, Eye, BookOpen, Calendar, ChevronDown, Flame, AlphabeticalIcon } from 'lucide-react';
import { ArticleDetail } from './ArticleDetail';
import { getArticleViews, getTrendingArticles } from '../utils/viewCounter';

interface AnimalGridProps {
  filterCategory?: string;
  filterSubcategory?: string | null;
}

// Configuration for video background
const VIDEO_CONFIG = {
  type: 'local', // 'youtube' or 'local'
  
  // YouTube video settings
  youtube: {
    videoId: 'FHE6z8WVXX0',
    quality: 'hd1080'
  },
  
  // Local video settings
  local: {
    src: '/videos/Lautan.mp4',
    poster: '/videos/poster.jpg'
  }
};

export function AnimalGrid({ filterCategory = 'all', filterSubcategory = null }: AnimalGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(filterCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(filterSubcategory);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'name'>('latest');
  const [articleViews, setArticleViews] = useState<{ [key: number]: number }>({});
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load view counts on mount and update periodically
  useEffect(() => {
    const loadViewCounts = () => {
      const views: { [key: number]: number } = {};
      articles.forEach(article => {
        views[article.id] = getArticleViews(article.id);
      });
      setArticleViews(views);
    };

    loadViewCounts();
    
    // Update view counts every 5 seconds to reflect real-time changes
    const interval = setInterval(loadViewCounts, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Update filters when props change
  useEffect(() => {
    setSelectedCategory(filterCategory);
    setSelectedSubcategory(filterSubcategory);
  }, [filterCategory, filterSubcategory]);

  // Load trending articles on mount
  useEffect(() => {
    const loadTrending = () => {
      setTrendingArticles(getTrendingArticles(articles, 4)); // Get top 4 trending
    };

    loadTrending();
    
    // Update trending articles every 5 minutes
    const interval = setInterval(loadTrending, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredArticles = articles
    .filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || article.subcategory === selectedSubcategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.scientificName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'popular') {
        // Use real-time view counts for sorting
        const viewsA = articleViews[a.id] || 0;
        const viewsB = articleViews[b.id] || 0;
        return viewsB - viewsA;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <>
      {/* Header Section with Video Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {VIDEO_CONFIG.type === 'youtube' ? (
            // YouTube Video Background
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_CONFIG.youtube.videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=${VIDEO_CONFIG.youtube.videoId}&enablejsapi=1&vq=${VIDEO_CONFIG.youtube.quality}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ 
                width: '100vw', 
                height: '56.25vw', // 16:9 aspect ratio
                minHeight: '100vh',
                minWidth: '177.77vh', // 16:9 aspect ratio
                border: 'none',
                opacity: 1
              }}
              allow="autoplay; encrypted-media"
              title="Background Video"
            />
          ) : (
            // Local Video Background
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={VIDEO_CONFIG.local.poster}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
              style={{ 
                width: '100vw', 
                height: '56.25vw', // 16:9 aspect ratio
                minHeight: '100vh',
                minWidth: '177.77vh', // 16:9 aspect ratio
              }}
            >
              <source src={VIDEO_CONFIG.local.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Top gradient fade for seamless navbar integration */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
          
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
          
          {/* Bottom fade to seamlessly blend with content below */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-emerald-200 via-primary to-emerald-400 bg-clip-text text-transparent tracking-tight drop-shadow-2xl">
              Ensiklopedia Hewan
            </h2>
            <p className="text-lg md:text-xl text-emerald-200/80 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Jelajahi koleksi lengkap {articles.length} artikel edukatif tentang Amfibi, Reptil, Ikan, dan Biota Laut
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-12 px-4 bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <div className="relative container mx-auto max-w-7xl z-10">
          {/* Search & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar with View Toggle and Sort */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur-xl" />
                <div className="relative backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama, nama ilmiah, atau deskripsi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-transparent text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-primary to-emerald-400 text-black shadow-lg'
                      : 'text-emerald-300 hover:bg-white/10'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-primary to-emerald-400 text-black shadow-lg'
                      : 'text-emerald-300 hover:bg-white/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown - Custom Premium */}
              <div ref={sortDropdownRef} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity" />
                <div className="relative backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl hover:border-primary/40 transition-all">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="w-full lg:w-56 px-4 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <SortAsc className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-emerald-100 text-sm">
                        {sortBy === 'latest' && 'Terbaru'}
                        {sortBy === 'popular' && 'Terpopuler'}
                        {sortBy === 'name' && 'Nama A-Z'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-300 flex-shrink-0 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isSortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl bg-gray-900/95 border-2 border-primary/30 rounded-2xl overflow-hidden shadow-2xl z-50"
                    >
                      {/* Terbaru */}
                      <button
                        onClick={() => {
                          setSortBy('latest');
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-all group ${
                          sortBy === 'latest'
                            ? 'bg-gradient-to-r from-primary/30 to-emerald-500/30 border-l-4 border-primary'
                            : 'hover:bg-white/10 border-l-4 border-transparent'
                        }`}
                      >
                        <Calendar className={`w-5 h-5 ${sortBy === 'latest' ? 'text-primary' : 'text-emerald-400'} group-hover:scale-110 transition-transform`} />
                        <span className={`text-sm font-medium ${sortBy === 'latest' ? 'text-primary' : 'text-emerald-200'}`}>
                          Terbaru
                        </span>
                        {sortBy === 'latest' && (
                          <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                      </button>

                      {/* Terpopuler */}
                      <button
                        onClick={() => {
                          setSortBy('popular');
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-all group ${
                          sortBy === 'popular'
                            ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-l-4 border-amber-400'
                            : 'hover:bg-white/10 border-l-4 border-transparent'
                        }`}
                      >
                        <Flame className={`w-5 h-5 ${sortBy === 'popular' ? 'text-amber-400' : 'text-emerald-400'} group-hover:scale-110 transition-transform`} />
                        <span className={`text-sm font-medium ${sortBy === 'popular' ? 'text-amber-400' : 'text-emerald-200'}`}>
                          Terpopuler
                        </span>
                        {sortBy === 'popular' && (
                          <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        )}
                      </button>

                      {/* Nama A-Z */}
                      <button
                        onClick={() => {
                          setSortBy('name');
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-all group ${
                          sortBy === 'name'
                            ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-l-4 border-blue-400'
                            : 'hover:bg-white/10 border-l-4 border-transparent'
                        }`}
                      >
                        <BookOpen className={`w-5 h-5 ${sortBy === 'name' ? 'text-blue-400' : 'text-emerald-400'} group-hover:scale-110 transition-transform`} />
                        <span className={`text-sm font-medium ${sortBy === 'name' ? 'text-blue-400' : 'text-emerald-200'}`}>
                          Nama A-Z
                        </span>
                        {sortBy === 'name' && (
                          <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-4 py-2 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-xl w-fit">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm text-emerald-300">Filter Kategori:</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedSubcategory(null);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    {selectedCategory === category.id && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                    )}
                    <div className={`relative px-6 py-3 rounded-2xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-black shadow-lg shadow-primary/30'
                        : 'backdrop-blur-xl bg-white/5 border border-primary/20 text-emerald-200 hover:bg-white/10 hover:border-primary/40'
                    }`}>
                      <span className="text-sm flex items-center gap-2">
                        {category.name}
                        <span className="text-xs opacity-70">({category.count})</span>
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Subcategory Filters */}
            {currentCategory && currentCategory.subcategories && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 pl-6 border-l-2 border-primary/30"
              >
                <div className="flex items-center gap-2 text-sm text-emerald-300/70">
                  <Sparkles className="w-4 h-4" />
                  <span>Subkategori:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all ${
                      !selectedSubcategory
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-white/5 text-emerald-300/70 hover:bg-white/10'
                    }`}
                  >
                    Semua
                  </button>
                  {currentCategory.subcategories.map((sub: any) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubcategory(sub.name)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedSubcategory === sub.name
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-white/5 text-emerald-300/70 hover:bg-white/10'
                      }`}
                    >
                      {sub.name} ({sub.count})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            {/* Sort Mode Indicator */}
            <motion.div 
              key={sortBy}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-primary/20 to-emerald-500/20 border-2 border-primary/40 rounded-xl shadow-lg"
            >
              {sortBy === 'latest' && (
                <>
                  <Calendar className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-emerald-300/60">Diurutkan:</span>
                  <span className="text-primary font-semibold">📅 Terbaru</span>
                </>
              )}
              {sortBy === 'popular' && (
                <>
                  <Eye className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-emerald-300/60">Diurutkan:</span>
                  <span className="text-amber-400 font-semibold">🔥 Terpopuler</span>
                </>
              )}
              {sortBy === 'name' && (
                <>
                  <BookOpen className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="text-emerald-300/60">Diurutkan:</span>
                  <span className="text-blue-400 font-semibold">🔤 Nama A-Z</span>
                </>
              )}
            </motion.div>

            <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-xl">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-emerald-400/60">Menampilkan</span>
              <span className="text-primary text-xl">{filteredArticles.length}</span>
              <span className="text-emerald-400/60">dari</span>
              <span className="text-primary text-xl">{articles.length}</span>
              <span className="text-emerald-400/60">artikel</span>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-xl">
              <Eye className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400/60">Total Views:</span>
              <span className="text-emerald-400 text-xl">
                {filteredArticles.reduce((sum, a) => sum + (articleViews[a.id] || 0), 0).toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Articles Grid/List */}
          {filteredArticles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <ArticleCardGrid article={article} articleViews={articleViews} onClick={() => setSelectedArticle(article)} />
                  ) : (
                    <ArticleCardList article={article} articleViews={articleViews} onClick={() => setSelectedArticle(article)} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="inline-block mb-6 p-8 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-3xl">
                <div className="text-7xl mb-4">🔍</div>
              </div>
              <h3 className="text-2xl text-emerald-200 mb-3">Tidak ada hasil ditemukan</h3>
              <p className="text-emerald-300/60 max-w-md mx-auto">
                Coba sesuaikan kata kunci pencarian atau filter untuk menemukan artikel yang Anda cari
              </p>
            </motion.div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </section>
    </>
  );
}

// Grid Card Component
function ArticleCardGrid({ article, articleViews, onClick }: { article: Article; articleViews: { [key: number]: number }; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative cursor-pointer"
      style={{ height: '520px' }} // FIXED HEIGHT - semua card sama tinggi
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
      
      <div className="relative h-full backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 border border-primary/20 rounded-3xl overflow-hidden group-hover:border-primary/40 transition-all duration-300 flex flex-col">
        {/* Image - FIXED HEIGHT */}
        <div className="relative overflow-hidden" style={{ height: '240px' }}> {/* FIXED 240px */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.objectFit = 'contain';
              target.style.padding = '1rem';
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="px-4 py-2 backdrop-blur-xl bg-black/60 border border-primary/40 rounded-xl shadow-lg">
              <span className="text-xs font-semibold text-primary">{article.category}</span>
            </div>
          </div>

          {/* Views Badge */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-2 backdrop-blur-xl bg-black/60 border border-emerald-400/40 rounded-xl shadow-lg">
            <Eye className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{articleViews[article.id]?.toLocaleString() || '0'}</span>
          </div>
        </div>

        {/* Content - FLEX GROW dengan padding konsisten */}
        <div className="flex-1 flex flex-col p-6" style={{ height: '280px' }}> {/* FIXED 280px */}
          {/* Title & Scientific Name - FIXED HEIGHT */}
          <div className="mb-3" style={{ minHeight: '80px' }}>
            <h3 className="text-lg font-semibold mb-1.5 text-emerald-100 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h3>
            {article.scientificName && (
              <p className="text-xs text-emerald-400/70 italic line-clamp-1">{article.scientificName}</p>
            )}
          </div>

          {/* Excerpt - FIXED 3 LINES */}
          <p className="text-sm text-emerald-200/60 line-clamp-3 leading-relaxed mb-4 flex-grow">
            {article.excerpt}
          </p>

          {/* Footer - FIXED di bawah */}
          <div className="flex items-center justify-between pt-3 border-t border-primary/10 mt-auto">
            <div className="flex items-center gap-2 text-xs text-emerald-400/60">
              <Calendar className="w-3 h-3" />
              <span className="line-clamp-1">{article.date}</span>
            </div>
            {article.subcategory && (
              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-lg line-clamp-1">
                {article.subcategory}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// List Card Component
function ArticleCardList({ article, articleViews, onClick }: { article: Article; articleViews: { [key: number]: number }; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ x: 8 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
      
      <div className="relative backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-primary/20 rounded-2xl overflow-hidden group-hover:border-primary/40 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Image */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.objectFit = 'contain';
                target.style.padding = '1rem';
              }}
            />
            
            {/* Views Badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-black/70 border border-emerald-400/50 rounded-xl shadow-lg">
              <Eye className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">{articleViews[article.id]?.toLocaleString() || '0'}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl mb-2 text-emerald-100 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              {article.scientificName && (
                <p className="text-sm text-emerald-400/60 italic mb-3">{article.scientificName}</p>
              )}
              <p className="text-emerald-200/60 line-clamp-2 leading-relaxed mb-4">
                {article.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-400/60">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400/60">
                <Eye className="w-4 h-4" />
                <span>{articleViews[article.id]?.toLocaleString() || '0'} views</span>
              </div>
              {article.subcategory && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg">
                  {article.subcategory}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}