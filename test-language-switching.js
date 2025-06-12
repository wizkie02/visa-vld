// Test script to verify language switching functionality
// This script will test translation coverage across all components

const testLanguageSwitching = () => {
  console.log('Testing Language Switching Functionality...');
  
  // Test 1: Check if language selector is properly positioned
  const languageSelector = document.querySelector('[class*="fixed top-4 left-4"]');
  console.log('Language selector positioning:', languageSelector ? 'PASS' : 'FAIL');
  
  // Test 2: Verify translation keys are working
  const translationElements = document.querySelectorAll('[data-testid], h1, h2, h3, button, label');
  let translatedCount = 0;
  
  translationElements.forEach(element => {
    const text = element.textContent || element.innerText;
    if (text && text.length > 0 && !text.includes('{{') && !text.includes('undefined')) {
      translatedCount++;
    }
  });
  
  console.log(`Translation coverage: ${translatedCount} elements with proper text`);
  
  // Test 3: Check if language change events are properly handled
  const testLanguageChange = (langCode) => {
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
    setTimeout(() => {
      console.log(`Language changed to: ${langCode}`);
    }, 100);
  };
  
  // Test different languages
  ['vi', 'zh', 'es', 'fr', 'hi'].forEach((lang, index) => {
    setTimeout(() => testLanguageChange(lang), index * 1000);
  });
  
  // Test 4: Verify localStorage persistence
  const savedLang = localStorage.getItem('preferredLanguage');
  console.log('Language persistence:', savedLang ? 'PASS' : 'FAIL');
  
  return {
    positioningTest: !!languageSelector,
    translationCount: translatedCount,
    persistenceTest: !!savedLang
  };
};

// Export for browser console testing
window.testLanguageSwitching = testLanguageSwitching;