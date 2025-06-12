import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('attached_assets/translations_1749721883015.xlsx');

// Get the first worksheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Write to a JSON file for inspection
fs.writeFileSync('extracted-translations.json', JSON.stringify(data, null, 2));

console.log('Extracted translations:');
console.log(JSON.stringify(data, null, 2));