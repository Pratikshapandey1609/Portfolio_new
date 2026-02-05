/**
 * Side Navigation System - Enhanced
 * Handles hover-activated sidebar navigation with improved functionality
 */

class SideNavigation {
  constructor() {
    this.sideNav = document.querySelector('.side-nav');
    this.navTrigger = document.querySelector('.nav-trigger');
    this.navHint = document.querySelector('.nav-hint');
    this.navIndicator = document.querySelector('.nav-indicator');
    this.mobileToggle = document.querySelector('.mobile-nav-toggle');
    this.overlay = document.querySelector('.side-nav-overlay');
    this.navLinks = document.querySelectorAll('.side-nav-link');
    
    this.isHovered = false;
    this.isMobile = window.innerWidth <= 768;
    this.hintTimeout = null;
    this.currentSection = 'hero';
    this.isNavOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.sideNav) {
      console.error('Side navigation elements not found');
      return;
    }
    
    this.setupEventListeners();
    this.setupSectionObserver();
    this.showHintAfterDelay();
    this.updateActiveNavLink();
    
    console.log('🧭 Side Navigation initialized successfully');
  }
  
  setupEventListeners() {
    // Desktop hover events
    if (this.navTrigger) {
      this.navTrigger.addEventListener('mouseenter', () => {
        if (!this.isMobile) this.showNav();
      });
      
      this.navTrigger.addEventListener('mouseleave', () => {
        if (!this.isMobile) {
          setTimeout(() => {
            if (!this.isHovered) this.hideNav();
          }, 100);
        }
      });
    }
    
    if (this.sideNav) {
      this.sideNav.addEventListener('mouseenter', () => {
        if (!this.isMobile) {
          this.isHovered = true;
          this.showNav();
        }
      });
      
      this.sideNav.addEventListener('mouseleave', () => {
        if (!this.isMobile) {
          this.isHovered = false;
          this.hideNav();
        }
      });
    }
    
    // Mobile toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobileNav();
      });
    }
    
    // Overlay click to close mobile nav
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.closeMobileNav();
      });
    }
    
    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // Window resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Hide hint on user interaction
    document.addEventListener('click', () => this.hideHint(), { once: true });
    document.addEventListener('scroll', () => this.hideHint(), { once: true });
    
    // Prevent nav from closing when clicking inside it
    if (this.sideNav) {
      this.sideNav.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }
  
  setupSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) {
      console.warn('No sections found for navigation tracking');
      return;
    }
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          this.updateActiveNavLink();
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }
  
  showNav() {
    if (this.isMobile) return;
    
    this.isNavOpen = true;
    this.sideNav.classList.add('active');
    this.hideHint();
    this.showIndicator();
  }
  
  hideNav() {
    if (this.isMobile) return;
    
    this.isNavOpen = false;
    this.sideNav.classList.remove('active');
    this.hideIndicator();
  }
  
  toggleMobileNav() {
    if (!this.isMobile) return;
    
    if (this.sideNav.classList.contains('mobile-active')) {
      this.closeMobileNav();
    } else {
      this.openMobileNav();
    }
  }
  
  openMobileNav() {
    this.isNavOpen = true;
    this.sideNav.classList.add('mobile-active');
    this.overlay.classList.add('active');
    this.mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update mobile toggle icon
    const icon = this.mobileToggle.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-times';
    }
    
    // Focus first nav link for accessibility
    setTimeout(() => {
      const firstLink = this.sideNav.querySelector('.side-nav-link');
      if (firstLink) firstLink.focus();
    }, 300);
  }
  
  closeMobileNav() {
    this.isNavOpen = false;
    this.sideNav.classList.remove('mobile-active');
    this.overlay.classList.remove('active');
    this.mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
    
    // Update mobile toggle icon
    const icon = this.mobileToggle.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-bars';
    }
  }
  
  handleNavClick(e) {
    e.preventDefault();
    
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Close mobile nav if open
      if (this.isMobile && this.isNavOpen) {
        this.closeMobileNav();
      }
      
      // Smooth scroll to target
      this.scrollToElement(targetElement);
      
      // Update active link immediately
      this.setActiveLink(e.currentTarget);
      
      // Update current section
      this.currentSection = targetId;
    }
  }
  
  scrollToElement(element) {
    const offsetTop = element.offsetTop;
    const offset = 20; // Small offset for better positioning
    
    window.scrollTo({
      top: Math.max(0, offsetTop - offset),
      behavior: 'smooth'
    });
  }
  
  updateActiveNavLink() {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (href === `#${this.currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
  
  showHintAfterDelay() {
    if (this.isMobile) return;
    
    this.hintTimeout = setTimeout(() => {
      if (!this.isNavOpen && this.navHint) {
        this.navHint.classList.add('show');
        
        // Hide hint after 4 seconds
        setTimeout(() => {
          this.hideHint();
        }, 4000);
      }
    }, 3000); // Show hint after 3 seconds
  }
  
  hideHint() {
    if (this.navHint) {
      this.navHint.classList.remove('show');
    }
    
    if (this.hintTimeout) {
      clearTimeout(this.hintTimeout);
      this.hintTimeout = null;
    }
  }
  
  showIndicator() {
    if (this.navIndicator) {
      this.navIndicator.classList.add('visible');
    }
  }
  
  hideIndicator() {
    if (this.navIndicator) {
      this.navIndicator.classList.remove('visible');
    }
  }
  
  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // If switching from mobile to desktop
    if (wasMobile && !this.isMobile) {
      this.closeMobileNav();
      this.showHintAfterDelay();
    }
    
    // If switching from desktop to mobile
    if (!wasMobile && this.isMobile) {
      this.hideNav();
      this.hideHint();
    }
  }
  
  handleKeyboard(e) {
    // Escape key closes mobile nav
    if (e.key === 'Escape' && this.isMobile && this.isNavOpen) {
      this.closeMobileNav();
    }
    
    // Arrow keys for navigation when nav is open
    if (this.isNavOpen) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateWithKeyboard(e.key === 'ArrowDown');
      }
      
      if (e.key === 'Enter') {
        const activeLink = document.querySelector('.side-nav-link:focus');
        if (activeLink) {
          activeLink.click();
        }
      }
    }
  }
  
  navigateWithKeyboard(down) {
    const currentActive = document.querySelector('.side-nav-link:focus') || 
                         document.querySelector('.side-nav-link.active');
    
    if (!currentActive) {
      this.navLinks[0]?.focus();
      return;
    }
    
    const currentIndex = Array.from(this.navLinks).indexOf(currentActive);
    let nextIndex;
    
    if (down) {
      nextIndex = currentIndex + 1 >= this.navLinks.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? this.navLinks.length - 1 : currentIndex - 1;
    }
    
    this.navLinks[nextIndex]?.focus();
  }
  
  // Public methods
  getCurrentSection() {
    return this.currentSection;
  }
  
  isNavOpen() {
    return this.isNavOpen;
  }
  
  closeNav() {
    if (this.isMobile) {
      this.closeMobileNav();
    } else {
      this.hideNav();
    }
  }
  
  navigateToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      this.scrollToElement(targetElement);
      
      // Update active link
      const targetLink = document.querySelector(`.side-nav-link[href="#${sectionId}"]`);
      if (targetLink) {
        this.setActiveLink(targetLink);
      }
      
      this.currentSection = sectionId;
    }
  }
  
  // Debug method
  debug() {
    console.log('Side Navigation Debug Info:', {
      isNavOpen: this.isNavOpen,
      isMobile: this.isMobile,
      currentSection: this.currentSection,
      navElements: {
        sideNav: !!this.sideNav,
        navTrigger: !!this.navTrigger,
        mobileToggle: !!this.mobileToggle,
        overlay: !!this.overlay,
        navLinks: this.navLinks.length
      }
    });
  }
}

// Initialize side navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.sideNavigation = new SideNavigation();
  
  // Add debug method to window for testing
  window.debugNav = () => {
    if (window.sideNavigation) {
      window.sideNavigation.debug();
    }
  };
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SideNavigation;
}

console.log('🧭 Side Navigation System loaded');