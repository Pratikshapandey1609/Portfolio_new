/**
 * Enhanced Project Showcase System
 * Handles project filtering, modal display, and smooth transitions
 */

class ProjectShowcase {
  constructor() {
    this.projects = [];
    this.currentFilter = 'all';
    this.modal = null;
    this.isModalOpen = false;
    
    this.init();
  }
  
  init() {
    this.setupProjects();
    this.createFilterButtons();
    this.setupEventListeners();
    this.createModal();
    
    console.log('🎨 Project Showcase initialized successfully');
  }
  
  setupProjects() {
    // Get all project cards and extract data
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      const project = {
        id: index,
        element: card,
        title: card.querySelector('.project-title')?.textContent || 'Untitled Project',
        description: card.querySelector('.project-description')?.textContent || 'No description available',
        image: card.querySelector('.project-image')?.src || '/assets/img/project-placeholder.jpg',
        technologies: Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.trim()),
        links: this.extractLinks(card),
        category: this.determineCategory(card)
      };
      
      this.projects.push(project);
      
      // Add click handler for modal
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-link')) {
          this.openModal(project);
        }
      });
      
      // Add keyboard support
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(