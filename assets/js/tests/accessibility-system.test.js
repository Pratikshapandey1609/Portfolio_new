/**
 * Accessibility System Test Suite
 * Tests for motion preferences, WCAG compliance, and accessibility features
 * Requirements: 2.5, 1.3
 */

// Mock DOM elements for testing
function createMockElement(tag = 'div', attributes = {}) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  document.body.appendChild(element);
  return element;
}

// Mock matchMedia for testing
function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe('Accessibility System', () => {
  let accessibilitySystem;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    // Mock matchMedia
    mockMatchMedia(false);
    
    // Create fresh instance
    accessibilitySystem = new AccessibilitySystem();
  });

  afterEach(() => {
    if (accessibilitySystem) {
      accessibilitySystem.destroy();
    }
    
    // Clean up DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  describe('Motion Preferences', () => {
    test('should detect reduced motion preference', () => {
      mockMatchMedia(true); // prefers-reduced-motion: reduce
      const newSystem = new AccessibilitySystem();
      
      expect(newSystem.motionPreferences.respectsReducedMotion).toBe(false);
      expect(newSystem.motionPreferences.animationDuration).toBe('reduced');
      expect(newSystem.motionPreferences.parallaxEnabled).toBe(false);
      expect(newSystem.motionPreferences.particlesEnabled).toBe(false);
      
      newSystem.destroy();
    });

    test('should allow normal motion when not reduced', () => {
      mockMatchMedia(false); // prefers-reduced-motion: no-preference
      const newSystem = new AccessibilitySystem();
      
      expect(newSystem.motionPreferences.respectsReducedMotion).toBe(true);
      expect(newSystem.motionPreferences.animationDuration).toBe('normal');
      expect(newSystem.motionPreferences.parallaxEnabled).toBe(true);
      expect(newSystem.motionPreferences.particlesEnabled).toBe(true);
      
      newSystem.destroy();
    });

    test('should update CSS custom properties for reduced motion', () => {
      accessibilitySystem.motionPreferences.respectsReducedMotion = false;
      accessibilitySystem.updateMotionSettings();
      
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--duration-micro')).toBe('0ms');
      expect(root.style.getPropertyValue('--enable-parallax')).toBe('0');
      expect(root.style.getPropertyValue('--enable-particles')).toBe('0');
    });

    test('should restore normal CSS properties for normal motion', () => {
      accessibilitySystem.motionPreferences.respectsReducedMotion = true;
      accessibilitySystem.updateMotionSettings();
      
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--duration-fast')).toBe('300ms');
      expect(root.style.getPropertyValue('--enable-parallax')).toBe('1');
      expect(root.style.getPropertyValue('--enable-particles')).toBe('1');
    });

    test('should notify other systems of motion preference changes', () => {
      const mockAnimationEngine = {
        respectsMotion: true,
        handleMotionPreferenceChange: jest.fn()
      };
      window.animationEngine = mockAnimationEngine;

      accessibilitySystem.notifyMotionChange();

      expect(mockAnimationEngine.handleMotionPreferenceChange).toHaveBeenCalled();
      
      // Clean up
      delete window.animationEngine;
    });

    test('should dispatch custom event for motion preference changes', () => {
      const eventListener = jest.fn();
      window.addEventListener('motionPreferenceChange', eventListener);

      accessibilitySystem.notifyMotionChange();

      expect(eventListener).toHaveBeenCalled();
      expect(eventListener.mock.calls[0][0].detail).toEqual(accessibilitySystem.motionPreferences);
      
      window.removeEventListener('motionPreferenceChange', eventListener);
    });
  });

  describe('Contrast Validation', () => {
    test('should calculate luminance correctly', () => {
      const validator = accessibilitySystem.contrastValidator;
      
      // Test with known values
      const whiteLuminance = validator.getLuminance('#ffffff');
      const blackLuminance = validator.getLuminance('#000000');
      
      expect(whiteLuminance).toBeCloseTo(1, 1);
      expect(blackLuminance).toBeCloseTo(0, 1);
    });

    test('should calculate contrast ratio correctly', () => {
      const validator = accessibilitySystem.contrastValidator;
      
      // White on black should have maximum contrast
      const maxContrast = validator.getContrastRatio('#ffffff', '#000000');
      expect(maxContrast).toBeCloseTo(21, 0);
      
      // Same colors should have minimum contrast
      const minContrast = validator.getContrastRatio('#ffffff', '#ffffff');
      expect(minContrast).toBeCloseTo(1, 0);
    });

    test('should validate contrast against WCAG requirements', () => {
      const validator = accessibilitySystem.contrastValidator;
      
      // Test passing contrast
      const passResult = validator.validateContrast('#ffffff', '#000000', 'AA', false);
      expect(passResult.passes).toBe(true);
      expect(passResult.ratio).toBeGreaterThan(4.5);
      
      // Test failing contrast
      const failResult = validator.validateContrast('#cccccc', '#ffffff', 'AA', false);
      expect(failResult.passes).toBe(false);
      expect(failResult.ratio).toBeLessThan(4.5);
    });

    test('should handle large text requirements', () => {
      const validator = accessibilitySystem.contrastValidator;
      
      const result = validator.validateContrast('#666666', '#ffffff', 'AA', true);
      expect(result.isLargeText).toBe(true);
      expect(result.requirement).toBe(3.0);
    });

    test('should validate page contrast', () => {
      // Create test elements
      const paragraph = createMockElement('p');
      paragraph.textContent = 'Test paragraph';
      paragraph.style.color = '#ffffff';
      paragraph.style.backgroundColor = '#000000';
      paragraph.style.fontSize = '16px';

      const results = accessibilitySystem.validatePageContrast();
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      
      const pResult = results.find(r => r.element === paragraph);
      expect(pResult).toBeTruthy();
      expect(pResult.validation.passes).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    test('should add tabindex to interactive elements', () => {
      const div = createMockElement('div');
      div.onclick = () => {};
      
      accessibilitySystem.setupKeyboardNavigation();
      
      expect(div.getAttribute('tabindex')).toBe('0');
    });

    test('should create skip links', () => {
      accessibilitySystem.createSkipLinks();
      
      const skipLinks = document.querySelector('.skip-links');
      expect(skipLinks).toBeTruthy();
      
      const mainLink = skipLinks.querySelector('a[href="#main-content"]');
      const navLink = skipLinks.querySelector('a[href="#navigation"]');
      
      expect(mainLink).toBeTruthy();
      expect(navLink).toBeTruthy();
    });

    test('should handle keyboard shortcuts', () => {
      const main = createMockElement('main', { id: 'main-content' });
      main.focus = jest.fn();
      main.scrollIntoView = jest.fn();
      
      accessibilitySystem.setupKeyboardNavigation();
      
      // Simulate Alt + 1
      const event = new KeyboardEvent('keydown', {
        key: '1',
        altKey: true,
        bubbles: true
      });
      
      document.dispatchEvent(event);
      
      expect(main.focus).toHaveBeenCalled();
    });

    test('should handle escape key', () => {
      const modal = createMockElement('div', { class: 'modal active' });
      
      accessibilitySystem.handleEscapeKey();
      
      expect(modal.classList.contains('active')).toBe(false);
    });
  });

  describe('Focus Management', () => {
    test('should setup enhanced focus styles', () => {
      accessibilitySystem.setupFocusManagement();
      
      const styles = document.head.querySelectorAll('style');
      const focusStyle = Array.from(styles).find(style => 
        style.textContent.includes('*:focus')
      );
      
      expect(focusStyle).toBeTruthy();
    });

    test('should trap focus in containers', () => {
      const container = createMockElement('div');
      const button1 = createMockElement('button');
      const button2 = createMockElement('button');
      
      container.appendChild(button1);
      container.appendChild(button2);
      
      button1.focus = jest.fn();
      button2.focus = jest.fn();
      
      accessibilitySystem.trapFocus(container);
      
      expect(button1.focus).toHaveBeenCalled();
    });
  });

  describe('Screen Reader Support', () => {
    test('should add ARIA landmarks', () => {
      const main = createMockElement('main');
      const nav = createMockElement('nav');
      const section = createMockElement('section');
      const heading = createMockElement('h2');
      heading.textContent = 'Test Section';
      section.appendChild(heading);
      
      accessibilitySystem.addAriaLandmarks();
      
      expect(main.getAttribute('role')).toBe('main');
      expect(nav.getAttribute('role')).toBe('navigation');
      expect(section.getAttribute('role')).toBe('region');
      expect(section.hasAttribute('aria-labelledby')).toBe(true);
    });

    test('should add ARIA labels to buttons without text', () => {
      const button = createMockElement('button');
      const icon = createMockElement('i');
      button.appendChild(icon);
      
      accessibilitySystem.addAriaLabels();
      
      expect(button.hasAttribute('aria-label')).toBe(true);
    });

    test('should setup live regions', () => {
      accessibilitySystem.setupLiveRegions();
      
      const announcements = document.getElementById('announcements');
      const status = document.getElementById('status');
      
      expect(announcements).toBeTruthy();
      expect(announcements.getAttribute('aria-live')).toBe('polite');
      expect(status).toBeTruthy();
      expect(status.getAttribute('aria-live')).toBe('assertive');
      
      expect(window.announceToScreenReader).toBeTruthy();
    });

    test('should announce to screen reader', () => {
      accessibilitySystem.setupLiveRegions();
      
      window.announceToScreenReader('Test message', 'assertive');
      
      const status = document.getElementById('status');
      expect(status.textContent).toBe('Test message');
    });

    test('should add screen reader only text to generic links', () => {
      const article = createMockElement('article');
      const heading = createMockElement('h3');
      heading.textContent = 'Test Article';
      const link = createMockElement('a');
      link.textContent = 'Read more';
      
      article.appendChild(heading);
      article.appendChild(link);
      
      accessibilitySystem.addScreenReaderText();
      
      const srText = link.querySelector('.sr-only');
      expect(srText).toBeTruthy();
      expect(srText.textContent).toContain('Test Article');
    });
  });

  describe('High Contrast Mode', () => {
    test('should enable high contrast mode', () => {
      accessibilitySystem.enableHighContrast();
      
      expect(accessibilitySystem.features.highContrast).toBe(true);
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    });

    test('should disable high contrast mode', () => {
      accessibilitySystem.enableHighContrast();
      accessibilitySystem.disableHighContrast();
      
      expect(accessibilitySystem.features.highContrast).toBe(false);
      expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
    });
  });

  describe('Accessibility Audit', () => {
    test('should run comprehensive accessibility audit', () => {
      // Create test elements with issues
      const input = createMockElement('input', { type: 'text' });
      const div = createMockElement('div');
      div.onclick = () => {};
      
      const paragraph = createMockElement('p');
      paragraph.textContent = 'Low contrast text';
      paragraph.style.color = '#cccccc';
      paragraph.style.backgroundColor = '#ffffff';
      
      const results = accessibilitySystem.runAccessibilityAudit();
      
      expect(results).toHaveProperty('contrastIssues');
      expect(results).toHaveProperty('missingLabels');
      expect(results).toHaveProperty('keyboardIssues');
      expect(results).toHaveProperty('structureIssues');
      expect(results).toHaveProperty('score');
      
      expect(typeof results.score).toBe('number');
      expect(results.score).toBeGreaterThanOrEqual(0);
      expect(results.score).toBeLessThanOrEqual(100);
    });

    test('should detect contrast issues', () => {
      const paragraph = createMockElement('p');
      paragraph.textContent = 'Low contrast text';
      paragraph.style.color = '#cccccc';
      paragraph.style.backgroundColor = '#ffffff';
      paragraph.style.fontSize = '16px';
      
      const results = accessibilitySystem.runAccessibilityAudit();
      
      expect(results.contrastIssues.length).toBeGreaterThan(0);
    });

    test('should detect missing labels', () => {
      const input = createMockElement('input', { type: 'text', id: 'test-input' });
      
      const results = accessibilitySystem.runAccessibilityAudit();
      
      expect(results.missingLabels.length).toBeGreaterThan(0);
      const inputIssue = results.missingLabels.find(issue => issue.element === input);
      expect(inputIssue).toBeTruthy();
    });

    test('should detect keyboard accessibility issues', () => {
      const div = createMockElement('div');
      div.onclick = () => {};
      
      const results = accessibilitySystem.runAccessibilityAudit();
      
      expect(results.keyboardIssues.length).toBeGreaterThan(0);
      const divIssue = results.keyboardIssues.find(issue => issue.element === div);
      expect(divIssue).toBeTruthy();
    });

    test('should detect heading structure issues', () => {
      const h1 = createMockElement('h1');
      h1.textContent = 'Main Heading';
      const h3 = createMockElement('h3'); // Skips h2
      h3.textContent = 'Sub Heading';
      
      const results = accessibilitySystem.runAccessibilityAudit();
      
      expect(results.structureIssues.length).toBeGreaterThan(0);
      const headingIssue = results.structureIssues.find(issue => issue.element === h3);
      expect(headingIssue).toBeTruthy();
    });
  });

  describe('Settings and Configuration', () => {
    test('should return current accessibility settings', () => {
      const settings = accessibilitySystem.getAccessibilitySettings();
      
      expect(settings).toHaveProperty('motionPreferences');
      expect(settings).toHaveProperty('features');
      expect(settings).toHaveProperty('contrastRequirements');
      
      expect(settings.motionPreferences).toHaveProperty('respectsReducedMotion');
      expect(settings.features).toHaveProperty('highContrast');
      expect(settings.contrastRequirements).toHaveProperty('AA_NORMAL');
    });

    test('should apply initial preferences', () => {
      // Mock high contrast preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => {
          if (query === '(prefers-contrast: high)') {
            return { matches: true };
          }
          return { matches: false };
        }),
      });
      
      const newSystem = new AccessibilitySystem();
      
      expect(newSystem.features.highContrast).toBe(true);
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      
      newSystem.destroy();
    });
  });

  describe('Cleanup and Destruction', () => {
    test('should clean up all resources on destroy', () => {
      accessibilitySystem.setupLiveRegions();
      accessibilitySystem.createSkipLinks();
      
      const skipLinks = document.querySelector('.skip-links');
      const announcements = document.getElementById('announcements');
      
      expect(skipLinks).toBeTruthy();
      expect(announcements).toBeTruthy();
      
      accessibilitySystem.destroy();
      
      expect(document.querySelector('.skip-links')).toBeNull();
      expect(document.getElementById('announcements')).toBeNull();
    });
  });
});

