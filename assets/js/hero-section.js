/**
 * Premium Hero Section with Storytelling and Animations
 * Handles typewriter effects, particle system, and cursor interactions
 */

class HeroSection {
  constructor() {
    this.heroElement = document.querySelector('.hero-section');
    this.typewriterElements = [];
    this.particles = [];
    this.animationTimeline = null;
    this.isVisible = false;
    
    // Performance settings
    this.respectsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isHighPerformance = navigator.hardwareConcurrency > 4 && navigator.deviceMemory > 4;
    
    this.init();
  }
  
  init() {
    if (!this.heroElement) return;
    
    this.createParticleSystem();
    this.setupTypewriter();
    this.bindScrollEffects();
    this.initCursorInteractions();
    this.startAnimationSequence();
    
    console.log('🚀 Hero Section initialized');
  }
  
  createParticleSystem() {
    if (!this.respectsMotion || !this.isHighPerformance) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    particleContainer.innerHTML = `
      <canvas class="particle-canvas" width="1920" height="1080"></canvas>
    `;
    
    this.heroElement.appendChild(particleContainer);
    
    this.canvas = particleContainer.querySelector('.particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    this.initParticles();
    this.animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  initParticles() {
    const particleCount = this.isHighPerformance ? 80 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#00d4ff' : '#4dd0e1'
      });
    }
  }
  
  animateParticles() {
    if (!this.ctx || !this.respectsMotion) return;
    
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fill();
      });
      
      // Connect nearby particles
      this.connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  connectParticles() {
    const maxDistance = 100;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance * 0.2;
          
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = '#00d4ff';
          this.ctx.globalAlpha = opacity;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
  
  setupTypewriter() {
    const typewriterConfig = [
      {
        element: '.hero-greeting',
        text: 'Hello, I\'m',
        delay: 500,
        speed: 80
      },
      {
        element: '.hero-title',
        text: 'Pratiksha Pandey',
        delay: 1200,
        speed: 100,
        highlight: 'Pandey'
      },
      {
        element: '.hero-subtitle',
        text: 'Turning curiosity into code, one problem at a time',
        delay: 2500,
        speed: 60
      },
      {
        element: '.hero-description',
        text: 'Every bug is a puzzle waiting to be solved. Every feature is a story waiting to be told. I craft digital experiences that bridge the gap between human needs and technological possibilities.',
        delay: 4000,
        speed: 40
      }
    ];
    
    typewriterConfig.forEach(config => {
      const element = document.querySelector(config.element);
      if (element) {
        this.typewriterElements.push({ element, config });
      }
    });
  }
  
  startAnimationSequence() {
    // Initial state - hide all elements
    this.typewriterElements.forEach(({ element }) => {
      element.style.opacity = '0';
    });
    
    const actionsElement = document.querySelector('.hero-actions');
    if (actionsElement) {
      actionsElement.style.opacity = '0';
      actionsElement.style.transform = 'translateY(30px)';
    }
    
    // Start typewriter sequence
    this.typewriterElements.forEach(({ element, config }, index) => {
      setTimeout(() => {
        this.typewriterEffect(element, config);
      }, config.delay);
    });
    
    // Show actions after all text is typed
    setTimeout(() => {
      if (actionsElement) {
        actionsElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        actionsElement.style.opacity = '1';
        actionsElement.style.transform = 'translateY(0)';
      }
    }, 6000);
  }
  
  typewriterEffect(element, config) {
    if (!this.respectsMotion) {
      element.textContent = config.text;
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '1';
    element.textContent = '';
    
    let i = 0;
    const text = config.text;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        
        // Add cursor effect
        if (i < text.length) {
          element.textContent += '|';
          setTimeout(() => {
            element.textContent = element.textContent.slice(0, -1);
          }, config.speed / 2);
        }
        
        setTimeout(type, config.speed);
      } else {
        // Apply highlight if specified
        if (config.highlight) {
          this.applyHighlight(element, config.highlight);
        }
      }
    };
    
    type();
  }
  
  applyHighlight(element, highlightText) {
    const text = element.textContent;
    const highlightIndex = text.indexOf(highlightText);
    
    if (highlightIndex !== -1) {
      const beforeHighlight = text.substring(0, highlightIndex);
      const highlighted = text.substring(highlightIndex, highlightIndex + highlightText.length);
      const afterHighlight = text.substring(highlightIndex + highlightText.length);
      
      element.innerHTML = `${beforeHighlight}<span class="highlight">${highlighted}</span>${afterHighlight}`;
    }
  }
  
  bindScrollEffects() {
    if (!this.respectsMotion) return;
    
    // Parallax effect
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      if (this.heroElement) {
        this.heroElement.style.transform = `translateY(${rate}px)`;
      }
      
      // Fade out hero content on scroll
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.8));
        heroContent.style.opacity = opacity;
      }
    }, { passive: true });
  }
  
  initCursorInteractions() {
    // Enhanced cursor interactions for hero elements
    const interactiveElements = this.heroElement.querySelectorAll('.btn, .hero-title, .highlight');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (window.cursorSystem) {
          if (element.classList.contains('btn')) {
            window.cursorSystem.setCursorState('hover');
          } else {
            // Special cursor for text elements
            element.style.cursor = 'none';
          }
        }
      });
      
      element.addEventListener('mouseleave', () => {
        if (window.cursorSystem) {
          window.cursorSystem.setCursorState('default');
        }
      });
    });
    
    // Magnetic effect for CTA buttons
    const ctaButtons = this.heroElement.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        if (!this.respectsMotion) return;
        
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }
  
  // Public methods
  playIntroAnimation() {
    this.startAnimationSequence();
  }
  
  pauseAnimations() {
    this.respectsMotion = false;
  }
  
  resumeAnimations() {
    this.respectsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  getPerformanceStats() {
    return {
      particleCount: this.particles.length,
      isHighPerformance: this.isHighPerformance,
      respectsMotion: this.respectsMotion,
      typewriterElements: this.typewriterElements.length
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.heroSection = new HeroSection();
  
  // Expose for debugging
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugHero = () => {
      console.log('Hero Performance Stats:', window.heroSection.getPerformanceStats());
    };
  }
});