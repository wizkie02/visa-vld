# 🌍 Official Government Visa Data Collection Architecture

## Overview
Automated system to scrape, validate, and maintain up-to-date visa information from 195+ government sources worldwide.

---

## 🎯 Goals
1. **Real data only** - No AI hallucination, only official government sources
2. **Auto-update** - Daily/weekly scraping to keep data fresh
3. **High accuracy** - Validation & quality checks on every update
4. **Scalable** - Handle 195+ countries efficiently
5. **Reliable** - Fallback mechanisms when sources are down

---

## 📐 System Architecture

### Component 1: Source Discovery Service
**Purpose**: Automatically find official government visa websites

```typescript
// server/scraping/source-discovery.ts

interface OfficialSource {
  country: string;
  type: 'embassy' | 'immigration' | 'vfs' | 'consulate';
  url: string;
  language: string;
  lastVerified: Date;
  reliability: number; // 0-100
}

class SourceDiscoveryService {
  // Use multiple strategies to find official sources
  async discoverSources(country: string): Promise<OfficialSource[]> {
    const sources = [];

    // Strategy 1: Known government domains
    sources.push(...await this.checkKnownDomains(country));

    // Strategy 2: Google search for official sites
    sources.push(...await this.googleSearch(`${country} official visa website`));

    // Strategy 3: Wikipedia/Wikidata references
    sources.push(...await this.wikidataLookup(country));

    // Strategy 4: VFS Global/TLScontact database
    sources.push(...await this.vfsGlobalCheck(country));

    return sources;
  }
}
```

**Tools needed:**
- `axios` - HTTP requests
- `cheerio` - HTML parsing
- Google Custom Search API (free tier: 100 queries/day)
- Wikidata SPARQL API (unlimited, free)

---

### Component 2: Intelligent Web Scraper
**Purpose**: Extract visa data from government websites (even complex ones)

```typescript
// server/scraping/intelligent-scraper.ts

import { chromium } from 'playwright'; // Headless browser
import OpenAI from 'openai';

class IntelligentScraper {
  private browser: any;
  private openai: OpenAI;

  async scrapeVisaTypes(source: OfficialSource): Promise<RawVisaData> {
    // Step 1: Load page with Playwright (handles JavaScript)
    const page = await this.browser.newPage();
    await page.goto(source.url);
    await page.waitForLoadState('networkidle');

    // Step 2: Get clean HTML
    const html = await page.content();

    // Step 3: Use GPT-4o-mini to extract structured data
    const extracted = await this.extractWithAI(html, source.country);

    return extracted;
  }

  async extractWithAI(html: string, country: string): Promise<RawVisaData> {
    // Clean HTML to reduce tokens
    const cleanHtml = this.cleanHTML(html);

    // Ask GPT-4o-mini to extract structured data
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'system',
        content: `Extract visa types from this official ${country} government website HTML.
        Return ONLY data that is explicitly stated on the page.
        Do NOT invent or guess any information.
        Return JSON with: visaTypes, fees, processingTime, requirements.`
      }, {
        role: 'user',
        content: cleanHtml
      }],
      response_format: { type: 'json_object' },
      temperature: 0.1
    });

    return JSON.parse(response.choices[0].message.content);
  }

  cleanHTML(html: string): string {
    // Remove scripts, styles, navigation, footer
    // Keep only main content with visa information
    // Use cheerio to parse and clean
    return cleaned;
  }
}
```

**Tools needed:**
- `playwright` - Headless browser (better than Puppeteer for modern sites)
- `openai` - GPT-4o-mini for extraction
- `cheerio` - HTML cleaning

**Why Playwright + GPT?**
- Playwright handles JavaScript-heavy sites
- GPT-4o-mini understands context and extracts accurate data
- No need to write custom selectors for each country

---

### Component 3: Data Validation & Quality Check
**Purpose**: Ensure scraped data is accurate and complete

