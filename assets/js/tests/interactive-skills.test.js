/**
 * Unit Tests for Interactive Skills System
 * Tests the core functionality of the enhanced skills display
 */

// Mock DOM environment for testing
function createMockDOM() {
  // Create a mock skills section
  const skillsSection = document.createElement('section');
  skillsSection.id = 'skills';
  skillsSection.className = 'skills-section section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <h2 class="section-title">Technical Skills</h2>
    <p class="section-subtitle">Technologies I work with to bring ideas to life</p>
  `;
  
  const skillsGrid = document.createElement('div');
  skillsGrid.className = 'skills-grid';
  
  container.appendChild(header);
  container.appendChild(skillsGrid);
  skillsSection.appendChild(container);
  
  document.body.appendChild(skillsSection);
  
  return skillsSection;
}

// Test Suite
function runInteractiveSkillsTests() {
  console.log('🧪 Running Interactive Skills System Tests...\n');
  
  let testsPassed = 0;
  let testsTotal = 0;
  
  function test(name, testFn) {
    testsTotal++;
    try {
      testFn();
      console.log(`✅ ${name}`);
      testsPassed++;
    } catch (error) {
      console.error(`❌ ${name}: ${error.message}`);
    }
  }
  
  // Setup
  const mockSection = createMockDOM();
  
  // Test 1: Skills data initialization
  test('Skills data should be properly initialized', () => {
    // Check if InteractiveSkillsSystem is available
    if (typeof InteractiveSkillsSystem === 'undefined') {
      throw new Error('InteractiveSkillsSystem class not available');
    }
    
    const skillsSystem = new InteractiveSkillsSystem();
    const skillsData = skillsSystem.skillsData;
    
    if (!skillsData) throw new Error('Skills data not initialized');
    if (!skillsData.programming) throw new Error('Programming category missing');
    if (!skillsData.frameworks) throw new Error('Frameworks category missing');
    if (!skillsData.databases) throw new Error('Databases category missing');
    if (!skillsData.tools) throw new Error('Tools category missing');
    
    // Check if skills have required properties
    const pythonSkill = skillsData.programming.skills.find(s => s.name === 'Python');
    if (!pythonSkill) throw new Error('Python skill not found');
    if (!pythonSkill.level) throw new Error('Skill level missing');
    if (!pythonSkill.description) throw new Error('Skill description missing');
    if (!pythonSkill.highlights) throw new Error('Skill highlights missing');
  });
  
  // Test 2: DOM creation
  test('Should create interactive skills interface', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const skillsContainer = document.querySelector('.interactive-skills-container');
    if (!skillsContainer) throw new Error('Interactive skills container not created');
    
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length !== 5) throw new Error(`Expected 5 filter tabs, got ${filterTabs.length}`);
    
    const skillCategories = document.querySelectorAll('.skill-category');
    if (skillCategories.length !== 4) throw new Error(`Expected 4 skill categories, got ${skillCategories.length}`);
  });
  
  // Test 3: Filter functionality
  test('Filter tabs should work correctly', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    // Test initial state
    const allTab = document.querySelector('.filter-tab[data-filter="all"]');
    if (!allTab.classList.contains('active')) throw new Error('All tab should be active initially');
    
    // Test filter change
    const programmingTab = document.querySelector('.filter-tab[data-filter="programming"]');
    programmingTab.click();
    
    if (!programmingTab.classList.contains('active')) throw new Error('Programming tab should be active after click');
    if (allTab.classList.contains('active')) throw new Error('All tab should not be active after programming tab click');
  });
  
  // Test 4: Skill cards creation
  test('Should create enhanced skill cards', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const skillCards = document.querySelectorAll('.enhanced-skill-card');
    if (skillCards.length === 0) throw new Error('No skill cards created');
    
    // Check first skill card structure
    const firstCard = skillCards[0];
    const skillName = firstCard.querySelector('.skill-name');
    const progressRing = firstCard.querySelector('.progress-ring-progress');
    const viewDetailsBtn = firstCard.querySelector('.view-details-btn');
    
    if (!skillName) throw new Error('Skill name not found in card');
    if (!progressRing) throw new Error('Progress ring not found in card');
    if (!viewDetailsBtn) throw new Error('View details button not found in card');
  });
  
  // Test 5: Proficiency calculations
  test('Should calculate proficiency correctly', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    // Test proficiency color
    const expertColor = skillsSystem.getProficiencyColor(95);
    const advancedColor = skillsSystem.getProficiencyColor(85);
    const proficientColor = skillsSystem.getProficiencyColor(75);
    
    if (expertColor !== 'var(--color-muted-gold)') throw new Error('Expert color incorrect');
    if (advancedColor !== 'var(--color-electric-blue)') throw new Error('Advanced color incorrect');
    if (proficientColor !== 'var(--color-soft-cyan)') throw new Error('Proficient color incorrect');
    
    // Test proficiency labels
    const expertLabel = skillsSystem.getProficiencyLabel(95);
    const advancedLabel = skillsSystem.getProficiencyLabel(85);
    const proficientLabel = skillsSystem.getProficiencyLabel(75);
    
    if (expertLabel !== 'Expert') throw new Error('Expert label incorrect');
    if (advancedLabel !== 'Advanced') throw new Error('Advanced label incorrect');
    if (proficientLabel !== 'Proficient') throw new Error('Proficient label incorrect');
  });
  
  // Test 6: Average proficiency calculation
  test('Should calculate average proficiency correctly', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const testSkills = [
      { level: 80 },
      { level: 90 },
      { level: 70 }
    ];
    
    const average = skillsSystem.calculateAverageProficiency(testSkills);
    if (average !== 80) throw new Error(`Expected average 80, got ${average}`);
  });
  
  // Test 7: Modal functionality
  test('Should create and handle skill detail modal', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const modal = document.querySelector('.skill-detail-modal');
    if (!modal) throw new Error('Skill detail modal not created');
    
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    
    if (!modalTitle) throw new Error('Modal title not found');
    if (!modalBody) throw new Error('Modal body not found');
    if (!modalClose) throw new Error('Modal close button not found');
  });
  
  // Test 8: Accessibility features
  test('Should have proper accessibility attributes', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const skillCards = document.querySelectorAll('.enhanced-skill-card');
    const firstCard = skillCards[0];
    
    if (!firstCard.hasAttribute('tabindex')) throw new Error('Skill card missing tabindex');
    if (!firstCard.hasAttribute('role')) throw new Error('Skill card missing role');
    if (!firstCard.hasAttribute('aria-label')) throw new Error('Skill card missing aria-label');
    
    const viewDetailsBtn = firstCard.querySelector('.view-details-btn');
    if (!viewDetailsBtn.hasAttribute('aria-label')) throw new Error('View details button missing aria-label');
  });
  
  // Test 9: Skill finding utility
  test('Should find skills correctly', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const pythonSkill = skillsSystem.findSkill('Python', 'programming');
    if (!pythonSkill) throw new Error('Python skill not found');
    if (pythonSkill.name !== 'Python') throw new Error('Wrong skill returned');
    
    const nonExistentSkill = skillsSystem.findSkill('NonExistent', 'programming');
    if (nonExistentSkill) throw new Error('Non-existent skill should return undefined');
  });
  
  // Test 10: Current focus highlighting
  test('Should highlight current focus skills', () => {
    const skillsSystem = new InteractiveSkillsSystem();
    
    const devopsSkill = skillsSystem.findSkill('DevOps', 'tools');
    if (!devopsSkill) throw new Error('DevOps skill not found');
    if (!devopsSkill.isCurrentFocus) throw new Error('DevOps should be marked as current focus');
    
    const devopsCard = document.querySelector('.enhanced-skill-card[data-skill="DevOps"]');
    if (!devopsCard) throw new Error('DevOps card not found');
    if (!devopsCard.classList.contains('current-focus')) throw new Error('DevOps card should have current-focus class');
  });
  
  // Cleanup
  document.body.removeChild(mockSection);
  
  // Results
  console.log(`\n📊 Test Results: ${testsPassed}/${testsTotal} tests passed`);
  
  if (testsPassed === testsTotal) {
    console.log('🎉 All tests passed! Interactive Skills System is working correctly.');
    return true;
  } else {
    console.log('⚠️  Some tests failed. Check the implementation.');
    return false;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runInteractiveSkillsTests };
}

// Auto-run tests if this file is loaded directly
if (typeof window !== 'undefined' && window.location.pathname.includes('test')) {
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for InteractiveSkillsSystem to be available
    setTimeout(runInteractiveSkillsTests, 1000);
  });
}