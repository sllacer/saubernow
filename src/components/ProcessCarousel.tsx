'use client';

import { ClipboardList, Clock, UserCheck } from 'lucide-react';

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
}

function ProcessCard({ step }: ProcessCardProps) {
  return (
    <div 
      id={`process-card-${step.id}`}
      className="process-card relative w-80 h-64 cursor-pointer group perspective-1000"
    >
      <div className="process-card-inner relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front Side - Title with Icon */}
        <div className="process-card-front absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 backface-hidden flex items-center justify-center p-8">
          <div className="text-center">
            {/* Step Number Badge */}
            <div className="process-step-number bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mx-auto mb-4">
              {step.step}
            </div>
            
            {/* Icon */}
            <div className="process-card-icon-front bg-primary-100 rounded-2xl p-4 mx-auto mb-4 w-20 h-20 flex items-center justify-center">
              <div className="text-primary-600">
                {step.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="process-card-title text-xl font-bold text-gray-900">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Back Side - Description */}
        <div className="process-card-back absolute inset-0 w-full h-full bg-primary-50 rounded-2xl shadow-xl border border-primary-200 backface-hidden rotate-y-180 flex items-center justify-center p-8">
          <div className="text-center">
            {/* Icon on back */}
            <div className="process-card-icon-container bg-primary-100 rounded-2xl p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <div className="text-primary-600">
                {step.icon}
              </div>
            </div>
            
            {/* Description */}
            <p className="process-card-description text-base text-gray-700 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcessCarouselProps {
  className?: string;
}

export default function ProcessCarousel({ className = '' }: ProcessCarouselProps) {

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
      <div className="flex flex-wrap justify-center gap-6 px-4 lg:flex-nowrap lg:gap-8">
        {processSteps.map((step) => (
          <ProcessCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}