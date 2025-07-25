# SauberNow Component Architecture Documentation

## Overview
This document outlines the standardized component architecture for SauberNow, including naming conventions, ID/class structure, and component organization. All components follow consistent patterns for easy identification, styling, and debugging.

## Component Naming Convention

### IDs and Classes Structure
- **IDs**: Unique identifiers using kebab-case: `#main-navigation`, `#hero-section`
- **Classes**: Semantic, component-based naming: `.cleaner-card`, `.testimonial-quote`
- **BEM-inspired**: Component-element-modifier pattern where applicable

## Landing Page Components

### 1. **HomePage** (`src/app/[locale]/page.tsx`)
```html
<div id="homepage" class="homepage">
  <main class="homepage-main">
    <!-- All sections here -->
  </main>
</div>
```

### 2. **Navigation** (`src/components/Navigation.tsx`)
```html
<nav id="main-navigation" class="main-navigation">
  <div class="nav-container">
    <div class="nav-wrapper">
      <!-- Logo Section -->
      <div class="nav-logo-section">
        <a class="nav-logo-link">
          <img class="nav-logo" />
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="nav-desktop">
        <a class="nav-link nav-link-find-cleaner"></a>
        <a class="nav-link nav-link-become-cleaner"></a>
        <button id="language-toggle" class="nav-language-toggle">
          <Globe class="nav-language-icon" />
          <span class="nav-language-text"></span>
        </button>
        <button id="profile-button" class="nav-profile-button">
          <User class="nav-profile-icon" />
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div class="nav-mobile-toggle">
        <button id="mobile-menu-toggle" class="mobile-menu-toggle">
          <Menu class="mobile-menu-open" />
          <X class="mobile-menu-close" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div id="mobile-navigation" class="nav-mobile">
      <div class="nav-mobile-container">
        <a class="nav-mobile-link nav-mobile-link-find-cleaner"></a>
        <a class="nav-mobile-link nav-mobile-link-become-cleaner"></a>
        <button class="nav-mobile-language-toggle">
          <Globe class="nav-mobile-language-icon" />
          <span class="nav-mobile-language-text"></span>
        </button>
        <button class="nav-mobile-profile-button">
          <User class="nav-mobile-profile-icon" />
          <span class="nav-mobile-profile-text"></span>
        </button>
      </div>
    </div>
  </div>
</nav>
```

### 3. **HeroSection** (`src/components/HeroSection.tsx`)
```html
<section id="hero-section" class="hero-section">
  <div class="hero-background"></div>
  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-badge"></div>
      <h1 class="hero-headline"></h1>
      <p class="hero-subtitle"></p>
      
      <!-- Trust Stats -->
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-content"></div>
          <p class="hero-stat-label"></p>
        </div>
      </div>
      
      <!-- Process Carousel -->
      <div class="hero-process">
        <h3 class="hero-process-title"></h3>
        <div class="hero-process-carousel"></div>
      </div>
      
      <!-- CTAs -->
      <div class="hero-ctas">
        <a class="hero-cta-primary"></a>
        <a class="hero-cta-secondary"></a>
      </div>
    </div>
  </div>
</section>
```

### 4. **TestimonialsSection** (`src/components/TestimonialsSection.tsx`)
```html
<section id="testimonials-section" class="testimonials-section">
  <div class="testimonials-container">
    <div class="testimonials-header">
      <h2 class="testimonials-title"></h2>
      <p class="testimonials-subtitle"></p>
    </div>
    <div class="testimonials-carousel-wrapper">
      <div id="testimonial-carousel" class="testimonial-carousel"></div>
    </div>
  </div>
</section>
```

