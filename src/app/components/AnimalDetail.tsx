import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Share2, Sparkles, MapPin, Utensils, Activity, Clock, AlertTriangle, Shield, BookOpen, Leaf } from 'lucide-react';
import { Animal } from '../data/animals';
import { useState } from 'react';

interface AnimalDetailProps {
  animal: Animal | null;
  onClose: () => void;
}

export function AnimalDetail({ animal, onClose }: AnimalDetailProps) {
  const [liked, setLiked] = useState(false);

  if (!animal) return null;

  const getStatusColor = (status: string) => {
    if (status.includes('Least Concern')) {
      return 'from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300';
    } else if (status.includes('Vulnerable') || status.includes('Endangered')) {
      return 'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300';
    } else {
      return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative w-full max-w-6xl my-8"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-20 blur-2xl" />
          
          {/* Content Container */}
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/30 rounded-3xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl blur group-hover:blur-md transition-all" />
              <div className="relative p-3 backdrop-blur-xl bg-black/50 hover:bg-black/70 border border-primary/30 rounded-2xl transition-all">
                <X className="w-6 h-6 text-primary" />
              </div>
            </motion.button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-[500px] md:h-auto overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`px-5 py-2.5 backdrop-blur-xl bg-gradient-to-r ${getStatusColor(animal.conservationStatus)} border rounded-2xl shadow-xl`}
                  >
                    <span className="text-sm drop-shadow-lg flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      {animal.conservationStatus.split(' - ')[0]}
                    </span>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLiked(!liked)}
                    className="group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl blur group-hover:blur-md transition-all" />
                    <div className="relative p-3 backdrop-blur-xl bg-black/50 hover:bg-black/70 border border-primary/30 rounded-2xl transition-all">
                      <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-red-500 text-red-500' : 'text-primary'}`} />
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl blur group-hover:blur-md transition-all" />
                    <div className="relative p-3 backdrop-blur-xl bg-black/50 hover:bg-black/70 border border-primary/30 rounded-2xl transition-all">
                      <Share2 className="w-5 h-5 text-primary" />
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8 md:p-10 overflow-y-auto max-h-[600px]">
                {/* Title */}
                <div className="mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-emerald-200 to-primary bg-clip-text text-transparent"
                  >
                    {animal.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-emerald-300/70 italic"
                  >
                    {animal.scientificName}
                  </motion.p>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-lg text-primary mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Deskripsi
                  </h3>
                  <p className="text-emerald-100/80 leading-relaxed">{animal.description}</p>
                </motion.div>

                {/* Key Information Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 space-y-4"
                >
                  <h3 className="text-lg text-primary mb-4">Informasi Umum</h3>
                  
                  {[
                    { icon: MapPin, label: 'Habitat', value: animal.habitat },
                    { icon: Utensils, label: 'Diet', value: animal.diet },
                    { icon: Activity, label: 'Ukuran', value: animal.size },
                    { icon: Clock, label: 'Usia', value: animal.lifespan }
                  ].map((spec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-2xl hover:border-primary/30 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <spec.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-emerald-400/60 mb-1">{spec.label}</div>
                        <div className="text-emerald-100">{spec.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Fun Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8 p-6 backdrop-blur-xl bg-gradient-to-br from-primary/5 to-emerald-500/5 border border-primary/20 rounded-2xl"
                >
                  <h3 className="text-lg text-primary mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Fakta Menarik
                  </h3>
                  <div className="space-y-2 text-emerald-100/80">
                    {animal.funFacts.map((fact, index) => (
                      <p key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{fact}</span>
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Educational Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg text-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Informasi Edukatif
                  </h3>

                  {[
                    { icon: Activity, title: 'Perilaku', content: animal.educationalInfo.behavior },
                    { icon: Leaf, title: 'Reproduksi', content: animal.educationalInfo.reproduction },
                    { icon: AlertTriangle, title: 'Ancaman', content: animal.educationalInfo.threats },
                    { icon: Shield, title: 'Konservasi', content: animal.educationalInfo.conservation }
                  ].map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="p-5 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-2xl hover:border-primary/20 transition-all"
                    >
                      <h4 className="text-emerald-200 mb-2 flex items-center gap-2">
                        <section.icon className="w-4 h-4 text-primary" />
                        {section.title}
                      </h4>
                      <p className="text-sm text-emerald-100/70 leading-relaxed">{section.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
