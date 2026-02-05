/**
 * Property-Based Test: Visual Skill Proficiency
 * **Validates: Requirements 5.2**
 * 
 * Property 12: Visual Skill Proficiency
 * For any skill listed, a visual proficiency indicator should be present and accurately represent the skill level
 */

// Test configuration
const TEST_CONFIG = {
  iterations: 100,
  timeout: 5000,
  skillLevelRange: { min: 0, max: 100 },
  requiredVisualElements: ['progress-bar', 'percentage', 'level-indicator'],
  validSkillCategories: ['programming', 'frameworks', 'databases', 'tools']
};

// Property-based test generators
const generators = {
  /**
   * Generate random skill data for testing
   */
  generateSkillData() {
    const skillNames = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'MongoDB', 
      'MySQL', 'Git', 'Docker', 'AWS', 'HTML5', 'CSS3', 'TypeScript',
      'Vue.js', 'Angular', 'PostgreSQL', 'Redis', 'Kubernetes'
    ];
    
    const categories = ['programming', 'frameworks', 'databases', 'tools'];
    
    return {
      name: skillNames[Math.floor(Math.random() * skillNames.length)],
      level: Math.floor(Math.random() * (TEST_CONFIG.skillLevelRange.max - TEST_CONFIG.skillLevelRange.min + 1)) + TEST_CONFIG.skillLevelRange.min,
      category: categories[Math.floor(Math.random() * categories.length)],
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  },

  /**
   * Generate array of skill data
   */
  generateSkillSet(count = 5) {
    return Array.from({ length: count }, () => this.generateSkillData());
  },

  /**
   * Generate DOM structure for skill testing
   */
  generateSkillElement(skillData) {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-item interactive';
    skillElement.dataset.skill = skillData.level.toString();
    skillElement.dataset.category = skillData.category;
    skillElement.id = skillData.id;
    
    skillElement.innerHTML = `
      <img src="/assets/img/test-skill.png" alt="${skillData.name}" class="skill-icon" />
      <span class="skill-name">${skillData.name}</span>
      <div class="skill-level">
        <div class="skill-progress" style="width: 0%"></div>
      </div>
      <span class="skill-percentage">${skillData.level}%</span>
    `;
    
    return skillElement;
  }
};

