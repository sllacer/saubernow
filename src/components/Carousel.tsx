'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  itemWidth?: string;
  gap?: string;
  showPartialItems?: boolean;
  fadeEdges?: boolean;
}

export default function Carousel({ 
  children, 
  showArrows = true, 
  showDots = false,
  className = '',
  itemWidth = 'w-80',
  gap = 'gap-6',
  showPartialItems = true,
  fadeEdges = true
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 320;
      scrollRef.current.scrollBy({ 
        left: -(itemWidth + 24), // 24px for gap-6
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 320;
      scrollRef.current.scrollBy({ 
        left: itemWidth + 24, // 24px for gap-6
        behavior: 'smooth' 
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 320;
      scrollRef.current.scrollTo({
        left: index * (itemWidth + 24),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) < minSwipeDistance) return;
    
    if (distance > 0 && canScrollRight) {
      scrollRight();
    } else if (distance < 0 && canScrollLeft) {
      scrollLeft();
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, []);

  return (
    <div 
      className={`carousel-wrapper relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scroll Container with Fade Overlay */}
      <div className="carousel-container relative">
        {/* Left Fade Overlay */}
        {fadeEdges && canScrollLeft && (
          <div className="carousel-fade-left absolute left-0 top-2 bottom-6 w-6 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Right Fade Overlay */}
        {fadeEdges && canScrollRight && (
          <div className="carousel-fade-right absolute right-0 top-2 bottom-6 w-6 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className={`carousel-scroll-container overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar flex ${gap} pb-6 pt-2 ${showPartialItems ? 'px-4' : ''}`}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollPaddingLeft: showPartialItems ? '1rem' : '0',
            scrollPaddingRight: showPartialItems ? '1rem' : '0'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children.map((child, index) => (
            <div key={index} className={`carousel-item flex-shrink-0 ${itemWidth} relative z-20`}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Show on Hover */}
      {showArrows && (
        <>
          <button
            id="carousel-arrow-left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`carousel-arrow carousel-arrow-left absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-3 transition-all duration-300 ${
              canScrollLeft 
                ? 'text-gray-700 hover:text-primary-600 hover:shadow-xl hover:scale-110 hover:bg-white' 
                : 'text-gray-300 cursor-not-allowed'
            } ${
              isHovered && canScrollLeft 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            <ChevronLeft size={20} className="carousel-arrow-icon" />
          </button>
          
          <button
            id="carousel-arrow-right"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`carousel-arrow carousel-arrow-right absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-3 transition-all duration-300 ${
              canScrollRight 
                ? 'text-gray-700 hover:text-primary-600 hover:shadow-xl hover:scale-110 hover:bg-white' 
                : 'text-gray-300 cursor-not-allowed'
            } ${
              isHovered && canScrollRight 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            <ChevronRight size={20} className="carousel-arrow-icon" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="carousel-dots flex justify-center space-x-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`carousel-dot w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'carousel-dot-active bg-primary-600 w-8' 
                  : 'carousel-dot-inactive bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}