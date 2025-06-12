// Comprehensive Language Switching Test Script
// This script tests the translation functionality across all components

const testLanguageSwitching = async () => {
  console.log("=== COMPREHENSIVE LANGUAGE SWITCHING TEST ===");
  
  // Test 1: Check if language selector exists and is positioned correctly
  console.log("\n1. Testing language selector positioning...");
  const languageSelector = document.querySelector('[role="button"][class*="fixed"][class*="top-4"][class*="left-4"]');
  console.log("Language selector found:", !!languageSelector);
  
  // Test 2: Check translation function availability
  console.log("\n2. Testing translation function...");
  const translationTest = window.t ? window.t('homeTitle') : 'Translation function not available';
  console.log("Translation function test:", translationTest);
  
  // Test 3: Test language switching for major languages
  const testLanguages = ['en', 'zh', 'vi', 'es', 'fr'];
  
  for (const lang of testLanguages) {
    console.log(`\n3. Testing ${lang} language...`);
    
    // Simulate language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check key elements for translation
    const titleElement = document.querySelector('h1');
    const subtitleElement = document.querySelector('h2, p');
    const buttonElement = document.querySelector('button, a[href="/validate"]');
    const disclaimerElement = document.querySelector('[class*="red-800"]');
    
    console.log(`  - Title (${lang}):`, titleElement?.textContent || 'Not found');
    console.log(`  - Subtitle (${lang}):`, subtitleElement?.textContent?.substring(0, 50) + '...' || 'Not found');
    console.log(`  - Button (${lang}):`, buttonElement?.textContent || 'Not found');
    console.log(`  - Disclaimer (${lang}):`, disclaimerElement?.textContent?.substring(0, 30) + '...' || 'Not found');
  }
  
  // Test 4: Check persistence
  console.log("\n4. Testing language persistence...");
  localStorage.setItem('language', 'zh');
  window.location.reload();
  
  setTimeout(() => {
    const persistedLang = localStorage.getItem('language');
    console.log("Language persisted:", persistedLang);
    
    // Test 5: Check comprehensive translation coverage
    console.log("\n5. Testing comprehensive translation coverage...");
    const elementsToCheck = [
      'h1', 'h2', 'h3', 'p', 'button', 'span', 'label'
    ];
    
    elementsToCheck.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        if (el.textContent && el.textContent.trim() && el.textContent.length > 5) {
          console.log(`  ${selector}[${index}]:`, el.textContent.substring(0, 40) + '...');
        }
      });
    });
    
    console.log("\n=== TEST COMPLETE ===");
  }, 1000);
};

// Run the test when page loads
if (document.readyState === 'complete') {
  testLanguageSwitching();
} else {
  window.addEventListener('load', testLanguageSwitching);
}