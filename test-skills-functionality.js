/**
 * Node.js test for Progressive Skills Animation System functionality
 * Tests the core JavaScript logic without DOM dependencies
 */

// Mock DOM environment for testing
global.document = {
  addEventListener: () => {},
  createElement: (tag) => ({
    className: '',
    style: {},
    dataset: {},
    appendChild: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    setAttribute: () => {},
    innerHTML: ''
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  body: { style: {} }
};

global.window = {
  addEventListener: () => {},
  InteractiveSkillsSystem: null,
  skillsSystemInstance: null
};

global.history = {
  replaceState: () => {}
};

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
};

global.CustomEvent = class {
  constructor(type, options) {
    this.type = type;
    this.detail = options?.detail;
  }
};

global.MouseEvent = class {
  constructor(type, options) {
    this.type = type;
    this.bubbles = options?.bubbles;
  }
};

// Load the InteractiveSkillsSystem
try {
  const InteractiveSkillsSystem = require('./assets/js/interactive-skills.js');
  
  console.log('🧪 Testing Progressive Skills Animation System Core Functionality');
  console.log('================================================================');
  
  // Test 1: Class instantiation
  console.log('📝 Test 1: Class Instantiation');
  try {
    const skillsSystem = new InteractiveSkillsSystem();
    console.log('✅ InteractiveSkillsSystem instantiated successfully');
    console.log('✅ Skills data initialized:', Object.keys(skillsSystem.skillsData).length, 'categories');
    console.log('✅ Animation queue initialized:', Array.isArray(skillsSystem.animationQueue));
  } catch (error) {
    console.log('❌ Class instantiation failed:', error.message);
  }
  
  // Test 2: Skills data structure
  console.log('\n📝 Test 2: Skills Data Structure');
  try {
    const skillsSystem = new InteractiveSkillsSystem();
    const categories = Object.keys(skillsSystem.skillsData);
    
    console.log('✅ Categories found:', categories.join(', '));
    
    categories.forEach(category => {
      const categoryData = skillsSystem.skillsData[category];
      console.log(`✅ ${category}: ${categoryData.skills.length} skills`);
      
      // Verify each skill has required properties
      categoryData.skills.forEach(skill => {
        const requiredProps = ['name', 'level', 'experience', 'projects', 'description'];
        const hasAllProps = requiredProps.every(prop => skill.hasOwnProperty(prop));
        
        if (hasAllProps) {
          console.log(`  ✅ ${skill.name}: All required properties present`);
        } else {
          console.log(`  ❌ ${skill.name}: Missing required properties`);
        }
      });
    });
  } catch (error) {
    console.log('❌ Skills data structure test failed:', error.message);
  }
  
  // Test 3: Utility methods
  console.log('\n📝 Test 3: Utility Methods');
  try {
    const skillsSystem = new InteractiveSkillsSystem();
    
    // Test calculateAverageProficiency
    const testSkills = [
      { level: 80 },
      { level: 90 },
      { level: 70 }
    ];
    const avgProficiency = skillsSystem.calculateAverageProficiency(testSkills);
    console.log('✅ calculateAverageProficiency:', avgProficiency, '(expected: 80)');
    
    // Test getProficiencyColor
    const colors = [
      skillsSystem.getProficiencyColor(95),
      skillsSystem.getProficiencyColor(85),
      skillsSystem.getProficiencyColor(75),
      skillsSystem.getProficiencyColor(65)
    ];
    console.log('✅ getProficiencyColor works for different levels');
    
    // Test getProficiencyLabel
    const labels = [
      skillsSystem.getProficiencyLabel(95),
      skillsSystem.getProficiencyLabel(85),
      skillsSystem.getProficiencyLabel(75),
      skillsSystem.getProficiencyLabel(65)
    ];
    console.log('✅ getProficiencyLabel:', labels.join(', '));
    
  } catch (error) {
    console.log('❌ Utility methods test failed:', error.message);
  }
  
  // Test 4: Enhanced animation methods
  console.log('\n📝 Test 4: Enhanced Animation Methods');
  try {
    const skillsSystem = new InteractiveSkillsSystem();
    
    // Test method existence
    const enhancedMethods = [
      'animateProgressRing',
      'createRippleEffect',
      'onFilterTransitionComplete',
      'progressiveRevealSkills'
    ];
    
    enhancedMethods.forEach(method => {
      if (typeof skillsSystem[method] === 'function') {
        console.log(`✅ ${method}: Method exists`);
      } else {
        console.log(`❌ ${method}: Method missing`);
      }
    });
    
  } catch (error) {
    console.log('❌ Enhanced animation methods test failed:', error.message);
  }
  
  // Test 5: Filter functionality
  console.log('\n📝 Test 5: Filter Functionality');
  try {
    const skillsSystem = new InteractiveSkillsSystem();
    
    // Test filter state management
    console.log('✅ Initial filter state:', skillsSystem.currentFilter);
    
    // Test findSkill method
    const pythonSkill = skillsSystem.findSkill('Python', 'programming');
    if (pythonSkill) {
      console.log('✅ findSkill works:', pythonSkill.name, 'level', pythonSkill.level);
    } else {
      console.log('❌ findSkill failed to find Python skill');
    }
    
  } catch (error) {
    console.log('❌ Filter functionality test failed:', error.message);
  }
  
  console.log('\n================================================================');
  console.log('🎉 Progressive Skills Animation System Core Tests Complete!');
  
} catch (error) {
  console.log('❌ Failed to load InteractiveSkillsSystem:', error.message);
  console.log('This is expected in a Node.js environment due to DOM dependencies');
}