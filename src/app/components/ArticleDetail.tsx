import { motion } from 'motion/react';
import { X, MapPin, Utensils, Heart, Share2, Leaf, Droplets, Thermometer, Shield, Ruler, Weight, Clock, Moon, Sun, Users, Zap, Activity, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Youtube } from 'lucide-react';
import { Article } from '../data/articles';
import { useState, useEffect, useRef } from 'react';
import { incrementArticleView } from '../utils/viewCounter';
import Slider from 'react-slick';

interface ArticleDetailProps {
  article: Article | null;
  onClose: () => void;
}

// Custom Arrow Components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-primary/40 rounded-full transition-all shadow-lg"
    >
      <ChevronRight className="w-6 h-6 text-primary" />
    </motion.button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-primary/40 rounded-full transition-all shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 text-primary" />
    </motion.button>
  );
}

export function ArticleDetail({ article, onClose }: ArticleDetailProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [liked, setLiked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  // Increment view count when article is opened
  useEffect(() => {
    if (article) {
      incrementArticleView(article.id);
    }
  }, [article]);

  if (!article) return null;

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: any) => (
      <div className="absolute bottom-6 left-0 right-0">
        <ul className="flex items-center justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className={`w-2 h-2 rounded-full transition-all ${
          i === currentSlide 
            ? 'bg-primary w-8' 
            : 'bg-white/30 hover:bg-white/50'
        }`}
      />
    ),
  };

  // Prepare media items (main image + additional images + videos)
  const mediaItems = [
    { type: 'image', src: article.image }, // Main image
    ...(article.images?.map(img => ({ type: 'image', src: img })) || []), // Additional images
    ...(article.videoUrl ? [{ type: 'youtube', src: article.videoUrl }] : []), // YouTube video
    ...(article.localVideoUrl ? [{ type: 'local-video', src: article.localVideoUrl }] : []) // Local video
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary opacity-50 blur-2xl animate-pulse" />
        
        {/* Content Container */}
        <div className="relative bg-black border-2 border-primary rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 h-[90vh]">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Side - Image/Video Carousel */}
            <div className="lg:w-1/2 relative overflow-hidden bg-black h-[40vh] lg:h-full">
              {/* Media Counter Badge */}
              {mediaItems.length > 1 && (
                <div className="absolute bottom-20 left-4 lg:bottom-24 lg:left-6 z-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-2 backdrop-blur-2xl bg-black/80 border-2 border-primary/50 rounded-xl shadow-2xl"
                  >
                    <div className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-300">
                        {mediaItems.filter(m => m.type === 'image').length}
                      </span>
                    </div>
                    {mediaItems.some(m => m.type === 'youtube' || m.type === 'local-video') && (
                      <>
                        <div className="w-px h-4 bg-primary/30" />
                        <div className="flex items-center gap-1.5">
                          <Video className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-semibold text-amber-300">
                            {mediaItems.filter(m => m.type === 'youtube' || m.type === 'local-video').length}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="w-px h-4 bg-primary/30" />
                    <span className="text-xs text-primary/80">
                      {currentSlide + 1}/{mediaItems.length}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20">
                <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-emerald-600/20 border border-emerald-500/40 rounded-xl shadow-lg">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Least Concern</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                  }}
                  className="p-2.5 lg:p-3 backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-primary/40 rounded-xl transition-all shadow-lg"
                >
                  <Heart className={`w-4 h-4 lg:w-5 lg:h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-primary'}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 lg:p-3 backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-primary/40 rounded-xl transition-all shadow-lg"
                >
                  <Share2 className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </motion.button>
              </div>

              {/* Carousel - FULL HEIGHT dengan explicit height */}
              <Slider ref={sliderRef} {...carouselSettings}>
                {mediaItems.map((item, index) => (
                  <div key={index}>
                    {item.type === 'image' ? (
                      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden h-[40vh] lg:h-[90vh]">
                        <motion.img
                          initial={{ scale: 1.05, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          src={item.src}
                          alt={article.title}
                          className="w-full h-full object-contain lg:object-cover object-center"
                          crossOrigin="anonymous"
                          loading="eager"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.objectFit = 'contain';
                            target.style.padding = '2rem';
                          }}
                        />
                        {/* Gradient Overlays for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
                      </div>
                    ) : item.type === 'youtube' ? (
                      <div className="relative flex items-center justify-center bg-black h-[40vh] lg:h-[90vh]">
                        <iframe
                          src={getYouTubeEmbedUrl(item.src)}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center bg-black h-[40vh] lg:h-[90vh]">
                        <video
                          src={item.src}
                          controls
                          className="w-full h-full object-contain"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right Side - Content (Scrollable) */}
            <div className="lg:w-1/2 overflow-y-auto custom-scrollbar h-[50vh] lg:h-full">
              <div className="p-6 md:p-8 lg:p-10">
                {/* Close Button - Pindah ke kiri atas atau bawah action buttons */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 left-4 lg:top-8 lg:right-8 lg:left-auto p-2.5 lg:p-3 backdrop-blur-xl bg-black/80 hover:bg-red-500/20 border border-primary/40 hover:border-red-500/60 rounded-full z-30 transition-all shadow-xl"
                >
                  <X className="w-4 h-4 lg:w-5 lg:h-5 text-primary hover:text-red-400 transition-colors" />
                </motion.button>

                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-4 py-1.5 backdrop-blur-xl bg-primary/20 border border-primary/40 rounded-lg text-xs text-primary">
                    {article.category}
                  </span>
                  {article.subcategory && (
                    <span className="px-4 py-1.5 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                      {article.subcategory}
                    </span>
                  )}
                </div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent"
                >
                  {article.title}
                </motion.h1>

                {/* Scientific Name */}
                {article.scientificName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-emerald-400/80 italic text-lg mb-6"
                  >
                    {article.scientificName}
                  </motion.p>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-primary/20 pb-2">
                  {['description', 'info'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : 'text-emerald-300/60 hover:text-primary'
                      }`}
                    >
                      {tab === 'description' ? 'Deskripsi' : 'Informasi Umum'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <p className="text-emerald-100/80 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <p className="text-emerald-100/70 leading-relaxed">
                        {article.content}
                      </p>

                      {/* Tags */}
                      <div className="pt-4">
                        <h3 className="text-sm text-emerald-300/60 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-lg text-xs text-emerald-400/70"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      {/* Info Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.info?.size && (
                          <InfoCard
                            icon={<Ruler className="w-5 h-5" />}
                            label="Ukuran"
                            value={article.info.size}
                          />
                        )}
                        {article.info?.weight && (
                          <InfoCard
                            icon={<Weight className="w-5 h-5" />}
                            label="Berat"
                            value={article.info.weight}
                          />
                        )}
                        {article.info?.lifespan && (
                          <InfoCard
                            icon={<Clock className="w-5 h-5" />}
                            label="Usia Harapan Hidup"
                            value={article.info.lifespan}
                          />
                        )}
                        {article.info?.habitat && (
                          <InfoCard
                            icon={<MapPin className="w-5 h-5" />}
                            label="Habitat"
                            value={article.info.habitat}
                          />
                        )}
                        {article.info?.diet && (
                          <InfoCard
                            icon={<Utensils className="w-5 h-5" />}
                            label="Pola Makan"
                            value={article.info.diet}
                          />
                        )}
                        {article.info?.activity && (
                          <InfoCard
                            icon={<Sun className="w-5 h-5" />}
                            label="Aktivitas"
                            value={article.info.activity}
                          />
                        )}
                        {article.info?.temperature && (
                          <InfoCard
                            icon={<Thermometer className="w-5 h-5" />}
                            label="Suhu Ideal"
                            value={article.info.temperature}
                          />
                        )}
                        {article.info?.humidity && (
                          <InfoCard
                            icon={<Droplets className="w-5 h-5" />}
                            label="Kelembaban"
                            value={article.info.humidity}
                          />
                        )}
                      </div>

                      {/* Distribution */}
                      {article.info?.distribution && (
                        <div className="p-5 backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/30 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-semibold text-emerald-300 mb-2">Distribusi</h4>
                              <p className="text-sm text-emerald-100/80 leading-relaxed">
                                {article.info.distribution}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Breeding */}
                      {article.info?.breeding && (
                        <div className="p-5 backdrop-blur-xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/30 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-semibold text-pink-300 mb-2">Reproduksi</h4>
                              <p className="text-sm text-emerald-100/80 leading-relaxed">
                                {article.info.breeding}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Conservation Status */}
                      {article.info?.conservation && (
                        <div className="p-5 backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/30 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-semibold text-yellow-300 mb-2">Status Konservasi</h4>
                              <p className="text-sm text-emerald-100/80 leading-relaxed">
                                {article.info.conservation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Temperament */}
                      {article.info?.temperament && (
                        <div className="p-5 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/30 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <Activity className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-semibold text-blue-300 mb-2">Temperamen</h4>
                              <p className="text-sm text-emerald-100/80 leading-relaxed">
                                {article.info.temperament}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Author & Date */}
                      <div className="pt-6 mt-6 border-t border-primary/20">
                        <div className="flex items-center justify-center text-sm text-emerald-300/60">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-primary/20 rounded-xl hover:border-primary/40 transition-all">
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <span className="text-xs text-emerald-300/60">{label}</span>
      </div>
      <p className="text-sm text-emerald-200">{value}</p>
    </div>
  );
}