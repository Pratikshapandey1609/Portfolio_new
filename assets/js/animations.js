/**
 * Premium Animation Engine with GPU-accelerated animations
 * Handles animation management, performance monitoring, and lifecycle management
 * Requirements: 2.1, 2.6
 */

class AnimationEngine {
  constructor() {
    // Animation registry and management
    this.animations = new Map();
    this.activeAnimations = new Set();
    this.animationQueue = [];
    this.observers = new Map();
    this.particles = [];
    
    // Performance monitoring
    this.isPerformanceOptimal = true;
    this.frameRate = 60;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.performanceHistory = [];
    this.performanceThreshold = 55; // Minimum acceptable FPS
    
    // Animation lifecycle states
    this.ANIMATION_STATES = {
      IDLE: 'idle',
      QUEUED: 'queued',
      RUNNING: 'running',
      PAUSED: 'paused',
      COMPLETED: 'completed',
      CANCELLED: 'cancelled'
    };
    
    // GPU acceleration preferences
    this.gpuAcceleration = {
      enabled: true,
      properties: ['transform', 'opacity', 'filter'],
      fallbackProperties: ['left', 'top', 'width', 'height']
    };
    
    // Motion preferences and accessibility
    this.respectsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.setupMotionPreferenceListener();
    
    // Initialize the engine
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.initParticleSystem();
    this.bindScrollAnimations();
    this.startPerformanceMonitoring();
    this.setupAnimationQueue();
    
    console.log('🎬 Enhanced Animation Engine initialized with GPU acceleration');
  }
  
