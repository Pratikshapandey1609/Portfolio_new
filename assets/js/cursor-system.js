/**
 * Premium Cursor System
 * Handles custom cursor interactions with performance optimization
 */

class CursorSystem {
  constructor() {
    this.cursor = null;
    this.cursorTrails = [];
    this.mousePosition = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.isMoving = false;
    this.currentState = 'default';
    this.magneticElements = [];
    this.trailCount = 5;
    this.animationId = null;
    
    // Performance tracking
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.fps = 60;
    this.performanceMode = 'auto'; // 'high', 'medium', 'low', 'auto'
    
    // Device detection and capabilities
    this.deviceInfo = this.detectDeviceCapabilities();
    this.supportsHover = this.deviceInfo.supportsHover;
    this.isTouchDevice = this.deviceInfo.isTouchDevice;
    this.isHighPerformanceDevice = this.deviceInfo.isHighPerformance;
    
    // Check motion preferences
    this.respectsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Touch interaction state management
    this.touchInteractionState = {
      isActive: false,
      lastTouchTime: 0,
      touchElements: new Set(),
      hoverSimulation: false
    };
    
    // Performance optimization settings
    this.optimizationSettings = this.getOptimizationSettings();
    
    this.init();
  }
  
  detectDeviceCapabilities() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || 
                     (window.screen.width >= 768 && window.screen.width <= 1024);
    
    // Detect hover capability
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    // Detect touch capability
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    // Detect device performance level
    const isHighPerformance = this.detectPerformanceLevel();
    
