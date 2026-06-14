import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AnimalGrid } from './components/AnimalGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BlogHome } from './components/BlogHome';
import { ArticleDetail } from './components/ArticleDetail';
import { Article } from './data/articles';
import { YouTubeSection } from './components/YouTubeSection';
import { ScrollToTop } from './components/ScrollToTop';
import { ViewStatsDebug } from './components/ViewStatsDebug';
import { useContentProtection } from './hooks/useContentProtection';

export default function App() {
  // 🔒 Activate Content Protection
  useContentProtection();

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSubcategory, setFilterSubcategory] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedArticle(null);
    setScrollPosition(0); // Reset scroll position
    // Reset filter when navigating to animals page without filter
    if (page === 'animals') {
      // Don't reset filter, keep current filter
    }
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterCategory = (category: string, subcategory?: string) => {
    setFilterCategory(category.toLowerCase());
    setFilterSubcategory(subcategory || null);
    setCurrentPage('animals');
    setScrollPosition(0); // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: Article) => {
    // Save scroll position before opening article
    setScrollPosition(window.scrollY);
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    // Restore scroll position immediately after state updates
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    }, 0);
  };

  const renderPage = () => {
    // Show article detail if selected
    if (selectedArticle) {
      return <ArticleDetail article={selectedArticle} onClose={handleCloseArticle} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => handleNavigate('animals')} />
            <YouTubeSection />
            <div className="py-20">
              <BlogHome onArticleClick={handleArticleClick} />
            </div>
          </>
        );
      case 'animals':
        return (
          <>
            <div className="pt-20">
              <AnimalGrid filterCategory={filterCategory} filterSubcategory={filterSubcategory} />
            </div>
          </>
        );
      case 'about':
        return (
          <div className="pt-20">
            <AboutSection />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-20">
            <ContactSection />
          </div>
        );
      default:
        return (
          <>
            <Hero onExplore={() => handleNavigate('animals')} />
            <div className="py-20">
              <BlogHome onArticleClick={handleArticleClick} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header onNavigate={handleNavigate} currentPage={currentPage} onFilterCategory={handleFilterCategory} />
      <main className="relative">
        {renderPage()}
      </main>
      {!selectedArticle && <Footer onNavigate={handleNavigate} onFilterCategory={handleFilterCategory} />}
      <ScrollToTop />
      {import.meta.env.DEV && <ViewStatsDebug />}
    </div>
  );
}