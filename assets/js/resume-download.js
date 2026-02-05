/**
 * Premium Resume Download Interaction
 * Handles sophisticated download experience with preview modal
 */

class ResumeDownloadManager {
  constructor() {
    this.isDownloading = false;
    this.downloadButton = null;
    this.previewButton = null;
    this.previewModal = null;
    this.resumeData = {
      pdf: 'https://github.com/Pratikshapandey1609/RESUME/blob/main/PratikshaPandey_Resume%20(2).pdf',
      github: 'https://github.com/Pratikshapandey1609/RESUME'
    };
    
    this.init();
  }
  
  init() {
    this.bindResumeButtons();
    this.createPreviewModal();
    this.bindEvents();
    
    console.log('📄 Resume Download Manager initialized');
  }
  
  bindResumeButtons() {
    // Bind download button
    const downloadBtn = document.querySelector('.resume-download-btn');
    if (downloadBtn) {
      this.downloadButton = downloadBtn;
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleDownloadClick();
      });
    }
    
    // Bind preview button
    const previewBtn = document.querySelector('.resume-preview-btn');
    if (previewBtn) {
      this.previewButton = previewBtn;
      previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPreview();
      });
    }
  }
  
  createPreviewModal() {
    this.previewModal = document.createElement('div');
    this.previewModal.className = 'resume-preview-modal';
    this.previewModal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Resume Preview</h2>
          <button class="modal-close" aria-label="Close preview">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="resume-preview-content">
          <div class="preview-section">
            <h3><i class="fas fa-user"></i> Professional Summary</h3>
            <p>Computer Science student and full-stack developer with expertise in Java, Spring Boot, React, and modern web technologies. Passionate about building scalable, secure applications and solving complex problems through elegant code architecture.</p>
          </div>
          
          <div class="preview-section">
            <h3><i class="fas fa-code"></i> Core Technologies</h3>
            <div class="tech-grid">
              <div class="tech-category">
                <h4>Backend</h4>
                <ul>
                  <li>Java, Spring Boot</li>
                  <li>Node.js, Express.js</li>
                  <li>JWT Authentication</li>
                </ul>
              </div>
              <div class="tech-category">
                <h4>Frontend</h4>
                <ul>
                  <li>React.js, JavaScript</li>
                  <li>HTML5, CSS3</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div class="tech-category">
                <h4>Database & DevOps</h4>
                <ul>
                  <li>MongoDB, MySQL, PostgreSQL</li>
                  <li>Docker, Kubernetes</li>
                  <li>AWS, Git, GitHub</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="preview-section">
            <h3><i class="fas fa-project-diagram"></i> Featured Projects</h3>
            <div class="projects-preview">
              <div class="project-item">
                <h4>AI Resume Parser</h4>
                <p>Intelligent document processing system with 85% accuracy improvement</p>
                <span class="tech-tags">React • Node.js • MongoDB • AI/ML</span>
              </div>
              <div class="project-item">
                <h4>Real-Time Chat Application</h4>
                <p>Scalable messaging platform with WebSocket integration</p>
                <span class="tech-tags">React • Java • PostgreSQL • Docker</span>
              </div>
              <div class="project-item">
                <h4>Expense Tracker</h4>
                <p>Personal finance management with analytics dashboard</p>
                <span class="tech-tags">React • Spring Boot • MySQL • JWT</span>
              </div>
            </div>
          </div>
          
          <div class="preview-section">
            <h3><i class="fas fa-graduation-cap"></i> Education & Achievements</h3>
            <div class="education-info">
              <div class="education-item">
                <h4>B.Tech Computer Science Engineering</h4>
                <p>Shri Ram Institute of Technology, Jabalpur</p>
                <span class="grade">CGPA: 7.89/10</span>
              </div>
              <div class="achievements">
                <ul>
                  <li>Strong foundation in Data Structures & Algorithms</li>
                  <li>System Design and Architecture</li>
                  <li>Active participation in coding competitions</li>
                  <li>10+ completed full-stack projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="download-actions">
          <a href="${this.resumeData.pdf}" class="download-option primary" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-download"></i>
            <span>Download PDF Resume</span>
          </a>
          <a href="${this.resumeData.github}" class="download-option secondary" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.previewModal);
    this.bindModalEvents();
  }
  
  bindModalEvents() {
    // Close button
    const closeBtn = this.previewModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.closePreview());
    
    // Click overlay to close
    const overlay = this.previewModal.querySelector('.modal-overlay');
    overlay.addEventListener('click', () => this.closePreview());
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.previewModal.classList.contains('active')) {
        this.closePreview();
      }
    });
    
    // Download option clicks
    const downloadOptions = this.previewModal.querySelectorAll('.download-option');
    downloadOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        this.trackDownload(option.classList.contains('primary') ? 'pdf' : 'github');
        
        // Add success feedback
        const originalContent = option.innerHTML;
        option.innerHTML = `
          <i class="fas fa-check"></i>
          <span>Opening...</span>
        `;
        
        setTimeout(() => {
          option.innerHTML = originalContent;
        }, 2000);
      });
    });
  }
  
  bindEvents() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        this.showPreview();
      }
    });
  }
  
  async handleDownloadClick() {
    if (this.isDownloading) return;
    
    // Set loading state
    this.setButtonState(this.downloadButton, 'loading');
    
    try {
      // Simulate loading time for better UX
      await this.simulateLoading();
      
      // Open resume in new tab
      window.open(this.resumeData.pdf, '_blank', 'noopener,noreferrer');
      
      // Set success state
      this.setButtonState(this.downloadButton, 'success');
      
      // Reset button after delay
      setTimeout(() => {
        this.setButtonState(this.downloadButton, 'default');
      }, 2000);
      
    } catch (error) {
      console.error('Resume download error:', error);
      this.setButtonState(this.downloadButton, 'error');
      
      // Reset button after delay
      setTimeout(() => {
        this.setButtonState(this.downloadButton, 'default');
      }, 2000);
    }
  }
  
  async simulateLoading() {
    return new Promise(resolve => {
      setTimeout(resolve, 800);
    });
  }
  
  setButtonState(button, state) {
    if (!button) return;
    
    // Remove all state classes
    button.classList.remove('loading', 'success', 'error');
    
    // Add new state class
    if (state !== 'default') {
      button.classList.add(state);
    }
    
    // Update button content based on state
    const btnIcon = button.querySelector('i');
    const btnText = button.querySelector('span');
    
    if (!btnIcon || !btnText) return;
    
    switch (state) {
      case 'loading':
        this.isDownloading = true;
        btnIcon.className = 'fas fa-spinner fa-spin';
        btnText.textContent = 'Loading...';
        break;
        
      case 'success':
        this.isDownloading = false;
        btnIcon.className = 'fas fa-check';
        btnText.textContent = 'Opening...';
        break;
        
      case 'error':
        this.isDownloading = false;
        btnIcon.className = 'fas fa-exclamation-triangle';
        btnText.textContent = 'Try Again';
        break;
        
      default:
        this.isDownloading = false;
        if (button.classList.contains('resume-download-btn')) {
          btnIcon.className = 'fas fa-download';
          btnText.textContent = 'Download Resume';
        } else {
          btnIcon.className = 'fas fa-eye';
          btnText.textContent = 'Quick Preview';
        }
        break;
    }
  }
  
  showPreview() {
    this.previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const closeBtn = this.previewModal.querySelector('.modal-close');
    closeBtn.focus();
    
    // Animate preview sections
    const sections = this.previewModal.querySelectorAll('.preview-section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        section.style.transition = 'all 0.4s ease-out';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }
  
  closePreview() {
    this.previewModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to preview button
    if (this.previewButton) {
      this.previewButton.focus();
    }
  }
  
  trackDownload(format) {
    console.log(`📊 Resume accessed: ${format.toUpperCase()}`);
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'resume_access', {
        'format': format,
        'timestamp': new Date().toISOString()
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.resumeDownloadManager = new ResumeDownloadManager();
});