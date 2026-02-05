/**
 * Simple test to verify interactive skills functionality
 */

// Test if the interactive skills system is working
function testInteractiveSkills() {
    console.log('🧪 Testing Interactive Skills System...\n');
    
    // Test 1: Check if skills container exists
    const skillsContainer = document.querySelector('.interactive-skills-container');
    console.log('Skills Container:', skillsContainer ? '✅ Found' : '❌ Not found');
    
    // Test 2: Check filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    console.log('Filter Tabs:', filterTabs.length > 0 ? `✅ ${filterTabs.length} tabs found` : '❌ No tabs found');
    
    // Test 3: Check skill cards
    const skillCards = document.querySelectorAll('.enhanced-skill-card');
    console.log('Skill Cards:', skillCards.length > 0 ? `✅ ${skillCards.length} cards found` : '❌ No cards found');
    
    // Test 4: Check categories
    const categories = document.querySelectorAll('.skill-category');
    console.log('Categories:', categories.length > 0 ? `✅ ${categories.length} categories found` : '❌ No categories found');
    
    // Test 5: Check modal
    const modal = document.querySelector('.skill-detail-modal');
    console.log('Detail Modal:', modal ? '✅ Found' : '❌ Not found');
    
    // Test 6: Check progress rings
    const progressRings = document.querySelectorAll('.progress-ring-progress');
    console.log('Progress Rings:', progressRings.length > 0 ? `✅ ${progressRings.length} rings found` : '❌ No rings found');
    
    // Test 7: Check current focus highlighting
    const currentFocusCards = document.querySelectorAll('.enhanced-skill-card.current-focus');
    console.log('Current Focus Cards:', currentFocusCards.length > 0 ? `✅ ${currentFocusCards.length} highlighted` : '❌ None highlighted');
    
    // Test 8: Check accessibility attributes
    const firstCard = skillCards[0];
    if (firstCard) {
        const hasTabindex = firstCard.hasAttribute('tabindex');
        const hasRole = firstCard.hasAttribute('role');
        const hasAriaLabel = firstCard.hasAttribute('aria-label');
        console.log('Accessibility:', 
            hasTabindex && hasRole && hasAriaLabel ? '✅ Properly configured' : '❌ Missing attributes');
    }
    
    // Summary
    const totalTests = 8;
    const passedTests = [
        skillsContainer,
        filterTabs.length > 0,
        skillCards.length > 0,
        categories.length > 0,
        modal,
        progressRings.length > 0,
        currentFocusCards.length > 0,
        firstCard && firstCard.hasAttribute('tabindex') && firstCard.hasAttribute('role') && firstCard.hasAttribute('aria-label')
    ].filter(Boolean).length;
    
    console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All tests passed! Interactive Skills System is working correctly.');
        return true;
    } else {
        console.log('⚠️ Some tests failed. The system may need adjustments.');
        return false;
    }
}

// Run test when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(testInteractiveSkills, 2000);
    });
}

// Export for use in other contexts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testInteractiveSkills;
}