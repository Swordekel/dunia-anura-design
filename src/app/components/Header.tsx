import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/2bef05d61bdb8f683a00b62fa34d8c20ec0014da.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onFilterCategory?: (category: string, subcategory?: string) => void;
}

export function Header({ onNavigate, currentPage, onFilterCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>('Amfibi');
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>('Katak Panah Beracun');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'animals', label: 'Ensiklopedia', hasMegaMenu: true },
    { id: 'about', label: 'Tentang' },
    { id: 'contact', label: 'Kontak' }
  ];

  const categories = [
    {
      name: 'Amfibi',
      id: 'amfibi',
      icon: '🐸',
      subcategories: [
        { 
          name: 'Katak Panah Beracun',
          id: 'katak-panah-beracun',
          filterSubcategory: 'Katak Panah Beracun',
          items: [
            { name: 'Auratus', id: 'auratus' },
            { name: 'Azureus', id: 'azureus' },
            { name: 'Excidobates', id: 'excidobates' },
            { name: 'Epipedobates', id: 'epipedobates' },
            { name: 'Leucomelas', id: 'leucomelas' },
            { name: 'Phyllobates', id: 'phyllobates' },
            { name: 'Ranitomeya', id: 'ranitomeya' },
            { name: 'Tinctorius', id: 'tinctorius' }
          ]
        },
        { 
          name: 'Katak Pohon',
          id: 'katak-pohon',
          filterSubcategory: 'Katak Pohon'
        },
        { 
          name: 'Katak Sungai',
          id: 'katak-sungai',
          filterSubcategory: 'Katak Sungai'
        },
        { 
          name: 'Kodok',
          id: 'kodok',
          filterSubcategory: 'Kodok'
        },
        { 
          name: 'Salamander',
          id: 'salamander',
          filterSubcategory: 'Salamander'
        },
        { 
          name: 'Caecilian',
          id: 'caecilian',
          filterSubcategory: 'Caecilian'
        }
      ]
    },
    {
      name: 'Reptil',
      id: 'reptil',
      icon: '🦎',
      subcategories: [
        { name: 'Agamidae', id: 'agamidae', filterSubcategory: 'Agamidae' },
        { name: 'Gecko', id: 'gecko', filterSubcategory: 'Gecko' },
        { name: 'Kura-kura', id: 'kura-kura', filterSubcategory: 'Kura-kura' },
        { name: 'Ular (Serpentes)', id: 'ular', filterSubcategory: 'Ular (Serpentes)' },
        { name: 'Alligator & Buaya', id: 'alligator', filterSubcategory: 'Alligator & Buaya' }
      ]
    },
    {
      name: 'Ikan',
      id: 'ikan',
      icon: '🐠',
      subcategories: [
        { name: 'Air Laut', id: 'air-laut', filterSubcategory: 'Air Laut' },
        { name: 'Air Tawar', id: 'air-tawar', filterSubcategory: 'Air Tawar' }
      ]
    },
    {
      name: 'Biota Laut',
      id: 'biota-laut',
      icon: '🦑',
      subcategories: [
        { name: 'Invertebrata', id: 'invertebrata', filterSubcategory: 'Invertebrata' }
      ]
    }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/40 backdrop-blur-2xl border-b border-primary/20 shadow-lg shadow-black/50' 
          : 'bg-black/20 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="DuniaAnura Logo" 
                className="h-14 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] group-hover:brightness-110"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item, index) => (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu && setMegaMenuOpen(true)}
                onMouseLeave={() => item.hasMegaMenu && setMegaMenuOpen(false)}
              >
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'text-black'
                      : 'text-emerald-200 hover:text-primary'
                  }`}
                >
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 rounded-xl shadow-lg shadow-primary/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.hasMegaMenu && (
                    <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                  )}
                </motion.button>

                {/* Mega Menu */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px]"
                      >
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-20 blur-xl" />
                          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/90 to-black/80 border border-primary/30 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-primary/20">
                              <h3 className="text-xl bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                                Jelajahi Kategori Hewan
                              </h3>
                              <p className="text-sm text-emerald-300/60 mt-1">Pilih kategori untuk mempelajari lebih lanjut</p>
                            </div>

                            {/* Categories Grid */}
                            <div className="flex h-[500px]">
                              {/* Left Column - Main Categories */}
                              <div className="w-1/3 border-r border-primary/10 p-6 space-y-2">
                                {categories.map((category) => (
                                  <motion.div
                                    key={category.name}
                                    whileHover={{ x: 4 }}
                                    onMouseEnter={() => {
                                      setHoveredCategory(category.name);
                                      setHoveredSubcategory(category.subcategories[0]?.name || null);
                                    }}
                                    onClick={() => {
                                      onFilterCategory?.(category.id, undefined);
                                      setMegaMenuOpen(false);
                                    }}
                                    className={`group cursor-pointer p-3 rounded-xl transition-all duration-200 ${
                                      hoveredCategory === category.name
                                        ? 'bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30'
                                        : 'hover:bg-white/5'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-xl">
                                        {category.icon}
                                      </div>
                                      <span className={`transition-colors ${
                                        hoveredCategory === category.name
                                          ? 'text-primary'
                                          : 'text-emerald-200 group-hover:text-primary'
                                      }`}>
                                        {category.name}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Middle Column - Subcategories */}
                              <div className="w-1/3 border-r border-primary/10 p-6 space-y-2 overflow-y-auto">
                                {categories
                                  .find((c) => c.name === hoveredCategory)
                                  ?.subcategories.map((sub) => (
                                    <motion.div
                                      key={sub.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      whileHover={{ x: 4 }}
                                      onMouseEnter={() => setHoveredSubcategory(sub.name)}
                                      onClick={() => {
                                        const category = categories.find((c) => c.name === hoveredCategory);
                                        if (category) {
                                          onFilterCategory?.(category.id, sub.filterSubcategory);
                                          setMegaMenuOpen(false);
                                        }
                                      }}
                                      className={`group cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                                        hoveredSubcategory === sub.name
                                          ? 'bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 text-primary shadow-lg shadow-primary/10'
                                          : 'bg-white/5 border border-primary/10 text-emerald-300/70 hover:text-primary hover:bg-white/10 hover:border-primary/20'
                                      }`}
                                    >
                                      <span className="text-sm font-medium">{sub.name}</span>
                                      {sub.items && (
                                        <ChevronDown className="w-3 h-3 -rotate-90 opacity-50" />
                                      )}
                                    </motion.div>
                                  ))}
                              </div>

                              {/* Right Column - Items */}
                              <div className="w-1/3 p-6 space-y-2 overflow-y-auto">
                                {categories
                                  .find((c) => c.name === hoveredCategory)
                                  ?.subcategories.find((s) => s.name === hoveredSubcategory)
                                  ?.items?.map((item) => (
                                    <motion.div
                                      key={item.id}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      whileHover={{ x: 4 }}
                                      className="group cursor-pointer p-2.5 rounded-lg transition-all duration-200 text-emerald-200/60 hover:text-primary hover:bg-white/5"
                                      onClick={() => {
                                        const category = categories.find((c) => c.name === hoveredCategory);
                                        if (category) {
                                          onFilterCategory?.(category.id, hoveredSubcategory || '');
                                          setMegaMenuOpen(false);
                                        }
                                      }}
                                    >
                                      <span className="text-sm">{item.name}</span>
                                    </motion.div>
                                  ))}
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-4 bg-gradient-to-r from-primary/5 to-emerald-500/5 border-t border-primary/10">
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-emerald-300/50">34 artikel tersedia</p>
                                <button 
                                  onClick={() => {
                                    onNavigate('animals');
                                    setMegaMenuOpen(false);
                                  }}
                                  className="text-sm text-primary hover:text-emerald-400 transition-colors flex items-center gap-2"
                                >
                                  Lihat Semua
                                  <ChevronDown className="w-3 h-3 -rotate-90" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden relative group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl blur group-hover:blur-md transition-all duration-300" />
            <div className="relative p-3 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300">
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-black shadow-lg shadow-primary/20'
                        : 'backdrop-blur-xl bg-white/5 text-emerald-200 hover:bg-white/10 border border-primary/10 hover:border-primary/30'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}