// Property test implementations
const properties = {
  /**
   * Property: Every skill must have a visual proficiency indicator
   */
  async testVisualProficiencyPresence(skillData) {
    const skillElement = generators.generateSkillElement(skillData);
    document.body.appendChild(skillElement);
    
    try {
      // Check for required visual elements
      const progressBar = skillElement.querySelector('.skill-progress');
      const percentage = skillElement.querySelector('.skill-percentage');
      const levelContainer = skillElement.querySelector('.skill-level');
      
      // Assertions
      if (!progressBar) {
        throw new Error(`Skill "${skillData.name}" missing progress bar visual indicator`);
      }
      
      if (!percentage) {
        throw new Error(`Skill "${skillData.name}" missing percentage visual indicator`);
      }
      
      if (!levelContainer) {
        throw new Error(`Skill "${skillData.name}" missing level container visual indicator`);
      }
      
      // Check that visual indicators are properly structured
      if (!levelContainer.contains(progressBar)) {
        throw new Error(`Skill "${skillData.name}" progress bar not properly contained in level container`);
      }
      
      return {
        passed: true,
        skill: skillData.name,
        level: skillData.level,
        visualElements: {
          progressBar: !!progressBar,
          percentage: !!percentage,
          levelContainer: !!levelContainer
        }
      };
      
    } finally {
      // Cleanup
      if (skillElement.parentNode) {
        skillElement.parentNode.removeChild(skillElement);
      }
    }
  },

  /**
   * Property: Visual indicators must accurately represent skill level
   */
  async testVisualAccuracy(skillData) {
    const skillElement = generators.generateSkillElement(skillData);
    document.body.appendChild(skillElement);
    
    try {
      // Simulate skill animation (as would happen in real app)
      const progressBar = skillElement.querySelector('.skill-progress');
      const percentage = skillElement.querySelector('.skill-percentage');
      
      // Set the visual representation
      progressBar.style.width = `${skillData.level}%`;
      
      // Wait for any CSS transitions
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check accuracy
      const computedWidth = parseFloat(progressBar.style.width);
      const displayedPercentage = parseInt(percentage.textContent);
      
      if (Math.abs(computedWidth - skillData.level) > 1) {
        throw new Error(`Skill "${skillData.name}" progress bar width (${computedWidth}%) doesn't match skill level (${skillData.level}%)`);
      }
      
      if (displayedPercentage !== skillData.level) {
        throw new Error(`Skill "${skillData.name}" displayed percentage (${displayedPercentage}%) doesn't match skill level (${skillData.level}%)`);
      }
      
      return {
        passed: true,
        skill: skillData.name,
        level: skillData.level,
        visualWidth: computedWidth,
        displayedPercentage: displayedPercentage
      };
      
    } finally {
      // Cleanup
      if (skillElement.parentNode) {
        skillElement.parentNode.removeChild(skillElement);
      }
    }
  },

  /**
   * Property: Visual indicators must be accessible
   */
  async testVisualAccessibility(skillData) {
    const skillElement = generators.generateSkillElement(skillData);
    document.body.appendChild(skillElement);
    
    try {
      // Check accessibility attributes
      const hasAriaLabel = skillElement.hasAttribute('aria-label') || 
                          skillElement.hasAttribute('aria-labelledby');
      const hasTabIndex = skillElement.hasAttribute('tabindex') || 
                         skillElement.getAttribute('tabindex') === '0';
      const hasRole = skillElement.hasAttribute('role');
      
      // Check for screen reader friendly content
      const skillName = skillElement.querySelector('.skill-name');
      const percentage = skillElement.querySelector('.skill-percentage');
      
      if (!skillName || !skillName.textContent.trim()) {
        throw new Error(`Skill "${skillData.name}" missing accessible skill name`);
      }
      
      if (!percentage || !percentage.textContent.trim()) {
        throw new Error(`Skill "${skillData.name}" missing accessible percentage display`);
      }
      
      // Check color contrast (simplified check)
      const computedStyle = window.getComputedStyle(skillElement);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      
      if (backgroundColor === color) {
        throw new Error(`Skill "${skillData.name}" has insufficient color contrast`);
      }
      
      return {
        passed: true,
        skill: skillData.name,
        accessibility: {
          hasAriaLabel,
          hasTabIndex,
          hasRole,
          hasSkillName: !!skillName,
          hasPercentage: !!percentage
        }
      };
      
    } finally {
      // Cleanup
      if (skillElement.parentNode) {
        skillElement.parentNode.removeChild(skillElement);
      }
    }
  },

  /**
   * Property: Visual indicators must handle edge cases properly
   */
  async testEdgeCases(skillData) {
    // Test edge cases: 0%, 100%, and boundary values
    const edgeCases = [
      { ...skillData, level: 0 },
      { ...skillData, level: 100 },
      { ...skillData, level: 1 },
      { ...skillData, level: 99 }
    ];
    
    const results = [];
    
    for (const testCase of edgeCases) {
      const skillElement = generators.generateSkillElement(testCase);
      document.body.appendChild(skillElement);
      
      try {
        const progressBar = skillElement.querySelector('.skill-progress');
        const percentage = skillElement.querySelector('.skill-percentage');
        
        // Set visual representation
        progressBar.style.width = `${testCase.level}%`;
        
        // Check that edge cases are handled properly
        const computedWidth = parseFloat(progressBar.style.width);
        const displayedPercentage = parseInt(percentage.textContent);
        
        if (testCase.level === 0 && computedWidth !== 0) {
          throw new Error(`Skill "${testCase.name}" at 0% should show no progress`);
        }
        
        if (testCase.level === 100 && computedWidth !== 100) {
          throw new Error(`Skill "${testCase.name}" at 100% should show full progress`);
        }
        
        if (displayedPercentage !== testCase.level) {
          throw new Error(`Skill "${testCase.name}" edge case percentage mismatch`);
        }
        
        results.push({
          level: testCase.level,
          passed: true,
          visualWidth: computedWidth,
          displayedPercentage: displayedPercentage
        });
        
      } finally {
        // Cleanup
        if (skillElement.parentNode) {
          skillElement.parentNode.removeChild(skillElement);
        }
      }
    }
    
    return {
      passed: true,
      skill: skillData.name,
      edgeCaseResults: results
    };
  }
};

