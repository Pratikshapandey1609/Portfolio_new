/**
 * Property-Based Test: Animation Performance Budget
 * Feature: premium-portfolio-redesign, Property 3: Animation Performance Budget
 * Validates: Requirements 2.1, 2.6
 * 
 * Property: For any animation in the system, execution should complete within 
 * the allocated performance budget (16.67ms per frame) and maintain 60fps
 */

// Simple property-based testing framework
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

// Animation configuration generator
function generateAnimationConfig() {
  const durations = [100, 200, 300, 500, 800, 1000, 1500, 2000];
  const properties = [
    { opacity: Math.random().toFixed(2) },
    { transform: `translateX(${Math.random() * 200 - 100}px)` },
    { transform: `translateY(${Math.random() * 200 - 100}px)` },
    { transform: `scale(${0.5 + Math.random()})` },
    { transform: `rotate(${Math.random() * 360}deg)` },
    { 
      opacity: Math.random().toFixed(2),
      transform: `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`
    }
  ];
  
  const easings = [
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  ];

  return {
    duration: durations[Math.floor(Math.random() * durations.length)],
    properties: properties[Math.floor(Math.random() * properties.length)],
    easing: easings[Math.floor(Math.random() * easings.length)],
    priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    performanceMode: Math.random() > 0.5 ? 'gpu' : 'auto'
  };
}

