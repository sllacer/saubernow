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
}

export default function Carousel({ 
  children, 
  showArrows = true, 
  showDots = false,
  className = '',
  itemWidth = 'w-80',
  gap = 'gap-6'
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className={`carousel-wrapper relative ${className}`}>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className={`carousel-scroll-container overflow-x-auto scroll-smooth hide-scrollbar flex ${gap} pb-4`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children.map((child, index) => (
          <div key={index} className={`carousel-item flex-shrink-0 ${itemWidth}`}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            id="carousel-arrow-left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`carousel-arrow carousel-arrow-left absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 transition-all duration-200 ${
              canScrollLeft 
                ? 'text-gray-700 hover:text-primary-600 hover:shadow-xl hover:scale-110' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={20} className="carousel-arrow-icon" />
          </button>
          
          <button
            id="carousel-arrow-right"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`carousel-arrow carousel-arrow-right absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 transition-all duration-200 ${
              canScrollRight 
                ? 'text-gray-700 hover:text-primary-600 hover:shadow-xl hover:scale-110' 
                : 'text-gray-300 cursor-not-allowed'
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