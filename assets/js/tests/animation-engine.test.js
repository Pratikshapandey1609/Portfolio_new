/**
 * Animation Engine Test Suite
 * Tests for GPU-accelerated animations, performance monitoring, and lifecycle management
 * Requirements: 2.1, 2.6
 */

// Mock DOM elements for testing
function createMockElement(id = 'test-element') {
  const element = document.createElement('div');
  element.id = id;
  element.style.cssText = 'position: absolute; top: 0; left: 0; width: 100px; height: 100px;';
  document.body.appendChild(element);
  return element;
}

// Test suite for Animation Engine
describe('Animation Engine', () => {
  let animationEngine;
  let testElement;

  beforeEach(() => {
    // Create fresh instances for each test
    animationEngine = new AnimationEngine();
    testElement = createMockElement();
  });

  afterEach(() => {
    // Clean up after each test
    if (animationEngine) {
      animationEngine.destroy();
    }
    if (testElement && testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
  });

  describe('Animation Registration and Lifecycle Management', () => {
    test('should register animation with valid configuration', () => {
      const config = {
        duration: 500,
        properties: { opacity: '0.5', transform: 'translateX(100px)' },
        priority: 'high'
      };

      const animationId = animationEngine.registerAnimation(testElement, config);

      expect(animationId).toBeTruthy();
      expect(typeof animationId).toBe('string');
      expect(animationId).toMatch(/^anim_\d+_[a-z0-9]+$/);
      
      const animation = animationEngine.animations.get(animationId);
      expect(animation).toBeTruthy();
      expect(animation.element).toBe(testElement);
      expect(animation.config.duration).toBe(500);
      expect(animation.config.priority).toBe('high');
      expect(animation.state).toBe(animationEngine.ANIMATION_STATES.IDLE);
    });

    test('should handle element selector strings', () => {
      const animationId = animationEngine.registerAnimation('#test-element', {
        duration: 300,
        properties: { opacity: '0.8' }
      });

      expect(animationId).toBeTruthy();
      const animation = animationEngine.animations.get(animationId);
      expect(animation.element).toBe(testElement);
    });

    test('should return null for invalid element selector', () => {
      const animationId = animationEngine.registerAnimation('#non-existent', {
        duration: 300,
        properties: { opacity: '0.8' }
      });

      expect(animationId).toBeNull();
    });

    test('should optimize properties for GPU acceleration', () => {
      const config = {
        properties: { 
          opacity: '0.5', 
          transform: 'translateX(100px)',
          left: '50px', // Should be converted to transform
          backgroundColor: 'red' // Should remain as-is
        }
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      const animation = animationEngine.animations.get(animationId);

      expect(animation.config.properties.opacity).toBe('0.5');
      expect(animation.config.properties.transform).toBeTruthy();
      expect(animation.config.properties.backgroundColor).toBe('red');
    });

    test('should apply will-change hint for GPU acceleration', () => {
      const config = {
        properties: { opacity: '0.5', transform: 'scale(1.2)' },
        performanceMode: 'gpu'
      };

      animationEngine.registerAnimation(testElement, config);

      expect(testElement.style.willChange).toContain('opacity');
      expect(testElement.style.willChange).toContain('transform');
    });
  });

  describe('Animation Execution', () => {
    test('should execute animation and return promise', async () => {
      const config = {
        duration: 100, // Short duration for testing
        properties: { opacity: '0.5' },
        onStart: jest.fn(),
        onComplete: jest.fn()
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      
      const promise = animationEngine.playAnimation(animationId);
      expect(promise).toBeInstanceOf(Promise);

      const result = await promise;
      expect(result).toBeTruthy();
      expect(result.state).toBe(animationEngine.ANIMATION_STATES.COMPLETED);
      expect(config.onStart).toHaveBeenCalled();
      expect(config.onComplete).toHaveBeenCalled();
    });

    test('should handle non-existent animation ID', async () => {
      await expect(animationEngine.playAnimation('invalid-id'))
        .rejects.toThrow('Animation not found: invalid-id');
    });

    test('should respect motion preferences', async () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const newEngine = new AnimationEngine();
      const config = {
        duration: 100,
        properties: { opacity: '0.5' },
        respectsMotion: true
      };

      const animationId = newEngine.registerAnimation(testElement, config);
      const result = await newEngine.playAnimation(animationId);

      expect(result).toBeUndefined(); // Should skip animation
      newEngine.destroy();
    });

    test('should queue low priority animations when performance is poor', () => {
      // Simulate poor performance
      animationEngine.isPerformanceOptimal = false;
      
      const config = {
        duration: 100,
        properties: { opacity: '0.5' },
        priority: 'low'
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      const promise = animationEngine.playAnimation(animationId);

      expect(promise).toBeInstanceOf(Promise);
      expect(animationEngine.animationQueue.length).toBeGreaterThan(0);
    });
  });

  describe('Animation State Management', () => {
    test('should track animation states correctly', async () => {
      const config = {
        duration: 100,
        properties: { opacity: '0.5' }
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      
      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.IDLE);

      const promise = animationEngine.playAnimation(animationId);
      
      // Should be running immediately after play
      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.RUNNING);

      await promise;

      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.COMPLETED);
    });

    test('should pause and resume animations', () => {
      const config = {
        duration: 1000, // Long duration for testing pause/resume
        properties: { opacity: '0.5' }
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      animationEngine.playAnimation(animationId);

      // Pause animation
      animationEngine.pauseAnimation(animationId);
      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.PAUSED);

      // Resume animation
      animationEngine.resumeAnimation(animationId);
      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.RUNNING);
    });

    test('should cancel animations', () => {
      const config = {
        duration: 1000,
        properties: { opacity: '0.5' },
        onCancel: jest.fn()
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      animationEngine.playAnimation(animationId);
      animationEngine.cancelAnimationById(animationId);

      const animation = animationEngine.animations.get(animationId);
      expect(animation.state).toBe(animationEngine.ANIMATION_STATES.CANCELLED);
    });
  });

  describe('Performance Monitoring', () => {
    test('should track frame rate', () => {
      const frameRate = animationEngine.getFrameRate();
      expect(typeof frameRate).toBe('number');
      expect(frameRate).toBeGreaterThanOrEqual(0);
    });

    test('should provide performance metrics', () => {
      const metrics = animationEngine.getPerformanceMetrics();
      
      expect(metrics).toHaveProperty('currentFPS');
      expect(metrics).toHaveProperty('averageFPS');
      expect(metrics).toHaveProperty('isOptimal');
      expect(metrics).toHaveProperty('activeAnimations');
      expect(metrics).toHaveProperty('queuedAnimations');
      expect(metrics).toHaveProperty('totalRegistered');
      expect(metrics).toHaveProperty('performanceHistory');

      expect(typeof metrics.currentFPS).toBe('number');
      expect(typeof metrics.isOptimal).toBe('boolean');
      expect(Array.isArray(metrics.performanceHistory)).toBe(true);
    });

    test('should optimize performance when frame rate drops', () => {
      const originalConsoleWarn = console.warn;
      console.warn = jest.fn();

      // Simulate poor performance
      animationEngine.frameRate = 30; // Below threshold
      animationEngine.isPerformanceOptimal = false;
      animationEngine.respectsMotion = true;

      animationEngine.optimizeForPerformance();

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Performance optimization')
      );

      console.warn = originalConsoleWarn;
    });

    test('should maintain performance history', () => {
      // Simulate performance data
      const currentTime = performance.now();
      animationEngine.performanceHistory = [
        { timestamp: currentTime - 5000, fps: 60, activeAnimations: 2 },
        { timestamp: currentTime - 3000, fps: 55, activeAnimations: 3 },
        { timestamp: currentTime - 1000, fps: 58, activeAnimations: 1 }
      ];

      const metrics = animationEngine.getPerformanceMetrics();
      expect(metrics.performanceHistory.length).toBe(3);
      expect(metrics.averageFPS).toBeCloseTo(57.67, 0);
    });
  });

  describe('GPU Acceleration', () => {
    test('should prefer GPU-accelerated properties', () => {
      const properties = {
        opacity: '0.5',
        transform: 'translateX(100px)',
        left: '50px',
        backgroundColor: 'red'
      };

      const optimized = animationEngine.optimizeAnimationProperties(properties);

      expect(optimized.opacity).toBe('0.5');
      expect(optimized.transform).toBeTruthy();
      expect(optimized.backgroundColor).toBe('red');
    });

    test('should apply will-change hints correctly', () => {
      const properties = { opacity: '0.5', transform: 'scale(1.2)' };
      
      animationEngine.applyWillChangeHint(testElement, properties);
      
      expect(testElement.style.willChange).toContain('opacity');
      expect(testElement.style.willChange).toContain('transform');
    });

    test('should remove will-change hints after animation', () => {
      testElement.style.willChange = 'opacity, transform';
      
      animationEngine.removeWillChangeHint(testElement);
      
      expect(testElement.style.willChange).toBe('auto');
    });
  });

  describe('Cleanup and Destruction', () => {
    test('should clean up all resources on destroy', () => {
      const config = {
        duration: 1000,
        properties: { opacity: '0.5' }
      };

      const animationId = animationEngine.registerAnimation(testElement, config);
      animationEngine.playAnimation(animationId);

      expect(animationEngine.animations.size).toBe(1);
      expect(animationEngine.activeAnimations.size).toBe(1);

      animationEngine.destroy();

      expect(animationEngine.animations.size).toBe(0);
      expect(animationEngine.activeAnimations.size).toBe(0);
      expect(animationEngine.animationQueue.length).toBe(0);
      expect(animationEngine.performanceHistory.length).toBe(0);
    });

    test('should provide debug information', () => {
      const config = {
        duration: 500,
        properties: { opacity: '0.5' },
        priority: 'high'
      };

      animationEngine.registerAnimation(testElement, config);
      const debugInfo = animationEngine.getDebugInfo();

      expect(debugInfo).toHaveProperty('animations');
      expect(debugInfo).toHaveProperty('performance');
      expect(debugInfo).toHaveProperty('particles');
      expect(debugInfo).toHaveProperty('motionRespected');
      expect(debugInfo).toHaveProperty('gpuAcceleration');

      expect(Array.isArray(debugInfo.animations)).toBe(true);
      expect(debugInfo.animations.length).toBe(1);
      expect(debugInfo.animations[0]).toHaveProperty('id');
      expect(debugInfo.animations[0]).toHaveProperty('state');
      expect(debugInfo.animations[0]).toHaveProperty('priority');
    });
  });
});

