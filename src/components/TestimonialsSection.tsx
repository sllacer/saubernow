'use client';

import TestimonialCarousel from './TestimonialCarousel';

interface TestimonialsSectionProps {
  className?: string;
}

export default function TestimonialsSection({ className = '' }: TestimonialsSectionProps) {
  return (
    <section 
      id="testimonials-section" 
      className={`testimonials-section py-16 bg-gray-50 ${className}`}
    >
      <div className="testimonials-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header text-center mb-12">
          <h2 className="testimonials-title text-3xl font-bold text-gray-900 mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="testimonials-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Echte Bewertungen von zufriedenen Kunden aus ganz Salzburg
          </p>
        </div>
        
        <div className="testimonials-carousel-wrapper">
          <TestimonialCarousel className="testimonials-carousel" />
        </div>
      </div>
    </section>
  );
}