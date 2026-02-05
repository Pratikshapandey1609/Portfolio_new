/**
 * Accessibility System for Premium Portfolio
 * Handles motion preferences, WCAG compliance, and accessibility features
 * Requirements: 2.5, 1.3
 */

class AccessibilitySystem {
  constructor() {
    // Motion preferences
    this.motionPreferences = {
      respectsReducedMotion: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationDuration: 'normal', // 'normal', 'reduced', 'none'
      parallaxEnabled: true,
      particlesEnabled: true
    };
    
    // Color contrast validation
    this.contrastRequirements = {
      AA_NORMAL: 4.5,
      AA_LARGE: 3.0,
      AAA_NORMAL: 7.0,
      AAA_LARGE: 4.5
    };
    
    // Accessibility features
    this.features = {
      highContrast: false,
      focusVisible: true,
      screenReaderSupport: true,
      keyboardNavigation: true
    };
    
    // Initialize the system
    this.init();
  }
  
  init() {
    this.setupMotionPreferenceListener();
    this.setupContrastValidation();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.applyInitialPreferences();
    
    console.log('♿ Accessibility System initialized');
  }
  
  /**
   * Setup motion preference change listener
   */
  setupMotionPreferenceListener() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (e) => {
      this.motionPreferences.respectsReducedMotion = !e.matches;
      this.updateMotionSettings();
      this.notifyMotionChange();
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMotionChange);
    }
    
    // Initial check
    handleMotionChange(mediaQuery);
  }
  
  /**
   * Update motion settings based on preferences
   */
  updateMotionSettings() {
    const root = document.documentElement;
    
    if (!this.motionPreferences.respectsReducedMotion) {
      // Reduced motion mode
      this.motionPreferences.animationDuration = 'reduced';
      this.motionPreferences.parallaxEnabled = false;
      this.motionPreferences.particlesEnabled = false;
      
      // Update CSS custom properties
      root.style.setProperty('--duration-micro', '0ms');
      root.style.setProperty('--duration-fast', '150ms');
      root.style.setProperty('--duration-normal', '200ms');
      root.style.setProperty('--duration-slow', '250ms');
      root.style.setProperty('--duration-ambient', '0ms');
      
      // Disable transforms that might cause motion sickness
      root.style.setProperty('--enable-parallax', '0');
      root.style.setProperty('--enable-particles', '0');
      root.style.setProperty('--enable-hover-transforms', '0');
      
      console.log('♿ Reduced motion mode activated');
    } else {
      // Normal motion mode
      this.motionPreferences.animationDuration = 'normal';
      this.motionPreferences.parallaxEnabled = true;
      this.motionPreferences.particlesEnabled = true;
      
      // Restore normal durations
      root.style.setProperty('--duration-micro', '150ms');
      root.style.setProperty('--duration-fast', '300ms');
      root.style.setProperty('--duration-normal', '400ms');
      root.style.setProperty('--duration-slow', '600ms');
      root.style.setProperty('--duration-ambient', '2000ms');
      
      // Enable motion effects
      root.style.setProperty('--enable-parallax', '1');
      root.style.setProperty('--enable-particles', '1');
      root.style.setProperty('--enable-hover-transforms', '1');
      
      console.log('♿ Normal motion mode activated');
    }
  }
  
  /**
   * Notify other systems about motion preference changes
   */
  notifyMotionChange() {
    // Notify animation engine
    if (window.animationEngine) {
      window.animationEngine.respectsMotion = this.motionPreferences.respectsReducedMotion;
      window.animationEngine.handleMotionPreferenceChange();
    }
    
    // Notify cursor system
    if (window.cursorSystem) {
      window.cursorSystem.updateMotionPreferences(this.motionPreferences);
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('motionPreferenceChange', {
      detail: this.motionPreferences
    }));
  }
  
  /**
   * Setup contrast validation system
   */
  setupContrastValidation() {
    this.contrastValidator = {
      /**
       * Calculate relative luminance of a color
       * @param {string} color - Color in hex, rgb, or hsl format
       * @returns {number} Relative luminance (0-1)
       */
      getLuminance: (color) => {
        const rgb = this.parseColor(color);
        if (!rgb) return 0;
        
        const [r, g, b] = rgb.map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      },
      
      /**
       * Calculate contrast ratio between two colors
       * @param {string} color1 - First color
       * @param {string} color2 - Second color
       * @returns {number} Contrast ratio (1-21)
       */
      getContrastRatio: (color1, color2) => {
        const lum1 = this.contrastValidator.getLuminance(color1);
        const lum2 = this.contrastValidator.getLuminance(color2);
        
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        
        return (brightest + 0.05) / (darkest + 0.05);
      },
      
      /**
       * Check if contrast ratio meets WCAG requirements
       * @param {string} textColor - Text color
       * @param {string} backgroundColor - Background color
       * @param {string} level - WCAG level ('AA' or 'AAA')
       * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
       * @returns {Object} Validation result
       */
      validateContrast: (textColor, backgroundColor, level = 'AA', isLargeText = false) => {
        const ratio = this.contrastValidator.getContrastRatio(textColor, backgroundColor);
        const requirement = isLargeText 
          ? this.contrastRequirements[`${level}_LARGE`]
          : this.contrastRequirements[`${level}_NORMAL`];
        
        return {
          ratio: Math.round(ratio * 100) / 100,
          requirement,
          passes: ratio >= requirement,
          level,
          isLargeText
        };
      }
    };
  }
  
  /**
   * Parse color string to RGB values
   * @param {string} color - Color string
   * @returns {Array|null} RGB values [r, g, b] or null if invalid
   */
  parseColor(color) {
    // Create a temporary element to get computed color
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    
    const computedColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    // Parse rgb() or rgba() format
    const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    
    return null;
  }
  
  /**
   * Validate all text elements on the page
   * @returns {Array} Array of validation results
   */
  validatePageContrast() {
    const results = [];
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, input, textarea');
    
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const textColor = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Skip if background is transparent
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        return;
      }
      
      const fontSize = parseFloat(styles.fontSize);
      const fontWeight = styles.fontWeight;
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
      
      const validation = this.contrastValidator.validateContrast(
        textColor,
        backgroundColor,
        'AA',
        isLargeText
      );
      
      results.push({
        element,
        textColor,
        backgroundColor,
        fontSize,
        fontWeight,
        validation,
        selector: this.getElementSelector(element)
      });
    });
    
    return results;
  }
  
  /**
   * Get a CSS selector for an element
   * @param {Element} element - DOM element
   * @returns {string} CSS selector
   */
  getElementSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    }
    
    if (element.className) {
      return `${element.tagName.toLowerCase()}.${element.className.split(' ').join('.')}`;
    }
    
    return element.tagName.toLowerCase();
  }
  
  /**
   * Setup keyboard navigation support
   */
  setupKeyboardNavigation() {
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    interactiveElements.forEach(element => {
      // Ensure tabindex is set appropriately
      if (!element.hasAttribute('tabindex') && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT') {
        element.setAttribute('tabindex', '0');
      }
      
      // Add keyboard event handlers for custom interactive elements
      if (element.tagName === 'DIV' || element.tagName === 'SPAN') {
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
          }
        });
      }
    });
    
    // Skip links for screen readers
    this.createSkipLinks();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + 1: Skip to main content
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        const main = document.querySelector('main, #main, .main-content');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Alt + 2: Skip to navigation
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        const nav = document.querySelector('nav, #navigation, .navigation');
        if (nav) {
          const firstLink = nav.querySelector('a, button');
          if (firstLink) {
            firstLink.focus();
          }
        }
      }
      
      // Escape key: Close modals, menus, etc.
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
    });
  }
  
  /**
   * Create skip links for screen readers
   */
  createSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
    `;
    
    // Add styles for skip links
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 10000;
      }
      
      .skip-link {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
        background: var(--color-electric-blue, #00d4ff);
        color: var(--color-deep-charcoal, #0a0a0b);
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
      }
      
      .skip-link:focus {
        position: static;
        width: auto;
        height: auto;
        left: auto;
        top: auto;
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }
  
  /**
   * Handle escape key press
   */
  handleEscapeKey() {
    // Close mobile menu
    const mobileMenu = document.querySelector('.mobile-menu.active, .nav-menu.active');
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      return;
    }
    
    // Close modals
    const modal = document.querySelector('.modal.active, .modal.open');
    if (modal) {
      modal.classList.remove('active', 'open');
      return;
    }
    
    // Remove focus from current element
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }
  
  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Enhanced focus visibility
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced focus styles */
      *:focus {
        outline: 2px solid var(--color-electric-blue, #00d4ff);
        outline-offset: 2px;
      }
      
      /* Custom focus styles for specific elements */
      button:focus,
      a:focus,
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid var(--color-electric-blue, #00d4ff);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.2);
      }
      
      /* Focus within for containers */
      .card:focus-within,
      .project-card:focus-within {
        outline: 2px solid var(--color-electric-blue, #00d4ff);
        outline-offset: 2px;
      }
      
      /* Hide focus for mouse users, show for keyboard users */
      .js-focus-visible *:focus:not(.focus-visible) {
        outline: none;
        box-shadow: none;
      }
    `;
    
    document.head.appendChild(style);
    
    // Focus trap for modals
    this.setupFocusTrap();
    
    // Focus restoration
    this.setupFocusRestoration();
  }
  
  /**
   * Setup focus trap for modals and overlays
   */
  setupFocusTrap() {
    let lastFocusedElement = null;
    
    // Listen for modal opens
    document.addEventListener('modalOpen', (e) => {
      lastFocusedElement = document.activeElement;
      this.trapFocus(e.detail.modal);
    });
    
    // Listen for modal closes
    document.addEventListener('modalClose', () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    });
  }
  
  /**
   * Trap focus within a container
   * @param {Element} container - Container element
   */
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
    
    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
  
  /**
   * Setup focus restoration
   */
  setupFocusRestoration() {
    // Store focus before navigation
    window.addEventListener('beforeunload', () => {
      if (document.activeElement) {
        sessionStorage.setItem('lastFocusedElement', this.getElementSelector(document.activeElement));
      }
    });
    
    // Restore focus after page load
    window.addEventListener('load', () => {
      const lastFocused = sessionStorage.getItem('lastFocusedElement');
      if (lastFocused) {
        const element = document.querySelector(lastFocused);
        if (element) {
          setTimeout(() => element.focus(), 100);
        }
        sessionStorage.removeItem('lastFocusedElement');
      }
    });
  }
  
  /**
   * Setup screen reader support
   */
  setupScreenReaderSupport() {
    // Add ARIA landmarks if missing
    this.addAriaLandmarks();
    
    // Add ARIA labels to interactive elements
    this.addAriaLabels();
    
    // Setup live regions for dynamic content
    this.setupLiveRegions();
    
    // Add screen reader only text where needed
    this.addScreenReaderText();
  }
  
  /**
   * Add ARIA landmarks to page structure
   */
  addAriaLandmarks() {
    // Main content
    const main = document.querySelector('main');
    if (main && !main.hasAttribute('role')) {
      main.setAttribute('role', 'main');
    }
    
    // Navigation
    const nav = document.querySelector('nav');
    if (nav && !nav.hasAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      if (!nav.hasAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Main navigation');
      }
    }
    
    // Sections
    document.querySelectorAll('section').forEach((section, index) => {
      if (!section.hasAttribute('role')) {
        section.setAttribute('role', 'region');
      }
      
      if (!section.hasAttribute('aria-labelledby') && !section.hasAttribute('aria-label')) {
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          if (!heading.id) {
            heading.id = `section-heading-${index}`;
          }
          section.setAttribute('aria-labelledby', heading.id);
        }
      }
    });
  }
  
  /**
   * Add ARIA labels to interactive elements
   */
  addAriaLabels() {
    // Buttons without text content
    document.querySelectorAll('button').forEach(button => {
      if (!button.textContent.trim() && !button.hasAttribute('aria-label') && !button.hasAttribute('aria-labelledby')) {
        const icon = button.querySelector('i, svg');
        if (icon) {
          button.setAttribute('aria-label', 'Button');
        }
      }
    });
    
    // Links without descriptive text
    document.querySelectorAll('a').forEach(link => {
      if ((!link.textContent.trim() || link.textContent.trim().toLowerCase() === 'read more') && !link.hasAttribute('aria-label')) {
        const context = link.closest('article, section, .card');
        if (context) {
          const heading = context.querySelector('h1, h2, h3, h4, h5, h6');
          if (heading) {
            link.setAttribute('aria-label', `Read more about ${heading.textContent}`);
          }
        }
      }
    });
    
    // Form inputs without labels
    document.querySelectorAll('input, textarea, select').forEach(input => {
      if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label && input.placeholder) {
          input.setAttribute('aria-label', input.placeholder);
        }
      }
    });
  }
  
  /**
   * Setup live regions for dynamic content updates
   */
  setupLiveRegions() {
    // Create announcement region
    const announcements = document.createElement('div');
    announcements.id = 'announcements';
    announcements.setAttribute('aria-live', 'polite');
    announcements.setAttribute('aria-atomic', 'true');
    announcements.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcements);
    
    // Create status region
    const status = document.createElement('div');
    status.id = 'status';
    status.setAttribute('aria-live', 'assertive');
    status.setAttribute('aria-atomic', 'true');
    status.style.cssText = announcements.style.cssText;
    document.body.appendChild(status);
    
    // Expose announcement function
    window.announceToScreenReader = (message, priority = 'polite') => {
      const region = priority === 'assertive' ? status : announcements;
      region.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    };
  }
  
  /**
   * Add screen reader only text where needed
   */
  addScreenReaderText() {
    // Add screen reader only CSS class
    const style = document.createElement('style');
    style.textContent = `
      .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      
      .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        left: auto;
      }
    `;
    document.head.appendChild(style);
    
    // Add context to generic links
    document.querySelectorAll('a').forEach(link => {
      if (link.textContent.trim().toLowerCase() === 'learn more' || 
          link.textContent.trim().toLowerCase() === 'read more' ||
          link.textContent.trim().toLowerCase() === 'click here') {
        
        const context = link.closest('article, section, .card, .project-card');
        if (context) {
          const heading = context.querySelector('h1, h2, h3, h4, h5, h6');
          if (heading) {
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = ` about ${heading.textContent}`;
            link.appendChild(srText);
          }
        }
      }
    });
  }
  
  /**
   * Apply initial accessibility preferences
   */
  applyInitialPreferences() {
    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.enableHighContrast();
    }
    
    // Check for reduced transparency preference
    if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) {
      document.documentElement.style.setProperty('--enable-transparency', '0');
    }
    
    // Apply motion preferences
    this.updateMotionSettings();
  }
  
  /**
   * Enable high contrast mode
   */
  enableHighContrast() {
    this.features.highContrast = true;
    document.documentElement.classList.add('high-contrast');
    
    // Update CSS custom properties for high contrast
    const root = document.documentElement;
    root.style.setProperty('--color-text-primary', '#ffffff');
    root.style.setProperty('--color-text-secondary', '#ffffff');
    root.style.setProperty('--color-background-primary', '#000000');
    root.style.setProperty('--color-background-secondary', '#1a1a1a');
    root.style.setProperty('--color-border', '#ffffff');
    
    console.log('♿ High contrast mode enabled');
  }
  
  /**
   * Disable high contrast mode
   */
  disableHighContrast() {
    this.features.highContrast = false;
    document.documentElement.classList.remove('high-contrast');
    console.log('♿ High contrast mode disabled');
  }
  
  /**
   * Get current accessibility settings
   * @returns {Object} Current accessibility settings
   */
  getAccessibilitySettings() {
    return {
      motionPreferences: { ...this.motionPreferences },
      features: { ...this.features },
      contrastRequirements: { ...this.contrastRequirements }
    };
  }
  
  /**
   * Run accessibility audit
   * @returns {Object} Audit results
   */
  runAccessibilityAudit() {
    const results = {
      contrastIssues: [],
      missingLabels: [],
      keyboardIssues: [],
      structureIssues: [],
      score: 0
    };
    
    // Check contrast
    const contrastResults = this.validatePageContrast();
    results.contrastIssues = contrastResults.filter(result => !result.validation.passes);
    
    // Check for missing labels
    document.querySelectorAll('input, textarea, select').forEach(input => {
      if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label) {
          results.missingLabels.push({
            element: input,
            selector: this.getElementSelector(input),
            issue: 'Missing label or aria-label'
          });
        }
      }
    });
    
    // Check keyboard accessibility
    document.querySelectorAll('div[onclick], span[onclick]').forEach(element => {
      if (!element.hasAttribute('tabindex') && !element.hasAttribute('role')) {
        results.keyboardIssues.push({
          element,
          selector: this.getElementSelector(element),
          issue: 'Interactive element not keyboard accessible'
        });
      }
    });
    
    // Check heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        results.structureIssues.push({
          element: heading,
          selector: this.getElementSelector(heading),
          issue: `Heading level ${level} follows level ${lastLevel} (skipped level)`
        });
      }
      lastLevel = level;
    });
    
    // Calculate score
    const totalIssues = results.contrastIssues.length + 
                       results.missingLabels.length + 
                       results.keyboardIssues.length + 
                       results.structureIssues.length;
    
    results.score = Math.max(0, 100 - (totalIssues * 5));
    
    return results;
  }
  
  /**
   * Destroy the accessibility system
   */
  destroy() {
    // Remove event listeners
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', this.handleMotionChange);
    }
    
    // Remove added elements
    const skipLinks = document.querySelector('.skip-links');
    if (skipLinks) {
      skipLinks.remove();
    }
    
    const announcements = document.getElementById('announcements');
    if (announcements) {
      announcements.remove();
    }
    
    const status = document.getElementById('status');
    if (status) {
      status.remove();
    }
    
    console.log('♿ Accessibility System destroyed');
  }
}

// Initialize accessibility system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilitySystem = new AccessibilitySystem();
  
  // Expose debugging tools in development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.hostname === '') {
    
    window.debugAccessibility = () => {
      console.log('♿ Accessibility Settings:', window.accessibilitySystem.getAccessibilitySettings());
    };
    
    window.auditAccessibility = () => {
      const results = window.accessibilitySystem.runAccessibilityAudit();
      console.log('♿ Accessibility Audit Results:', results);
      return results;
    };
    
    window.testContrast = (textColor, backgroundColor) => {
      const result = window.accessibilitySystem.contrastValidator.validateContrast(textColor, backgroundColor);
      console.log('♿ Contrast Test Result:', result);
      return result;
    };
    
    console.log('♿ Accessibility debugging tools available: debugAccessibility(), auditAccessibility(), testContrast()');
  }
});