### 5. **TestimonialCarousel** (`src/components/TestimonialCarousel.tsx`)
```html
<div id="testimonial-carousel" class="testimonial-carousel">
  <div class="testimonial-carousel-wrapper">
    <!-- Individual Testimonial Cards -->
    <div id="testimonial-card-{id}" class="testimonial-card">
      <div class="testimonial-quote-icon-wrapper">
        <div class="testimonial-quote-icon-container">
          <Quote class="testimonial-quote-icon" />
        </div>
      </div>
      <blockquote class="testimonial-quote"></blockquote>
      <div class="testimonial-rating-wrapper">
        <div class="testimonial-rating-stars">
          <Star class="testimonial-rating-star" />
        </div>
      </div>
      <div class="testimonial-customer-info">
        <div class="testimonial-customer-photo-section">
          <img class="testimonial-customer-photo" />
          <!-- OR -->
          <div class="testimonial-customer-photo-placeholder">
            <span class="testimonial-customer-initial"></span>
          </div>
        </div>
        <div class="testimonial-customer-details">
          <div class="testimonial-customer-name"></div>
          <div class="testimonial-customer-location"></div>
          <div class="testimonial-service-type"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 6. **ProcessCarousel** (`src/components/ProcessCarousel.tsx`)
```html
<div id="process-carousel" class="process-carousel">
  <div class="process-carousel-wrapper">
    <!-- Individual Process Cards -->
    <div id="process-card-{id}" class="process-card">
      <div class="process-card-background"></div>
      <div class="process-card-header">
        <div class="process-step-number"></div>
        <ArrowRight class="process-card-arrow" />
      </div>
      <div class="process-card-icon-wrapper">
        <div class="process-card-icon-container">
          <Icon class="process-step-icon" />
        </div>
      </div>
      <div class="process-card-content">
        <h3 class="process-card-title"></h3>
        <p class="process-card-description"></p>
      </div>
      <div class="process-card-cta">
        <span class="process-card-cta-text"></span>
      </div>
    </div>
  </div>
</div>
```

### 7. **SearchSection** (`src/components/SearchSection.tsx`)
```html
<section id="search-section" class="search-section">
  <div class="search-container">
    <div class="search-header">
      <h2 class="search-title"></h2>
      <p class="search-subtitle"></p>
    </div>
    <div class="search-form">
      <div class="search-input-wrapper">
        <input class="search-input" />
      </div>
      <button class="search-button"></button>
    </div>
  </div>
</section>
```

### 8. **FeaturedCleanersSection** (`src/components/FeaturedCleanersSection.tsx`)
```html
<section id="featured-cleaners-section" class="featured-cleaners-section">
  <div class="featured-cleaners-container">
    <div class="featured-cleaners-header">
      <h2 class="featured-cleaners-title"></h2>
      <p class="featured-cleaners-subtitle"></p>
    </div>
    <div class="featured-cleaners-grid">
      <div class="featured-cleaner-card">
        <!-- CleanerCard component -->
      </div>
    </div>
    <div class="featured-cleaners-cta">
      <a class="featured-cleaners-button"></a>
    </div>
  </div>
</section>
```

### 9. **CleanerCard** (`src/components/CleanerCard.tsx`)
```html
<div id="cleaner-card-{id}" class="cleaner-card">
  <div class="cleaner-card-content">
    <!-- Photo Section -->
    <div class="cleaner-photo-section">
      <img class="cleaner-photo" />
      <!-- OR -->
      <div class="cleaner-photo-placeholder">
        <span class="cleaner-photo-initial"></span>
      </div>
    </div>
    
    <!-- Info Section -->
    <div class="cleaner-info">
      <div class="cleaner-header">
        <h3 class="cleaner-name"></h3>
        <div class="cleaner-verified-badge">
          <CheckCircle class="verified-icon" />
          <span class="verified-text"></span>
        </div>
      </div>
      
      <div class="cleaner-rating">
        <div class="rating-stars">
          <Star class="rating-star" />
        </div>
        <span class="rating-text"></span>
      </div>
      
      <div class="cleaner-location">
        <MapPin class="location-icon" />
        <span class="location-text"></span>
        <span class="location-distance"></span>
      </div>
      
      <div class="cleaner-price"></div>
      
      <div class="cleaner-languages">
        <span class="languages-label"></span>
        <span class="languages-list"></span>
      </div>
      
      <div class="cleaner-specialties">
        <span class="specialties-label"></span>
        <div class="specialties-list">
          <span class="specialty-tag specialty-tag-{specialty}"></span>
        </div>
      </div>
      
      <p class="cleaner-description"></p>
      
      <button class="cleaner-contact-button">
        <MessageCircle class="contact-icon" />
        <span class="contact-text"></span>
      </button>
    </div>
  </div>