  /**
   * Setup motion preference change listener
   */
  setupMotionPreferenceListener() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.respectsMotion = !e.matches;
      this.handleMotionPreferenceChange();
    });
  }
  
  /**
   * Handle motion preference changes
   */
  handleMotionPreferenceChange() {
    if (!this.respectsMotion) {
      // Pause all running animations
      this.activeAnimations.forEach(animationId => {
        this.pauseAnimation(animationId);
      });
      
      // Clear particle system
      this.clearParticles();
    } else {
      // Resume animations if motion is allowed
      this.activeAnimations.forEach(animationId => {
        const animation = this.animations.get(animationId);
        if (animation && animation.state === this.ANIMATION_STATES.PAUSED) {
          this.resumeAnimation(animationId);
        }
      });
    }
  }
  
  /**
   * Setup animation queue processing
   */
  setupAnimationQueue() {
    const processQueue = () => {
      if (this.animationQueue.length > 0 && this.isPerformanceOptimal) {
        const nextAnimation = this.animationQueue.shift();
        this.executeAnimation(nextAnimation);
      }
      requestAnimationFrame(processQueue);
    };
    
    requestAnimationFrame(processQueue);
  }
  
  setupIntersectionObserver() {
    // Create intersection observer for scroll animations
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    // Observe all animatable elements
    document.querySelectorAll('[data-animate]').forEach(element => {
      this.scrollObserver.observe(element);
    });
  }
  
  triggerAnimation(element) {
    const animationType = element.dataset.animate;
    const delay = parseInt(element.dataset.delay) || 0;
    
    setTimeout(() => {
      element.classList.add('animate-in');
      
      // Trigger specific animations based on type
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element);
          break;
        case 'slideInLeft':
          this.slideInLeft(element);
          break;
        case 'slideInRight':
          this.slideInRight(element);
          break;
        case 'scaleIn':
          this.scaleIn(element);
          break;
        case 'flipIn':
          this.flipIn(element);
          break;
        case 'stagger':
          this.staggerChildren(element);
          break;
        default:
          this.fadeInUp(element);
      }
    }, delay);
  }
  
  fadeInUp(element) {
    if (!this.respectsMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
  
  slideInLeft(element) {
    if (!this.respectsMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }
  
  slideInRight(element) {
    if (!this.respectsMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateX(30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }
  
  scaleIn(element) {
    if (!this.respectsMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }
  
  flipIn(element) {
    if (!this.respectsMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'rotateY(-90deg)';
    element.style.transformStyle = 'preserve-3d';
    element.style.perspective = '1000px';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'rotateY(0deg)';
    });
  }
  
  staggerChildren(container) {
    const children = container.children;
    
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        this.fadeInUp(child);
      }, index * 100);
    });
  }
  
  initParticleSystem() {
    if (!this.respectsMotion) return;
    
    const particleContainer = document.getElementById('hero-particles');
    if (!particleContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      this.createParticle(particleContainer);
    }
    
    // Start particle animation
    this.animateParticles();
  }
  
  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and properties
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 3 + 1;
    const speed = Math.random() * 2 + 0.5;
    const opacity = Math.random() * 0.5 + 0.1;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = opacity;
    particle.style.animationDuration = (speed * 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: size,
      opacity: opacity
    });
  }
  
  animateParticles() {
    if (!this.respectsMotion) return;
    
    const animate = () => {
      this.particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Update DOM element
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  bindScrollAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero && this.respectsMotion) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }, { passive: true });
    }
    
    // Progress bar animations for skills
    this.animateSkillBars();
    
    // Typewriter effect for hero title
    this.initTypewriter();
  }
  
  animateSkillBars() {
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
        }
      });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
      skillObserver.observe(item);
    });
  }
  
  initTypewriter() {
    const typewriterElement = document.querySelector('.hero-subtitle');
    if (!typewriterElement || !this.respectsMotion) return;
    
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 50;
    
    const typeWriter = () => {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      }
    };
    
    // Start typewriter after hero title animation
    setTimeout(typeWriter, 1000);
  }
  
  startPerformanceMonitoring() {
    const monitor = (currentTime) => {
      // Calculate FPS with more precision
      const deltaTime = currentTime - this.lastFrameTime;
      
      if (deltaTime >= 1000) {
        this.frameRate = Math.round((this.frameCount * 1000) / deltaTime);
        
        // Store performance history for trend analysis
        this.performanceHistory.push({
          timestamp: currentTime,
          fps: this.frameRate,
          activeAnimations: this.activeAnimations.size
        });
        
        // Keep only last 60 seconds of history
        const cutoffTime = currentTime - 60000;
        this.performanceHistory = this.performanceHistory.filter(
          entry => entry.timestamp > cutoffTime
        );
        
        // Update performance status
        this.isPerformanceOptimal = this.frameRate >= this.performanceThreshold;
        
        // Trigger performance optimization if needed
        if (!this.isPerformanceOptimal && this.respectsMotion) {
          this.optimizeForPerformance();
        }
        
        // Reset counters
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
        
        // Log performance in development
        if (this.isDevelopment()) {
          this.logPerformanceMetrics();
        }
      }
      
      this.frameCount++;
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }
  
  /**
   * Enhanced performance optimization
   */
  optimizeForPerformance() {
    console.warn('⚡ Performance optimization: Reducing animation complexity');
    
    // Reduce particle count more aggressively
    if (this.particles.length > 15) {
      const particlesToRemove = this.particles.splice(15);
      particlesToRemove.forEach(particle => {
        if (particle.element && particle.element.parentNode) {
          particle.element.remove();
        }
      });
    }
    
    // Pause non-critical animations
    this.activeAnimations.forEach(animationId => {
      const animation = this.animations.get(animationId);
      if (animation && animation.priority === 'low') {
        this.pauseAnimation(animationId);
      }
    });
    
    // Reduce animation durations for better performance
    document.documentElement.style.setProperty('--duration-slow', '300ms');
    document.documentElement.style.setProperty('--duration-normal', '200ms');
    document.documentElement.style.setProperty('--duration-fast', '150ms');
    
    // Disable GPU-intensive effects
    document.documentElement.style.setProperty('--enable-blur-effects', '0');
  }
  
  /**
   * Log detailed performance metrics
   */
  logPerformanceMetrics() {
    const avgFps = this.performanceHistory.length > 0 
      ? this.performanceHistory.reduce((sum, entry) => sum + entry.fps, 0) / this.performanceHistory.length
      : this.frameRate;
    
    console.log('📊 Animation Performance:', {
      currentFPS: this.frameRate,
      averageFPS: Math.round(avgFps),
      isOptimal: this.isPerformanceOptimal,
      activeAnimations: this.activeAnimations.size,
      queuedAnimations: this.animationQueue.length,
      particleCount: this.particles.length,
      memoryUsage: this.getMemoryUsage()
    });
  }
  
  /**
   * Get memory usage information
   */
  getMemoryUsage() {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
      };
    }
    return 'Not available';
  }
  
  /**
   * Check if running in development mode
   */
  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname === '';
  }
  
  optimizeForPerformance() {
    console.warn('⚡ Performance optimization: Reducing animations');
    
    // Reduce particle count
    if (this.particles.length > 20) {
      const particlesToRemove = this.particles.splice(20);
      particlesToRemove.forEach(particle => {
        particle.element.remove();
      });
    }
    
    // Disable some animations
    document.documentElement.style.setProperty('--duration-slow', '200ms');
    document.documentElement.style.setProperty('--duration-normal', '150ms');
  }
  
  /**
   * Clear all particles from the system
   */
  clearParticles() {
    this.particles.forEach(particle => {
      if (particle.element && particle.element.parentNode) {
        particle.element.remove();
      }
    });
    this.particles = [];
  }
  
  // Enhanced Public API Methods
  
  /**
   * Register an animation with comprehensive configuration
   * @param {Element|string} element - Target element or selector
   * @param {Object} config - Animation configuration
   * @returns {string} Animation ID
   */
  registerAnimation(element, config) {
    const id = 'anim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Resolve element if selector string provided
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;
    
    if (!targetElement) {
      console.warn(`Animation registration failed: Element not found`, element);
      return null;
    }
    
    // Default configuration with GPU acceleration preferences
    const defaultConfig = {
      duration: 400,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: 0,
      iterations: 1,
      fill: 'forwards',
      properties: {},
      performanceMode: 'auto', // 'gpu', 'cpu', 'auto'
      priority: 'medium', // 'high', 'medium', 'low'
      respectsMotion: true,
      onStart: null,
      onComplete: null,
      onCancel: null
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    // Optimize properties for GPU acceleration
    const optimizedProperties = this.optimizeAnimationProperties(finalConfig.properties);
    
    const animationData = {
      id,
      element: targetElement,
      config: { ...finalConfig, properties: optimizedProperties },
      state: this.ANIMATION_STATES.IDLE,
      startTime: null,
      endTime: null,
      progress: 0,
      webAnimation: null
    };
    
    this.animations.set(id, animationData);
    
    // Apply will-change hint for GPU acceleration
    if (finalConfig.performanceMode !== 'cpu') {
      this.applyWillChangeHint(targetElement, optimizedProperties);
    }
    
    console.log(`🎬 Animation registered: ${id}`, finalConfig);
    return id;
  }
  
  /**
   * Optimize animation properties for GPU acceleration
   * @param {Object} properties - Original properties
   * @returns {Object} Optimized properties
   */
  optimizeAnimationProperties(properties) {
    const optimized = {};
    
    Object.keys(properties).forEach(prop => {
      if (this.gpuAcceleration.enabled && this.gpuAcceleration.properties.includes(prop)) {
        // Use GPU-accelerated property
        optimized[prop] = properties[prop];
      } else if (this.gpuAcceleration.fallbackProperties.includes(prop)) {
        // Convert to GPU-accelerated equivalent where possible
        switch (prop) {
          case 'left':
          case 'top':
            // Convert to transform if possible
            if (!optimized.transform) {
              optimized.transform = `translate(${properties.left || 0}, ${properties.top || 0})`;
            }
            break;
          default:
            optimized[prop] = properties[prop];
        }
      } else {
        optimized[prop] = properties[prop];
      }
    });
    
    return optimized;
  }
  
  /**
   * Apply will-change CSS hint for GPU acceleration
   * @param {Element} element - Target element
   * @param {Object} properties - Animation properties
   */
  applyWillChangeHint(element, properties) {
    const willChangeProps = Object.keys(properties).filter(prop => 
      this.gpuAcceleration.properties.includes(prop)
    );
    
    if (willChangeProps.length > 0) {
      element.style.willChange = willChangeProps.join(', ');
    }
  }
  
  /**
   * Remove will-change hint after animation
   * @param {Element} element - Target element
   */
  removeWillChangeHint(element) {
    element.style.willChange = 'auto';
  }
  
  /**
   * Play an animation by ID
   * @param {string} id - Animation ID
   * @returns {Promise} Animation completion promise
   */
  playAnimation(id) {
    const animation = this.animations.get(id);
    if (!animation) {
      return Promise.reject(new Error(`Animation not found: ${id}`));
    }
    
    // Check motion preferences
    if (!this.respectsMotion && animation.config.respectsMotion) {
      // Skip animation but resolve immediately
      animation.state = this.ANIMATION_STATES.COMPLETED;
      return Promise.resolve();
    }
    
    // Check performance and queue if necessary
    if (!this.isPerformanceOptimal && animation.config.priority === 'low') {
      return this.queueAnimation(id);
    }
    
    return this.executeAnimation(animation);
  }
  
  /**
   * Execute an animation
   * @param {Object} animation - Animation data
   * @returns {Promise} Animation completion promise
   */
  executeAnimation(animation) {
    return new Promise((resolve, reject) => {
      const { element, config } = animation;
      
      // Update animation state
      animation.state = this.ANIMATION_STATES.RUNNING;
      animation.startTime = performance.now();
      this.activeAnimations.add(animation.id);
      
      // Call onStart callback
      if (config.onStart) {
        config.onStart(animation);
      }
      
      // Create Web Animation API animation for better control
      const keyframes = this.createKeyframes(config.properties);
      const options = {
        duration: config.duration,
        easing: config.easing,
        delay: config.delay,
        iterations: config.iterations,
        fill: config.fill
      };
      
      try {
        animation.webAnimation = element.animate(keyframes, options);
        
        animation.webAnimation.addEventListener('finish', () => {
          this.completeAnimation(animation, resolve);
        });
        
        animation.webAnimation.addEventListener('cancel', () => {
          this.cancelAnimation(animation, reject);
        });
        
      } catch (error) {
        // Fallback to CSS transitions
        console.warn('Web Animations API failed, falling back to CSS:', error);
        this.fallbackToCSSAnimation(animation, resolve, reject);
      }
    });
  }
  
  /**
   * Create keyframes from properties
   * @param {Object} properties - Animation properties
   * @returns {Array} Keyframes array
   */
  createKeyframes(properties) {
    const keyframes = [{}, {}];
    
    Object.keys(properties).forEach(prop => {
      keyframes[1][prop] = properties[prop];
    });
    
    return keyframes;
  }
  
  /**
   * Fallback to CSS animation
   * @param {Object} animation - Animation data
   * @param {Function} resolve - Promise resolve
   * @param {Function} reject - Promise reject
   */
  fallbackToCSSAnimation(animation, resolve, reject) {
    const { element, config } = animation;
    
    // Apply CSS transition
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    // Apply properties
    Object.keys(config.properties).forEach(prop => {
      element.style[prop] = config.properties[prop];
    });
    
    // Complete after duration
    setTimeout(() => {
      this.completeAnimation(animation, resolve);
    }, config.duration + config.delay);
  }
  
  /**
   * Complete an animation
   * @param {Object} animation - Animation data
   * @param {Function} resolve - Promise resolve
   */
  completeAnimation(animation, resolve) {
    animation.state = this.ANIMATION_STATES.COMPLETED;
    animation.endTime = performance.now();
    this.activeAnimations.delete(animation.id);
    
    // Remove will-change hint
    this.removeWillChangeHint(animation.element);
    
    // Call onComplete callback
    if (animation.config.onComplete) {
      animation.config.onComplete(animation);
    }
    
    resolve(animation);
  }
  
  /**
   * Cancel an animation
   * @param {Object} animation - Animation data
   * @param {Function} reject - Promise reject
   */
  cancelAnimation(animation, reject) {
    animation.state = this.ANIMATION_STATES.CANCELLED;
    this.activeAnimations.delete(animation.id);
    
    // Remove will-change hint
    this.removeWillChangeHint(animation.element);
    
    // Call onCancel callback
    if (animation.config.onCancel) {
      animation.config.onCancel(animation);
    }
    
    reject(new Error(`Animation cancelled: ${animation.id}`));
  }
  
  /**
   * Queue an animation for later execution
   * @param {string} id - Animation ID
   * @returns {Promise} Animation completion promise
   */
  queueAnimation(id) {
    const animation = this.animations.get(id);
    if (!animation) {
      return Promise.reject(new Error(`Animation not found: ${id}`));
    }
    
    animation.state = this.ANIMATION_STATES.QUEUED;
    
    return new Promise((resolve, reject) => {
      this.animationQueue.push({
        ...animation,
        resolve,
        reject
      });
    });
  }
  
  /**
   * Pause an animation by ID
   * @param {string} id - Animation ID
   */
  pauseAnimation(id) {
    const animation = this.animations.get(id);
    if (animation && animation.webAnimation) {
      animation.webAnimation.pause();
      animation.state = this.ANIMATION_STATES.PAUSED;
    }
  }
  
  /**
   * Resume a paused animation
   * @param {string} id - Animation ID
   */
  resumeAnimation(id) {
    const animation = this.animations.get(id);
    if (animation && animation.webAnimation && animation.state === this.ANIMATION_STATES.PAUSED) {
      animation.webAnimation.play();
      animation.state = this.ANIMATION_STATES.RUNNING;
    }
  }
  
  /**
   * Cancel an animation by ID
   * @param {string} id - Animation ID
   */
  cancelAnimationById(id) {
    const animation = this.animations.get(id);
    if (animation && animation.webAnimation) {
      animation.webAnimation.cancel();
    }
  }
  
  /**
   * Get animation state
   * @param {string} id - Animation ID
   * @returns {string} Animation state
   */
  getAnimationState(id) {
    const animation = this.animations.get(id);
    return animation ? animation.state : null;
  }
  
  /**
   * Get current frame rate
   * @returns {number} Current FPS
   */
  getFrameRate() {
    return this.frameRate;
  }
  
  /**
   * Check if performance is optimal
   * @returns {boolean} Performance status
   */
  isPerformanceOptimal() {
    return this.isPerformanceOptimal;
  }
  
  /**
   * Get performance metrics
   * @returns {Object} Performance data
   */
  getPerformanceMetrics() {
    const avgFps = this.performanceHistory.length > 0 
      ? this.performanceHistory.reduce((sum, entry) => sum + entry.fps, 0) / this.performanceHistory.length
      : this.frameRate;
    
    return {
      currentFPS: this.frameRate,
      averageFPS: Math.round(avgFps),
      isOptimal: this.isPerformanceOptimal,
      activeAnimations: this.activeAnimations.size,
      queuedAnimations: this.animationQueue.length,
      totalRegistered: this.animations.size,
      performanceHistory: this.performanceHistory.slice(-10) // Last 10 entries
    };
  }
  
  /**
   * Destroy the animation engine and clean up resources
   */
  destroy() {
    // Cancel all active animations
    this.activeAnimations.forEach(animationId => {
      this.cancelAnimationById(animationId);
    });
    
    // Clean up observers
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    
    Object.values(this.observers).forEach(observer => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
    
    // Remove particles
    this.clearParticles();
    
    // Clear all data structures
    this.animations.clear();
    this.activeAnimations.clear();
    this.animationQueue = [];
    this.observers.clear();
    this.performanceHistory = [];
    
    // Remove will-change hints from all elements
    document.querySelectorAll('[style*="will-change"]').forEach(element => {
      this.removeWillChangeHint(element);
    });
    
    console.log('🎬 Enhanced Animation Engine destroyed and cleaned up');
  }
  
  /**
   * Get debug information for development
   * @returns {Object} Debug information
   */
  getDebugInfo() {
    return {
      animations: Array.from(this.animations.entries()).map(([id, anim]) => ({
        id,
        state: anim.state,
        element: anim.element.tagName + (anim.element.id ? `#${anim.element.id}` : ''),
        duration: anim.config.duration,
        priority: anim.config.priority
      })),
      performance: this.getPerformanceMetrics(),
      particles: this.particles.length,
      motionRespected: this.respectsMotion,
      gpuAcceleration: this.gpuAcceleration.enabled
    };
  }
}

// Smooth scroll implementation
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          this.scrollTo(targetElement);
        }
      });
    });
  }
  
  scrollTo(element) {
    const targetPosition = element.offsetTop - 80; // Account for fixed nav
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;
    
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }
  
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// Expose AnimationEngine class globally for testing and manual initialization
window.AnimationEngine = AnimationEngine;
window.SmoothScroll = SmoothScroll;

