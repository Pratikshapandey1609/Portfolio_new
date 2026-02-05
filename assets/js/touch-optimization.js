/**
 * Touch Optimization System
 * Handles touch interactions, swipe gestures, and mobile-specific optimizations
 */

class TouchOptimization {
  constructor() {
    this.isTouchDevice = this.detectTouchDevice();
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
    this.maxSwipeTime = 300;
    this.swipeStartTime = 0;
    
    this.init();
  }
  
  init() {
    if (!this.isTouchDevice) {
      console.log('📱 Non-touch device detected - touch optimizations disabled');
      return;
    }
    
    console.log('📱 Touch device detected - initializing touch optimizations');
    
    this.optimizeTouchTargets();
    this.initSwipeGestures();
    this.optimizeScrolling();
    this.handleTouchFeedback();
    this.preventZoomOnInputs();
    
    // Add touch device class to body
    document.body.classList.add('touch-device');
  }
  
  detectTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }
  
  optimizeTouchTargets() {
    // Ensure all interactive elements meet minimum touch target size (44px)
    const interactiveElements = document.querySelectorAll(`
      button, 
      a, 
      input, 
      textarea, 
      select, 
      .skill-item, 
      .project-card, 
      .nav-link, 
      .filter-btn,
      .social-link,
      [role="button"],
      [tabindex="0"]
    `);
    
    interactiveElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const minSize = 44; // 44px minimum touch target
      
      // Check current size
      const currentHeight = parseFloat(computedStyle.height);
      const currentWidth = parseFloat(computedStyle.width);
      
      // Apply minimum touch target size if needed
      if (currentHeight < minSize || currentWidth < minSize) {
        element.style.minHeight = `${minSize}px`;
        element.style.minWidth = `${minSize}px`;
        element.style.display = element.style.display || 'inline-flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }
      
      // Add touch-optimized class
      element.classList.add('touch-optimized');
    });
    
    console.log(`📱 Optimized ${interactiveElements.length} touch targets`);
  }
  
  initSwipeGestures() {
    // Add swipe gestures for project navigation
    const projectsContainer = document.querySelector('.projects-grid');
    const skillsContainer = document.querySelector('.skills-grid');
    
    if (projectsContainer) {
      this.addSwipeNavigation(projectsContainer, 'projects');
    }
    
    if (skillsContainer) {
      this.addSwipeNavigation(skillsContainer, 'skills');
    }
    
    // Add swipe to close mobile menu
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
      this.addSwipeToClose(navMenu);
    }
  }
  
  addSwipeNavigation(container, type) {
    let currentIndex = 0;
    const items = container.querySelectorAll(type === 'projects' ? '.project-card' : '.skill-category');
    
    container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.swipeStartTime = Date.now();
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      
      const swipeTime = Date.now() - this.swipeStartTime;
      const swipeDistance = Math.abs(this.touchEndX - this.touchStartX);
      const verticalDistance = Math.abs(this.touchEndY - this.touchStartY);
      
      // Check if it's a valid horizontal swipe
      if (
        swipeTime < this.maxSwipeTime &&
        swipeDistance > this.minSwipeDistance &&
        verticalDistance < swipeDistance / 2 // More horizontal than vertical
      ) {
        const isSwipeLeft = this.touchEndX < this.touchStartX;
        
        if (isSwipeLeft && currentIndex < items.length - 1) {
          // Swipe left - next item
          currentIndex++;
          this.scrollToItem(items[currentIndex], container);
        } else if (!isSwipeLeft && currentIndex > 0) {
          // Swipe right - previous item
          currentIndex--;
          this.scrollToItem(items[currentIndex], container);
        }
        
        // Provide haptic feedback if available
        this.provideTouchFeedback();
      }
    }, { passive: true });
  }
  
  addSwipeToClose(navMenu) {
    navMenu.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
      this.swipeStartTime = Date.now();
    }, { passive: true });
    
    navMenu.addEventListener('touchend', (e) => {
      this.touchEndY = e.changedTouches[0].clientY;
      
      const swipeTime = Date.now() - this.swipeStartTime;
      const swipeDistance = this.touchStartY - this.touchEndY; // Upward swipe
      
      // Check if it's a valid upward swipe to close menu
      if (
        swipeTime < this.maxSwipeTime &&
        swipeDistance > this.minSwipeDistance
      ) {
        // Close mobile menu
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle && navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          this.provideTouchFeedback();
        }
      }
    }, { passive: true });
  }
  
  scrollToItem(item, container) {
    if (!item) return;
    
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    // Calculate scroll position to center the item
    const scrollLeft = item.offsetLeft - (containerRect.width / 2) + (itemRect.width / 2);
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
  
  optimizeScrolling() {
    // Add momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Optimize scroll performance
    const scrollableElements = document.querySelectorAll('.projects-grid, .skills-grid, .nav-menu');
    
    scrollableElements.forEach(element => {
      element.style.webkitOverflowScrolling = 'touch';
      element.style.overflowScrolling = 'touch';
    });
    
    // Prevent overscroll bounce on body
    document.body.addEventListener('touchmove', (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  handleTouchFeedback() {
    // Add visual feedback for touch interactions
    const touchElements = document.querySelectorAll('.touch-optimized');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
      
      element.addEventListener('touchcancel', () => {
        element.classList.remove('touch-active');
      }, { passive: true });
    });
  }
  
  provideTouchFeedback() {
    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50); // Short vibration
    }
    
    // Visual feedback
    document.body.classList.add('touch-feedback');
    setTimeout(() => {
      document.body.classList.remove('touch-feedback');
    }, 100);
  }
  
  preventZoomOnInputs() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Ensure font-size is at least 16px to prevent zoom
      const computedStyle = window.getComputedStyle(input);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      if (fontSize < 16) {
        input.style.fontSize = '16px';
      }
    });
  }
  
  // Public methods
  enableTouchMode() {
    document.body.classList.add('touch-mode');
    this.optimizeTouchTargets();
  }
  
  disableTouchMode() {
    document.body.classList.remove('touch-mode');
  }
  
  isTouchEnabled() {
    return this.isTouchDevice;
  }
  
  // Utility methods for other components
  addTouchSupport(element, options = {}) {
    if (!this.isTouchDevice) return;
    
    const {
      minSize = 44,
      feedback = true,
      swipe = false
    } = options;
    
    // Ensure minimum touch target size
    element.style.minHeight = `${minSize}px`;
    element.style.minWidth = `${minSize}px`;
    
    // Add touch feedback
    if (feedback) {
      element.addEventListener('touchstart', () => {
        element.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    }
    
    // Add swipe support if requested
    if (swipe && typeof swipe === 'function') {
      this.addSwipeHandler(element, swipe);
    }
    
    element.classList.add('touch-optimized');
  }
  
  addSwipeHandler(element, callback) {
    element.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.swipeStartTime = Date.now();
    }, { passive: true });
    
    element.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      
      const swipeTime = Date.now() - this.swipeStartTime;
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (swipeTime < this.maxSwipeTime && distance > this.minSwipeDistance) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY) 
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up');
        
        callback({
          direction,
          distance,
          deltaX,
          deltaY,
          duration: swipeTime
        });
        
        this.provideTouchFeedback();
      }
    }, { passive: true });
  }
}

