import { useState } from 'react';
import { Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const videos: Video[] = [
  {
    id: 'r4vZW0JiTeI',
    title: 'Mengenal Ranitomeya benedicta "kunashirigeyui"',
    thumbnail: 'https://img.youtube.com/vi/r4vZW0JiTeI/maxresdefault.jpg',
    description: 'Ranitomeya benedicta adalah katak beracun yang indah dari Peru'
  },
  {
    id: 'Nqsgl8iucz4',
    title: 'Nyctohyla Margaritifer captive breed',
    thumbnail: 'https://img.youtube.com/vi/Nqsgl8iucz4/maxresdefault.jpg',
    description: 'Katak pohon eksotis yang dipelihara di penangkaran'
  },
  {
    id: 'RCgj85poNcs',
    title: 'Pembuatan pakan yang berluas untuk R.Benedicta',
    thumbnail: 'https://img.youtube.com/vi/RCgj85poNcs/maxresdefault.jpg',
    description: 'Panduan lengkap membuat pakan untuk katak eksotis'
  }
];

export function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
            Channel YouTube Kami
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pelajari lebih dalam tentang hewan eksotis melalui video-video edukatif kami
          </p>
        </div>

        {/* Video Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Glass Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl group-hover:border-emerald-400/50 transition-all duration-500">
                {/* Video Embed */}
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?rel=0`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                
                {/* Video Info */}
                <div className="p-6 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm border-t border-emerald-500/20">
                  <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                  
                  {/* Subscribe Button */}
                  <a
                    href="https://www.youtube.com/@DuniaAnura?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Subscribe Channel
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl blur-xl" />
                
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                      Video Playlist
                    </h3>
                    <span className="text-sm text-gray-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      {videos.length} Video
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className={`group w-full text-left transition-all duration-300 ${
                          selectedVideo.id === video.id
                            ? 'scale-[1.02]'
                            : 'hover:scale-[1.02]'
                        }`}
                      >
                        <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          selectedVideo.id === video.id
                            ? 'border-emerald-400 shadow-lg shadow-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20'
                            : 'border-emerald-500/20 hover:border-emerald-400/50 bg-gradient-to-br from-gray-800/50 to-black/50'
                        }`}>
                          {/* Thumbnail */}
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Play Overlay */}
                            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
                              selectedVideo.id === video.id
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100'
                            }`}>
                              <div className="w-12 h-12 bg-emerald-500/90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                                <Play className="w-6 h-6 text-white ml-1" fill="white" />
                              </div>
                            </div>
                            
                            {/* Number Badge */}
                            <div className="absolute top-2 left-2 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-500/30">
                              <span className="text-sm font-bold text-emerald-400">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Video Info */}
                          <div className="p-4">
                            <h4 className={`font-semibold text-sm leading-snug transition-colors duration-300 line-clamp-2 ${
                              selectedVideo.id === video.id
                                ? 'text-emerald-300'
                                : 'text-gray-300 group-hover:text-emerald-300'
                            }`}>
                              {video.title}
                            </h4>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-2xl blur-xl animate-pulse" />
            <a
              href="https://www.youtube.com/@DuniaAnura"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-2xl border border-emerald-400/30"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Kunjungi Channel YouTube Kami
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}