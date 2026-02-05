/**
 * Interactive Skills Display System
 * Provides enhanced skill visualization with proficiency indicators,
 * detailed information reveals, and smooth category transitions
 */

class InteractiveSkillsSystem {
  constructor() {
    this.skillsData = this.initializeSkillsData();
    this.currentFilter = 'all';
    this.animationQueue = [];
    this.isAnimating = false;
    
    this.init();
  }

  initializeSkillsData() {
    return {
      'programming': {
        title: 'Programming Languages',
        icon: 'fas fa-code',
        skills: [
          {
            name: 'Python',
            level: 85,
            experience: '3+ years',
            projects: 8,
            description: 'Advanced proficiency in Python for backend development, data analysis, and machine learning applications.',
            highlights: ['Django/Flask', 'Data Science', 'API Development', 'Automation Scripts'],
            certifications: ['Python Institute PCAP'],
            recentWork: 'Built AI-powered resume parser with 95% accuracy'
          },
          {
            name: 'Java',
            level: 90,
            experience: '4+ years',
            projects: 12,
            description: 'Expert-level Java development with strong foundation in OOP principles and enterprise applications.',
            highlights: ['Spring Framework', 'Microservices', 'JUnit Testing', 'Maven/Gradle'],
            certifications: ['Oracle Java SE 11 Developer'],
            recentWork: 'Architected scalable microservices handling 10k+ requests/min'
          },
          {
            name: 'JavaScript',
            level: 88,
            experience: '3+ years',
            projects: 15,
            description: 'Full-stack JavaScript development with modern ES6+ features and asynchronous programming.',
            highlights: ['ES6+', 'Async/Await', 'DOM Manipulation', 'Node.js'],
            certifications: ['JavaScript Algorithms and Data Structures'],
            recentWork: 'Developed real-time chat application with Socket.io'
          },
          {
            name: 'HTML5',
            level: 92,
            experience: '4+ years',
            projects: 20,
            description: 'Semantic HTML5 with accessibility best practices and modern web standards.',
            highlights: ['Semantic Elements', 'Accessibility', 'SEO Optimization', 'Progressive Web Apps'],
            certifications: ['W3C HTML5 Certification'],
            recentWork: 'Created accessible portfolio with 100% Lighthouse accessibility score'
          },
          {
            name: 'CSS3',
            level: 90,
            experience: '4+ years',
            projects: 18,
            description: 'Advanced CSS3 with modern layout techniques, animations, and responsive design.',
            highlights: ['Flexbox/Grid', 'Animations', 'Responsive Design', 'CSS Variables'],
            certifications: ['Advanced CSS and Sass'],
            recentWork: 'Designed premium dark theme with smooth animations'
          }
        ]
      },
      'frameworks': {
        title: 'Frameworks & Libraries',
        icon: 'fas fa-layer-group',
        skills: [
          {
            name: 'React.js',
            level: 85,
            experience: '2+ years',
            projects: 10,
            description: 'Component-based development with hooks, context API, and modern React patterns.',
            highlights: ['Hooks', 'Context API', 'Redux', 'React Router'],
            certifications: ['React Developer Certification'],
            recentWork: 'Built dynamic expense tracker with real-time updates'
          },
          {
            name: 'Node.js',
            level: 80,
            experience: '2+ years',
            projects: 8,
            description: 'Server-side JavaScript development with Express.js and RESTful API design.',
            highlights: ['Express.js', 'RESTful APIs', 'Middleware', 'Authentication'],
            certifications: ['Node.js Application Development'],
            recentWork: 'Developed scalable backend for resume parsing system'
          },
          {
            name: 'Tailwind CSS',
            level: 82,
            experience: '1+ years',
            projects: 6,
            description: 'Utility-first CSS framework for rapid UI development and consistent design systems.',
            highlights: ['Utility Classes', 'Custom Components', 'Responsive Design', 'Dark Mode'],
            certifications: ['Tailwind CSS Mastery'],
            recentWork: 'Implemented responsive design system with custom components'
          },
          {
            name: 'Material UI',
            level: 78,
            experience: '1+ years',
            projects: 5,
            description: 'React component library implementation with custom theming and accessibility.',
            highlights: ['Component Customization', 'Theming', 'Responsive Grid', 'Icons'],
            certifications: ['Material Design Principles'],
            recentWork: 'Created consistent UI components for enterprise application'
          },
          {
            name: 'Socket.io',
            level: 75,
            experience: '1+ years',
            projects: 3,
            description: 'Real-time bidirectional communication for interactive web applications.',
            highlights: ['Real-time Events', 'Room Management', 'Broadcasting', 'Error Handling'],
            certifications: ['Real-time Web Development'],
            recentWork: 'Implemented live chat with typing indicators and file sharing'
          }
        ]
      },
      'databases': {
        title: 'Databases & Storage',
        icon: 'fas fa-database',
        skills: [
          {
            name: 'MongoDB',
            level: 85,
            experience: '2+ years',
            projects: 8,
            description: 'NoSQL database design with aggregation pipelines and performance optimization.',
            highlights: ['Aggregation', 'Indexing', 'Mongoose ODM', 'Atlas Cloud'],
            certifications: ['MongoDB Developer Path'],
            recentWork: 'Optimized queries reducing response time by 60%'
          },
          {
            name: 'MySQL',
            level: 88,
            experience: '3+ years',
            projects: 10,
            description: 'Relational database design with complex queries and performance tuning.',
            highlights: ['Query Optimization', 'Stored Procedures', 'Indexing', 'Normalization'],
            certifications: ['MySQL Database Administration'],
            recentWork: 'Designed normalized schema for expense tracking system'
          },
          {
            name: 'PostgreSQL',
            level: 75,
            experience: '1+ years',
            projects: 4,
            description: 'Advanced relational database with JSON support and complex data types.',
            highlights: ['JSONB', 'Advanced Queries', 'Extensions', 'Performance Tuning'],
            certifications: ['PostgreSQL Administration'],
            recentWork: 'Migrated legacy system to PostgreSQL with zero downtime'
          }
        ]
      },
      'tools': {
        title: 'Tools & Technologies',
        icon: 'fas fa-tools',
        skills: [
          {
            name: 'Git',
            level: 90,
            experience: '4+ years',
            projects: 25,
            description: 'Version control mastery with branching strategies and collaborative workflows.',
            highlights: ['Branching Strategies', 'Merge Conflicts', 'Git Flow', 'GitHub Actions'],
            certifications: ['Git Version Control'],
            recentWork: 'Implemented GitFlow for team of 8 developers'
          },
          {
            name: 'AWS',
            level: 75,
            experience: '1+ years',
            projects: 5,
            description: 'Cloud infrastructure deployment with EC2, S3, and serverless architectures.',
            highlights: ['EC2', 'S3', 'Lambda', 'CloudFormation'],
            certifications: ['AWS Cloud Practitioner'],
            recentWork: 'Deployed scalable web application on AWS with auto-scaling'
          },
          {
            name: 'Docker',
            level: 70,
            experience: '1+ years',
            projects: 4,
            description: 'Containerization for consistent development and deployment environments.',
            highlights: ['Containerization', 'Docker Compose', 'Multi-stage Builds', 'Optimization'],
            certifications: ['Docker Certified Associate'],
            recentWork: 'Containerized full-stack application reducing deployment time by 70%'
          },
          {
            name: 'DevOps',
            level: 65,
            experience: '6 months',
            projects: 2,
            description: 'Currently focusing on CI/CD pipelines and infrastructure automation.',
            highlights: ['CI/CD', 'Infrastructure as Code', 'Monitoring', 'Automation'],
            certifications: ['DevOps Foundation (In Progress)'],
            recentWork: 'Setting up automated deployment pipeline with GitHub Actions',
            isCurrentFocus: true
          }
        ]
      }
    };
  }

