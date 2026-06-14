import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Sparkles } from 'lucide-react';
import logo from 'figma:asset/2bef05d61bdb8f683a00b62fa34d8c20ec0014da.png';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onFilterCategory?: (category: string, subcategory?: string) => void;
}

export function Footer({ onNavigate, onFilterCategory }: FooterProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryFilter = (category: string, subcategory?: string) => {
    if (onFilterCategory) {
      onFilterCategory(category, subcategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', action: () => handleNavigation('home') },
    { label: 'Ensiklopedia', action: () => handleNavigation('animals') },
    { label: 'Tentang Kami', action: () => handleNavigation('about') },
    { label: 'Kontak', action: () => handleNavigation('contact') }
  ];

  const categoryLinks = [
    { label: 'Amfibi', action: () => handleCategoryFilter('amfibi') },
    { label: 'Reptil', action: () => handleCategoryFilter('reptil') },
    { label: 'Ikan', action: () => handleCategoryFilter('ikan') },
    { label: 'Biota Laut', action: () => handleCategoryFilter('biota-laut') }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/6281234567890', label: 'WhatsApp' }
  ];

  return (
    <footer className="relative bg-black border-t border-primary/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              className="flex items-center gap-3 mb-6 cursor-pointer group"
              onClick={() => handleNavigation('home')}
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
            </div>
            <p className="text-sm text-emerald-200/60 leading-relaxed">
              Platform edukasi terpercaya untuk belajar tentang amfibi, reptil, ikan, dan biota laut eksotis dengan fokus pada konservasi dan pelestarian.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-emerald-100 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Menu
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={link.action}
                    className="text-sm text-emerald-200/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-emerald-100 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Kategori Hewan
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={link.action}
                    className="text-sm text-emerald-200/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-emerald-100 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-emerald-200/60">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-primary transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-emerald-200/60">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@duniaanura.com" className="hover:text-primary transition-colors">
                  info@duniaanura.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-emerald-200/60">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-3 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all">
                    <social.icon className="w-5 h-5 text-primary" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-primary/20 text-center"
        >
          <p className="text-sm text-emerald-200/40">
            &copy; 2024 DuniaAnura. All rights reserved. Crafted with{' '}
            <span className="text-primary">♥</span> for exotic animal lovers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}