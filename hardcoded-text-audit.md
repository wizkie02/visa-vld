# Hardcoded Text Audit - VisaValidator Pro

## Summary
This document lists all hardcoded, softcoded, or untranslated text found throughout the codebase that needs translation keys.

## Files with Hardcoded Text

### 1. client/src/pages/home.tsx
✅ **Status: FULLY TRANSLATED** - All text uses t() function calls

### 2. client/src/components/country-selection.tsx
**Issues Found:**
- Line 217-232: Hardcoded requirements text in getRequirements() function:
  ```javascript
  return [
    "Valid passport (minimum 6 months validity)",
    "DS-160 confirmation page", 
    "Passport-style photograph",
    "Financial documents (bank statements, income proof)",
    "Travel itinerary and accommodation proof",
  ];
  ```
- All country names and nationalities are hardcoded in English (lines 16-214)
- Missing translation keys: `selectDestinationVisa`, `destinationCountry`, `selectCountryPlaceholder`, `visaType`, `selectVisaTypePlaceholder`, `commonRequirementsFor`
- Visa type keys need translation: `medical`, `conference`, `journalist`, `religious`, `cultural`, `research`, `training`, `diplomatic`, `crew`, `investment`, `retirement`, `volunteer`, `sports`, `other`

### 3. client/src/components/personal-info-form.tsx  
**Issues Found:**
- Lines 20-195: All nationality labels are hardcoded in English:
  ```javascript
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  // ... 174 more entries
  ```
- Missing translation keys: `selectNationalityPlaceholder`, `daysPlaceholder`

### 4. client/src/components/file-upload.tsx
**Issues Found:**
- Lines 86-88: Hardcoded toast messages:
  ```javascript
  title: "Upload and Analysis Complete",
  description: `${successCount} document(s) analyzed successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
  ```
- Lines 94-96: Hardcoded error messages:
  ```javascript
  title: "Upload failed", 
  description: error.message,
  ```
- Missing translation keys for file upload interface

### 5. client/src/components/step-indicator.tsx
**Issues Found:**
- Missing translation keys: `stepDestination`, `stepNationality`, `stepRequirements`, `stepUpload`, `stepInformation`, `stepReview`, `stepPayment`

### 6. client/src/components/language-selection-modal.tsx
**Issues Found:**
- Lines 30-32: Hardcoded multilingual title:
  ```javascript
  Choose Your Language / 选择您的语言 / अपनी भाषा चुनें
  ```
- Lines 36-38: Hardcoded description:
  ```javascript
  Select your preferred language for the visa validation application
  ```
- Lines 64-66: Hardcoded multilingual button:
  ```javascript
  Continue / 继续 / जारी रखें
  ```

### 7. client/src/components/validation-results.tsx
**Issues Found:**
- Line 63: Hardcoded text: `"Documents Verified"`
- Missing translation keys: `validationScore`, `completedOn`, `documentsVerified`

### 8. client/src/components/payment-modal.tsx
**Status: NEEDS REVIEW** - Not fully audited yet

### 9. client/src/components/required-documents-display.tsx
**Status: NEEDS REVIEW** - Not fully audited yet

### 10. client/src/components/nationality-selection.tsx
**Status: NEEDS REVIEW** - Not fully audited yet

## Missing Translation Keys

### Core Application Keys
- `selectDestinationVisa`
- `destinationCountry` 
- `selectCountryPlaceholder`
- `visaType`
- `selectVisaTypePlaceholder`
- `commonRequirementsFor`
- `selectNationalityPlaceholder`
- `daysPlaceholder`

### Step Indicator Keys
- `stepDestination`
- `stepNationality` 
- `stepRequirements`
- `stepUpload`
- `stepInformation`
- `stepReview`
- `stepPayment`

### File Upload Keys
- `uploadAnalysisComplete`
- `documentsAnalyzedSuccessfully`
- `documentsFailed`
- `uploadFailed`

### Validation Results Keys
- `validationScore`
- `completedOn`
- `documentsVerified`

### Language Modal Keys
- `chooseYourLanguage`
- `selectPreferredLanguage`
- `continueButton`

### Visa Types (Missing Translations)
- `medical`
- `conference`
- `journalist`
- `religious`
- `cultural`
- `research`
- `training`
- `diplomatic`
- `crew`
- `investment`
- `retirement`
- `volunteer`
- `sports`
- `other`

### Country Names (All need translation keys)
200+ country names currently hardcoded in English

### Nationality Names (All need translation keys)  
180+ nationality names currently hardcoded in English

## Recommendations

1. **Immediate Priority**: Add missing translation keys to translations.ts
2. **High Priority**: Replace hardcoded requirement text with translatable content
3. **Medium Priority**: Create translation keys for all country/nationality names
4. **Low Priority**: Review remaining component files not yet audited

## Estimated Missing Keys: ~400+ translation keys needed