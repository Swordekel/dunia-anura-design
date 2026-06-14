import { motion } from 'motion/react';
import { BookOpen, Info, MapPin, Activity, Sparkles, Eye } from 'lucide-react';
import { Animal } from '../data/animals';
import { useState } from 'react';

interface AnimalCardProps {
  animal: Animal;
  onViewDetails: (animal: Animal) => void;
}

export function AnimalCard({ animal, onViewDetails }: AnimalCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    if (status.includes('Least Concern')) {
      return 'from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300';
    } else if (status.includes('Vulnerable') || status.includes('Endangered')) {
      return 'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300';
    } else {
      return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300';
    }
  };

  const getCareColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah':
        return 'from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300';
      case 'Sedang':
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300';
      case 'Sulit':
        return 'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300';
      default:
        return 'from-primary/20 to-emerald-500/20 border-primary/40 text-primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      
      {/* Card Container */}
      <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-primary/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 hover:shadow-primary/20 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex flex-col gap-2">
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              className={`px-4 py-2 backdrop-blur-xl bg-gradient-to-r ${getStatusColor(animal.conservationStatus)} rounded-2xl text-xs border shadow-lg self-start`}
            >
              <span className="drop-shadow-lg flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {animal.conservationStatus.split(' - ')[0]}
              </span>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`px-4 py-2 backdrop-blur-xl bg-gradient-to-r ${getCareColor(animal.difficulty)} rounded-2xl text-xs border shadow-lg self-start`}
            >
              <span className="drop-shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Perawatan: {animal.difficulty}
              </span>
            </motion.div>
          </div>

          {/* Quick View Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            onClick={() => onViewDetails(animal)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 backdrop-blur-xl bg-white/10 hover:bg-white/20 border-2 border-primary/50 rounded-2xl transition-all duration-300 group/btn"
          >
            <Eye className="w-6 h-6 text-primary group-hover/btn:scale-110 transition-transform" />
          </motion.button>

          {/* Image Border Glow */}
          <div className="absolute inset-0 border-b-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="mb-2 text-xl bg-gradient-to-r from-emerald-100 to-emerald-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-emerald-400 transition-all duration-300">
              {animal.name}
            </h3>
            <p className="text-sm text-emerald-300/60 italic tracking-wide">
              {animal.scientificName}
            </p>
          </div>

          {/* Info Pills */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-xl group-hover:border-primary/20 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-emerald-400/60">Habitat</div>
                <div className="text-sm text-emerald-200 truncate">{animal.habitat.split(',')[0]}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-xl group-hover:border-primary/20 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-emerald-400/60">Ukuran</div>
                <div className="text-sm text-emerald-200">{animal.size}</div>
              </div>
            </div>
          </div>

          {/* Fun Fact Preview */}
          <div className="mb-6 p-4 backdrop-blur-xl bg-gradient-to-br from-primary/5 to-emerald-500/5 border border-primary/20 rounded-2xl">
            <div className="text-xs text-emerald-400/60 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Fakta Menarik
            </div>
            <p className="text-sm text-emerald-200/80 line-clamp-2">
              {animal.funFacts[0]}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewDetails(animal)}
              className="flex-1 px-4 py-3 backdrop-blur-xl bg-white/5 border border-primary/30 text-primary rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <Info className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              <span>Detail</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewDetails(animal)}
              className="flex-1 relative overflow-hidden px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <BookOpen className="w-4 h-4 relative z-10 group-hover/btn:scale-110 transition-transform" />
              <span className="relative z-10">Pelajari</span>
            </motion.button>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
