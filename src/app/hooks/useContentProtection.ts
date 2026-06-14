import { useEffect } from 'react';

/**
 * Custom Hook untuk Content Protection
 * - Disable right-click
 * - Disable keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, dll)
 * - Detect DevTools
 * - Prevent text selection (optional)
 */
export function useContentProtection() {
  useEffect(() => {
    // 1. Disable Right-Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Optional: Show custom message
      console.log('⚠️ Right-click dinonaktifkan untuk proteksi konten.');
      return false;
    };

    // 2. Disable Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - Developer Tools
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I - Inspect Element
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J - Console (Chrome)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C - Inspect Element Picker
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U - View Source
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Ctrl+S - Save Page
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+I (Mac)
      if (e.metaKey && e.altKey && e.key === 'i') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+J (Mac)
      if (e.metaKey && e.altKey && e.key === 'j') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+C (Mac)
      if (e.metaKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable Text Selection (Optional - bisa mengganggu UX)
    const disableSelection = () => {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    };

    // 4. Detect DevTools (Advanced)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools terdeteksi terbuka
        console.clear();
        console.log('%c⚠️ PERINGATAN', 'color: red; font-size: 40px; font-weight: bold;');
        console.log('%c🔒 Website ini dilindungi!', 'color: #10b981; font-size: 20px;');
        console.log('%cJangan mencoba mengakses Developer Tools.', 'color: orange; font-size: 14px;');
        console.log('%c- Tim DuniaAnura', 'color: #10b981; font-size: 12px; font-style: italic;');
      }
    };

    // 5. Clear Console Periodically
    const clearConsoleInterval = setInterval(() => {
      console.clear();
      console.log('%c🐸 DuniaAnura', 'color: #10b981; font-size: 24px; font-weight: bold;');
      console.log('%c🔒 Konten website ini dilindungi.', 'color: orange; font-size: 14px;');
    }, 3000);

    // 6. Prevent Drag & Drop Images
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Add Event Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    
    // Optional: Disable selection
    disableSelection();

    // DevTools Detection
    const devToolsInterval = setInterval(detectDevTools, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      clearInterval(clearConsoleInterval);
      clearInterval(devToolsInterval);
      
      // Re-enable selection on unmount
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);
}
