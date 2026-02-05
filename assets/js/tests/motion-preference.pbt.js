/**
 * Property-Based Test: Motion Preference Respect
 * Feature: premium-portfolio-redesign, Property 5: Motion Preference Respect
 * Validates: Requirements 2.5
 * 
 * Property: For any user with prefers-reduced-motion enabled, animations should 
 * be disabled or reduced to respect accessibility preferences
 */

// Simple property-based testing framework (reused from animation-performance.pbt.js)
class PropertyBasedTest {
  constructor(name, property, generator, options = {}) {
    this.name = name;
    this.property = property;
    this.generator = generator;
    this.iterations = options.iterations || 100;
    this.timeout = options.timeout || 5000;
  }

  async run() {
    const results = {
      name: this.name,
      passed: 0,
      failed: 0,
      errors: [],
      examples: [],
      totalTime: 0
    };

    const startTime = performance.now();

    for (let i = 0; i < this.iterations; i++) {
      try {
        const testData = this.generator();
        const result = await this.property(testData);
        
        if (result.success) {
          results.passed++;
        } else {
          results.failed++;
          results.errors.push({
            iteration: i + 1,
            input: testData,
            error: result.error,
            details: result.details
          });
        }
        
        // Store some examples
        if (i < 5) {
          results.examples.push({
            input: testData,
            result: result.success ? 'PASS' : 'FAIL'
          });
        }
        
      } catch (error) {
        results.failed++;
        results.errors.push({
          iteration: i + 1,
          error: error.message,
          stack: error.stack
        });
      }
    }

    results.totalTime = performance.now() - startTime;
    results.success = results.failed === 0;
    
    return results;
  }
}