    // Detect connection speed
    const connectionSpeed = this.detectConnectionSpeed();
    
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      supportsHover,
      isTouchDevice,
      isHighPerformance,
      connectionSpeed,
      // Hybrid devices (touch + hover)
      isHybrid: isTouchDevice && supportsHover
    };
  }
  
  detectPerformanceLevel() {
    // Use hardware concurrency and memory as performance indicators
    const cores = navigator.hardwareConcurrency || 2;
    const memory = navigator.deviceMemory || 2; // GB
    
    // High performance: 4+ cores and 4+ GB RAM
    if (cores >= 4 && memory >= 4) return 'high';
    
    // Medium performance: 2+ cores and 2+ GB RAM
    if (cores >= 2 && memory >= 2) return 'medium';
    
    // Low performance: everything else
    return 'low';
  }
  
  detectConnectionSpeed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (!connection) return 'unknown';
    
    const effectiveType = connection.effectiveType;
    const downlink = connection.downlink;
    
    if (effectiveType === '4g' && downlink > 10) return 'fast';
    if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1.5)) return 'medium';
    return 'slow';
  }
  
  getOptimizationSettings() {
    const performance = this.deviceInfo.isHighPerformance;
    const connection = this.deviceInfo.connectionSpeed;
    
    if (performance === 'high' && connection === 'fast') {
      return {
        trailCount: 5,
        magneticStrength: 1.0,
        animationQuality: 'high',
        updateFrequency: 60
      };
    } else if (performance === 'medium' || connection === 'medium') {
      return {
        trailCount: 3,
        magneticStrength: 0.7,
        animationQuality: 'medium',
        updateFrequency: 30
      };
    } else {
      return {
        trailCount: 1,
        magneticStrength: 0.3,
        animationQuality: 'low',
        updateFrequency: 15
      };
    }
  }
  
  init() {
    // Enhanced device-specific initialization
    if (this.isTouchDevice && !this.supportsHover) {
      this.initTouchOnlyMode();
      return;
    }
    
    if (this.deviceInfo.isHybrid) {
      this.initHybridMode();
    } else {
      this.initDesktopMode();
    }
    
    console.log('🎯 Premium Cursor System initialized', {
      device: this.deviceInfo,
      optimizations: this.optimizationSettings
    });
  }
  
  initTouchOnlyMode() {
    // For touch-only devices, provide alternative interaction feedback
    document.body.style.cursor = 'auto';
    document.body.classList.add('touch-only-device');
    
    // Add touch interaction feedback
    this.setupTouchFeedback();
    
    console.log('🎯 Touch-only mode initialized');
  }
  
  initHybridMode() {
    // For hybrid devices (touch + hover), create adaptive cursor
    this.createCursor();
    this.createTrails();
    this.bindEvents();
    this.bindTouchEvents();
    this.findMagneticElements();
    this.startAnimation();
    
    // Add hybrid-specific behaviors
    this.setupHybridBehaviors();
    
    console.log('🎯 Hybrid mode initialized');
  }
  
  initDesktopMode() {
    // Standard desktop initialization
    this.createCursor();
    this.createTrails();
    this.bindEvents();
    this.findMagneticElements();
    this.startAnimation();
    
    console.log('🎯 Desktop mode initialized');
  }
  
  setupTouchFeedback() {
    // Add visual feedback for touch interactions
    const style = document.createElement('style');
    style.textContent = `
      .touch-feedback {
        position: absolute;
        width: 44px;
        height: 44px;
        background: rgba(0, 212, 255, 0.2);
        border-radius: 50%;
        pointer-events: none;
        animation: touch-ripple 0.6s ease-out forwards;
        z-index: 9999;
      }
      
      @keyframes touch-ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .touch-only-device .interactive:active,
      .touch-only-device button:active,
      .touch-only-device a:active {
        transform: scale(0.95);
        transition: transform 0.1s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    // Add touch event listeners for feedback
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }
  
  setupHybridBehaviors() {
    // For hybrid devices, manage cursor visibility based on input type
    let lastInputType = 'mouse';
    
    // Hide cursor when touch is used
    document.addEventListener('touchstart', () => {
      if (lastInputType !== 'touch') {
        lastInputType = 'touch';
        this.hideCursorForTouch();
      }
    }, { passive: true });
    
    // Show cursor when mouse is used
    document.addEventListener('mousemove', () => {
      if (lastInputType !== 'mouse') {
        lastInputType = 'mouse';
        this.showCursorForMouse();
      }
    }, { passive: true });
  }
  
  hideCursorForTouch() {
    if (this.cursor) {
      this.cursor.style.opacity = '0';
      this.cursor.style.pointerEvents = 'none';
    }
    this.cursorTrails.forEach(trail => {
      trail.element.style.opacity = '0';
    });
  }
  
  showCursorForMouse() {
    if (this.cursor) {
      this.cursor.style.opacity = '';
      this.cursor.style.pointerEvents = 'none';
    }
    // Trails opacity will be managed by the animation loop
  }
  
  handleTouchStart(e) {
    // Create touch feedback ripple
    const touch = e.touches[0];
    const ripple = document.createElement('div');
    ripple.className = 'touch-feedback';
    ripple.style.left = (touch.clientX - 22) + 'px';
    ripple.style.top = (touch.clientY - 22) + 'px';
    
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
    
    // Update touch interaction state
    this.touchInteractionState.isActive = true;
    this.touchInteractionState.lastTouchTime = Date.now();
  }
  
  handleTouchEnd(e) {
    this.touchInteractionState.isActive = false;
  }
  
  bindTouchEvents() {
    // Enhanced touch event handling for hybrid devices
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
  }
  
  handleTouchMove(e) {
    // For hybrid devices, update cursor position based on touch
    if (this.deviceInfo.isHybrid && e.touches.length === 1) {
      const touch = e.touches[0];
      this.targetPosition.x = touch.clientX;
      this.targetPosition.y = touch.clientY;
    }
  }
  
  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor default';
    
    // Add device-specific classes
    if (this.deviceInfo.isHybrid) {
      this.cursor.classList.add('hybrid-device');
    }
    if (this.deviceInfo.isHighPerformance === 'low') {
      this.cursor.classList.add('low-performance');
    }
    
    document.body.appendChild(this.cursor);
  }
  
  createTrails() {
    if (!this.respectsMotion) return;
    
    // Adjust trail count based on device performance
    const trailCount = this.optimizationSettings.trailCount;
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = `cursor-trail fade`;
      trail.style.transitionDelay = `${i * 50}ms`;
      
      // Add performance class for low-end devices
      if (this.deviceInfo.isHighPerformance === 'low') {
        trail.classList.add('low-performance');
      }
      
      document.body.appendChild(trail);
      this.cursorTrails.push({
        element: trail,
        x: 0,
        y: 0,
        delay: i * 0.1
      });
    }
  }
  
  bindEvents() {
    // Mouse movement with performance optimization
    const mouseMoveHandler = this.optimizeEventHandler(
      this.handleMouseMove.bind(this),
      this.optimizationSettings.updateFrequency
    );
    document.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    
    // Mouse enter/leave
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    // Click events
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // Interactive elements
    this.bindInteractiveElements();
    
    // Window events with throttling
    const resizeHandler = this.throttle(this.handleResize.bind(this), 250);
    const scrollHandler = this.throttle(this.handleScroll.bind(this), 16);
    
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Device orientation change for mobile devices
    if (this.deviceInfo.isMobile || this.deviceInfo.isTablet) {
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          this.handleResize();
        }, 100);
      });
    }
    
    // Network connection change
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', () => {
        this.adaptToConnectionChange();
      });
    }
  }
  
  optimizeEventHandler(handler, targetFPS) {
    let lastCall = 0;
    const interval = 1000 / targetFPS;
    
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        handler.apply(this, args);
      }
    };
  }
  
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
  }
  
  adaptToConnectionChange() {
    const newConnectionSpeed = this.detectConnectionSpeed();
    
    if (newConnectionSpeed !== this.deviceInfo.connectionSpeed) {
      this.deviceInfo.connectionSpeed = newConnectionSpeed;
      this.optimizationSettings = this.getOptimizationSettings();
      
      // Adjust trail count if needed
      this.adjustTrailCount();
      
      console.log('🎯 Adapted to connection change:', newConnectionSpeed);
    }
  }
  
  adjustTrailCount() {
    const targetCount = this.optimizationSettings.trailCount;
    const currentCount = this.cursorTrails.length;
    
    if (targetCount < currentCount) {
      // Remove excess trails
      for (let i = currentCount - 1; i >= targetCount; i--) {
        this.cursorTrails[i].element.remove();
        this.cursorTrails.splice(i, 1);
      }
    } else if (targetCount > currentCount) {
      // Add more trails
      for (let i = currentCount; i < targetCount; i++) {
        const trail = document.createElement('div');
        trail.className = `cursor-trail fade`;
        trail.style.transitionDelay = `${i * 50}ms`;
        
        if (this.deviceInfo.isHighPerformance === 'low') {
          trail.classList.add('low-performance');
        }
        
        document.body.appendChild(trail);
        this.cursorTrails.push({
          element: trail,
          x: 0,
          y: 0,
          delay: i * 0.1
        });
      }
    }
  }
  
  bindInteractiveElements() {
    // Links and buttons
    const interactiveSelectors = [
      'a', 'button', '.btn', '.interactive',
      'input[type="submit"]', 'input[type="button"]',
      '.card', '.project-card', '.skill-item'
    ];
    
    interactiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        // For touch devices, ensure minimum touch target size
        if (this.isTouchDevice) {
          this.ensureTouchTargetSize(element);
        }
        
        // Mouse events
        if (this.supportsHover) {
          element.addEventListener('mouseenter', () => this.setCursorState('hover'));
          element.addEventListener('mouseleave', () => this.setCursorState('default'));
        }
        
        // Touch events for hybrid devices
        if (this.deviceInfo.isHybrid) {
          element.addEventListener('touchstart', () => {
            this.touchInteractionState.touchElements.add(element);
          }, { passive: true });
          
          element.addEventListener('touchend', () => {
            this.touchInteractionState.touchElements.delete(element);
          }, { passive: true });
        }
      });
    });
    
    // Text elements
    const textSelectors = ['input[type="text"]', 'input[type="email"]', 'textarea', '.text-input'];
    textSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (this.supportsHover) {
          element.addEventListener('mouseenter', () => this.setCursorState('text'));
          element.addEventListener('mouseleave', () => this.setCursorState('default'));
        }
        
        // Ensure touch target size
        if (this.isTouchDevice) {
          this.ensureTouchTargetSize(element);
        }
      });
    });
    
    // Draggable elements
    document.querySelectorAll('[draggable="true"], .draggable').forEach(element => {
      if (this.supportsHover) {
        element.addEventListener('dragstart', () => this.setCursorState('drag'));
        element.addEventListener('dragend', () => this.setCursorState('default'));
      }
    });
  }
  
  ensureTouchTargetSize(element) {
    const rect = element.getBoundingClientRect();
    const minSize = 44; // WCAG recommended minimum touch target size
    
    if (rect.width < minSize || rect.height < minSize) {
      const computedStyle = window.getComputedStyle(element);
      const currentPadding = {
        top: parseInt(computedStyle.paddingTop) || 0,
        right: parseInt(computedStyle.paddingRight) || 0,
        bottom: parseInt(computedStyle.paddingBottom) || 0,
        left: parseInt(computedStyle.paddingLeft) || 0
      };
      
      // Calculate additional padding needed
      const widthDiff = Math.max(0, minSize - rect.width);
      const heightDiff = Math.max(0, minSize - rect.height);
      
      if (widthDiff > 0 || heightDiff > 0) {
        element.style.paddingTop = (currentPadding.top + heightDiff / 2) + 'px';
        element.style.paddingBottom = (currentPadding.bottom + heightDiff / 2) + 'px';
        element.style.paddingLeft = (currentPadding.left + widthDiff / 2) + 'px';
        element.style.paddingRight = (currentPadding.right + widthDiff / 2) + 'px';
        
        // Add touch-optimized class
        element.classList.add('touch-optimized');
      }
    }
  }
  
  findMagneticElements() {
    this.magneticElements = document.querySelectorAll('.magnetic-element, .cta-button, .social-link');
  }
  
  handleMouseMove(e) {
    this.targetPosition.x = e.clientX;
    this.targetPosition.y = e.clientY;
    this.isMoving = true;
    
    // Handle magnetic effects
    this.handleMagneticEffect(e);
    
    // Clear movement timeout
    clearTimeout(this.movementTimeout);
    this.movementTimeout = setTimeout(() => {
      this.isMoving = false;
    }, 100);
  }
  
  handleMagneticEffect(e) {
    // Skip magnetic effects on low-performance devices or slow connections
    if (this.deviceInfo.isHighPerformance === 'low' || 
        this.deviceInfo.connectionSpeed === 'slow') {
      return;
    }
    
    const magneticStrength = this.optimizationSettings.magneticStrength;
    
    this.magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      const magneticRadius = Math.max(rect.width, rect.height) * 1.5;
      
      if (distance < magneticRadius) {
        const baseStrength = parseFloat(element.dataset.magneticStrength) || 0.3;
        const adjustedStrength = baseStrength * magneticStrength;
        const pullX = (e.clientX - centerX) * adjustedStrength;
        const pullY = (e.clientY - centerY) * adjustedStrength;
        
        element.style.transform = `translate(${pullX}px, ${pullY}px)`;
        
        // Update cursor position for magnetic effect
        if (this.cursor && this.currentState === 'hover') {
          this.cursor.classList.add('magnetic');
        }
      } else {
        element.style.transform = '';
        if (this.cursor) {
          this.cursor.classList.remove('magnetic');
        }
      }
    });
  }
  
  handleMouseEnter() {
    if (this.cursor) {
      this.cursor.classList.remove('hidden');
    }
  }
  
  handleMouseLeave() {
    if (this.cursor) {
      this.cursor.classList.add('hidden');
    }
  }
  
  handleMouseDown() {
    this.setCursorState('click');
  }
  
  handleMouseUp() {
    this.setCursorState('default');
  }
  
  handleResize() {
    // Recalculate magnetic elements on resize
    this.findMagneticElements();
  }
  
  handleScroll() {
    // Update magnetic elements positions on scroll
    this.findMagneticElements();
  }
  
  setCursorState(state) {
    if (!this.cursor || this.currentState === state) return;
    
    // Remove all state classes
    this.cursor.classList.remove('default', 'hover', 'click', 'text', 'drag', 'loading', 'hidden', 'disabled', 'success', 'error');
    
    // Add new state class
    this.cursor.classList.add(state);
    this.currentState = state;
    
    // Add pulse animation for certain states
    if (['click', 'success', 'error'].includes(state) && this.respectsMotion) {
      this.cursor.style.animation = 'cursor-pulse 0.3s ease-out';
      setTimeout(() => {
        if (this.cursor) {
          this.cursor.style.animation = '';
        }
      }, 300);
    }
  }
  
  startAnimation() {
    const targetFPS = this.optimizationSettings.updateFrequency;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;
    
    const animate = (currentTime) => {
      // Throttle animation based on device performance
      if (currentTime - lastFrameTime < frameInterval) {
        this.animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      
      // Calculate FPS
      if (currentTime - this.lastFrameTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
        
        // Adaptive performance adjustment
        this.adaptPerformance();
      }
      this.frameCount++;
      
      // Update cursor position with smooth interpolation
      const lerp = this.deviceInfo.isHighPerformance === 'high' ? 0.15 : 0.25; // Faster lerp for low-end devices
      this.mousePosition.x += (this.targetPosition.x - this.mousePosition.x) * lerp;
      this.mousePosition.y += (this.targetPosition.y - this.mousePosition.y) * lerp;
      
      // Update cursor position
      if (this.cursor && !this.touchInteractionState.isActive) {
        this.cursor.style.transform = `translate(${this.mousePosition.x}px, ${this.mousePosition.y}px)`;
      }
      
      // Update trails with delay (only if motion is respected and performance allows)
      if (this.respectsMotion && 
          this.cursorTrails.length > 0 && 
          this.deviceInfo.isHighPerformance !== 'low') {
        this.updateTrails(lerp);
      }
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
  }
  
  updateTrails(lerp) {
    this.cursorTrails.forEach((trail, index) => {
      const delay = (index + 1) * 0.05;
      trail.x += (this.mousePosition.x - trail.x) * (lerp * (1 - delay));
      trail.y += (this.mousePosition.y - trail.y) * (lerp * (1 - delay));
      
      trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
      
      // Show trails only when moving and not in touch mode
      const shouldShow = this.isMoving && !this.touchInteractionState.isActive;
      trail.element.style.opacity = shouldShow ? 0.6 - (index * 0.1) : 0;
    });
  }
  
  adaptPerformance() {
    // If FPS drops below threshold, reduce quality
    if (this.fps < 30 && this.optimizationSettings.animationQuality !== 'low') {
      console.log('🎯 Performance drop detected, reducing quality');
      
      // Reduce trail count
      if (this.cursorTrails.length > 1) {
        const trailToRemove = this.cursorTrails.pop();
        trailToRemove.element.remove();
      }
      
      // Disable magnetic effects
      this.optimizationSettings.magneticStrength = 0;
      
      // Reduce update frequency
      this.optimizationSettings.updateFrequency = Math.max(15, this.optimizationSettings.updateFrequency - 15);
    }
    
    // If FPS is consistently high, we can increase quality
    if (this.fps >= 55 && this.optimizationSettings.animationQuality === 'low') {
      console.log('🎯 Performance improved, increasing quality');
      this.optimizationSettings = this.getOptimizationSettings();
    }
  }
  
  // Public methods for external control
  showLoading() {
    this.setCursorState('loading');
  }
  
  hideLoading() {
    this.setCursorState('default');
  }
  
  hide() {
    this.setCursorState('hidden');
  }
  
  show() {
    this.setCursorState('default');
  }
  
  showSuccess() {
    this.setCursorState('success');
    setTimeout(() => {
      this.setCursorState('default');
    }, 1000);
  }
  
  showError() {
    this.setCursorState('error');
    setTimeout(() => {
      this.setCursorState('default');
    }, 1000);
  }
  
  disable() {
    this.setCursorState('disabled');
  }
  
  enable() {
    this.setCursorState('default');
  }
  
  destroy() {
    // Clean up
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.cursor) {
      this.cursor.remove();
    }
    
    this.cursorTrails.forEach(trail => {
      trail.element.remove();
    });
    
    // Reset cursor
    document.body.style.cursor = 'auto';
    
    console.log('🎯 Cursor System destroyed');
  }
  
  // Performance monitoring with device-specific metrics
  getPerformanceStats() {
    return {
      fps: this.fps,
      isOptimal: this.fps >= 55,
      trailCount: this.cursorTrails.length,
      magneticElements: this.magneticElements.length,
      deviceInfo: this.deviceInfo,
      optimizationSettings: this.optimizationSettings,
      touchInteractionState: this.touchInteractionState,
      memoryUsage: this.getMemoryUsage()
    };
  }
  
  getMemoryUsage() {
    if ('memory' in performance) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return null;
  }
  
  // Device-specific cursor state management
  setCursorState(state) {
    if (!this.cursor || this.currentState === state) return;
    
    // Skip state changes during touch interactions on hybrid devices
    if (this.deviceInfo.isHybrid && this.touchInteractionState.isActive) {
      return;
    }
    
    // Remove all state classes
    this.cursor.classList.remove('default', 'hover', 'click', 'text', 'drag', 'loading', 'hidden', 'disabled', 'success', 'error');
    
    // Add new state class
    this.cursor.classList.add(state);
    this.currentState = state;
    
    // Add pulse animation for certain states (only if motion is respected and performance allows)
    if (['click', 'success', 'error'].includes(state) && 
        this.respectsMotion && 
        this.deviceInfo.isHighPerformance !== 'low') {
      this.cursor.style.animation = 'cursor-pulse 0.3s ease-out';
      setTimeout(() => {
        if (this.cursor) {
          this.cursor.style.animation = '';
        }
      }, 300);
    }
  }
  
  // Enhanced public methods with device awareness
  showLoading() {
    if (this.isTouchDevice && !this.supportsHover) {
      // Show alternative loading indicator for touch devices
      this.showTouchLoadingIndicator();
    } else {
      this.setCursorState('loading');
    }
  }
  
  showTouchLoadingIndicator() {
    // Create a loading indicator for touch devices
    const loader = document.createElement('div');
    loader.className = 'touch-loading-indicator';
    loader.innerHTML = '<div class="spinner"></div>';
    
    const style = document.createElement('style');
    style.textContent = `
      .touch-loading-indicator {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: rgba(0, 212, 255, 0.9);
        padding: 10px;
        border-radius: 8px;
        color: white;
      }
      
      .touch-loading-indicator .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    if (!document.querySelector('style[data-touch-loading]')) {
      style.setAttribute('data-touch-loading', 'true');
      document.head.appendChild(style);
    }
    
    document.body.appendChild(loader);
    this.touchLoadingIndicator = loader;
  }
  
  hideLoading() {
    if (this.touchLoadingIndicator) {
      this.touchLoadingIndicator.remove();
      this.touchLoadingIndicator = null;
    } else {
      this.setCursorState('default');
    }
  }
}

