'use client';

import { Star, Quote } from 'lucide-react';
import Carousel from './Carousel';
import { mockTestimonials, type Testimonial } from '@/lib/data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div 
      id={`testimonial-card-${testimonial.id}`}
      className="testimonial-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 h-full border border-gray-100 hover:border-primary-200"
    >
      {/* Quote Icon */}
      <div className="testimonial-quote-icon-wrapper flex justify-center mb-4">
        <div className="testimonial-quote-icon-container bg-primary-100 rounded-full p-3">
          <Quote className="testimonial-quote-icon text-primary-600" size={24} />
        </div>
      </div>

      {/* Quote Text */}
      <blockquote className="testimonial-quote text-gray-700 text-center mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating */}
      <div className="testimonial-rating-wrapper flex justify-center mb-4">
        <div className="testimonial-rating-stars flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`testimonial-rating-star ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Customer Info */}
      <div className="testimonial-customer-info flex items-center justify-center space-x-3">
        <div className="testimonial-customer-photo-section flex-shrink-0">
          {testimonial.photo ? (
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="testimonial-customer-photo w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="testimonial-customer-photo-placeholder w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center border-2 border-gray-200">
              <span className="testimonial-customer-initial text-primary-600 font-semibold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="testimonial-customer-details text-center">
          <div className="testimonial-customer-name font-semibold text-gray-900">{testimonial.name}</div>
          <div className="testimonial-customer-location text-sm text-gray-600">{testimonial.location}</div>
          {testimonial.serviceType && (
            <div className="testimonial-service-type text-xs text-primary-600 font-medium mt-1">
              {testimonial.serviceType}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialCarouselProps {
  className?: string;
}

export default function TestimonialCarousel({ className = '' }: TestimonialCarouselProps) {
  return (
    <div id="testimonial-carousel" className={`testimonial-carousel ${className}`}>
      <Carousel 
        itemWidth="w-80 sm:w-96"
        gap="gap-6"
        showArrows={true}
        showDots={false}
        showPartialItems={true}
        fadeEdges={true}
        className="testimonial-carousel-wrapper px-4 sm:px-8"
      >
        {mockTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Carousel>
    </div>
  );
}