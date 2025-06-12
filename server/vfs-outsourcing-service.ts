// VFS Global outsourcing check service
// Countries and visa types that are outsourced to VFS Global

interface VFSOutsourcingInfo {
  isOutsourced: boolean;
  provider: string;
  website: string;
  applicationCenter: string;
  notes?: string;
}

// Database of countries and visa types outsourced to VFS Global
const VFS_OUTSOURCED_COUNTRIES: Record<string, Record<string, VFSOutsourcingInfo>> = {
  "United Kingdom": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.co.uk/",
      applicationCenter: "VFS Global UK Visa Application Centre",
      notes: "All UK visa applications must be submitted through VFS Global centers"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.co.uk/",
      applicationCenter: "VFS Global UK Visa Application Centre"
    },
    "student": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.co.uk/",
      applicationCenter: "VFS Global UK Visa Application Centre"
    }
  },
  "Canada": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.ca/",
      applicationCenter: "VFS Global Canada Visa Application Centre",
      notes: "Biometrics and application submission through VFS Global"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.ca/",
      applicationCenter: "VFS Global Canada Visa Application Centre"
    },
    "student": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.ca/",
      applicationCenter: "VFS Global Canada Visa Application Centre"
    }
  },
  "Italy": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/italy/",
      applicationCenter: "VFS Global Italy Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/italy/",
      applicationCenter: "VFS Global Italy Visa Application Centre"
    }
  },
  "France": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/france/",
      applicationCenter: "VFS Global France Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/france/",
      applicationCenter: "VFS Global France Visa Application Centre"
    }
  },
  "Spain": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/spain/",
      applicationCenter: "VFS Global Spain Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/spain/",
      applicationCenter: "VFS Global Spain Visa Application Centre"
    }
  },
  "Denmark": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/denmark/",
      applicationCenter: "VFS Global Denmark Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/denmark/",
      applicationCenter: "VFS Global Denmark Visa Application Centre"
    }
  },
  "Norway": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/norway/",
      applicationCenter: "VFS Global Norway Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/norway/",
      applicationCenter: "VFS Global Norway Visa Application Centre"
    }
  },
  "Sweden": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/sweden/",
      applicationCenter: "VFS Global Sweden Visa Application Centre"
    },
    "business": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/sweden/",
      applicationCenter: "VFS Global Sweden Visa Application Centre"
    }
  },
  "Finland": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/finland/",
      applicationCenter: "VFS Global Finland Visa Application Centre"
    }
  },
  "Belgium": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/belgium/",
      applicationCenter: "VFS Global Belgium Visa Application Centre"
    }
  },
  "Austria": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/austria/",
      applicationCenter: "VFS Global Austria Visa Application Centre"
    }
  },
  "India": {
    "tourist": {
      isOutsourced: true,
      provider: "VFS Global",
      website: "https://www.vfsglobal.com/india/",
      applicationCenter: "VFS Global India Visa Application Centre",
      notes: "Tourist visa applications for many countries processed through VFS Global"
    }
  }
};

export function checkVFSOutsourcing(country: string, visaType: string): VFSOutsourcingInfo {
  const countryData = VFS_OUTSOURCED_COUNTRIES[country];
  
  if (!countryData) {
    return {
      isOutsourced: false,
      provider: "Embassy/Consulate",
      website: "",
      applicationCenter: "Embassy or Consulate"
    };
  }
  
  const visaTypeData = countryData[visaType.toLowerCase()];
  
  if (!visaTypeData) {
    return {
      isOutsourced: false,
      provider: "Embassy/Consulate", 
      website: "",
      applicationCenter: "Embassy or Consulate"
    };
  }
  
  return visaTypeData;
}

export function getAllVFSCountries(): string[] {
  return Object.keys(VFS_OUTSOURCED_COUNTRIES);
}

export function getVFSVisaTypes(country: string): string[] {
  const countryData = VFS_OUTSOURCED_COUNTRIES[country];
  return countryData ? Object.keys(countryData) : [];
}