// Integration tests with actual DOM
describe('Animation Engine Integration', () => {
  let animationEngine;

  beforeEach(() => {
    animationEngine = new AnimationEngine();
  });

  afterEach(() => {
    if (animationEngine) {
      animationEngine.destroy();
    }
  });

  test('should handle multiple simultaneous animations', async () => {
    const elements = [
      createMockElement('element1'),
      createMockElement('element2'),
      createMockElement('element3')
    ];

    const animationIds = elements.map((element, index) => 
      animationEngine.registerAnimation(element, {
        duration: 100,
        properties: { opacity: `0.${index + 5}` },
        priority: index === 0 ? 'high' : 'medium'
      })
    );

    const promises = animationIds.map(id => animationEngine.playAnimation(id));
    const results = await Promise.all(promises);

    expect(results.length).toBe(3);
    results.forEach(result => {
      expect(result.state).toBe(animationEngine.ANIMATION_STATES.COMPLETED);
    });

    // Clean up
    elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  });

  test('should handle animation queue processing', (done) => {
    // Simulate poor performance
    animationEngine.isPerformanceOptimal = false;

    const element = createMockElement('queue-test');
    const animationId = animationEngine.registerAnimation(element, {
      duration: 50,
      properties: { opacity: '0.5' },
      priority: 'low'
    });

    animationEngine.playAnimation(animationId).then(() => {
      expect(animationEngine.getAnimationState(animationId))
        .toBe(animationEngine.ANIMATION_STATES.COMPLETED);
      
      // Clean up
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      done();
    });

    // Simulate performance improvement to process queue
    setTimeout(() => {
      animationEngine.isPerformanceOptimal = true;
    }, 10);
  });
});

