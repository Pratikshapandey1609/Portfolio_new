/**
 * Main Portfolio Application
 * Handles navigation, interactions, and overall app functionality
 */

class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.currentSection = 'hero';
    this.projectFilter = 'all';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.initNavigation();
    this.initProjectFilter();
    this.initContactForm();
    this.initScrollIndicator();
    this.handlePageLoad();
    
    console.log('🚀 Portfolio App initialized');
  }
  
  bindEvents() {
    // Window events
    window.addEventListener('load', () => this.handlePageLoad());
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    window.addEventListener('resize', () => this.handleResize(), { passive: true });
    
    // Navigation toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  initNavigation() {
    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          this.updateActiveNavLink();
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${this.currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        this.filterProjects(filter, projectCards);
        this.projectFilter = filter;
      });
    });
  }
  
  filterProjects(filter, cards) {
    cards.forEach((card, index) => {
      const categories = card.dataset.category?.split(' ') || [];
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.style.display = 'block';
        // Stagger animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
  
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // Show loading state
      submitButton.classList.add('btn-loading');
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await this.submitContactForm(new FormData(form));
        
        // Show success message
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
      } catch (error) {
        console.error('Form submission error:', error);
        this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
      } finally {
        // Reset button state
        submitButton.classList.remove('btn-loading');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  async submitContactForm(formData) {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Position notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '400px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease-out';
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
  
  initScrollIndicator() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--color-electric-blue), var(--color-soft-cyan));
      z-index: 9998;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }
  
  handlePageLoad() {
    this.isLoaded = true;
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    this.triggerHeroAnimations();
    
    // Initialize skill progress bars
    this.initSkillProgressBars();
  }
  
  triggerHeroAnimations() {
    const heroElements = [
      '.hero-greeting',
      '.hero-title',
      '.hero-subtitle',
      '.hero-description',
      '.hero-actions'
    ];
    
    heroElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }
  
  initSkillProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          const skillLevel = entry.target.dataset.skill;
          
          if (progressBar && skillLevel) {
            setTimeout(() => {
              progressBar.style.width = skillLevel + '%';
            }, 300);
          }
          
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
      skillObserver.observe(item);
    });
  }
  
  handleScroll() {
    // Update navigation background
    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    
    // Parallax effects (if motion is allowed)
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      this.updateParallax();
    }
  }
  
  updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero-section');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Particle parallax
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const speed = 0.2 + (index % 3) * 0.1;
      particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
  
  handleResize() {
    // Update particle system for new screen size
    if (window.animationEngine) {
      window.animationEngine.particles.forEach(particle => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = window.innerHeight;
      });
    }
  }
  
  handleKeyboard(e) {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault();
          // Focus search or navigation
          document.querySelector('.nav-link')?.focus();
          break;
      }
    }
    
    // Escape key handling
    if (e.key === 'Escape') {
      // Close mobile menu
      document.getElementById('nav-toggle')?.classList.remove('active');
      document.getElementById('nav-menu')?.classList.remove('active');
    }
  }
  
  // Public methods
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section && window.smoothScroll) {
      window.smoothScroll.scrollTo(section);
    }
  }
  
  getCurrentSection() {
    return this.currentSection;
  }
  
  getProjectFilter() {
    return this.projectFilter;
  }
  
  // Performance monitoring
  getPerformanceStats() {
    return {
      isLoaded: this.isLoaded,
      currentSection: this.currentSection,
      projectFilter: this.projectFilter,
      animationEngine: window.animationEngine?.getPerformanceStats() || null,
      cursorSystem: window.cursorSystem?.getPerformanceStats() || null
    };
  }
}

// Utility functions
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  
  // Expose utilities globally
  window.utils = utils;
  
  // Development helpers
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugApp = () => {
      console.log('App Performance Stats:', window.portfolioApp.getPerformanceStats());
    };
    
    // Add debug info to console
    console.log(`
    🎯 Portfolio Debug Mode
    =====================
    Available commands:
    - debugApp() - App performance stats
    - debugCursor() - Cursor system stats
    - debugAnimations() - Animation engine stats
    `);
  }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    if (window.animationEngine) {
      console.log('⏸️ Pausing animations (page hidden)');
    }
  } else {
    // Resume animations when page is visible
    if (window.animationEngine) {
      console.log('▶️ Resuming animations (page visible)');
    }
  }
});