// Initialize animation engine immediately when script loads
(function initializeAnimationEngine() {
  try {
    // Initialize the engine immediately
    window.animationEngine = new AnimationEngine();
    console.log('🎬 Animation Engine initialized immediately');
    
    // Initialize smooth scroll
    window.smoothScroll = new SmoothScroll();
    console.log('📜 Smooth Scroll initialized');
    
  } catch (error) {
    console.error('Failed to initialize animation systems:', error);
    
    // Fallback: try again when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (!window.animationEngine) {
          try {
            window.animationEngine = new AnimationEngine();
            window.smoothScroll = new SmoothScroll();
            console.log('🎬 Animation Engine initialized on DOM ready (fallback)');
          } catch (fallbackError) {
            console.error('Fallback initialization also failed:', fallbackError);
          }
        }
      });
    }
  }
})();

// Additional initialization when DOM is ready for DOM-dependent features
document.addEventListener('DOMContentLoaded', () => {
  // Ensure animation engine is available
  if (!window.animationEngine) {
    console.warn('Animation engine not available, attempting final initialization...');
    try {
      window.animationEngine = new AnimationEngine();
    } catch (error) {
      console.error('Final animation engine initialization failed:', error);
    }
  }
  
  // Expose enhanced debugging tools in development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.hostname === '') {
    
    window.debugAnimations = () => {
      console.log('🎬 Animation Engine Debug Info:', window.animationEngine.getDebugInfo());
    };
    
    window.animationPerformance = () => {
      console.log('📊 Performance Metrics:', window.animationEngine.getPerformanceMetrics());
    };
    
    window.testAnimation = (selector = '.hero-title', duration = 1000) => {
      const id = window.animationEngine.registerAnimation(selector, {
        duration,
        properties: {
          transform: 'translateY(-20px) scale(1.05)',
          opacity: '0.8'
        },
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        onStart: (anim) => console.log('Animation started:', anim.id),
        onComplete: (anim) => console.log('Animation completed:', anim.id)
      });
      
      if (id) {
        window.animationEngine.playAnimation(id)
          .then(() => console.log('Test animation finished'))
          .catch(err => console.error('Test animation failed:', err));
      }
      
      return id;
    };
    
    // Log initialization
    console.log('🎬 Enhanced Animation Engine initialized with debugging tools');
    console.log('Available debug commands: debugAnimations(), animationPerformance(), testAnimation()');
  }
});