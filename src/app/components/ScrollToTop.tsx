import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary to-emerald-400 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
          
          {/* Button */}
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-primary/90 to-emerald-500/90 p-4 rounded-full border border-primary/30 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
            <ArrowUp className="w-6 h-6 text-black" />
          </div>

          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
