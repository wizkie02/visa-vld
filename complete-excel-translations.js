import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('attached_assets/translations_1749721883015.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Process the complete translation data
const translations = {};
const languages = ['en', 'vi', 'zh', 'hi', 'es', 'fr', 'ar', 'ru', 'pt', 'id', 'de', 'ja', 'tr', 'ko', 'sw', 'te', 'mr', 'ta', 'ur', 'bn'];

// Initialize language objects
languages.forEach(lang => {
  translations[lang] = {};
});

// Process each row from Excel
data.forEach(row => {
  const key = row['__EMPTY'];
  
  // Skip empty rows or comment rows
  if (!key || key.trim() === '' || key.startsWith('//') || key.startsWith('  //') || key === '}' || key === '};') {
    return;
  }
  
  // Clean the key
  const cleanKey = key.trim().replace(/,$/, '');
  if (!cleanKey) return;
  
  // Process each language column
  languages.forEach(lang => {
    const columnKey = lang === 'en' ? '"en"' : ` "${lang}"`;
    let value = row[columnKey];
    
    if (value && typeof value === 'string') {
      value = value.trim().replace(/,$/, '').replace(/^,/, '');
      if (value) {
        translations[lang][cleanKey] = value;
      }
    }
  });
});

// Generate TypeScript file content
const tsContent = `// Auto-generated translations from Excel file
// All 20 languages with comprehensive key coverage

export const translations: Record<string, Record<string, string>> = ${JSON.stringify(translations, null, 2)};

export const supportedLanguages = [
  "en", "vi", "zh", "hi", "es", "fr", "ar", "ru", "pt", "id", 
  "de", "ja", "tr", "ko", "sw", "te", "mr", "ta", "ur", "bn"
];
`;

// Write the new TypeScript translations file
fs.writeFileSync('new-translations.ts', tsContent);

console.log('Generated new-translations.ts with', Object.keys(translations.en).length, 'keys for', languages.length, 'languages');