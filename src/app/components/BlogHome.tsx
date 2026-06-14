import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Article, articles, categories, tags } from '../data/articles';
import { Calendar, Eye, User, Tag, Search, TrendingUp, Clock, ArrowRight, Filter } from 'lucide-react';
import { getArticleViews, getTrendingArticles, getTrendingWeekInfo } from '../utils/viewCounter';

interface BlogHomeProps {
  onArticleClick: (article: Article) => void;
}

export function BlogHome({ onArticleClick }: BlogHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [articleViews, setArticleViews] = useState<{ [key: number]: number }>({});
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [weekInfo, setWeekInfo] = useState(getTrendingWeekInfo());

  // Load view counts and trending articles on mount and update periodically
  useEffect(() => {
    const loadViewCounts = () => {
      const views: { [key: number]: number } = {};
      articles.forEach(article => {
        views[article.id] = getArticleViews(article.id);
      });
      setArticleViews(views);
      
      // Get trending articles based on real view data (get more for grid display)
      const trending = getTrendingArticles(articles, 20);
      setTrendingArticles(trending);
    };

    loadViewCounts();
    
    // Update view counts every 5 seconds to reflect real-time changes
    const interval = setInterval(loadViewCounts, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get the top trending article for featured section
  const featuredArticle = trendingArticles.length > 0 ? trendingArticles[0] : articles.find(a => a.featured);
  
  // Show only trending articles in the grid (exclude the featured one)
  const displayArticles = trendingArticles.slice(1, 13); // Show trending #2 to #13 (12 articles)
  
  const filteredArticles = displayArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSubcategory = !selectedSubcategory || article.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesTag && matchesSearch;
  });

  // Get current category data with subcategories
  const currentCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-2xl opacity-20 blur group-hover:opacity-30 transition-all" />
            <div className="relative flex items-center backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl overflow-hidden">
              <Search className="w-5 h-5 text-primary ml-6" />
              <input
                type="text"
                placeholder="Cari artikel, spesies, atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 bg-transparent text-emerald-100 placeholder-emerald-400/40 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Category Filter */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-3xl blur-lg" />
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Filter className="w-5 h-5 text-primary" />
                      <h3 className="text-lg text-emerald-200">Kategori</h3>
                    </div>

                    <div className="space-y-2">
                      {categories.map((cat, index) => (
                        <div key={cat.id}>
                          <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setSelectedSubcategory(null);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all mb-1 ${
                              selectedCategory === cat.id
                                ? 'bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/40 text-primary'
                                : 'backdrop-blur-xl bg-white/5 border border-primary/10 text-emerald-300/70 hover:border-primary/30 hover:text-primary'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{cat.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                selectedCategory === cat.id ? 'bg-primary/30' : 'bg-primary/20'
                              }`}>
                                {cat.count}
                              </span>
                            </div>
                          </motion.button>

                          {/* Subcategories */}
                          {cat.subcategories && selectedCategory === cat.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {cat.subcategories.map((subcat, subIdx) => (
                                <motion.button
                                  key={subcat.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIdx * 0.05 }}
                                  whileHover={{ x: 3 }}
                                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcat.name ? null : subcat.name)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                                    selectedSubcategory === subcat.name
                                      ? 'bg-primary/20 border border-primary/40 text-primary'
                                      : 'bg-white/5 border border-primary/5 text-emerald-400/60 hover:text-emerald-300 hover:border-primary/20'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>└ {subcat.name}</span>
                                    <span className="text-xs opacity-60">{subcat.count}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trending Section - Below Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-lg" />
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <TrendingUp className="w-5 h-5 text-amber-400 animate-pulse" />
                        <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-lg" />
                      </div>
                      <h3 className="text-lg bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                        Trending Minggu Ini
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {trendingArticles.slice(0, 5).map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                          onClick={() => onArticleClick(article)}
                          className="group cursor-pointer relative"
                        >
                          {/* Hover glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                          
                          <div className="relative flex gap-3 p-3 backdrop-blur-xl bg-white/5 border border-amber-500/20 rounded-xl hover:border-amber-500/40 hover:bg-white/10 transition-all">
                            {/* Rank Badge */}
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center backdrop-blur-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-500/40 rounded-lg">
                              <span className="text-sm font-bold bg-gradient-to-br from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                #{index + 1}
                              </span>
                            </div>

                            {/* Image */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-amber-500/20">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm text-emerald-100 mb-1.5 line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs">
                                <div className="flex items-center gap-1 text-amber-400/70">
                                  <Eye className="w-3 h-3" />
                                  <span>{articleViews[article.id]?.toLocaleString() || article.views.toLocaleString()}</span>
                                </div>
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400/80 rounded text-xs border border-amber-500/20">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* View All Trending Link */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/30 rounded-xl text-sm text-amber-300 flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      <span>Lihat Semua Trending</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 group cursor-pointer"
                onClick={() => onArticleClick(featuredArticle)}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/40 transition-all duration-500">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          loading="eager"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.objectFit = 'contain';
                            target.style.padding = '2rem';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Featured Badge */}
                        <div className="absolute top-6 left-6">
                          <div className="px-5 py-2.5 backdrop-blur-xl bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/40 rounded-2xl shadow-lg">
                            <span className="text-sm text-primary flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Featured Article
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 backdrop-blur-xl bg-primary/10 border border-primary/30 rounded-lg text-xs text-primary">
                            {featuredArticle.category}
                          </span>
                          {featuredArticle.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-3 py-1 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-lg text-xs text-emerald-300">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-3xl md:text-4xl mb-3 bg-gradient-to-r from-emerald-200 to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-emerald-400 transition-all">
                          {featuredArticle.title}
                        </h2>
                        
                        {featuredArticle.scientificName && (
                          <p className="text-emerald-300/60 italic text-sm mb-4">
                            {featuredArticle.scientificName}
                          </p>
                        )}

                        <p className="text-emerald-100/70 mb-6 leading-relaxed line-clamp-3">
                          {featuredArticle.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-300/60 mb-6">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {featuredArticle.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {articleViews[featuredArticle.id]?.toLocaleString() || featuredArticle.views.toLocaleString()} views
                          </div>
                        </div>

                        {/* Read More Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="self-start px-8 py-3 bg-gradient-to-r from-primary to-emerald-400 text-black rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group/btn"
                        >
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tags Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-xl text-emerald-200">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-primary/20 to-emerald-500/20 border-2 border-primary/50 text-primary'
                        : 'backdrop-blur-xl bg-white/5 border border-primary/10 text-emerald-300/70 hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => onArticleClick(article)}
                  className="group cursor-pointer"
                  style={{ height: '520px' }} // FIXED HEIGHT - semua card sama
                >
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
                    <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/40 transition-all duration-500 hover:shadow-primary/20 flex flex-col">
                      {/* Image - FIXED HEIGHT */}
                      <div className="relative overflow-hidden" style={{ height: '240px' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={article.image}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.objectFit = 'contain';
                            target.style.padding = '1rem';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        
                        {/* Category & Subcategory Badge */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                          <div className="relative group/badge">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-xl opacity-40 blur group-hover/badge:opacity-60 transition-all" />
                            <span className="relative block px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/40 rounded-xl text-xs text-primary shadow-lg">
                              {article.category}
                            </span>
                          </div>
                          {article.subcategory && (
                            <span className="px-3 py-1 backdrop-blur-xl bg-black/50 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                              {article.subcategory}
                            </span>
                          )}
                        </div>

                        {/* Views */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="px-3 py-2 backdrop-blur-xl bg-black/60 border border-primary/20 rounded-xl flex items-center gap-2 shadow-lg">
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-emerald-200">{articleViews[article.id]?.toLocaleString() || article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content - FLEX dengan height fixed */}
                      <div className="flex-1 flex flex-col p-6" style={{ height: '280px' }}>
                        {/* Title & Scientific Name */}
                        <div className="mb-3" style={{ minHeight: '75px' }}>
                          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-emerald-100 to-emerald-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-emerald-400 transition-all line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                          
                          {article.scientificName && (
                            <p className="text-xs text-emerald-300/60 italic line-clamp-1">
                              {article.scientificName}
                            </p>
                          )}
                        </div>

                        {/* Excerpt - FIXED 3 LINES */}
                        <p className="text-sm text-emerald-200/70 mb-3 line-clamp-3 leading-relaxed flex-grow">
                          {article.excerpt}
                        </p>

                        {/* Tags - FIXED 1 LINE */}
                        <div className="flex flex-wrap gap-2 mb-3 overflow-hidden" style={{ maxHeight: '28px' }}>
                          {article.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-lg text-xs text-emerald-400/70 whitespace-nowrap">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta - FIXED di bawah */}
                        <div className="flex items-center justify-between pt-3 border-t border-primary/10 mt-auto">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-300/50">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="line-clamp-1">{article.date}</span>
                          </div>
                          <motion.div 
                            className="flex items-center gap-2 text-xs text-primary group-hover:gap-3 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            <span>Baca</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl text-emerald-200 mb-2">Tidak Ada Artikel</h3>
                <p className="text-emerald-300/60">Coba ubah filter atau pencarian Anda</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}