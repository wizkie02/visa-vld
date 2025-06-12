import fs from 'fs';

// Read the extracted translations
const rawData = JSON.parse(fs.readFileSync('extracted-translations.json', 'utf8'));

// Process the data to create proper translation objects
const translations = {};
const languages = ['en', 'vi', 'zh', 'hi', 'es', 'fr', 'ar', 'ru', 'pt', 'id', 'de', 'ja', 'tr', 'ko', 'sw', 'te', 'mr', 'ta', 'ur', 'bn'];

// Initialize language objects
languages.forEach(lang => {
  translations[lang] = {};
});

// Process each row
rawData.forEach(row => {
  const key = row['__EMPTY'];
  
  // Skip empty rows or comment rows
  if (!key || key.trim() === '' || key.startsWith('//') || key.startsWith('  //') || key === '}' || key === '};') {
    return;
  }
  
  // Clean the key (remove leading spaces and trailing commas)
  const cleanKey = key.trim().replace(/,$/, '');
  
  // Skip if no clean key
  if (!cleanKey) return;
  
  // Process each language
  languages.forEach(lang => {
    const columnKey = lang === 'en' ? '"en"' : ` "${lang}"`;
    let value = row[columnKey];
    
    if (value && typeof value === 'string') {
      // Clean the value (remove leading/trailing spaces and commas)
      value = value.trim().replace(/,$/, '').replace(/^,/, '');
      
      if (value) {
        translations[lang][cleanKey] = value;
      }
    }
  });
});

// Write the processed translations
fs.writeFileSync('processed-translations.json', JSON.stringify(translations, null, 2));

console.log('Processed translations for languages:', Object.keys(translations));
console.log('Sample keys:', Object.keys(translations.en).slice(0, 10));