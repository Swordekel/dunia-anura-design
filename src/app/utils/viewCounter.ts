// View Counter Utility - Production Ready
// Menggunakan localStorage untuk menyimpan view counts secara persisten
// Weekly Reset System - Reset setiap Senin 00:00

const VIEW_STORAGE_KEY = 'duniaanura_article_views';
const VIEW_HISTORY_KEY = 'duniaanura_view_history';
const WEEK_START_KEY = 'duniaanura_week_start';

export interface ViewData {
  [articleId: number]: number;
}

export interface ViewHistory {
  articleId: number;
  timestamp: number;
}

// Get start of current week (Monday 00:00:00)
const getWeekStart = (): number => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday, go back 6 days; else go back (day - 1) days
  
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0); // Set to 00:00:00
  
  return monday.getTime();
};

// Check if we need to reset (new week started)
const checkAndResetWeekly = () => {
  try {
    const currentWeekStart = getWeekStart();
    const storedWeekStart = localStorage.getItem(WEEK_START_KEY);
    
    // If no stored week or stored week is different from current week, reset
    if (!storedWeekStart || parseInt(storedWeekStart) !== currentWeekStart) {
      console.log('🔄 New week detected! Resetting trending data...');
      
      // Reset view counts and history
      localStorage.removeItem(VIEW_STORAGE_KEY);
      localStorage.removeItem(VIEW_HISTORY_KEY);
      
      // Save new week start
      localStorage.setItem(WEEK_START_KEY, currentWeekStart.toString());
      
      // Log reset info
      const weekStartDate = new Date(currentWeekStart);
      console.log(`📅 Trending period: ${weekStartDate.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })} - ${new Date(currentWeekStart + 7 * 24 * 60 * 60 * 1000 - 1).toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking weekly reset:', error);
    return false;
  }
};

// Get all view counts from localStorage
export const getViewCounts = (): ViewData => {
  try {
    // Check for weekly reset before getting counts
    checkAndResetWeekly();
    
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading view counts:', error);
    return {};
  }
};

// Get view count for specific article
export const getArticleViews = (articleId: number): number => {
  const viewCounts = getViewCounts();
  return viewCounts[articleId] || 0;
};

// Increment view count for an article
export const incrementArticleView = (articleId: number): number => {
  try {
    const viewCounts = getViewCounts();
    const currentViews = viewCounts[articleId] || 0;
    const newViews = currentViews + 1;
    
    viewCounts[articleId] = newViews;
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(viewCounts));
    
    // Track view history
    addViewHistory(articleId);
    
    return newViews;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return getArticleViews(articleId);
  }
};

// Add view to history (for analytics)
const addViewHistory = (articleId: number) => {
  try {
    const stored = localStorage.getItem(VIEW_HISTORY_KEY);
    const history: ViewHistory[] = stored ? JSON.parse(stored) : [];
    
    history.push({
      articleId,
      timestamp: Date.now()
    });
    
    // Keep only last 1000 views to prevent localStorage bloat
    const trimmedHistory = history.slice(-1000);
    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving view history:', error);
  }
};

// Get view history for analytics
export const getViewHistory = (): ViewHistory[] => {
  try {
    const stored = localStorage.getItem(VIEW_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading view history:', error);
    return [];
  }
};

// Get trending articles based on recent views (last 7 days)
export const getTrendingArticles = (articles: any[], limit: number = 5) => {
  const viewCounts = getViewCounts();
  const history = getViewHistory();
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  // Count recent views for each article
  const recentViews: ViewData = {};
  history.forEach(view => {
    if (view.timestamp > sevenDaysAgo) {
      recentViews[view.articleId] = (recentViews[view.articleId] || 0) + 1;
    }
  });
  
  // Combine with total views (70% recent, 30% total)
  const scoredArticles = articles.map(article => ({
    ...article,
    views: viewCounts[article.id] || 0,
    recentViews: recentViews[article.id] || 0,
    trendScore: (recentViews[article.id] || 0) * 0.7 + (viewCounts[article.id] || 0) * 0.3
  }));
  
  // Sort by trend score
  return scoredArticles.sort((a, b) => b.trendScore - a.trendScore).slice(0, limit);
};

// Reset all view counts (for testing/admin)
export const resetViewCounts = () => {
  try {
    localStorage.removeItem(VIEW_STORAGE_KEY);
    localStorage.removeItem(VIEW_HISTORY_KEY);
    localStorage.removeItem(WEEK_START_KEY); // Also reset week tracking
    console.log('✅ View counts reset successfully!');
    console.log('📊 All article views are now at 0');
    console.log('🔄 Trending will now sync between Home and Ensiklopedia');
  } catch (error) {
    console.error('Error resetting view counts:', error);
  }
};

// GLOBAL RESET FUNCTION - Call this in browser console to reset all views
if (typeof window !== 'undefined') {
  (window as any).resetAllViews = resetViewCounts;
  console.log('💡 TIP: Type "resetAllViews()" in console to reset all view counts');
}

// Export view data for backup/analytics
export const exportViewData = () => {
  return {
    viewCounts: getViewCounts(),
    viewHistory: getViewHistory(),
    exportDate: new Date().toISOString()
  };
};

// Import view data from backup
export const importViewData = (data: { viewCounts: ViewData; viewHistory: ViewHistory[] }) => {
  try {
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(data.viewCounts));
    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(data.viewHistory));
    console.log('View data imported successfully');
  } catch (error) {
    console.error('Error importing view data:', error);
  }
};

// Get current trending week info
export const getTrendingWeekInfo = () => {
  const weekStart = getWeekStart();
  const weekEnd = weekStart + 7 * 24 * 60 * 60 * 1000 - 1;
  
  return {
    weekStart: new Date(weekStart),
    weekEnd: new Date(weekEnd),
    weekStartFormatted: new Date(weekStart).toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    weekEndFormatted: new Date(weekEnd).toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    daysUntilReset: Math.ceil((weekEnd - Date.now()) / (24 * 60 * 60 * 1000))
  };
};