</div>
```

### 10. **CTASection** (`src/components/CTASection.tsx`)
```html
<section id="cta-section" class="cta-section">
  <div class="cta-container">
    <div class="cta-header">
      <h2 class="cta-title"></h2>
    </div>
    <div class="cta-cards">
      <div class="cta-card cta-card-post">
        <div class="cta-card-icon"></div>
        <h3 class="cta-card-title"></h3>
        <p class="cta-card-description"></p>
        <a class="cta-card-button"></a>
      </div>
      <div class="cta-card cta-card-search">
        <div class="cta-card-icon"></div>
        <h3 class="cta-card-title"></h3>
        <p class="cta-card-description"></p>
        <a class="cta-card-button"></a>
      </div>
    </div>
  </div>
</section>
```

### 11. **Base Carousel** (`src/components/Carousel.tsx`)
```html
<div class="carousel-wrapper">
  <div class="carousel-scroll-container">
    <div class="carousel-item">
      <!-- Content -->
    </div>
  </div>
  
  <!-- Navigation Arrows -->
  <button id="carousel-arrow-left" class="carousel-arrow carousel-arrow-left">
    <ChevronLeft class="carousel-arrow-icon" />
  </button>
  <button id="carousel-arrow-right" class="carousel-arrow carousel-arrow-right">
    <ChevronRight class="carousel-arrow-icon" />
  </button>
  
  <!-- Dots (optional) -->
  <div class="carousel-dots">
    <button class="carousel-dot carousel-dot-active"></button>
    <button class="carousel-dot carousel-dot-inactive"></button>
  </div>
</div>
```

## Component Organization Principles

### 1. **Consistent ID Structure**
- Page sections: `#{section-name}-section`
- Components: `#{component-name}`
- Interactive elements: `#{element-purpose}`
- Dynamic IDs: `#{component-name}-{id}`

### 2. **Semantic Class Hierarchy**
```
.component-name
├── .component-name-container
├── .component-name-header
│   ├── .component-name-title
│   └── .component-name-subtitle
├── .component-name-content
│   ├── .component-name-item
│   └── .component-name-element
└── .component-name-footer
```

### 3. **State and Modifier Classes**
- State: `.component-name-active`, `.component-name-disabled`
- Modifiers: `.component-name-large`, `.component-name-primary`
- Dynamic: `.component-name-{dynamic-value}`

### 4. **Icon and Media Classes**
- Icons: `.component-name-icon`, `.element-icon`
- Images: `.component-name-photo`, `.component-name-image`
- Placeholders: `.component-name-placeholder`

## Benefits of This Architecture

### 🎯 **Easy Identification**
- Clear component boundaries in dev tools
- Unique IDs for direct targeting
- Semantic classes for understanding structure

### 🎨 **CSS Targeting**
```css
/* Target specific components */
#hero-section .hero-headline { }
.cleaner-card .cleaner-name { }
.testimonial-card .testimonial-quote { }

/* Target component states */
.carousel-arrow:disabled { }
.cleaner-verified-badge { }
.process-card:hover .process-card-background { }
```

### 🔍 **Debugging & Testing**
```javascript
// Easy element selection for testing
document.getElementById('hero-section')
document.querySelector('.cleaner-card')
document.querySelectorAll('.testimonial-card')
```

### 📱 **Responsive Design**
```css
/* Component-specific responsive design */
@media (max-width: 768px) {
  .hero-stats { grid-template-columns: 1fr; }
  .nav-desktop { display: none; }
  .nav-mobile { display: block; }
}
```

## Future Component Guidelines

When creating new components, follow this structure:

1. **Component Wrapper**: Main component container with ID and semantic class
2. **Sub-elements**: Nested elements with component-prefixed classes
3. **Interactive Elements**: Buttons, links with specific IDs when needed
4. **State Classes**: Clear naming for different states
5. **Documentation**: Update this file when adding new components

## Usage Examples

### Custom Styling
```css
/* Style the hero section specifically */
#hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Style all cleaner cards */
.cleaner-card {
  transition: transform 0.3s ease;
}

/* Style verified badges across components */
.verified-icon,
.cleaner-verified-badge .verified-icon {
  color: #10b981;
}
```

### JavaScript Targeting
```javascript
// Show/hide specific sections
const heroSection = document.getElementById('hero-section');
const testimonials = document.getElementById('testimonials-section');

// Target all rating stars
const ratingStars = document.querySelectorAll('.rating-star');

// Component-specific interactions
const processCards = document.querySelectorAll('.process-card');
processCards.forEach(card => {
  card.addEventListener('click', handleProcessCardClick);
});
```

This architecture ensures maintainable, scalable, and easily identifiable components throughout the SauberNow application.