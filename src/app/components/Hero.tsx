import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Microscope } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

// Configuration for video background
const VIDEO_CONFIG = {
  type: 'local', // 'youtube' or 'local'
  
  // YouTube video settings
  youtube: {
    videoId: '_54wkHTapwc',
    quality: 'hd1080'
  },
  
  // Local video settings
  local: {
    src: '/videos/Hutan.mp4', // Path ke video lokal di folder public/videos/
    poster: '/videos/poster.jpg' // Optional: thumbnail sebelum video dimuat
  }
};

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-emerald-200 via-primary to-emerald-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                DuniaAnura
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-emerald-100 to-emerald-300 bg-clip-text text-transparent"
          >
            Belajar Tentang Amfibi & Kehidupan Laut
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-emerald-200/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Jelajahi dunia menakjubkan amfibi dan ikan laut eksotis. Pelajari habitat, perilaku, dan upaya konservasi 
            untuk melindungi spesies-spesies luar biasa ini.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={onExplore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-primary to-emerald-400 text-black rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3 text-lg">
                Mulai Belajar
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}