// Initialize cursor system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Enhanced device detection
  const deviceCapabilities = {
    supportsHover: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isHybrid: window.matchMedia('(hover: hover) and (pointer: coarse)').matches,
    respectsMotion: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
  
  console.log('🎯 Device capabilities detected:', deviceCapabilities);
  
  // Initialize cursor system based on device capabilities
  if (deviceCapabilities.supportsHover || deviceCapabilities.isHybrid) {
    window.cursorSystem = new CursorSystem();
    
    // Expose to global scope for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.debugCursor = () => {
        console.log('Cursor Performance:', window.cursorSystem.getPerformanceStats());
      };
      
      // Add performance monitoring
      setInterval(() => {
        const stats = window.cursorSystem.getPerformanceStats();
        if (!stats.isOptimal) {
          console.warn('🎯 Cursor performance below optimal:', stats);
        }
      }, 5000);
    }
  } else {
    // For touch-only devices, add touch-optimized class
    document.body.classList.add('touch-only-device');
    console.log('🎯 Touch-only mode enabled');
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (window.cursorSystem) {
    if (document.hidden) {
      window.cursorSystem.hide();
    } else {
      window.cursorSystem.show();
    }
  }
});

// Handle device orientation changes
window.addEventListener('orientationchange', () => {
  if (window.cursorSystem) {
    setTimeout(() => {
      window.cursorSystem.handleResize();
    }, 100);
  }
});

// Handle network connection changes
if ('connection' in navigator) {
  navigator.connection.addEventListener('change', () => {
    if (window.cursorSystem) {
      console.log('🎯 Network connection changed:', navigator.connection.effectiveType);
    }
  });
}

// Handle media query changes for hover capability
const hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
hoverMediaQuery.addListener((e) => {
  if (e.matches && !window.cursorSystem) {
    // Hover capability was enabled (e.g., mouse connected to tablet)
    window.cursorSystem = new CursorSystem();
    console.log('🎯 Hover capability enabled, cursor system initialized');
  } else if (!e.matches && window.cursorSystem) {
    // Hover capability was disabled
    window.cursorSystem.destroy();
    window.cursorSystem = null;
    document.body.classList.add('touch-only-device');
    console.log('🎯 Hover capability disabled, cursor system destroyed');
  }
});

// Handle reduced motion preference changes
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
motionMediaQuery.addListener((e) => {
  if (window.cursorSystem) {
    window.cursorSystem.respectsMotion = !e.matches;
    console.log('🎯 Motion preference changed:', !e.matches ? 'enabled' : 'disabled');
  }
});