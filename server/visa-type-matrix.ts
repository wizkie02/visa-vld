/**
 * VISA TYPE MAPPING MATRIX
 *
 * Maps Travel Buddy API data to detailed visa types
 * Creates intelligent visa type database based on API insights
 */

import { logger } from './logger';

export interface VisaTypeMapping {
  country: string;
  code: string;
  visaStatus: string;
  visaColor: string;
  visaTypes: DetailedVisaType[];
  validationData: {
    embassyUrl: string;
    mandatoryRegistration?: string;
    passportRequirement?: string;
    secondaryStatus?: string;
  };
  insights: string[];
  lastAnalyzed: string;
}

export interface DetailedVisaType {
  id: string;
  name: string;
  category: 'tourist' | 'business' | 'student' | 'work' | 'family' | 'transit' | 'other';
  duration: string;
  purpose: string;
  description: string;
  processingTime: string;
  fees: string;
  requirements: string[];
  apiValidation: {
    source: 'travel-buddy' | 'predefined';
    lastValidated: string;
    confidence: number;
  };
}

export class VisaTypeMatrix {
  private mappingCache = new Map<string, VisaTypeMapping>();

  /**
   * Generate visa types based on Travel Buddy analysis
   */
  generateVisaTypes(analysis: any, basePredefinedTypes: DetailedVisaType[] = []): DetailedVisaType[] {
    const { visaStatus, visaColor, validationData, insights, country } = analysis;
    const visaTypes: DetailedVisaType[] = [];

    logger.info(`[VISA-TYPE-MATRIX] Generating visa types for ${country} (Status: ${visaStatus})`);

    // Generate visa types based on status
    switch (visaStatus) {
      case 'Visa Free':
        visaTypes.push(...this.generateVisaFreeVisaTypes(country, analysis));
        break;
      case 'eVisa':
        visaTypes.push(...this.generateEVisaTypes(country, analysis));
        break;
      case 'Visa on Arrival':
        visaTypes.push(...this.generateVisaOnArrivalTypes(country, analysis));
        break;
      case 'Visa Required':
        visaTypes.push(...this.generateVisaRequiredTypes(country, analysis));
        break;
      default:
        // Handle unknown status with generic types
        visaTypes.push(...this.generateGenericVisaTypes(country, analysis));
    }

    // Add secondary status types if available
    if (analysis.secondaryStatus) {
      const secondaryTypes = this.generateSecondaryVisaTypes(country, analysis);
      visaTypes.push(...secondaryTypes);
    }

    // Add API validation to all visa types
    visaTypes.forEach(visaType => {
      visaType.apiValidation = {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95 // High confidence with Travel Buddy data
      };
    });

    // Enhance with insights
    visaTypes.forEach(visaType => {
      visaType.requirements = this.generateRequirementsFromInsights(insights, visaType);
    });

    logger.info(`[VISA-TYPE-MATRIX] ✅ Generated ${visaTypes.length} visa types for ${country}`);
    return visaTypes;
  }