// Create test element helper
function createTestElement() {
  const element = document.createElement('div');
  element.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #00d4ff;
    opacity: 1;
    transform: translateX(0px);
  `;
  document.body.appendChild(element);
  return element;
}

// Performance monitoring helper
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.startTime = 0;
    this.lastFrameTime = 0;
    this.frameTimes = [];
    this.isMonitoring = false;
  }

  start() {
    this.frameCount = 0;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.frameTimes = [];
    this.isMonitoring = true;
    this.monitorFrame();
  }

  monitorFrame() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    
    this.frameTimes.push(frameTime);
    this.frameCount++;
    this.lastFrameTime = currentTime;

    requestAnimationFrame(() => this.monitorFrame());
  }

  stop() {
    this.isMonitoring = false;
    const totalTime = this.lastFrameTime - this.startTime;
    const avgFPS = totalTime > 0 ? (this.frameCount * 1000) / totalTime : 0;
    
    // Calculate frame time statistics
    const avgFrameTime = this.frameTimes.length > 0 
      ? this.frameTimes.reduce((sum, time) => sum + time, 0) / this.frameTimes.length 
      : 0;
    
    const maxFrameTime = this.frameTimes.length > 0 
      ? Math.max(...this.frameTimes) 
      : 0;

    const droppedFrames = this.frameTimes.filter(time => time > 16.67).length;

    return {
      avgFPS: Math.round(avgFPS),
      avgFrameTime: Math.round(avgFrameTime * 100) / 100,
      maxFrameTime: Math.round(maxFrameTime * 100) / 100,
      droppedFrames,
      totalFrames: this.frameCount,
      totalTime: Math.round(totalTime)
    };
  }
}

// Animation Performance Budget Property Test
const animationPerformanceBudgetTest = new PropertyBasedTest(
  'Animation Performance Budget',
  async (config) => {
    // Ensure animation engine is available, try to initialize if not
    if (!window.animationEngine) {
      if (window.AnimationEngine) {
        try {
          window.animationEngine = new AnimationEngine();
          console.log('Animation engine initialized for testing');
        } catch (error) {
          return {
            success: false,
            error: 'Failed to initialize animation engine: ' + error.message,
            details: { config, initError: error.message }
          };
        }
      } else {
        return {
          success: false,
          error: 'AnimationEngine class not available',
          details: { 
            config,
            availableGlobals: {
              AnimationEngine: typeof window.AnimationEngine,
              animationEngine: typeof window.animationEngine
            }
          }
        };
      }
    }

    const element = createTestElement();
    const monitor = new PerformanceMonitor();
    
    try {
      // Start performance monitoring
      monitor.start();
      
      // Register and play animation
      const animationId = window.animationEngine.registerAnimation(element, config);
      
      if (!animationId) {
        return {
          success: false,
          error: 'Failed to register animation',
          details: { config }
        };
      }

      // Play animation and wait for completion
      await window.animationEngine.playAnimation(animationId);
      
      // Wait a bit more to capture post-animation frames
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Stop monitoring and get results
      const performanceResults = monitor.stop();
      
      // Performance budget requirements:
      // 1. Average FPS should be >= 55 (allowing some tolerance)
      // 2. Maximum frame time should be <= 20ms (allowing some tolerance)
      // 3. Dropped frames should be < 10% of total frames
      
      const fpsThreshold = 55;
      const maxFrameTimeThreshold = 20; // ms
      const droppedFrameThreshold = 0.1; // 10%
      
      const fpsPass = performanceResults.avgFPS >= fpsThreshold;
      const frameTimePass = performanceResults.maxFrameTime <= maxFrameTimeThreshold;
      const droppedFramePass = (performanceResults.droppedFrames / performanceResults.totalFrames) <= droppedFrameThreshold;
      
      const success = fpsPass && frameTimePass && droppedFramePass;
      
      return {
        success,
        error: success ? null : 'Performance budget exceeded',
        details: {
          config,
          performance: performanceResults,
          thresholds: {
            fps: fpsThreshold,
            maxFrameTime: maxFrameTimeThreshold,
            droppedFrameThreshold
          },
          checks: {
            fpsPass,
            frameTimePass,
            droppedFramePass
          }
        }
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: { config, stack: error.stack }
      };
    } finally {
      // Clean up
      monitor.stop();
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  },
  generateAnimationConfig,
  { iterations: 100, timeout: 10000 }
);

// Export for use in test runner
if (typeof window !== 'undefined') {
  window.animationPerformanceBudgetTest = animationPerformanceBudgetTest;
}

// Run test if called directly
if (typeof window !== 'undefined' && window.location.pathname.includes('test-runner')) {
  document.addEventListener('DOMContentLoaded', () => {
    // Add test to the test runner
    if (window.runPropertyBasedTests) {
      window.runPropertyBasedTests.push(animationPerformanceBudgetTest);
    } else {
      window.runPropertyBasedTests = [animationPerformanceBudgetTest];
    }
  });
}

// Manual test runner for development
async function runAnimationPerformanceTest() {
  console.log('🧪 Running Animation Performance Budget Property Test...');
  
  // Try to ensure animation engine is available
  if (!window.animationEngine) {
    console.log('Animation engine not found, attempting to initialize...');
    
    if (window.AnimationEngine) {
      try {
        window.animationEngine = new AnimationEngine();
        console.log('✅ Animation engine initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize animation engine:', error);
        return {
          success: false,
          error: 'Failed to initialize animation engine: ' + error.message,
          passed: 0,
          failed: 1,
          iterations: 1,
          totalTime: 0,
          errors: [{ error: error.message }]
        };
      }
    } else {
      console.error('❌ AnimationEngine class not available');
      return {
        success: false,
        error: 'AnimationEngine class not available',
        passed: 0,
        failed: 1,
        iterations: 1,
        totalTime: 0,
        errors: [{ error: 'AnimationEngine class not available' }]
      };
    }
  }
  
  const results = await animationPerformanceBudgetTest.run();
  
  console.log(`📊 Test Results: ${results.name}`);
  console.log(`✅ Passed: ${results.passed}/${results.iterations}`);
  console.log(`❌ Failed: ${results.failed}/${results.iterations}`);
  console.log(`⏱️ Total Time: ${results.totalTime.toFixed(2)}ms`);
  console.log(`🎯 Success Rate: ${((results.passed / results.iterations) * 100).toFixed(1)}%`);
  
  if (results.failed > 0) {
    console.log('❌ Failure Examples:');
    results.errors.slice(0, 3).forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.error}`);
      if (error.details && error.details.performance) {
        console.log(`     FPS: ${error.details.performance.avgFPS}, Max Frame Time: ${error.details.performance.maxFrameTime}ms`);
      }
    });
  }
  
  if (results.examples.length > 0) {
    console.log('📝 Test Examples:');
    results.examples.forEach((example, index) => {
      console.log(`  ${index + 1}. Duration: ${example.input.duration}ms, Priority: ${example.input.priority} → ${example.result}`);
    });
  }
  
  return results;
}

// Expose test runner for development
if (typeof window !== 'undefined') {
  window.runAnimationPerformanceTest = runAnimationPerformanceTest;
}