```typescript
// server/scraping/data-validator.ts

interface ValidationResult {
  isValid: boolean;
  confidence: number; // 0-100
  issues: string[];
  warnings: string[];
}

class DataValidator {
  validate(data: RawVisaData, source: OfficialSource): ValidationResult {
    const issues = [];
    const warnings = [];
    let confidence = 100;

    // Check 1: Minimum required fields
    if (!data.visaTypes || data.visaTypes.length === 0) {
      issues.push('No visa types found');
      confidence -= 50;
    }

    // Check 2: Data completeness
    data.visaTypes.forEach(visa => {
      if (!visa.name) issues.push(`Missing visa name`);
      if (!visa.category) warnings.push(`Missing category for ${visa.name}`);
      if (!visa.fees) warnings.push(`Missing fees for ${visa.name}`);
    });

    // Check 3: Reasonable values
    data.visaTypes.forEach(visa => {
      if (visa.fees && !this.isReasonableFee(visa.fees)) {
        warnings.push(`Unusual fee: ${visa.fees}`);
        confidence -= 5;
      }
      if (visa.processingTime && !this.isReasonableTime(visa.processingTime)) {
        warnings.push(`Unusual processing time: ${visa.processingTime}`);
        confidence -= 5;
      }
    });

    // Check 4: Compare with previous version (if exists)
    const previous = this.getPreviousData(source.country);
    if (previous) {
      const similarity = this.calculateSimilarity(data, previous);
      if (similarity < 0.5) {
        warnings.push('Data changed significantly from previous version');
        confidence -= 10;
      }
    }

    return {
      isValid: issues.length === 0,
      confidence: Math.max(0, confidence),
      issues,
      warnings
    };
  }
}
```

---

### Component 4: Database Schema
**Purpose**: Store scraped data with version control

```sql
-- server/db/schema/scraped-visa-data.ts

CREATE TABLE scraped_visa_data (
  id SERIAL PRIMARY KEY,
  country VARCHAR(100) NOT NULL,
  source_url TEXT NOT NULL,
  source_type VARCHAR(50), -- 'embassy' | 'immigration' | 'vfs'

  -- Scraped data (JSONB for flexibility)
  visa_types JSONB NOT NULL,

  -- Metadata
  scraped_at TIMESTAMP DEFAULT NOW(),
  confidence_score INTEGER, -- 0-100
  validation_issues JSONB,

  -- Version control
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,

  -- Indexes
  INDEX idx_country (country),
  INDEX idx_active (country, is_active),
  INDEX idx_scraped_at (scraped_at)
);

-- Keep version history
CREATE TABLE scraping_history (
  id SERIAL PRIMARY KEY,
  country VARCHAR(100),
  scraped_at TIMESTAMP,
  success BOOLEAN,
  error_message TEXT,
  data_hash VARCHAR(64), -- To detect changes
  INDEX idx_country_date (country, scraped_at)
);
```

---

### Component 5: Scheduler Service
**Purpose**: Automate scraping on schedule

```typescript
// server/scraping/scheduler.ts

import cron from 'node-cron';

class ScrapingScheduler {
  // Run daily at 2 AM (low traffic time)
  scheduleDaily() {
    cron.schedule('0 2 * * *', async () => {
      console.log('[SCRAPER] Starting daily update...');

      // Scrape high-priority countries (top 50)
      await this.scrapeCountries(this.getHighPriorityCountries());
    });
  }

  // Run weekly for all countries
  scheduleWeekly() {
    cron.schedule('0 3 * * 0', async () => {
      console.log('[SCRAPER] Starting weekly full update...');

      // Scrape all 195 countries
      await this.scrapeAllCountries();
    });
  }

  async scrapeCountries(countries: string[]) {
    for (const country of countries) {
      try {
        // Rate limiting: 1 request per 5 seconds
        await this.delay(5000);

        const sources = await sourceDiscovery.discoverSources(country);
        const data = await scraper.scrapeVisaTypes(sources[0]);
        const validation = await validator.validate(data, sources[0]);

        if (validation.isValid) {
          await this.saveData(country, data, validation);
        } else {
          await this.logError(country, validation.issues);
        }
      } catch (error) {
        await this.logError(country, error.message);
      }
    }
  }

  getHighPriorityCountries(): string[] {
    // Top destinations: US, UK, Australia, Canada, Schengen, etc.
    return [
      'USA', 'UK', 'Australia', 'Canada', 'Germany', 'France',
      'Japan', 'Singapore', 'UAE', 'Thailand', 'China', 'India'
      // ... top 50
    ];
  }
}
```

