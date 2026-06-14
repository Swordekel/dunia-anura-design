import { useRef, useState, useEffect } from 'react';

export function FrogMascot3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);
  const frogRef = useRef<HTMLDivElement>(null);
  
  // Floating animation
  useEffect(() => {
    let animationFrame: number;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const offset = Math.sin(elapsed * 1.5) * 10; // Float up and down 10px
      setFloatOffset(offset);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000); // Random blink every 3-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!frogRef.current) return;
      
      const rect = frogRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const maxDistance = 400;
      const x = Math.max(-1, Math.min(1, deltaX / maxDistance));
      const y = Math.max(-1, Math.min(1, deltaY / maxDistance));
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleClick = () => {
    if (isWaving) return;
    
    // Start wave animation
    setIsWaving(true);
    
    // Wave for 1.5 seconds (3 waves)
    setTimeout(() => setIsWaving(false), 1500);
  };
  
  if (!isVisible) return null;
  
  // Calculate eye pupil position
  const pupilX = mousePosition.x * 8;
  const pupilY = mousePosition.y * 8;
  
  // Calculate body tilt
  const bodyRotateX = mousePosition.y * 8;
  const bodyRotateY = mousePosition.x * 8;
  
  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      {/* 3D Frog Container */}
      <div 
        ref={frogRef}
        onClick={handleClick}
        className={`relative w-48 h-48 cursor-pointer transition-all duration-300 hover:scale-110`}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `translateY(${floatOffset}px) ${isJumping ? 'translateY(-80px) scale(1.15) rotate(5deg)' : ''}`,
        }}
      >
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 to-green-600/40 blur-2xl animate-pulse" 
          style={{ animationDuration: '3s' }} />
        
        {/* Glass Container with Premium Border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-emerald-500/20 to-green-600/30 backdrop-blur-2xl border-2 border-emerald-400/50 shadow-2xl overflow-hidden transition-all duration-300 group-hover:shadow-emerald-500/70 group-hover:border-emerald-300/70">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 via-transparent to-green-500/30 animate-gradient bg-[length:200%_200%]" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer" />
          </div>
        </div>
        
        {/* Frog Body */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative transition-transform duration-300"
            style={{
              transform: `rotateX(${bodyRotateX}deg) rotateY(${bodyRotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Main Body with enhanced gradient */}
            <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-full shadow-2xl transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(16, 185, 129, 0.5))',
              }}>
              {/* Belly highlight */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-white/30 to-emerald-200/20 rounded-full blur-md" />
              
              {/* Belly spot */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-14 bg-gradient-to-br from-emerald-100/50 to-emerald-200/50 rounded-full blur-sm" />
              
              {/* Premium Spots Pattern */}
              <div className="absolute top-5 left-4 w-4 h-4 bg-emerald-800/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0s', animationDuration: '2s' }} />
              <div className="absolute top-7 right-5 w-3 h-3 bg-emerald-800/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
              <div className="absolute bottom-8 left-7 w-3.5 h-3.5 bg-emerald-800/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s', animationDuration: '2s' }} />
              <div className="absolute bottom-6 right-6 w-2.5 h-2.5 bg-emerald-800/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.7s', animationDuration: '2s' }} />
              
              {/* Texture overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-300/20 to-transparent" />
            </div>
            
            {/* Enhanced Head */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-800 rounded-t-[60%] rounded-b-[40%] shadow-2xl border-t-2 border-emerald-300/30"
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(16, 185, 129, 0.4))',
              }}>
              
              {/* Head highlight */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm" />
              
              {/* Premium Eyes Container */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full flex justify-between px-2">
                {/* Left Eye */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-200 via-yellow-100 to-white rounded-full shadow-2xl overflow-hidden border-3 border-emerald-600/80"
                  style={{
                    filter: 'drop-shadow(0 4px 10px rgba(252, 211, 77, 0.6))',
                    transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
                    transition: 'transform 0.15s ease-out',
                  }}>
                  {/* Iris */}
                  <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full" />
                  
                  {/* Pupil with tracking */}
                  <div 
                    className="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-black rounded-full transition-all duration-150 ease-out shadow-lg"
                    style={{
                      top: `calc(50% - 10px + ${pupilY}px)`,
                      left: `calc(50% - 10px + ${pupilX}px)`,
                    }}
                  >
                    {/* Eye shine */}
                    <div className="absolute top-1 left-1.5 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                  
                  {/* Eye reflection */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                </div>
                
                {/* Right Eye */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-200 via-yellow-100 to-white rounded-full shadow-2xl overflow-hidden border-3 border-emerald-600/80"
                  style={{
                    filter: 'drop-shadow(0 4px 10px rgba(252, 211, 77, 0.6))',
                    transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
                    transition: 'transform 0.15s ease-out',
                  }}>
                  {/* Iris */}
                  <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full" />
                  
                  {/* Pupil with tracking */}
                  <div 
                    className="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-black rounded-full transition-all duration-150 ease-out shadow-lg"
                    style={{
                      top: `calc(50% - 10px + ${pupilY}px)`,
                      left: `calc(50% - 10px + ${pupilX}px)`,
                    }}
                  >
                    {/* Eye shine */}
                    <div className="absolute top-1 left-1.5 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                  
                  {/* Eye reflection */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                </div>
              </div>
              
              {/* Enhanced Smile */}
              <div 
                className="absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300"
                style={{
                  width: isJumping ? '16px' : '40px',
                }}
              >
                <div className="w-full h-4 border-b-3 border-emerald-900/60 rounded-b-full shadow-sm" />
                {/* Smile highlight */}
                {!isJumping && <div className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-emerald-200/30 rounded-full blur-sm" />}
              </div>
              
              {/* Premium Nostrils */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-900/50 rounded-full shadow-inner" />
                <div className="w-1.5 h-1.5 bg-emerald-900/50 rounded-full shadow-inner" />
              </div>
              
              {/* Cheek blush */}
              <div className="absolute bottom-4 left-1 w-4 h-3 bg-pink-400/30 rounded-full blur-sm" />
              <div className="absolute bottom-4 right-1 w-4 h-3 bg-pink-400/30 rounded-full blur-sm" />
            </div>
            
            {/* Enhanced Front Legs */}
            <div 
              className="absolute top-16 -left-10 w-11 h-14 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800 rounded-full shadow-2xl border-l-2 border-emerald-300/30 transition-transform duration-300"
              style={{
                transform: `rotate(${isJumping ? '-70deg' : '-50deg'})`,
                filter: 'drop-shadow(0 6px 15px rgba(16, 185, 129, 0.3))',
              }}
            >
              {/* Leg highlight */}
              <div className="absolute top-2 left-2 w-4 h-6 bg-white/20 rounded-full blur-sm" />
              {/* Toes */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
                <div className="w-2 h-3 bg-emerald-900/40 rounded-b-full" />
                <div className="w-2 h-4 bg-emerald-900/40 rounded-b-full" />
                <div className="w-2 h-3 bg-emerald-900/40 rounded-b-full" />
              </div>
            </div>
            
            {/* Right Front Leg - Waving */}
            <div 
              className="absolute top-16 -right-10 w-11 h-14 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800 rounded-full shadow-2xl border-r-2 border-emerald-300/30 origin-top"
              style={{
                transform: isWaving 
                  ? 'rotate(-10deg)' 
                  : `rotate(${isJumping ? '70deg' : '50deg'})`,
                filter: isWaving 
                  ? 'drop-shadow(0 8px 20px rgba(16, 185, 129, 0.6))' 
                  : 'drop-shadow(0 6px 15px rgba(16, 185, 129, 0.3))',
                animation: isWaving ? 'wave 0.5s ease-in-out 3' : 'none',
              }}
            >
              {/* Leg highlight */}
              <div className="absolute top-2 right-2 w-4 h-6 bg-white/20 rounded-full blur-sm" />
              {/* Toes */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
                <div className="w-2 h-3 bg-emerald-900/40 rounded-b-full" />
                <div className="w-2 h-4 bg-emerald-900/40 rounded-b-full" />
                <div className="w-2 h-3 bg-emerald-900/40 rounded-b-full" />
              </div>
            </div>
            
            {/* Enhanced Back Legs */}
            <div 
              className="absolute top-22 -left-12 w-14 h-16 bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 rounded-full shadow-2xl border-l-2 border-emerald-400/30 transition-transform duration-300"
              style={{
                transform: `rotate(${isJumping ? '-85deg' : '-65deg'})`,
                filter: 'drop-shadow(0 8px 20px rgba(16, 185, 129, 0.4))',
              }}
            >
              {/* Leg highlight */}
              <div className="absolute top-3 left-3 w-5 h-7 bg-white/20 rounded-full blur-sm" />
              {/* Webbed foot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-5 bg-emerald-900/50 rounded-b-full" />
            </div>
            
            <div 
              className="absolute top-22 -right-12 w-14 h-16 bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 rounded-full shadow-2xl border-r-2 border-emerald-400/30 transition-transform duration-300"
              style={{
                transform: `rotate(${isJumping ? '85deg' : '65deg'})`,
                filter: 'drop-shadow(0 8px 20px rgba(16, 185, 129, 0.4))',
              }}
            >
              {/* Leg highlight */}
              <div className="absolute top-3 right-3 w-5 h-7 bg-white/20 rounded-full blur-sm" />
              {/* Webbed foot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-5 bg-emerald-900/50 rounded-b-full" />
            </div>
          </div>
        </div>
        
        {/* Premium Ripple Effects */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 group-hover:animate-ping" />
          <div className="absolute inset-0 rounded-full border border-emerald-300/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full border border-green-400/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>
        
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-pulse pointer-events-none"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
              opacity: 0.6,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Tooltip */}
      <div className="absolute bottom-full right-0 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:-translate-y-2">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-emerald-500/40 whitespace-nowrap">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl" />
          <p className="relative text-sm font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
            Klik aku untuk melambai! 👋🐸✨
          </p>
          <p className="relative text-xs text-emerald-200/80 mt-1">Mataku mengikuti kamu lho~</p>
        </div>
        <div className="w-4 h-4 bg-gradient-to-br from-gray-900 to-gray-800 border-r-2 border-b-2 border-emerald-500/40 absolute bottom-0 right-6 transform translate-y-1/2 rotate-45" />
      </div>
      
      {/* Enhanced Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-xl text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-700 hover:scale-125 hover:rotate-90 flex items-center justify-center font-bold border-2 border-emerald-500/40 hover:border-red-400/60 z-10 shadow-2xl"
        aria-label="Hide mascot"
      >
        ✕
      </button>
      
      {/* Enhanced Shadow */}
      <div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-6 bg-gradient-to-r from-transparent via-gray-900/40 to-transparent rounded-full blur-xl transition-all duration-300"
        style={{
          width: isJumping ? '100px' : '150px',
          opacity: isJumping ? 0.2 : 0.6,
        }}
      />
      
      {/* Rotating Ring Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-40 h-40 border-2 border-dashed border-emerald-400/0 group-hover:border-emerald-400/30 rounded-full transition-all duration-500 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-4 border border-dotted border-green-400/0 group-hover:border-green-400/20 rounded-full transition-all duration-500 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      </div>
    </div>
  );
}