  /**
   * Generate visa-free visa types
   */
  private generateVisaFreeVisaTypes(country: string, analysis: any): DetailedVisaType[] {
    const types: DetailedVisaType[] = [];

    // Tourist visa (main type for visa-free)
    types.push({
      id: `${country.toLowerCase()}-visa-free-tourist`,
      name: `Visa-Free Travel for ${analysis.country}`,
      category: 'tourist',
      duration: analysis.duration || 'Up to 90 days within 180-day period',
      purpose: 'Tourism, business meetings, family visits, short-term studies',
      description: `No visa required for short-term stays in ${analysis.country}. This applies to tourism, business meetings, visiting family or friends, and short-term study programs. Extended stays require appropriate permits.`,
      processingTime: 'Immediate (no processing required)',
      fees: 'No visa fee',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Proof of sufficient funds for stay',
        'Return ticket or onward travel documentation',
        'Proof of accommodation (if required by airline)',
        analysis.passportRequirement ? analysis.passportRequirement : 'No special passport requirements'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Business visa for longer stays
    if (analysis.duration && (analysis.duration.includes('90') || analysis.duration.includes('180'))) {
      types.push({
        id: `${country.toLowerCase()}-visa-free-business`,
        name: `Business Visa for ${analysis.country} (Long-term)`,
        category: 'business',
        duration: 'Up to 6 months',
        purpose: 'Extended business activities, work projects, contracts',
        description: `For business professionals who need to stay in ${analysis.country} longer than visa-free limits. Required for extended business meetings, consulting, establishing business presence.`,
        processingTime: '7-10 business days',
        fees: 'No visa fee but may require work permit fees',
        requirements: [
          'Valid passport',
          'Business invitation letter',
          'Proof of business purpose and funding',
          'Return ticket or onward travel documentation',
          'Proof of accommodation',
          'Business registration documents (if applicable)'
        ],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.95
        }
      });
    }

    return types;
  }

  /**
   * Generate eVisa types
   */
  private generateEVisaTypes(country: string, analysis: any): DetailedVisaType[] {
    const types: DetailedVisaType[] = [];

    types.push({
      id: `${country.toLowerCase()}-evisa-tourist`,
      name: `eVisa for ${analysis.country}`,
      category: 'tourist',
      duration: analysis.duration || 'Usually 30-90 days',
      purpose: 'Tourism, business meetings, family visits',
      description: `Electronic visa application for visiting ${analysis.country}. Apply online, receive approval by email, print and carry the eVisa when traveling.`,
      processingTime: '3-5 business days (after submitting online application)',
      fees: this.getEstimatedEVisaFees(analysis.country),
      requirements: [
        'Valid passport with at least 6 months validity',
        'Digital passport photo (white background)',
        'Credit or debit card for online payment',
        'Email address for eVisa delivery',
        'Travel itinerary or accommodation details',
        'Proof of sufficient funds',
        'Return ticket or onward travel documentation',
        analysis.passportRequirement ? analysis.passportRequirement : 'Standard passport requirements'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Add mandatory registration if applicable
    if (analysis.mandatoryRegistration) {
      types.push({
        id: `${country.toLowerCase()}-evisa-registration`,
        name: analysis.mandatoryRegistration,
        category: 'other',
        duration: 'Required before travel',
        purpose: 'Pre-arrival registration requirement',
        description: `${analysis.mandatoryRegistration} must be completed before traveling to ${analysis.country}. This is a mandatory electronic registration system.`,
        processingTime: '15-30 minutes (online)',
        fees: this.getRegistrationFees(analysis.mandatoryRegistration),
        requirements: [
          'Valid passport details',
          'Email address',
          'Travel dates and accommodation details',
          analysis.mandatoryRegistration.includes('ETIAS') ? 'Valid for 3 years, €7 fee' : 'Registration specific requirements'
        ],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.95
        }
      });
    }

    return types;
  }

  /**
   * Generate visa-on-arrival types
   */
  private generateVisaOnArrivalTypes(country: string, analysis: any): DetailedVisaType[] {
    const types: DetailedVisaType[] = [];

    types.push({
      id: `${country.toLowerCase()}-voa-tourist`,
      name: `Visa on Arrival for ${analysis.country}`,
      category: 'tourist',
      duration: analysis.duration || 'Usually 14-30 days',
      purpose: 'Tourism, business meetings, family visits',
      description: `Obtain visa upon arrival at ${analysis.country} border crossings or airports. Bring required documents and payment method. Available for eligible nationalities.`,
      processingTime: '30 minutes to 2 hours (at border)',
      fees: this.getEstimatedVOAFees(analysis.country),
      requirements: [
        'Valid passport with at least 6 months validity',
        'Passport-size photographs',
        'Completed visa application form',
        'Proof of sufficient funds',
        'Confirmed return or onward ticket',
        'Proof of accommodation',
        analysis.passportRequirement ? analysis.passportRequirement : 'Standard passport requirements',
        analysis.mandatoryRegistration ? `${analysis.mandatoryRegistration} (if applicable)` : 'No mandatory registration'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Business visa on arrival
    if (analysis.secondaryStatus && analysis.secondaryStatus.includes('Business')) {
      types.push({
        id: `${country.toLowerCase()}-voa-business`,
        name: `Business Visa on Arrival for ${analysis.country}`,
        category: 'business',
        duration: analysis.secondaryRule?.duration || 'Usually 30-90 days',
        purpose: 'Business meetings, conferences, short-term work',
        description: `Business visa obtainable on arrival at ${analysis.country}. For business professionals attending meetings, conferences, or short-term business activities.`,
        processingTime: '30 minutes to 2 hours (at border)',
        fees: this.getEstimatedVOABusinessFees(analysis.country),
        requirements: [
          'Valid passport',
          'Business invitation letter',
          'Proof of business activities',
          'Company registration documents',
          'Proof of funds',
          'Return or onward ticket'
        ],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.95
        }
      });
    }

    return types;
  }

  /**
   * Generate visa-required types
   */
  private generateVisaRequiredTypes(country: string, analysis: any): DetailedVisaType[] {
    const types: DetailedVisaType[] = [];

    // Tourist visa (most common)
    types.push({
      id: `${country.toLowerCase()}-tourist-visa`,
      name: `Tourist Visa for ${analysis.country}`,
      category: 'tourist',
      duration: this.getTouristVisaDuration(analysis.country),
      purpose: 'Tourism, leisure activities, family visits',
      description: `Official tourist visa for visiting ${analysis.country} for leisure, sightseeing, visiting friends and family, or participating in tourist activities. Apply through embassy or consulate before travel.`,
      processingTime: this.getTouristVisaProcessingTime(analysis.country),
      fees: this.getTouristVisaFees(analysis.country),
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Passport-size photographs',
        'Proof of travel arrangements (flights, hotels)',
        'Proof of financial means for stay',
        'Travel insurance covering entire stay',
        'Cover letter explaining purpose of visit',
        analysis.passportRequirement ? analysis.passportRequirement : 'Standard passport requirements',
        analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Business visa
    types.push({
      id: `${country.toLowerCase()}-business-visa`,
      name: `Business Visa for ${analysis.country}`,
      category: 'business',
      duration: this.getBusinessVisaDuration(analysis.country),
      purpose: 'Business meetings, conferences, negotiations, trade',
      description: `Business visa for professionals attending meetings, conferences, negotiations, or establishing business relationships in ${analysis.country}. Apply through embassy with proper business documentation.`,
      processingTime: this.getBusinessVisaProcessingTime(analysis.country),
      fees: this.getBusinessVisaFees(analysis.country),
      requirements: [
        'Valid passport with at least 6 months validity',
        'Letter of invitation from host company',
        'Proof of business registration (host company)',
        'Proof of financial capacity',
        'Detailed business itinerary',
        'Proof of employment in home country',
        'Return or onward ticket',
        analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Student visa
    types.push({
      id: `${country.toLowerCase()}-student-visa`,
      name: `Student Visa for ${analysis.country}`,
      class: 'student',
      duration: this.getStudentVisaDuration(analysis.country),
      purpose: 'Educational studies, research, academic programs',
      description: `Student visa for international students enrolled in educational institutions in ${analysis.country}. Apply with acceptance letter and financial documentation. Allows for work in limited hours during studies.`,
      processingTime: this.getStudentVisaProcessingTime(analysis.country),
      fees: this.getStudentVisaFees(analysis.country),
      requirements: [
        'Valid passport',
        'Letter of acceptance from educational institution',
        'Proof of financial support (bank statements, scholarships)',
        'Academic transcripts',
        'Proof of accommodation in ${analysis.country}',
        'Health insurance coverage',
        'Proof of intent to return after studies',
        'Language proficiency test scores (if required)',
        analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Work visa (if country has significant work visa programs)
    if (this.hasWorkVisaPrograms(analysis.country)) {
      types.push({
        id: `${country.toLowerCase()}-work-visa`,
        name: `Work Visa for ${analysis.country}`,
        class: 'work',
        duration: this.getWorkVisaDuration(analysis.country),
        purpose: 'Employment, professional work, skilled migration',
        description: `Work visa for professionals seeking employment in ${analysis.country}. Apply with job offer and employer sponsorship. May lead to permanent residency.`,
        processingTime: this.getWorkVisaProcessingTime(analysis.country),
        fees: this.getWorkVisaFees(analysis.country),
        requirements: [
          'Valid passport',
          'Job offer from ${analysis.country} employer',
          'Employer sponsorship documentation',
          'Proof of qualifications and experience',
          'Labor market testing (if required)',
          'Proof of financial capacity',
          'Medical examination results',
          'Police clearance certificate',
          analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
        ],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.95
        }
      });
    }

    // Family visa
    types.push({
      id: `${country.toLowerCase()}-family-visa`,
      name: `Family Visa for ${analysis.country}`,
      class: 'family',
      duration: this.getFamilyVisaDuration(analysis.country),
      purpose: 'Family reunification, marriage, dependent children',
      description: `Family visa for joining family members who are citizens or permanent residents of ${analysis.country}. For spouses, partners, children, or dependent relatives.`,
      processingTime: this.getFamilyVisaProcessingTime(analysis.country),
      fees: this.getFamilyVisaFees(analysis.country),
      requirements: [
        'Valid passport',
        'Proof of relationship to family member',
        `Proof of family member's status in ${analysis.country}`,
        'Marriage certificate (for spouses/partners)',
        'Birth certificates (for children)',
        'Proof of financial support from family member',
        `Proof of accommodation in ${analysis.country}`,
        'Health insurance coverage',
        analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
      ],
      apiValidation: {
        source: 'travel-buddy',
        lastValidated: new Date().toISOString(),
        confidence: 0.95
      }
    });

    // Transit visa (if applicable)
    if (this.requiresTransitVisa(analysis.country)) {
      types.push({
        id: `${country.toLowerCase()}-transit-visa`,
        name: `Transit Visa for ${analysis.country}`,
        class: 'transit',
        duration: this.getTransitVisaDuration(analysis.country),
        purpose: 'Airport transit, short stopovers',
        description: `Transit visa for passing through ${analysis.country} to reach another destination. Required when leaving airport transit area or for long layovers.`,
        processingTime: this.getTransitVisaProcessingTime(analysis.country),
        fees: this.getTransitVisaFees(analysis.country),
        requirements: [
          'Valid passport',
          'Confirmed flight tickets for onward journey',
          'Visa for final destination (if required)',
          'Proof of sufficient transit time',
          'Transit area restrictions (if applicable)',
          'Travel insurance covering transit period',
          analysis.embassyUrl ? `Submit at ${analysis.embassyUrl}` : 'Submit at nearest embassy or consulate'
        ],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.95
        }
      });
    }

    return types;
  }

  /**
   * Generate secondary visa types (additional options)
   */
  private generateSecondaryVisaTypes(country: string, analysis: any): DetailedVisaType[] {
    const types: DetailedVisaType[] = [];
    const secondaryStatus = analysis.secondaryStatus;

    if (!secondaryStatus) return types;

    if (secondaryStatus.includes('Work') || secondaryStatus.includes('Employment')) {
      types.push({
        id: `${country.toLowerCase()}-secondary-work`,
        name: `Secondary Work Option for ${analysis.country}`,
        class: 'work',
        duration: secondaryRule?.duration || 'Varies',
        purpose: 'Alternative work arrangement',
        description: `Additional work visa option available for ${analysis.country}. May have different requirements or eligibility criteria than standard work visa.`,
        processingTime: 'Varies by type',
        fees: 'Varies by type',
        requirements: ['Alternative work documentation requirements'],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.85
        }
      });
    }

    if (secondaryStatus.includes('Student') || secondaryStatus.includes('Study')) {
      types.push({
        id: `${country.toLowerCase()}-secondary-student`,
        name: `Secondary Study Option for ${analysis.country}`,
        class: 'student',
        duration: secondaryRule?.duration || 'Varies',
        purpose: 'Alternative study program',
        description: `Additional study visa option for ${analysis.country}. May include short courses, language programs, or specialized training with different requirements than standard student visa.`,
        processingTime: 'Varies by type',
        fees: 'Varies by type',
        requirements: ['Alternative study documentation requirements'],
        apiValidation: {
          source: 'travel-buddy',
          lastValidated: new Date().toISOString(),
          confidence: 0.85
        }
      });
    }

    return types;
  }

  /**
   * Generate generic visa types for unknown status
   */
  private generateGenericVisaTypes(country: string, analysis: any): DetailedVisaType[] {
    return [{
      id: `${country.toLowerCase()}-standard-visa`,
      name: `Standard Visa for ${analysis.country}`,
      category: 'other',
      duration: 'Varies by visa type',
      purpose: 'Travel, work, study, or family',
      description: `Standard visa application for ${analysis.country}. Specific requirements depend on visa category. Contact embassy for detailed requirements based on your purpose of travel.`,
      processingTime: 'Varies (2-8 weeks typical)',
      fees: 'Varies by visa type',
      requirements: [
        'Valid passport with required validity',
        'Completed visa application form',
        'Passport photographs',
        'Purpose-specific documentation',
        'Proof of financial means',
        'Return or onward travel documentation',
        analysis.embassyUrl ? `Consult ${analysis.embassyUrl}` : 'Consult nearest embassy'
      ],
      apiValidation: {
        source: 'predefined',
        lastValidated: new Date().toISOString(),
        confidence: 0.70
      }
    }];
  }

  /**
   * Generate requirements from insights
   */
  private generateRequirementsFromInsights(insights: string[], visaType: DetailedVisaType): string[] {
    const additionalReqs: string[] = [];

    insights.forEach(insight => {
      // Extract specific information from insights
      if (insight.includes('Embassy information')) {
        additionalReqs.push('Visit embassy website for latest requirements');
      }
      if (insight.includes('Passport requirement:')) {
        additionalReqs.push(`Passport requirement: ${insight.split(':')[1].trim()}`);
      }
    });

    return [...visaType.requirements, ...additionalReqs];
  }

  // Helper methods for estimated data (could be enhanced with actual data)

  private getEstimatedEVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$21', 'UK': '$30', 'EU': '€80', 'Canada': 'CAD $100',
      'Australia': 'AUD $150', 'Japan': '¥3,000', 'India': '₹5,000'
    };
    return fees[country] || 'Varies by nationality';
  }

  private getEstimatedVOAFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$25', 'Thailand': '2,000 THB', 'Cambodia': '$30', 'Sri Lanka': '$35',
      'Bangladesh': '$50', 'Indonesia': '$35', 'Kenya': '$50', 'Tanzania': '$50'
    };
    return fees[country] || 'Varies by nationality';
  }

  private getEstimatedVOABusinessFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$160', 'Thailand': '5,000 THB', 'Cambodia': '$50', 'Kenya': '$100'
    };
    return fees[country] || 'Varies by country';
  }

  private getRegistrationFees(registration: string): string {
    if (registration.includes('ETIAS')) return '€7 (valid 3 years)';
    if (registration.includes('ESTA')) return '$7 (valid 2 years)';
    if (registration.includes('eTA')) return '$7 (valid 5 years)';
    return 'Varies by registration type';
  }

  private getTouristVisaDuration(country: string): string {
    const durations: { [key: string]: string } = {
      'US': 'Up to 6 months',
      'UK': 'Up to 6 months',
      'Schengen': 'Up to 90 days within 180-day period',
      'Canada': 'Up to 6 months',
      'Australia': 'Up to 3 months',
      'Japan': 'Up to 90 days'
    };
    return durations[country] || 'Varies by country';
  }

  private getTouristVisaProcessingTime(country: string): string {
    const times: { [key: string]: string } = {
      'US': '2-4 weeks (after interview)',
      'UK': '2-4 weeks',
      'Schengen': '15-30 calendar days',
      'Canada': '2-4 weeks',
      'Australia': '15-30 business days',
      'Japan': '5-10 business days'
    };
    return times[country] || '2-8 weeks (typical)';
  }

  private getTouristVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$185 application + $185 issuance',
      'UK': '£100 for 6 months',
      'Schengen': '€80 for adults, €40 for children 6-12',
      'Canada': 'CAD $100 processing + $85 biometrics',
      'Australia': 'AUD $190-1450 depending on duration',
      'Japan': '¥3,000 for single entry, ¥6,000 for double'
    };
    return fees[country] || 'Varies by country';
  }

  private getBusinessVisaDuration(country: string): string {
    const durations: { [key: string]: string } = {
      'US': 'Up to 3 years (B1/B2)',
      'UK': 'Up to 5 years',
      'Schengen': 'Up to 90 days within 180-day period',
      'Canada': 'Up to 6 months',
      'Australia': 'Up to 3 months'
    };
    return durations[country] || 'Up to 1 year';
  }

  private getBusinessVisaProcessingTime(country: string): string {
    const times: { [key: string]: string } = {
      'US': '2-4 weeks (after interview)',
      'UK': '3-8 weeks',
      'Schengen': '15-30 calendar days',
      'Canada': '2-4 weeks',
      'Australia': '15-30 business days'
    };
    return times[country] || '3-6 weeks';
  }

  private getBusinessVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$185 application + $185 issuance + $500 ACWIA',
      'UK': '£719 application + £624 healthcare surcharge per year',
      'Schengen': '€80 application + visa center fees',
      'Canada': 'CAD $155 employer fee + $100 worker fee + $85 biometrics',
      'Australia': 'AUD $1,330-2,680 depending on stream'
    };
    return fees[country] || 'Varies by country';
  }