// Motion preference test scenario generator
function generateMotionPreferenceScenario() {
  const scenarios = [
    {
      prefersReducedMotion: true,
      description: 'User prefers reduced motion',
      expectedBehavior: 'reduced'
    },
    {
      prefersReducedMotion: false,
      description: 'User allows normal motion',
      expectedBehavior: 'normal'
    }
  ];

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  // Add some variation to test different elements and animation types
  const animationTypes = [
    'entrance',
    'scroll-triggered',
    'hover',
    'transition',
    'particle-system',
    'parallax'
  ];

  const elements = [
    'hero-section',
    'about-section',
    'skills-section',
    'projects-section',
    'contact-section',
    'navigation',
    'cursor-system'
  ];

  return {
    ...scenario,
    animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
    targetElement: elements[Math.floor(Math.random() * elements.length)],
    testId: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
}

// Helper to mock matchMedia for testing
function mockMatchMedia(prefersReducedMotion) {
  const originalMatchMedia = window.matchMedia;
  
  window.matchMedia = jest.fn().mockImplementation(query => {
    if (query === '(prefers-reduced-motion: reduce)') {
      return {
        matches: prefersReducedMotion,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    }
    
    // Return original for other queries
    return originalMatchMedia(query);
  });
  
  return () => {
    window.matchMedia = originalMatchMedia;
  };
}

// Helper to create test element
function createTestElement(elementType = 'div') {
  const element = document.createElement(elementType);
  element.className = `motion-test-element`;
  element.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #00d4ff;
    opacity: 1;
    transform: translateX(0px);
    transition: all var(--duration-normal, 400ms) ease;
  `;
  document.body.appendChild(element);
  return element;
}

// Helper to check CSS custom properties
function getCSSCustomProperty(property) {
  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}

// Motion Preference Respect Property Test
const motionPreferenceRespectTest = new PropertyBasedTest(
  'Motion Preference Respect',
  async (scenario) => {
    let restoreMatchMedia = null;
    let testAccessibilitySystem = null;
    let testElement = null;
    
    try {
      // Mock the matchMedia API for this test
      restoreMatchMedia = mockMatchMedia(scenario.prefersReducedMotion);
      
      // Create a fresh accessibility system instance for testing
      testAccessibilitySystem = new AccessibilitySystem();
      
      // Create test element
      testElement = createTestElement();
      
      // Wait for system to initialize and apply settings
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Check motion preferences are correctly detected
      const motionPrefs = testAccessibilitySystem.motionPreferences;
      const expectedRespectMotion = !scenario.prefersReducedMotion;
      
      if (motionPrefs.respectsReducedMotion !== expectedRespectMotion) {
        return {
          success: false,
          error: 'Motion preference detection failed',
          details: {
            scenario,
            expected: expectedRespectMotion,
            actual: motionPrefs.respectsReducedMotion,
            preferences: motionPrefs
          }
        };
      }
      
      // Check CSS custom properties are updated correctly
      const durationMicro = getCSSCustomProperty('--duration-micro');
      const durationFast = getCSSCustomProperty('--duration-fast');
      const enableParallax = getCSSCustomProperty('--enable-parallax');
      const enableParticles = getCSSCustomProperty('--enable-particles');
      
      if (scenario.prefersReducedMotion) {
        // When reduced motion is preferred, durations should be minimal/zero
        // and motion effects should be disabled
        const microDurationValid = durationMicro === '0ms' || durationMicro === '';
        const fastDurationReduced = durationFast === '150ms' || durationFast === '0ms' || durationFast === '';
        const parallaxDisabled = enableParallax === '0' || enableParallax === '';
        const particlesDisabled = enableParticles === '0' || enableParticles === '';
        
        if (!microDurationValid || !parallaxDisabled || !particlesDisabled) {
          return {
            success: false,
            error: 'CSS properties not properly set for reduced motion',
            details: {
              scenario,
              cssProperties: {
                durationMicro,
                durationFast,
                enableParallax,
                enableParticles
              },
              checks: {
                microDurationValid,
                fastDurationReduced,
                parallaxDisabled,
                particlesDisabled
              }
            }
          };
        }
      } else {
        // When normal motion is allowed, durations should be normal
        // and motion effects should be enabled
        const microDurationNormal = durationMicro === '150ms' || durationMicro === '';
        const fastDurationNormal = durationFast === '300ms' || durationFast === '';
        const parallaxEnabled = enableParallax === '1' || enableParallax === '';
        const particlesEnabled = enableParticles === '1' || enableParticles === '';
        
        if (!microDurationNormal || !fastDurationNormal || !parallaxEnabled || !particlesEnabled) {
          return {
            success: false,
            error: 'CSS properties not properly set for normal motion',
            details: {
              scenario,
              cssProperties: {
                durationMicro,
                durationFast,
                enableParallax,
                enableParticles
              },
              checks: {
                microDurationNormal,
                fastDurationNormal,
                parallaxEnabled,
                particlesEnabled
              }
            }
          };
        }
      }
      
      // Check that animation engine is notified (if available)
      if (window.animationEngine) {
        const engineRespectMotion = window.animationEngine.respectsMotion;
        if (engineRespectMotion !== expectedRespectMotion) {
          return {
            success: false,
            error: 'Animation engine not properly notified of motion preference',
            details: {
              scenario,
              expected: expectedRespectMotion,
              actual: engineRespectMotion
            }
          };
        }
      }
      
      // Test that motion preference changes are properly handled
      const eventFired = await new Promise((resolve) => {
        let eventReceived = false;
        
        const handler = (event) => {
          eventReceived = true;
          const detail = event.detail;
          resolve(detail.respectsReducedMotion === expectedRespectMotion);
        };
        
        window.addEventListener('motionPreferenceChange', handler, { once: true });
        
        // Trigger motion change notification
        testAccessibilitySystem.notifyMotionChange();
        
        // Timeout if event doesn't fire
        setTimeout(() => {
          window.removeEventListener('motionPreferenceChange', handler);
          resolve(eventReceived);
        }, 100);
      });
      
      if (!eventFired) {
        return {
          success: false,
          error: 'Motion preference change event not properly fired',
          details: { scenario }
        };
      }
      
      // Verify animation duration settings match preference
      const animationDuration = motionPrefs.animationDuration;
      const expectedDuration = scenario.prefersReducedMotion ? 'reduced' : 'normal';
      
      if (animationDuration !== expectedDuration) {
        return {
          success: false,
          error: 'Animation duration setting incorrect',
          details: {
            scenario,
            expected: expectedDuration,
            actual: animationDuration
          }
        };
      }
      
      // Verify motion effects are properly controlled
      const parallaxEnabled = motionPrefs.parallaxEnabled;
      const particlesEnabled = motionPrefs.particlesEnabled;
      const expectedMotionEffects = !scenario.prefersReducedMotion;
      
      if (parallaxEnabled !== expectedMotionEffects || particlesEnabled !== expectedMotionEffects) {
        return {
          success: false,
          error: 'Motion effects not properly controlled',
          details: {
            scenario,
            expected: expectedMotionEffects,
            actual: { parallaxEnabled, particlesEnabled }
          }
        };
      }
      
      return {
        success: true,
        error: null,
        details: {
          scenario,
          motionPreferences: motionPrefs,
          cssProperties: {
            durationMicro,
            durationFast,
            enableParallax,
            enableParticles
          }
        }
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: { scenario, stack: error.stack }
      };
    } finally {
      // Clean up
      if (restoreMatchMedia) {
        restoreMatchMedia();
      }
      
      if (testAccessibilitySystem) {
        testAccessibilitySystem.destroy();
      }
      
      if (testElement && testElement.parentNode) {
        testElement.parentNode.removeChild(testElement);
      }
    }
  },
  generateMotionPreferenceScenario,
  { iterations: 100, timeout: 5000 }
);

// Export for use in test runner
if (typeof window !== 'undefined') {
  window.motionPreferenceRespectTest = motionPreferenceRespectTest;
}

// Run test if called directly
if (typeof window !== 'undefined' && window.location.pathname.includes('test-runner')) {
  document.addEventListener('DOMContentLoaded', () => {
    // Add test to the test runner
    if (window.runPropertyBasedTests) {
      window.runPropertyBasedTests.push(motionPreferenceRespectTest);
    } else {
      window.runPropertyBasedTests = [motionPreferenceRespectTest];
    }
  });
}

// Manual test runner for development
async function runMotionPreferenceTest() {
  console.log('🧪 Running Motion Preference Respect Property Test...');
  
  // Ensure AccessibilitySystem is available
  if (!window.AccessibilitySystem) {
    console.error('❌ AccessibilitySystem class not available');
    return {
      success: false,
      error: 'AccessibilitySystem class not available',
      passed: 0,
      failed: 1,
      iterations: 1,
      totalTime: 0,
      errors: [{ error: 'AccessibilitySystem class not available' }]
    };
  }
  
  const results = await motionPreferenceRespectTest.run();
  
  console.log(`📊 Test Results: ${results.name}`);
  console.log(`✅ Passed: ${results.passed}/${results.iterations}`);
  console.log(`❌ Failed: ${results.failed}/${results.iterations}`);
  console.log(`⏱️ Total Time: ${results.totalTime.toFixed(2)}ms`);
  console.log(`🎯 Success Rate: ${((results.passed / results.iterations) * 100).toFixed(1)}%`);
  
  if (results.failed > 0) {
    console.log('❌ Failure Examples:');
    results.errors.slice(0, 3).forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.error}`);
      if (error.details && error.details.scenario) {
        console.log(`     Scenario: ${error.details.scenario.description}`);
        console.log(`     Animation Type: ${error.details.scenario.animationType}`);
        console.log(`     Target: ${error.details.scenario.targetElement}`);
      }
    });
  }
  
  if (results.examples.length > 0) {
    console.log('📝 Test Examples:');
    results.examples.forEach((example, index) => {
      console.log(`  ${index + 1}. ${example.input.description} (${example.input.animationType}) → ${example.result}`);
    });
  }
  
  return results;
}

// Expose test runner for development
if (typeof window !== 'undefined') {
  window.runMotionPreferenceTest = runMotionPreferenceTest;
}