// Integration tests
describe('Accessibility System Integration', () => {
  let accessibilitySystem;

  beforeEach(() => {
    mockMatchMedia(false);
    accessibilitySystem = new AccessibilitySystem();
  });

  afterEach(() => {
    if (accessibilitySystem) {
      accessibilitySystem.destroy();
    }
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  test('should work with animation engine', () => {
    const mockAnimationEngine = {
      respectsMotion: true,
      handleMotionPreferenceChange: jest.fn()
    };
    window.animationEngine = mockAnimationEngine;

    accessibilitySystem.motionPreferences.respectsReducedMotion = false;
    accessibilitySystem.notifyMotionChange();

    expect(mockAnimationEngine.respectsMotion).toBe(false);
    expect(mockAnimationEngine.handleMotionPreferenceChange).toHaveBeenCalled();

    delete window.animationEngine;
  });

  test('should handle real DOM elements', () => {
    // Create a realistic page structure
    const nav = createMockElement('nav');
    const main = createMockElement('main');
    const section = createMockElement('section');
    const heading = createMockElement('h2');
    heading.textContent = 'About Us';
    const paragraph = createMockElement('p');
    paragraph.textContent = 'This is about us.';
    const button = createMockElement('button');
    button.textContent = 'Contact';

    section.appendChild(heading);
    section.appendChild(paragraph);
    section.appendChild(button);
    main.appendChild(section);

    // Run accessibility enhancements
    accessibilitySystem.addAriaLandmarks();
    accessibilitySystem.setupKeyboardNavigation();

    // Verify enhancements
    expect(nav.getAttribute('role')).toBe('navigation');
    expect(main.getAttribute('role')).toBe('main');
    expect(section.getAttribute('role')).toBe('region');
    expect(button.getAttribute('tabindex')).toBe('0');
  });

  test('should handle motion preference changes dynamically', () => {
    let mediaQueryCallback = null;
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        addEventListener: jest.fn((event, callback) => {
          if (event === 'change') {
            mediaQueryCallback = callback;
          }
        }),
        removeEventListener: jest.fn(),
      })),
    });

    const newSystem = new AccessibilitySystem();
    
    expect(newSystem.motionPreferences.respectsReducedMotion).toBe(true);

    // Simulate preference change
    if (mediaQueryCallback) {
      mediaQueryCallback({ matches: true });
    }

    expect(newSystem.motionPreferences.respectsReducedMotion).toBe(false);

    newSystem.destroy();
  });
});