**Scheduling strategy:**
- **Daily**: Top 50 popular countries
- **Weekly**: All 195 countries
- **On-demand**: User-triggered refresh for specific country

---

## 🛠️ Implementation Steps

### Week 1-2: Foundation
- [ ] Setup Playwright + Chromium
- [ ] Create SourceDiscoveryService
- [ ] Implement basic scraper for 5 test countries
- [ ] Create database schema

### Week 3-4: Core Scraping
- [ ] Implement IntelligentScraper with GPT extraction
- [ ] Add DataValidator
- [ ] Test on 20 diverse countries
- [ ] Handle edge cases (CAPTCHAs, logins, PDFs)

### Week 5-6: Automation
- [ ] Build ScrapingScheduler
- [ ] Setup daily/weekly cron jobs
- [ ] Create monitoring dashboard
- [ ] Implement error notifications

### Week 7-8: Scale & Polish
- [ ] Scrape all 195 countries
- [ ] Optimize performance (parallel scraping)
- [ ] Add retry mechanisms
- [ ] Create admin panel for manual review

---

## 💰 Cost Estimation

**Infrastructure:**
- Playwright (self-hosted): $0
- GPT-4o-mini: ~$0.15 per country scrape
- Daily scraping (50 countries): $7.50/day = $225/month
- Weekly full scrape (195 countries): $30/week = $120/month
- **Total**: ~$350/month for fully automated updates

**Optimization:**
- Cache HTML (scrape once, extract multiple times): 50% savings
- Use Cheerio first, GPT only if needed: 70% savings
- **Optimized cost**: ~$100/month

---

## 🎯 Success Metrics

1. **Coverage**: 195/195 countries with data
2. **Freshness**: Data no older than 7 days
3. **Accuracy**: >90% confidence score
4. **Uptime**: >99% for scraping service
5. **User satisfaction**: Users confirm data matches official sites

---

## 🚨 Risk Mitigation

**Risk 1**: Website structure changes
- **Solution**: AI extraction adapts to new layouts
- **Fallback**: Manual review queue + email alerts

**Risk 2**: CAPTCHAs / bot detection
- **Solution**: Playwright with real browser fingerprints
- **Fallback**: Proxy rotation, slower scraping

**Risk 3**: Government sites down
- **Solution**: Keep last known good data
- **Fallback**: Show "Last updated X days ago" warning

**Risk 4**: Legal/ToS violations
- **Solution**: Respect robots.txt, rate limiting
- **Fallback**: Partner with governments for official API access

---

## 📊 Alternative: Hybrid Approach (Recommended)

**Mix of strategies for best results:**

1. **Tier 1 (50 countries)**: Daily automated scraping
2. **Tier 2 (100 countries)**: Weekly automated scraping
3. **Tier 3 (45 countries)**: Monthly scraping + GPT fallback
4. **Always**: Passport Index API for visa status (VF/VOA/EV/VR)

This reduces costs while maintaining accuracy for popular destinations.

---

## 🔧 Tech Stack Summary

```json
{
  "scraping": "playwright",
  "extraction": "gpt-4o-mini",
  "parsing": "cheerio",
  "scheduling": "node-cron",
  "storage": "postgresql",
  "monitoring": "sentry",
  "notifications": "nodemailer"
}
```

---

## Next Steps

Ready to implement? I can start with:
1. Setup Playwright infrastructure
2. Build scraper for 5 test countries (US, UK, Australia, Canada, Germany)
3. Create database schema
4. Implement basic scheduler

Let me know if you want to proceed! 🚀