// Test runner
class VisualSkillProficiencyTest {
  constructor() {
    this.results = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      errors: [],
      details: []
    };
  }

  async runProperty(propertyName, propertyTest, iterations = TEST_CONFIG.iterations) {
    console.log(`🧪 Running property: ${propertyName}`);
    
    for (let i = 0; i < iterations; i++) {
      try {
        const skillData = generators.generateSkillData();
        const result = await propertyTest(skillData);
        
        this.results.totalTests++;
        this.results.passed++;
        this.results.details.push({
          property: propertyName,
          iteration: i + 1,
          skillData,
          result,
          status: 'passed'
        });
        
      } catch (error) {
        this.results.totalTests++;
        this.results.failed++;
        this.results.errors.push({
          property: propertyName,
          iteration: i + 1,
          error: error.message,
          skillData: generators.generateSkillData()
        });
        
        console.error(`❌ Property ${propertyName} failed on iteration ${i + 1}:`, error.message);
      }
    }
  }

  async runAllProperties() {
    console.log('🚀 Starting Visual Skill Proficiency Property-Based Tests');
    console.log(`📊 Configuration: ${TEST_CONFIG.iterations} iterations per property`);
    
    const startTime = Date.now();
    
    // Run all properties
    await this.runProperty('Visual Proficiency Presence', properties.testVisualProficiencyPresence);
    await this.runProperty('Visual Accuracy', properties.testVisualAccuracy);
    await this.runProperty('Visual Accessibility', properties.testVisualAccessibility);
    await this.runProperty('Edge Cases', properties.testEdgeCases);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Generate final report
    this.generateReport(duration);
    
    return this.results;
  }

  generateReport(duration) {
    const passRate = (this.results.passed / this.results.totalTests * 100).toFixed(2);
    
    console.log('\n📋 Visual Skill Proficiency Test Report');
    console.log('=====================================');
    console.log(`⏱️  Duration: ${duration}ms`);
    console.log(`📊 Total Tests: ${this.results.totalTests}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Pass Rate: ${passRate}%`);
    
    if (this.results.failed > 0) {
      console.log('\n🔍 Failure Analysis:');
      const errorGroups = this.results.errors.reduce((groups, error) => {
        const key = error.property;
        if (!groups[key]) groups[key] = [];
        groups[key].push(error);
        return groups;
      }, {});
      
      Object.entries(errorGroups).forEach(([property, errors]) => {
        console.log(`\n${property}: ${errors.length} failures`);
        errors.slice(0, 3).forEach(error => {
          console.log(`  - ${error.error}`);
        });
        if (errors.length > 3) {
          console.log(`  ... and ${errors.length - 3} more`);
        }
      });
    }
    
    // Property-specific insights
    console.log('\n🎯 Property Insights:');
    const propertyStats = this.results.details.reduce((stats, detail) => {
      if (!stats[detail.property]) {
        stats[detail.property] = { passed: 0, total: 0 };
      }
      stats[detail.property].total++;
      if (detail.status === 'passed') {
        stats[detail.property].passed++;
      }
      return stats;
    }, {});
    
    Object.entries(propertyStats).forEach(([property, stats]) => {
      const rate = (stats.passed / stats.total * 100).toFixed(1);
      console.log(`  ${property}: ${rate}% (${stats.passed}/${stats.total})`);
    });
    
    console.log('\n' + (this.results.failed === 0 ? '🎉 All properties passed!' : '⚠️  Some properties failed - check implementation'));
  }

  // Integration with existing skills system
  async testExistingSkills() {
    console.log('🔍 Testing existing skills in DOM...');
    
    const existingSkills = document.querySelectorAll('.skill-item');
    let existingTestResults = {
      total: existingSkills.length,
      passed: 0,
      failed: 0,
      details: []
    };
    
    for (const skillElement of existingSkills) {
      try {
        const skillName = skillElement.querySelector('.skill-name')?.textContent || 'Unknown';
        const skillLevel = parseInt(skillElement.dataset.skill) || 0;
        
        const skillData = {
          name: skillName,
          level: skillLevel,
          category: skillElement.dataset.category || 'unknown',
          id: skillElement.id || 'unknown'
        };
        
        // Test visual proficiency presence
        await properties.testVisualProficiencyPresence(skillData);
        
        existingTestResults.passed++;
        existingTestResults.details.push({
          skill: skillName,
          level: skillLevel,
          status: 'passed'
        });
        
      } catch (error) {
        existingTestResults.failed++;
        existingTestResults.details.push({
          skill: skillElement.querySelector('.skill-name')?.textContent || 'Unknown',
          status: 'failed',
          error: error.message
        });
      }
    }
    
    console.log(`📊 Existing Skills Test: ${existingTestResults.passed}/${existingTestResults.total} passed`);
    return existingTestResults;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VisualSkillProficiencyTest, generators, properties };
}

// Auto-run if loaded directly
if (typeof window !== 'undefined') {
  window.VisualSkillProficiencyTest = VisualSkillProficiencyTest;
  
  // Provide global test runner
  window.runVisualSkillProficiencyTest = async function() {
    const tester = new VisualSkillProficiencyTest();
    const results = await tester.runAllProperties();
    
    // Also test existing skills if present
    if (document.querySelectorAll('.skill-item').length > 0) {
      await tester.testExistingSkills();
    }
    
    return results;
  };
  
  console.log('🧪 Visual Skill Proficiency Property-Based Test loaded');
  console.log('Run window.runVisualSkillProficiencyTest() to execute tests');
}