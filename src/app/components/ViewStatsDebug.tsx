// Debug Component untuk melihat view statistics
// Untuk production, ini bisa diakses melalui secret route atau diremove

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Eye, TrendingUp, BarChart3, X, Download, RefreshCw } from 'lucide-react';
import { getViewCounts, getViewHistory, exportViewData, resetViewCounts } from '../utils/viewCounter';
import { articles } from '../data/articles';

export function ViewStatsDebug() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewCounts, setViewCounts] = useState<{ [key: number]: number }>({});
  const [viewHistory, setViewHistory] = useState<any[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadStats();
    }
  }, [isOpen]);

  const loadStats = () => {
    const counts = getViewCounts();
    const history = getViewHistory();
    setViewCounts(counts);
    setViewHistory(history);
    
    // Calculate total views
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    setTotalViews(total);
  };

  const handleExport = () => {
    const data = exportViewData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `duniaanura-views-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Reset semua view counts? Tindakan ini tidak dapat dibatalkan!')) {
      resetViewCounts();
      loadStats();
    }
  };

  // Get top 10 articles
  const topArticles = articles
    .map(article => ({
      ...article,
      viewCount: viewCounts[article.id] || 0
    }))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  // Get recent views (last 24 hours)
  const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
  const recentViews = viewHistory.filter(v => v.timestamp > twentyFourHoursAgo).length;

  return (
    <>
      {/* Toggle Button - Hidden in bottom right corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 p-2 backdrop-blur-xl bg-black/40 hover:bg-black/60 border border-primary/20 hover:border-primary/40 rounded-lg transition-all opacity-30 hover:opacity-100"
        title="View Statistics (Admin)"
      >
        <BarChart3 className="w-5 h-5 text-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-950/90 to-black/90 border-2 border-primary/30 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary opacity-20 blur-2xl" />
                
                <div className="relative">
                  {/* Header */}
                  <div className="p-6 border-b border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-emerald-500/20 border border-primary/30 rounded-xl">
                          <Eye className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-emerald-100">View Statistics</h2>
                          <p className="text-sm text-emerald-400/60">Real-time article view tracking</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all"
                      >
                        <X className="w-6 h-6 text-primary" />
                      </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 backdrop-blur-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 rounded-2xl">
                        <div className="text-emerald-400/70 text-sm mb-1">Total Views</div>
                        <div className="text-3xl text-emerald-100">{totalViews.toLocaleString()}</div>
                      </div>
                      <div className="p-4 backdrop-blur-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 rounded-2xl">
                        <div className="text-emerald-400/70 text-sm mb-1">Last 24h</div>
                        <div className="text-3xl text-emerald-100">{recentViews.toLocaleString()}</div>
                      </div>
                      <div className="p-4 backdrop-blur-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 rounded-2xl">
                        <div className="text-emerald-400/70 text-sm mb-1">Articles Viewed</div>
                        <div className="text-3xl text-emerald-100">{Object.keys(viewCounts).length}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={loadStats}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 hover:border-primary/50 rounded-xl text-primary text-sm transition-all"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                      <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 hover:border-primary/50 rounded-xl text-primary text-sm transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 text-sm transition-all ml-auto"
                      >
                        <X className="w-4 h-4" />
                        Reset All
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <h3 className="text-lg text-emerald-200 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Top 10 Artikel
                    </h3>

                    <div className="space-y-3">
                      {topArticles.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-xl hover:border-primary/30 transition-all"
                        >
                          <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-yellow-500/40 text-yellow-300' :
                            index === 1 ? 'bg-gradient-to-br from-gray-400/30 to-gray-500/30 border border-gray-400/40 text-gray-300' :
                            index === 2 ? 'bg-gradient-to-br from-orange-600/30 to-orange-700/30 border border-orange-600/40 text-orange-300' :
                            'bg-primary/10 border border-primary/20 text-primary'
                          }`}>
                            #{index + 1}
                          </div>
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-emerald-100 text-sm line-clamp-1">{article.title}</h4>
                            <p className="text-emerald-400/60 text-xs">{article.category} • {article.date}</p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="text-emerald-100 text-sm font-semibold">{article.viewCount.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}