// CSS for touch optimizations
const touchStyles = `
  .touch-device .touch-optimized {
    -webkit-tap-highlight-color: rgba(0, 212, 255, 0.2);
    tap-highlight-color: rgba(0, 212, 255, 0.2);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
  
  .touch-device .touch-active {
    background-color: rgba(0, 212, 255, 0.1) !important;
    transform: scale(0.98) !important;
    transition: all 0.1s ease !important;
  }
  
  .touch-device .skill-item.touch-active {
    background-color: rgba(0, 212, 255, 0.15) !important;
  }
  
  .touch-device .btn.touch-active {
    transform: scale(0.95) !important;
  }
  
  .touch-device .project-card.touch-active {
    transform: translateY(2px) scale(0.98) !important;
  }
  
  .touch-feedback {
    filter: brightness(1.1);
    transition: filter 0.1s ease;
  }
  
  /* Disable hover effects on touch devices */
  @media (hover: none) {
    .skill-item:hover,
    .project-card:hover,
    .btn:hover,
    .social-link:hover {
      transform: none !important;
      background-color: inherit !important;
    }
  }
  
  /* Optimize scrolling for touch */
  .touch-device .projects-grid,
  .touch-device .skills-grid {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  
  /* Touch-friendly spacing */
  .touch-device .nav-link {
    padding: 16px 20px !important;
    min-height: 44px !important;
  }
  
  .touch-device .filter-btn {
    min-height: 44px !important;
    padding: 12px 16px !important;
  }
  
  .touch-device .social-link {
    min-width: 44px !important;
    min-height: 44px !important;
  }
`;

// Inject touch styles
const styleSheet = document.createElement('style');
styleSheet.textContent = touchStyles;
document.head.appendChild(styleSheet);

// Initialize touch optimization
let touchOptimization;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    touchOptimization = new TouchOptimization();
    window.touchOptimization = touchOptimization;
  });
} else {
  touchOptimization = new TouchOptimization();
  window.touchOptimization = touchOptimization;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TouchOptimization;
}

console.log('📱 Touch Optimization System loaded');