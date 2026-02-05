/**
 * Responsive Handler System
 * Manages responsive behaviors and dark theme enforcement
 */

class ResponsiveHandler {
  constructor() {
    this.breakpoints = {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      large: 1440
    };
    
    this.currentBreakpoint = this.getCurrentBreakpoint();
    this.isTouch = this.detectTouch();
    this.isDarkMode = true; // Force dark mode
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleInitialLoad();
    this.enforceDarkTheme();
    this.optimizeForDevice();
    this.handleNavigation();
  }

  setupEventListeners() {
    // Resize handler with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 150);
    });

    // Orientation change handler
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });

    // Navigation toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileNav(navToggle, navMenu);
      });

      // Close mobile nav when clicking on links
      navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
          this.closeMobileNav(navToggle, navMenu);
        }
      });

      // Close mobile nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          this.closeMobileNav(navToggle, navMenu);
        }
      });
    }

    // Scroll handler for navigation
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 10);
    });
  }

  getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.desktop) return 'desktop';
    return 'large';
  }

  detectTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  handleInitialLoad() {
    // Add responsive classes to body
    document.body.classList.add(`breakpoint-${this.currentBreakpoint}`);
    
    if (this.isTouch) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.add('no-touch');
    }

    // Force dark theme class
    document.body.classList.add('dark-theme');
    document.documentElement.classList.add('dark-theme');
  }

  handleResize() {
    const newBreakpoint = this.getCurrentBreakpoint();
    
    if (newBreakpoint !== this.currentBreakpoint) {
      // Remove old breakpoint class
      document.body.classList.remove(`breakpoint-${this.currentBreakpoint}`);
      
      // Add new breakpoint class
      document.body.classList.add(`breakpoint-${newBreakpoint}`);
      
      this.currentBreakpoint = newBreakpoint;
      
      // Trigger custom event
      window.dispatchEvent(new CustomEvent('breakpointChange', {
        detail: { 
          oldBreakpoint: this.currentBreakpoint,
          newBreakpoint: newBreakpoint 
        }
      }));
      
      // Handle navigation changes
      this.handleNavigationResize();
    }

    // Update viewport height for mobile browsers
    this.updateViewportHeight();
  }

  handleOrientationChange() {
    // Update viewport height after orientation change
    setTimeout(() => {
      this.updateViewportHeight();
    }, 500);
  }

  updateViewportHeight() {
    // Fix for mobile browsers where 100vh doesn't account for address bar
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  enforceDarkTheme() {
    // Force dark theme and remove any white colors
    const elementsToCheck = document.querySelectorAll('*');
    
    elementsToCheck.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      
      // Check for white backgrounds
      if (computedStyle.backgroundColor === 'rgb(255, 255, 255)' || 
          computedStyle.backgroundColor === 'white' ||
          computedStyle.backgroundColor === '#ffffff' ||
          computedStyle.backgroundColor === '#fff') {
        element.style.backgroundColor = 'var(--color-deep-charcoal)';
      }
      
      // Check for white text that might be invisible on dark backgrounds
      if (computedStyle.color === 'rgb(255, 255, 255)' || 
          computedStyle.color === 'white' ||
          computedStyle.color === '#ffffff' ||
          computedStyle.color === '#fff') {
        // Only change if it's not intentionally white text
        if (!element.classList.contains('keep-white-text')) {
          element.style.color = 'var(--color-text-primary)';
        }
      }
      
      // Remove excessive margins and padding
      if (element.style.marginLeft && parseFloat(element.style.marginLeft) > 50) {
        element.style.marginLeft = '0';
      }
      if (element.style.marginRight && parseFloat(element.style.marginRight) > 50) {
        element.style.marginRight = '0';
      }
      if (element.style.paddingLeft && parseFloat(element.style.paddingLeft) > 50) {
        element.style.paddingLeft = '16px';
      }
      if (element.style.paddingRight && parseFloat(element.style.paddingRight) > 50) {
        element.style.paddingRight = '16px';
      }
    });

    // Set theme color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#0a0a0b');
    }
    
    // Fix body and html margins/padding
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';
  }

  optimizeForDevice() {
    // Add device-specific optimizations
    if (this.isTouch) {
      // Optimize for touch devices
      this.optimizeForTouch();
    }

    // Optimize for high DPI displays
    if (window.devicePixelRatio > 1) {
      document.body.classList.add('high-dpi');
    }

    // Optimize for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Optimize for high contrast
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
  }

  optimizeForTouch() {
    // Ensure all interactive elements have proper touch targets
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        element.classList.add('touch-target');
      }
    });

    // Remove hover effects on touch devices
    const hoverElements = document.querySelectorAll('[class*="hover"]');
    hoverElements.forEach(element => {
      element.classList.add('touch-no-hover');
    });
  }

  handleNavigation() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    // Add scroll progress indicator
    this.addScrollProgress();
    
    // Handle active navigation links
    this.updateActiveNavLinks();
  }

  addScrollProgress() {
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }
  }

  updateActiveNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current link
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  handleScroll() {
    const nav = document.getElementById('main-nav');
    const progressBar = document.querySelector('.scroll-progress');
    
    if (nav) {
      // Add scrolled class to navigation
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    if (progressBar) {
      // Update scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }
  }

  toggleMobileNav(toggle, menu) {
    const isActive = toggle.classList.contains('active');
    
    if (isActive) {
      this.closeMobileNav(toggle, menu);
    } else {
      this.openMobileNav(toggle, menu);
    }
  }

  openMobileNav(toggle, menu) {
    toggle.classList.add('active');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMobileNav(toggle, menu) {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  handleNavigationResize() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (toggle && menu) {
      // Close mobile nav on resize to larger screens
      if (this.currentBreakpoint !== 'mobile' && this.currentBreakpoint !== 'tablet') {
        this.closeMobileNav(toggle, menu);
      }
    }
  }

  // Public methods for external use
  getBreakpoint() {
    return this.currentBreakpoint;
  }

  isTouch() {
    return this.isTouch;
  }

  isMobile() {
    return this.currentBreakpoint === 'mobile';
  }

  isTablet() {
    return this.currentBreakpoint === 'tablet';
  }

  isDesktop() {
    return this.currentBreakpoint === 'desktop' || this.currentBreakpoint === 'large';
  }

  // Utility method to check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Initialize responsive handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.responsiveHandler = new ResponsiveHandler();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResponsiveHandler;
}