// Performance tests
describe('Animation Engine Performance', () => {
  let animationEngine;

  beforeEach(() => {
    animationEngine = new AnimationEngine();
  });

  afterEach(() => {
    if (animationEngine) {
      animationEngine.destroy();
    }
  });

  test('should handle large numbers of animations efficiently', () => {
    const startTime = performance.now();
    const elements = [];
    const animationIds = [];

    // Create 100 animations
    for (let i = 0; i < 100; i++) {
      const element = createMockElement(`perf-test-${i}`);
      elements.push(element);
      
      const animationId = animationEngine.registerAnimation(element, {
        duration: 100,
        properties: { opacity: `0.${Math.floor(Math.random() * 9) + 1}` }
      });
      animationIds.push(animationId);
    }

    const registrationTime = performance.now() - startTime;
    
    // Should register 100 animations quickly (under 100ms)
    expect(registrationTime).toBeLessThan(100);
    expect(animationEngine.animations.size).toBe(100);

    // Clean up
    elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  });

  test('should maintain performance under memory pressure', () => {
    // Create and destroy many animations to test memory management
    for (let cycle = 0; cycle < 10; cycle++) {
      const elements = [];
      
      for (let i = 0; i < 50; i++) {
        const element = createMockElement(`memory-test-${cycle}-${i}`);
        elements.push(element);
        
        const animationId = animationEngine.registerAnimation(element, {
          duration: 10,
          properties: { opacity: '0.5' }
        });
        
        animationEngine.playAnimation(animationId);
      }

      // Clean up elements
      elements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    }

    // Engine should still be responsive
    const metrics = animationEngine.getPerformanceMetrics();
    expect(metrics).toBeTruthy();
    expect(typeof metrics.currentFPS).toBe('number');
  });
});