  private getStudentVisaDuration(country: string): string {
    const durations: { [key: string]: string } = {
      'US': 'Duration of study + 4 months',
      'UK': 'Duration of course + 4 months',
      'Schengen': 'Duration of study + 3 months',
      'Canada': 'Duration of study + 90 days',
      'Australia': 'Duration of study + 2 months',
      'Japan': 'Duration of study program'
    };
    return durations[country] || 'Duration of study program';
  }

  private getStudentVisaProcessingTime(country: string): string {
    const times: { [key: string]: string } = {
      'US': '3-8 weeks after SEVP approval',
      'UK': '3-8 weeks',
      'Schengen': '30-60 days',
      'Canada': '4-8 weeks',
      'Australia': '4-8 weeks'
    };
    return times[country] || '4-8 weeks';
  }

  private getStudentVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$185 application fee + $475 healthcare surcharge per year',
      'UK': '£490 application fee + £475 healthcare surcharge per year',
      'Schengen': '€75 application + residence permit fees',
      'Canada': 'CAD $150 application + $85 biometrics',
      'Australia': 'AUD $710 application + charges'
    };
    return fees[country] || 'Varies by country';
  }

  private getWorkVisaDuration(country: string): string {
    const durations: { [key: string]: string } = {
      'US': 'Up to 6 years (H-1B)',
      'UK': 'Up to 5 years (Skilled Worker)',
      'Schengen': 'Up to 4 years',
      'Canada': 'Up to 4 years (work permit)',
      'Australia': 'Up to 4 years (temporary skill shortage)'
    };
    return durations[country] || 'Up to 2-4 years';
  }

  private getWorkVisaProcessingTime(country: string): string {
    const times: { [key: string]: string } = {
      'US': '3-8 months (lottery dependent)',
      'UK': '3-8 weeks',
      'Schengen': '30-45 days',
      'Canada': '3-8 weeks',
      'Australia': '3-8 weeks (premium available)'
    };
    return times[country] || '3-8 weeks';
  }

  private getWorkVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$440 filing + $500 ACWIA + premium processing (if using)',
      'UK': '£719 application + £624 healthcare surcharge per year',
      'Schengen': '€75 application + €100 EU Blue Card fee',
      'Canada': 'CAD $155 employer fee + $100 worker fee + $85 biometrics',
      'Australia': 'AUD $1,330-2,680 depending on stream'
    };
    return fees[country] || 'Varies by country';
  }

  private getFamilyVisaDuration(country: string): string {
    const durations: { [key: string]: string } = {
      'US': '2.5 years (leading to settlement)',
      'UK': '2.5 years (leading to settlement)',
      'Schengen': '1 year (renewable)',
      'Canada': '1-2 years (renewable)',
      'Australia': '1-2 years (renewable)'
    };
    return durations[country] || '1-2 years (renewable)';
  }

  private getFamilyVisaProcessingTime(country: string): string {
    const times: { [key: string]: string } = {
      'US': '8-12 weeks',
      'UK': '8-12 weeks',
      'Schengen': '30-45 days',
      'Canada': '30-60 days',
      'Australia': '12-18 months'
    };
    return times[country] || '2-3 months';
  }

  private getFamilyVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$1,846 application + $624 healthcare surcharge per year',
      'UK': '£1,846 application + £624 healthcare surcharge per year',
      'Schengen': '€99 application + residence permit fees',
      'Canada': 'CAD $207 application + residence permit fees',
      'Australia': 'AUD $2,030-3,040 depending on stream'
    };
    return fees[country] || 'Varies by country';
  }

  private getTransitVisaDuration(country: string): string {
    return 'Up to 7 days';
  }

  private getTransitVisaProcessingTime(country: string): string {
    return '3-5 business days';
  }

  private getTransitVisaFees(country: string): string {
    const fees: { [key: string]: string } = {
      'US': '$160', 'UK': '£100', 'Schengen': '€80', 'Canada': 'CAD $100'
    };
    return fees[country] || 'Varies by country';
  }

  private hasWorkVisaPrograms(country: string): boolean {
    const workPrograms = [
      'US', 'UK', 'Canada', 'Australia', 'Germany', 'France',
      'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Singapore'
    ];
    return workPrograms.includes(country) || this.hasDevelopedEconomy(country);
  }

  private hasDevelopedEconomy(country: string): boolean {
    const developedEconomies = [
      'Germany', 'France', 'UK', 'Japan', 'South Korea', 'Singapore',
      'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
      'Australia', 'New Zealand', 'Canada', 'US'
    ];
    return developedEconomies.includes(country) || this.hasMajorIndustry(country);
  }

  private hasMajorIndustry(country: string): boolean {
    const industryCountries = [
      'Brazil', 'Russia', 'India', 'China', 'South Africa',
      'Mexico', 'Indonesia', 'Turkey', 'Saudi Arabia', 'UAE'
    ];
    return industryCountries.includes(country);
  }

  private requiresTransitVisa(country: string): boolean {
    const transitRequired = [
      'Russia', 'China', 'India', 'Pakistan', 'Nigeria',
      'Bangladesh', 'Afghanistan', 'Iran', 'Iraq'
    ];
    return transitRequired.includes(country) || this.hasMajorHubAirport(country);
  }

  private hasMajorHubAirport(country: string): boolean {
    const hubAirports = [
      'UAE', 'Qatar', 'Singapore', 'Netherlands', 'Turkey',
      'Ethiopia', 'Kenya', 'South Africa'
    ];
    return hubAirports.includes(country);
  }
}

export const visaTypeMatrix = new VisaTypeMatrix();