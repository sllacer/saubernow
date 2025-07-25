'use client';

import { ClipboardList, Clock, UserCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Carousel from './Carousel';

interface ProcessStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  linkPath: string;
  step: number;
}

interface ProcessCardProps {
  step: ProcessStep;
  locale: string;
}

function ProcessCard({ step, locale }: ProcessCardProps) {
  return (
    <Link href={`/${locale}${step.linkPath}`}>
      <div 
        id={`process-card-${step.id}`}
        className="process-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8 h-full border border-gray-100 cursor-pointer group relative overflow-hidden"
      >
        {/* Background Gradient Effect */}
        <div className="process-card-background absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Step Number */}
        <div className="process-card-header relative z-10 flex items-center justify-between mb-6">
          <div className="process-step-number bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {step.step}
          </div>
          <ArrowRight className="process-card-arrow text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" size={20} />
        </div>

        {/* Icon */}
        <div className="process-card-icon-wrapper relative z-10 flex justify-center mb-6">
          <div className="process-card-icon-container bg-primary-100 rounded-full p-4 group-hover:bg-primary-200 transition-colors duration-300">
            {step.icon}
          </div>
        </div>

        {/* Content */}
        <div className="process-card-content relative z-10 text-center">
          <h3 className="process-card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
            {step.title}
          </h3>
          <p className="process-card-description text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Bottom Action Hint */}
        <div className="process-card-cta relative z-10 mt-6 pt-4 border-t border-gray-100 text-center">
          <span className="process-card-cta-text text-sm text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Klicken zum Starten →
          </span>
        </div>
      </div>
    </Link>
  );
}

interface ProcessCarouselProps {
  className?: string;
}

export default function ProcessCarousel({ className = '' }: ProcessCarouselProps) {
  const locale = useLocale();

  const processSteps: ProcessStep[] = [
    {
      id: '1',
      icon: <ClipboardList className="process-step-icon text-primary-600" size={32} />,
      title: 'Details angeben',
      description: 'Beschreiben Sie Ihre Reinigungsanforderungen, Raumgröße und spezielle Wünsche.',
      linkPath: '/post-job',
      step: 1
    },
    {
      id: '2',
      icon: <Clock className="process-step-icon text-primary-600" size={32} />,
      title: 'Zeit wählen',
      description: 'Geben Sie Ihre bevorzugten Termine und Flexibilität bei der Zeitplanung an.',
      linkPath: '/post-job',
      step: 2
    },
    {
      id: '3',
      icon: <UserCheck className="process-step-icon text-primary-600" size={32} />,
      title: 'Passende Person finden',
      description: 'Erhalten Sie Angebote von verifizierten Reinigungskräften in Ihrer Nähe.',
      linkPath: '/find-cleaner',
      step: 3
    }
  ];

  return (
    <div id="process-carousel" className={`process-carousel ${className}`}>
      <Carousel 
        itemWidth="w-80 sm:w-96"
        gap="gap-8"
        showArrows={true}
        showDots={false}
        className="process-carousel-wrapper px-8 sm:px-12"
      >
        {processSteps.map((step) => (
          <ProcessCard key={step.id} step={step} locale={locale} />
        ))}
      </Carousel>
    </div>
  );
}