  init() {
    this.createSkillsInterface();
    this.bindEvents();
    this.initializeAnimations();
  }

  createSkillsInterface() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const container = skillsSection.querySelector('.container');
    if (!container) return;

    // Create enhanced skills interface
    const skillsInterface = this.createSkillsHTML();
    
    // Replace existing skills grid
    const existingGrid = container.querySelector('.skills-grid');
    if (existingGrid) {
      existingGrid.replaceWith(skillsInterface);
    } else {
      container.appendChild(skillsInterface);
    }
  }

  createSkillsHTML() {
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'interactive-skills-container';
    
    // Create filter tabs
    const filterTabs = this.createFilterTabs();
    skillsContainer.appendChild(filterTabs);
    
    // Create skills grid
    const skillsGrid = this.createSkillsGrid();
    skillsContainer.appendChild(skillsGrid);
    
    // Create skill detail modal
    const skillModal = this.createSkillModal();
    skillsContainer.appendChild(skillModal);
    
    return skillsContainer;
  }

  createFilterTabs() {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'skills-filter-tabs';
    
    const filters = [
      { key: 'all', label: 'All Skills', icon: 'fas fa-th' },
      { key: 'programming', label: 'Programming', icon: 'fas fa-code' },
      { key: 'frameworks', label: 'Frameworks', icon: 'fas fa-layer-group' },
      { key: 'databases', label: 'Databases', icon: 'fas fa-database' },
      { key: 'tools', label: 'Tools', icon: 'fas fa-tools' }
    ];
    
    filters.forEach(filter => {
      const tab = document.createElement('button');
      tab.className = `filter-tab ${filter.key === 'all' ? 'active' : ''}`;
      tab.dataset.filter = filter.key;
      tab.innerHTML = `
        <i class="${filter.icon}" aria-hidden="true"></i>
        <span>${filter.label}</span>
      `;
      tab.setAttribute('aria-label', `Filter by ${filter.label}`);
      tabsContainer.appendChild(tab);
    });
    
    return tabsContainer;
  }

  createSkillsGrid() {
    const grid = document.createElement('div');
    grid.className = 'enhanced-skills-grid';
    
    Object.entries(this.skillsData).forEach(([categoryKey, category]) => {
      const categoryElement = this.createSkillCategory(categoryKey, category);
      grid.appendChild(categoryElement);
    });
    
    return grid;
  }

  createSkillCategory(categoryKey, category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = `skill-category enhanced-category`;
    categoryDiv.dataset.category = categoryKey;
    
    categoryDiv.innerHTML = `
      <div class="category-header">
        <div class="category-title">
          <i class="${category.icon} category-icon" aria-hidden="true"></i>
          <h3>${category.title}</h3>
        </div>
        <div class="category-stats">
          <span class="skill-count">${category.skills.length} skills</span>
          <span class="avg-proficiency">${this.calculateAverageProficiency(category.skills)}% avg</span>
        </div>
      </div>
      <div class="skills-showcase">
        ${category.skills.map(skill => this.createSkillCard(skill, categoryKey)).join('')}
      </div>
    `;
    
    return categoryDiv;
  }

  createSkillCard(skill, categoryKey) {
    const proficiencyColor = this.getProficiencyColor(skill.level);
    const proficiencyLabel = this.getProficiencyLabel(skill.level);
    
    return `
      <div class="enhanced-skill-card ${skill.isCurrentFocus ? 'current-focus' : ''}" 
           data-skill="${skill.name}" 
           data-category="${categoryKey}"
           tabindex="0" 
           role="button" 
           aria-label="View details for ${skill.name}">
        
        <div class="skill-header">
          <div class="skill-icon-container">
            ${this.getSkillIcon(skill.name)}
            ${skill.isCurrentFocus ? '<div class="focus-indicator">Currently Focusing</div>' : ''}
          </div>
          <div class="skill-info">
            <h4 class="skill-name">${skill.name}</h4>
            <span class="skill-experience">${skill.experience}</span>
          </div>
        </div>
        
        <div class="proficiency-display">
          <div class="proficiency-visual">
            <div class="circular-progress" data-level="${skill.level}">
              <svg class="progress-ring" width="60" height="60">
                <circle class="progress-ring-background" cx="30" cy="30" r="25"></circle>
                <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                        style="--progress: ${skill.level}; --color: ${proficiencyColor}"></circle>
              </svg>
              <div class="progress-text">
                <span class="progress-percentage">${skill.level}%</span>
                <span class="progress-label">${proficiencyLabel}</span>
              </div>
            </div>
          </div>
          
          <div class="skill-metrics">
            <div class="metric">
              <i class="fas fa-project-diagram metric-icon" aria-hidden="true"></i>
              <span class="metric-value">${skill.projects}</span>
              <span class="metric-label">Projects</span>
            </div>
            <div class="metric">
              <i class="fas fa-certificate metric-icon" aria-hidden="true"></i>
              <span class="metric-value">${skill.certifications.length}</span>
              <span class="metric-label">Certs</span>
            </div>
          </div>
        </div>
        
        <div class="skill-preview">
          <p class="skill-description">${skill.description.substring(0, 100)}...</p>
          <div class="skill-highlights">
            ${skill.highlights.slice(0, 3).map(highlight => 
              `<span class="highlight-tag">${highlight}</span>`
            ).join('')}
          </div>
        </div>
        
        <div class="skill-actions">
          <button class="view-details-btn" aria-label="View full details for ${skill.name}">
            <i class="fas fa-info-circle" aria-hidden="true"></i>
            <span>View Details</span>
          </button>
        </div>
      </div>
    `;
  }

  createSkillModal() {
    const modal = document.createElement('div');
    modal.className = 'skill-detail-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"></h3>
          <button class="modal-close" aria-label="Close skill details">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- Content will be populated dynamically -->
        </div>
      </div>
    `;
    return modal;
  }

  bindEvents() {
    // Filter tab events
    document.addEventListener('click', (e) => {
      if (e.target.closest('.filter-tab')) {
        this.handleFilterChange(e.target.closest('.filter-tab'));
      }
      
      if (e.target.closest('.enhanced-skill-card')) {
        this.handleSkillCardClick(e.target.closest('.enhanced-skill-card'));
      }
      
      if (e.target.closest('.view-details-btn')) {
        e.stopPropagation();
        this.showSkillDetails(e.target.closest('.enhanced-skill-card'));
      }
      
      if (e.target.closest('.modal-close') || e.target.closest('.modal-overlay')) {
        this.hideSkillDetails();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.enhanced-skill-card') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.handleSkillCardClick(e.target.closest('.enhanced-skill-card'));
      }
      
      if (e.key === 'Escape') {
        this.hideSkillDetails();
      }
    });

    // Hover effects
    document.addEventListener('mouseenter', (e) => {
      if (e.target.closest('.enhanced-skill-card')) {
        this.handleSkillHover(e.target.closest('.enhanced-skill-card'), true);
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.enhanced-skill-card')) {
        this.handleSkillHover(e.target.closest('.enhanced-skill-card'), false);
      }
    }, true);
  }

  handleFilterChange(tab) {
    const filter = tab.dataset.filter;
    if (filter === this.currentFilter) return;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    this.currentFilter = filter;
    this.animateFilterTransition(filter);
  }

  animateFilterTransition(filter) {
    const categories = document.querySelectorAll('.skill-category');
    const skillCards = document.querySelectorAll('.enhanced-skill-card');
    
    // Enhanced exit animation with improved staggered timing
    let exitDelay = 0;
    categories.forEach((category, categoryIndex) => {
      const categoryCards = category.querySelectorAll('.enhanced-skill-card');
      
      categoryCards.forEach((card, cardIndex) => {
        setTimeout(() => {
          // Enhanced exit animation with rotation and scale
          card.style.opacity = '0';
          card.style.transform = 'translateY(-30px) scale(0.85) rotateX(15deg)';
          card.style.filter = 'blur(2px)';
          card.dataset.animationState = 'exiting';
          
          // Add exit ripple effect
          this.createExitRipple(card);
        }, exitDelay);
        
        exitDelay += 40; // Faster staggering for smoother exit
      });
    });
    
    // Wait for exit animations to complete, then show filtered content
    setTimeout(() => {
      let visibleCardIndex = 0;
      let categoryEntranceDelay = 0;
      
      categories.forEach((category, categoryIndex) => {
        const shouldShow = filter === 'all' || category.dataset.category === filter;
        
        if (shouldShow) {
          category.style.display = 'block';
          category.dataset.filterState = 'entering';
          
          // Animate category header first
          setTimeout(() => {
            const categoryHeader = category.querySelector('.category-header');
            if (categoryHeader) {
              categoryHeader.style.opacity = '1';
              categoryHeader.style.transform = 'translateY(0) scale(1)';
            }
          }, categoryEntranceDelay);
          
          // Enhanced entrance animation with progressive reveal
          const categoryCards = category.querySelectorAll('.enhanced-skill-card');
          categoryCards.forEach((card, cardIndex) => {
            const cardDelay = categoryEntranceDelay + 200 + (cardIndex * 80);
            
            setTimeout(() => {
              // Reset filters and prepare for entrance
              card.style.filter = '';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              card.dataset.animationState = 'visible';
              
              // Trigger enhanced progress ring animation
              this.animateProgressRingEnhanced(card);
              
              // Add entrance bounce with overshoot
              setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1.05) rotateX(-2deg)';
                setTimeout(() => {
                  card.style.transform = 'translateY(2px) scale(0.98)';
                  setTimeout(() => {
                    card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                  }, 100);
                }, 150);
              }, 100);
              
              // Add entrance glow effect
              this.createEntranceGlow(card);
              
            }, cardDelay);
            
            visibleCardIndex++;
          });
          
          categoryEntranceDelay += 300; // Stagger category entrances
        } else {
          category.style.display = 'none';
          category.dataset.filterState = 'hidden';
        }
      });
      
      // Add filter change completion callback
      this.onFilterTransitionComplete(filter);
      
    }, Math.max(500, exitDelay + 100)); // Dynamic wait time based on exit animations
  }

  handleSkillCardClick(card) {
    // Add click animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
    
    this.showSkillDetails(card);
  }

  handleSkillHover(card, isEntering) {
    const progressRing = card.querySelector('.progress-ring-progress');
    const metrics = card.querySelector('.skill-metrics');
    const skillIcon = card.querySelector('.skill-tech-icon');
    const highlights = card.querySelector('.skill-highlights');
    const proficiencyDisplay = card.querySelector('.proficiency-display');
    const skillHeader = card.querySelector('.skill-header');
    const skillPreview = card.querySelector('.skill-preview');
    
    if (isEntering) {
      // Enhanced hover entrance animations with rich visual feedback
      card.style.transform = 'translateY(-12px) scale(1.03)';
      card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.25), 0 0 20px rgba(0, 212, 255, 0.1)';
      card.style.borderColor = 'var(--color-electric-blue)';
      
      // Add animated border gradient
      card.style.background = 'linear-gradient(135deg, var(--color-warm-slate), rgba(0, 212, 255, 0.05))';
      
      // Enhanced progress ring animation with pulsing effect
      if (progressRing) {
        progressRing.style.strokeDashoffset = '0';
        progressRing.style.filter = 'drop-shadow(0 0 12px var(--color-electric-blue))';
        progressRing.style.strokeWidth = '4';
        progressRing.style.animation = 'progressPulse 2s ease-in-out infinite';
      }
      
      // Enhanced metrics animation with individual timing
      if (metrics) {
        metrics.style.opacity = '1';
        metrics.style.transform = 'translateY(0) scale(1.08)';
        
        // Animate individual metric items
        const metricItems = metrics.querySelectorAll('.metric');
        metricItems.forEach((metric, index) => {
          setTimeout(() => {
            metric.style.transform = 'translateY(-3px) scale(1.1)';
            metric.style.background = 'rgba(0, 212, 255, 0.1)';
            metric.style.borderRadius = 'var(--radius-sm)';
          }, index * 100);
        });
      }
      
      // Enhanced icon animation with 3D rotation and glow
      if (skillIcon) {
        skillIcon.style.transform = 'scale(1.2) rotateY(15deg) rotateX(5deg)';
        skillIcon.style.filter = 'drop-shadow(0 0 15px var(--color-soft-cyan)) brightness(1.2)';
        skillIcon.style.animation = 'iconFloat 3s ease-in-out infinite';
      }
      
      // Enhanced highlight tags animation with wave effect
      if (highlights) {
        const tags = highlights.querySelectorAll('.highlight-tag');
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = 'translateY(-4px) scale(1.08) rotateX(5deg)';
            tag.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
            tag.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(77, 208, 225, 0.15))';
            tag.style.borderColor = 'var(--color-soft-cyan)';
          }, index * 80);
        });
      }
      
      // Enhanced proficiency display with animated text
      if (proficiencyDisplay) {
        const progressText = proficiencyDisplay.querySelector('.progress-text');
        if (progressText) {
          progressText.style.transform = 'scale(1.15)';
          progressText.style.color = 'var(--color-electric-blue)';
          progressText.style.textShadow = '0 0 10px var(--color-electric-blue)';
          progressText.style.animation = 'textGlow 2s ease-in-out infinite alternate';
        }
      }
      
      // Animate skill header with subtle lift
      if (skillHeader) {
        skillHeader.style.transform = 'translateY(-2px)';
        skillHeader.style.filter = 'brightness(1.1)';
      }
      
      // Animate skill preview with enhanced visibility
      if (skillPreview) {
        skillPreview.style.opacity = '1';
        skillPreview.style.transform = 'translateY(-2px)';
        skillPreview.style.filter = 'brightness(1.05)';
      }
      
      // Add enhanced ripple effect with multiple waves
      this.createEnhancedRippleEffect(card);
      
      // Add particle effect for premium feel
      this.createHoverParticles(card);
      
    } else {
      // Enhanced hover exit animations with smooth transitions
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
      card.style.borderColor = 'transparent';
      card.style.background = 'var(--color-warm-slate)';
      
      // Reset progress ring with smooth transition
      if (progressRing) {
        // Get skill level from the card's data attribute or closest skill item
        const skillItem = card.closest('[data-skill]') || card.querySelector('[data-skill]');
        const level = parseInt(skillItem?.dataset.skill) || 0;
        const circumference = 2 * Math.PI * 25;
        const offset = circumference - (level / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
        progressRing.style.filter = '';
        progressRing.style.strokeWidth = '3';
        progressRing.style.animation = '';
      }
      
      // Reset metrics with staggered timing
      if (metrics) {
        metrics.style.opacity = '0.7';
        metrics.style.transform = 'translateY(10px) scale(1)';
        
        const metricItems = metrics.querySelectorAll('.metric');
        metricItems.forEach((metric, index) => {
          setTimeout(() => {
            metric.style.transform = 'translateY(0) scale(1)';
            metric.style.background = '';
            metric.style.borderRadius = '';
          }, index * 50);
        });
      }
      
      // Reset icon with smooth transition
      if (skillIcon) {
        skillIcon.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
        skillIcon.style.filter = '';
        skillIcon.style.animation = '';
      }
      
      // Reset highlight tags with wave effect
      if (highlights) {
        const tags = highlights.querySelectorAll('.highlight-tag');
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            tag.style.boxShadow = '';
            tag.style.background = 'rgba(0, 212, 255, 0.1)';
            tag.style.borderColor = 'rgba(0, 212, 255, 0.2)';
          }, index * 40);
        });
      }
      
      // Reset proficiency display
      if (proficiencyDisplay) {
        const progressText = proficiencyDisplay.querySelector('.progress-text');
        if (progressText) {
          progressText.style.transform = 'scale(1)';
          progressText.style.color = '';
          progressText.style.textShadow = '';
          progressText.style.animation = '';
        }
      }
      
      // Reset skill header
      if (skillHeader) {
        skillHeader.style.transform = 'translateY(0)';
        skillHeader.style.filter = '';
      }
      
      // Reset skill preview
      if (skillPreview) {
        skillPreview.style.opacity = '';
        skillPreview.style.transform = 'translateY(0)';
        skillPreview.style.filter = '';
      }
    }
  }

  showSkillDetails(card) {
    const skillName = card.dataset.skill;
    const categoryKey = card.dataset.category;
    const skill = this.findSkill(skillName, categoryKey);
    
    if (!skill) return;
    
    const modal = document.querySelector('.skill-detail-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.textContent = skill.name;
    modalBody.innerHTML = this.createSkillDetailContent(skill);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modal.querySelector('.modal-close').focus();
  }

  hideSkillDetails() {
    const modal = document.querySelector('.skill-detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  createSkillDetailContent(skill) {
    return `
      <div class="skill-detail-content">
        <div class="skill-overview">
          <div class="skill-stats-detailed">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-chart-line" aria-hidden="true"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">${skill.level}%</span>
                <span class="stat-label">Proficiency</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-clock" aria-hidden="true"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">${skill.experience}</span>
                <span class="stat-label">Experience</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-project-diagram" aria-hidden="true"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">${skill.projects}</span>
                <span class="stat-label">Projects</span>
              </div>
            </div>
          </div>
          
          <div class="skill-description-full">
            <h4>About This Skill</h4>
            <p>${skill.description}</p>
          </div>
        </div>
        
        <div class="skill-highlights-section">
          <h4>Key Strengths</h4>
          <div class="highlights-grid">
            ${skill.highlights.map(highlight => 
              `<div class="highlight-item">
                <i class="fas fa-check-circle highlight-icon" aria-hidden="true"></i>
                <span>${highlight}</span>
              </div>`
            ).join('')}
          </div>
        </div>
        
        <div class="skill-certifications">
          <h4>Certifications</h4>
          <div class="certifications-list">
            ${skill.certifications.map(cert => 
              `<div class="certification-item">
                <i class="fas fa-certificate cert-icon" aria-hidden="true"></i>
                <span>${cert}</span>
              </div>`
            ).join('')}
          </div>
        </div>
        
        <div class="recent-work">
          <h4>Recent Work</h4>
          <div class="work-highlight">
            <i class="fas fa-star work-icon" aria-hidden="true"></i>
            <p>${skill.recentWork}</p>
          </div>
        </div>
      </div>
    `;
  }

  initializeAnimations() {
    // Initialize progress ring animations
    this.initProgressRings();
    
    // Initialize staggered card animations
    this.initStaggeredAnimations();
    
    // Initialize intersection observer for scroll animations
    this.initScrollAnimations();
  }

  initProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring-progress');
    
    progressRings.forEach(ring => {
      const circumference = 2 * Math.PI * 25;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = circumference;
    });
  }

  initStaggeredAnimations() {
    const skillCards = document.querySelectorAll('.enhanced-skill-card');
    
    skillCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      card.style.animationDelay = `${index * 150}ms`; // Increased delay for better staggering
      
      // Add progressive reveal data attributes for enhanced animations
      card.dataset.animationIndex = index;
      card.dataset.animationState = 'pending';
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use progressive reveal instead of individual card animation
          if (entry.target.classList.contains('enhanced-skills-grid')) {
            this.progressiveRevealSkills();
          } else {
            this.animateSkillCard(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // Reduced threshold for earlier trigger

    // Observe the skills grid for progressive reveal
    const skillsGrid = document.querySelector('.enhanced-skills-grid');
    if (skillsGrid) {
      observer.observe(skillsGrid);
    }
    
    // Fallback: observe individual cards if grid observation fails
    document.querySelectorAll('.enhanced-skill-card').forEach(card => {
      if (card.dataset.animationState === 'pending') {
        observer.observe(card);
      }
    });
  }

  animateSkillCard(card) {
    // Enhanced card entrance animation
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
    card.dataset.animationState = 'visible';
    
    // Animate progress ring with delay
    setTimeout(() => {
      const progressRing = card.querySelector('.progress-ring-progress');
      if (progressRing) {
        // Get skill level from the card's data attribute or closest skill item
        const skillItem = card.closest('[data-skill]') || card.querySelector('[data-skill]');
        const level = parseInt(skillItem?.dataset.skill) || 0;
        const circumference = 2 * Math.PI * 25;
        const offset = circumference - (level / 100) * circumference;
        
        // Start from empty and animate to target
        progressRing.style.strokeDashoffset = circumference;
        setTimeout(() => {
          progressRing.style.strokeDashoffset = offset;
        }, 100);
      }
    }, 200);
    
    // Animate skill highlights with staggered timing
    setTimeout(() => {
      const highlights = card.querySelector('.skill-highlights');
      if (highlights) {
        const tags = highlights.querySelectorAll('.highlight-tag');
        tags.forEach((tag, index) => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    }, 400);
    
    // Add subtle bounce effect at the end
    setTimeout(() => {
      card.style.transform = 'translateY(-3px) scale(1.01)';
      setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
      }, 200);
    }, 600);
  }

  // Utility methods
  calculateAverageProficiency(skills) {
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
  }

  getProficiencyColor(level) {
    if (level >= 90) return 'var(--color-muted-gold)';
    if (level >= 80) return 'var(--color-electric-blue)';
    if (level >= 70) return 'var(--color-soft-cyan)';
    return 'var(--color-text-secondary)';
  }

  getProficiencyLabel(level) {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Learning';
  }

  getSkillIcon(skillName) {
    const iconMap = {
      'Python': '<i class="fab fa-python skill-tech-icon" aria-hidden="true"></i>',
      'Java': '<i class="fab fa-java skill-tech-icon" aria-hidden="true"></i>',
      'JavaScript': '<i class="fab fa-js-square skill-tech-icon" aria-hidden="true"></i>',
      'HTML5': '<i class="fab fa-html5 skill-tech-icon" aria-hidden="true"></i>',
      'CSS3': '<i class="fab fa-css3-alt skill-tech-icon" aria-hidden="true"></i>',
      'React.js': '<i class="fab fa-react skill-tech-icon" aria-hidden="true"></i>',
      'Node.js': '<i class="fab fa-node-js skill-tech-icon" aria-hidden="true"></i>',
      'Git': '<i class="fab fa-git-alt skill-tech-icon" aria-hidden="true"></i>',
      'AWS': '<i class="fab fa-aws skill-tech-icon" aria-hidden="true"></i>',
      'Docker': '<i class="fab fa-docker skill-tech-icon" aria-hidden="true"></i>'
    };
    
    return iconMap[skillName] || '<i class="fas fa-code skill-tech-icon" aria-hidden="true"></i>';
  }

  findSkill(skillName, categoryKey) {
    const category = this.skillsData[categoryKey];
    return category?.skills.find(skill => skill.name === skillName);
  }

  // Enhanced animation methods for progressive skills system
  
  animateProgressRing(card) {
    const progressRing = card.querySelector('.progress-ring-progress');
    if (!progressRing) return;
    
    // Get skill level from the card's data attribute or closest skill item
    const skillItem = card.closest('[data-skill]') || card.querySelector('[data-skill]');
    const level = parseInt(skillItem?.dataset.skill) || 0;
    const circumference = 2 * Math.PI * 25;
    const offset = circumference - (level / 100) * circumference;
    
    // Animate from full circle to target level
    progressRing.style.strokeDashoffset = circumference;
    setTimeout(() => {
      progressRing.style.strokeDashoffset = offset;
    }, 100);
  }
  
  animateProgressRingEnhanced(card) {
    const progressRing = card.querySelector('.progress-ring-progress');
    if (!progressRing) return;
    
    // Get skill level from the card's data attribute or closest skill item
    const skillItem = card.closest('[data-skill]') || card.querySelector('[data-skill]');
    const level = parseInt(skillItem?.dataset.skill) || 0;
    const circumference = 2 * Math.PI * 25;
    const offset = circumference - (level / 100) * circumference;
    
    // Enhanced animation with multiple phases
    progressRing.style.strokeDashoffset = circumference;
    progressRing.style.filter = 'drop-shadow(0 0 5px var(--color-electric-blue))';
    
    // Phase 1: Quick fill to 20%
    setTimeout(() => {
      const phase1Offset = circumference - (20 / 100) * circumference;
      progressRing.style.strokeDashoffset = phase1Offset;
      progressRing.style.strokeWidth = '4';
    }, 100);
    
    // Phase 2: Smooth fill to target with overshoot
    setTimeout(() => {
      const overshootLevel = Math.min(level + 10, 100);
      const overshootOffset = circumference - (overshootLevel / 100) * circumference;
      progressRing.style.strokeDashoffset = overshootOffset;
      progressRing.style.filter = 'drop-shadow(0 0 8px var(--color-electric-blue))';
    }, 300);
    
    // Phase 3: Settle to actual level
    setTimeout(() => {
      progressRing.style.strokeDashoffset = offset;
      progressRing.style.strokeWidth = '3';
      progressRing.style.filter = '';
    }, 600);
  }
  
  createRippleEffect(card) {
    const ripple = document.createElement('div');
    ripple.className = 'skill-card-ripple';
    
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(1)';
      ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }
  
  createEnhancedRippleEffect(card) {
    // Create multiple ripples for enhanced effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.className = 'skill-card-ripple enhanced-ripple';
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * (1 + i * 0.2);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.background = `radial-gradient(circle, rgba(0, 212, 255, ${0.2 - i * 0.05}) 0%, rgba(77, 208, 225, ${0.1 - i * 0.03}) 50%, transparent 100%)`;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        // Animate ripple with different timing
        setTimeout(() => {
          ripple.style.transform = 'translate(-50%, -50%) scale(1.2)';
          ripple.style.opacity = '0';
        }, 50);
        
        // Remove ripple after animation
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 800 + i * 200);
      }, i * 100);
    }
  }
  
  createExitRipple(card) {
    const ripple = document.createElement('div');
    ripple.className = 'skill-card-exit-ripple';
    
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(1)';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)';
    ripple.style.opacity = '0.5';
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    // Animate exit ripple (reverse)
    setTimeout(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 400);
  }
  
  createEntranceGlow(card) {
    const glow = document.createElement('div');
    glow.className = 'skill-card-entrance-glow';
    
    glow.style.position = 'absolute';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.right = '0';
    glow.style.bottom = '0';
    glow.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(77, 208, 225, 0.05))';
    glow.style.borderRadius = 'var(--radius-md)';
    glow.style.opacity = '0';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '1';
    
    card.style.position = 'relative';
    card.appendChild(glow);
    
    // Animate entrance glow
    setTimeout(() => {
      glow.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
      glow.style.opacity = '0';
    }, 800);
    
    // Remove glow after animation
    setTimeout(() => {
      if (glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
    }, 1200);
  }
  
  createHoverParticles(card) {
    const particleCount = 8;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'hover-particle';
      
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'var(--color-electric-blue)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10';
      
      // Random position around card edges
      const angle = (i / particleCount) * 2 * Math.PI;
      const radius = Math.min(rect.width, rect.height) * 0.4;
      const startX = 50 + Math.cos(angle) * 40;
      const startY = 50 + Math.sin(angle) * 40;
      
      particle.style.left = startX + '%';
      particle.style.top = startY + '%';
      particle.style.opacity = '0';
      
      card.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        particle.style.opacity = '0.8';
        particle.style.transform = `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px) scale(1.5)`;
      }, i * 50);
      
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${Math.cos(angle) * 40}px, ${Math.sin(angle) * 40}px) scale(0.5)`;
      }, 500 + i * 50);
      
      // Remove particle
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  }
  
  onFilterTransitionComplete(filter) {
    // Callback for when filter transition completes
    const event = new CustomEvent('skillsFilterChanged', {
      detail: { filter, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
    
    // Update URL hash if needed (for deep linking)
    if (filter !== 'all') {
      history.replaceState(null, null, `#skills-${filter}`);
    } else {
      history.replaceState(null, null, '#skills');
    }
  }
  
  // Progressive reveal animation for initial load
  progressiveRevealSkills() {
    const categories = document.querySelectorAll('.skill-category');
    
    // Enhanced progressive reveal with category-by-category animation
    categories.forEach((category, categoryIndex) => {
      const categoryHeader = category.querySelector('.category-header');
      const cards = category.querySelectorAll('.enhanced-skill-card');
      
      // Animate category header first
      if (categoryHeader) {
        categoryHeader.style.opacity = '0';
        categoryHeader.style.transform = 'translateX(-30px) scale(0.95)';
        
        setTimeout(() => {
          categoryHeader.style.opacity = '1';
          categoryHeader.style.transform = 'translateX(0) scale(1)';
          categoryHeader.style.animation = 'categoryHeaderSlide 0.6s var(--ease-out) forwards';
        }, categoryIndex * 300);
      }
      
      // Then animate cards with enhanced staggered timing
      cards.forEach((card, cardIndex) => {
        const totalDelay = (categoryIndex * 400) + (cardIndex * 120) + 200; // Added header delay
        
        // Set initial state for enhanced entrance
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8) rotateX(20deg)';
        card.style.filter = 'blur(5px)';
        
        setTimeout(() => {
          // Use enhanced entrance animation
          card.style.animation = 'enhancedEntranceReveal 0.8s var(--ease-out) forwards';
          card.dataset.animationState = 'visible';
          
          // Trigger enhanced progress ring animation after card settles
          setTimeout(() => {
            this.animateProgressRingEnhanced(card);
          }, 400);
          
          // Add entrance glow effect
          setTimeout(() => {
            this.createEntranceGlow(card);
          }, 200);
          
          // Animate skill highlights with enhanced timing
          setTimeout(() => {
            const highlights = card.querySelector('.skill-highlights');
            if (highlights) {
              const tags = highlights.querySelectorAll('.highlight-tag');
              tags.forEach((tag, tagIndex) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(15px) scale(0.8)';
                
                setTimeout(() => {
                  tag.style.opacity = '1';
                  tag.style.transform = 'translateY(0) scale(1)';
                  tag.style.animation = 'skillHighlightReveal 0.4s var(--ease-out) forwards';
                }, tagIndex * 80);
              });
            }
          }, 600);
          
        }, totalDelay);
      });
    });
    
    // Add completion callback
    const totalAnimationTime = (categories.length * 400) + (8 * 120) + 1000; // Estimate total time
    setTimeout(() => {
      this.onProgressiveRevealComplete();
    }, totalAnimationTime);
  }
  
  onProgressiveRevealComplete() {
    // Callback for when progressive reveal completes
    const event = new CustomEvent('skillsProgressiveRevealComplete', {
      detail: { timestamp: Date.now() }
    });
    document.dispatchEvent(event);
    
    // Add subtle glow effect to the entire skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.style.animation = 'glowPulse 3s ease-in-out infinite';
      
      // Remove the glow after a few cycles
      setTimeout(() => {
        skillsSection.style.animation = '';
      }, 9000);
    }
  }
}

// Initialize the interactive skills system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const skillsSystem = new InteractiveSkillsSystem();
  
  // Make it globally available for testing
  window.InteractiveSkillsSystem = InteractiveSkillsSystem;
  window.skillsSystemInstance = skillsSystem;
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveSkillsSystem;
}