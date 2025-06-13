import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { personalInfoSchema, type PersonalInfo } from "@shared/schema";
import type { ValidationData } from "@/pages/validation";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

interface PersonalInfoFormProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

const nationalities = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  { value: "algerian", label: "Algerian" },
  { value: "andorran", label: "Andorran" },
  { value: "angolan", label: "Angolan" },
  { value: "argentinian", label: "Argentinian" },
  { value: "armenian", label: "Armenian" },
  { value: "australian", label: "Australian" },
  { value: "austrian", label: "Austrian" },
  { value: "azerbaijani", label: "Azerbaijani" },
  { value: "bahraini", label: "Bahraini" },
  { value: "bangladeshi", label: "Bangladeshi" },
  { value: "belarusian", label: "Belarusian" },
  { value: "belgian", label: "Belgian" },
  { value: "belizean", label: "Belizean" },
  { value: "beninese", label: "Beninese" },
  { value: "bhutanese", label: "Bhutanese" },
  { value: "bolivian", label: "Bolivian" },
  { value: "bosnian", label: "Bosnian" },
  { value: "botswanan", label: "Botswanan" },
  { value: "brazilian", label: "Brazilian" },
  { value: "bruneian", label: "Bruneian" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "burkinabe", label: "Burkinabé" },
  { value: "burundian", label: "Burundian" },
  { value: "cambodian", label: "Cambodian" },
  { value: "cameroonian", label: "Cameroonian" },
  { value: "canadian", label: "Canadian" },
  { value: "cape-verdean", label: "Cape Verdean" },
  { value: "chadian", label: "Chadian" },
  { value: "chilean", label: "Chilean" },
  { value: "chinese", label: "Chinese" },
  { value: "colombian", label: "Colombian" },
  { value: "comorian", label: "Comorian" },
  { value: "congolese", label: "Congolese" },
  { value: "costa-rican", label: "Costa Rican" },
  { value: "croatian", label: "Croatian" },
  { value: "cuban", label: "Cuban" },
  { value: "cypriot", label: "Cypriot" },
  { value: "czech", label: "Czech" },
  { value: "danish", label: "Danish" },
  { value: "djiboutian", label: "Djiboutian" },
  { value: "dominican", label: "Dominican" },
  { value: "ecuadorian", label: "Ecuadorian" },
  { value: "egyptian", label: "Egyptian" },
  { value: "salvadoran", label: "Salvadoran" },
  { value: "estonian", label: "Estonian" },
  { value: "eswatini", label: "Eswatini" },
  { value: "ethiopian", label: "Ethiopian" },
  { value: "fijian", label: "Fijian" },
  { value: "finnish", label: "Finnish" },
  { value: "french", label: "French" },
  { value: "gabonese", label: "Gabonese" },
  { value: "gambian", label: "Gambian" },
  { value: "georgian", label: "Georgian" },
  { value: "german", label: "German" },
  { value: "ghanaian", label: "Ghanaian" },
  { value: "greek", label: "Greek" },
  { value: "guatemalan", label: "Guatemalan" },
  { value: "guinean", label: "Guinean" },
  { value: "guyanese", label: "Guyanese" },
  { value: "haitian", label: "Haitian" },
  { value: "honduran", label: "Honduran" },
  { value: "hungarian", label: "Hungarian" },
  { value: "icelandic", label: "Icelandic" },
  { value: "indian", label: "Indian" },
  { value: "indonesian", label: "Indonesian" },
  { value: "iranian", label: "Iranian" },
  { value: "iraqi", label: "Iraqi" },
  { value: "irish", label: "Irish" },
  { value: "israeli", label: "Israeli" },
  { value: "italian", label: "Italian" },
  { value: "ivorian", label: "Ivorian" },
  { value: "jamaican", label: "Jamaican" },
  { value: "japanese", label: "Japanese" },
  { value: "jordanian", label: "Jordanian" },
  { value: "kazakh", label: "Kazakh" },
  { value: "kenyan", label: "Kenyan" },
  { value: "kuwaiti", label: "Kuwaiti" },
  { value: "kyrgyz", label: "Kyrgyz" },
  { value: "laotian", label: "Laotian" },
  { value: "latvian", label: "Latvian" },
  { value: "lebanese", label: "Lebanese" },
  { value: "lesotho", label: "Lesotho" },
  { value: "liberian", label: "Liberian" },
  { value: "libyan", label: "Libyan" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "luxembourgish", label: "Luxembourgish" },
  { value: "malagasy", label: "Malagasy" },
  { value: "malawian", label: "Malawian" },
  { value: "malaysian", label: "Malaysian" },
  { value: "maldivian", label: "Maldivian" },
  { value: "malian", label: "Malian" },
  { value: "maltese", label: "Maltese" },
  { value: "mauritanian", label: "Mauritanian" },
  { value: "mauritian", label: "Mauritian" },
  { value: "mexican", label: "Mexican" },
  { value: "moldovan", label: "Moldovan" },
  { value: "monégasque", label: "Monégasque" },
  { value: "mongolian", label: "Mongolian" },
  { value: "montenegrin", label: "Montenegrin" },
  { value: "moroccan", label: "Moroccan" },
  { value: "mozambican", label: "Mozambican" },
  { value: "burmese", label: "Burmese" },
  { value: "namibian", label: "Namibian" },
  { value: "nepalese", label: "Nepalese" },
  { value: "dutch", label: "Dutch" },
  { value: "new-zealander", label: "New Zealander" },
  { value: "nicaraguan", label: "Nicaraguan" },
  { value: "nigerien", label: "Nigerien" },
  { value: "nigerian", label: "Nigerian" },
  { value: "north-korean", label: "North Korean" },
  { value: "macedonian", label: "Macedonian" },
  { value: "norwegian", label: "Norwegian" },
  { value: "omani", label: "Omani" },
  { value: "pakistani", label: "Pakistani" },
  { value: "panamanian", label: "Panamanian" },
  { value: "papua-new-guinean", label: "Papua New Guinean" },
  { value: "paraguayan", label: "Paraguayan" },
  { value: "peruvian", label: "Peruvian" },
  { value: "filipino", label: "Filipino" },
  { value: "polish", label: "Polish" },
  { value: "portuguese", label: "Portuguese" },
  { value: "qatari", label: "Qatari" },
  { value: "romanian", label: "Romanian" },
  { value: "russian", label: "Russian" },
  { value: "rwandan", label: "Rwandan" },
  { value: "samoan", label: "Samoan" },
  { value: "san-marinese", label: "San Marinese" },
  { value: "saudi", label: "Saudi" },
  { value: "senegalese", label: "Senegalese" },
  { value: "serbian", label: "Serbian" },
  { value: "seychellois", label: "Seychellois" },
  { value: "sierra-leonean", label: "Sierra Leonean" },
  { value: "singaporean", label: "Singaporean" },
  { value: "slovak", label: "Slovak" },
  { value: "slovenian", label: "Slovenian" },
  { value: "solomon-islander", label: "Solomon Islander" },
  { value: "somali", label: "Somali" },
  { value: "south-african", label: "South African" },
  { value: "south-korean", label: "South Korean" },
  { value: "south-sudanese", label: "South Sudanese" },
  { value: "spanish", label: "Spanish" },
  { value: "sri-lankan", label: "Sri Lankan" },
  { value: "sudanese", label: "Sudanese" },
  { value: "surinamese", label: "Surinamese" },
  { value: "swedish", label: "Swedish" },
  { value: "swiss", label: "Swiss" },
  { value: "syrian", label: "Syrian" },
  { value: "taiwanese", label: "Taiwanese" },
  { value: "tajik", label: "Tajik" },
  { value: "tanzanian", label: "Tanzanian" },
  { value: "thai", label: "Thai" },
  { value: "timorese", label: "Timorese" },
  { value: "togolese", label: "Togolese" },
  { value: "tongan", label: "Tongan" },
  { value: "trinidadian", label: "Trinidadian" },
  { value: "tunisian", label: "Tunisian" },
  { value: "turkish", label: "Turkish" },
  { value: "turkmen", label: "Turkmen" },
  { value: "ugandan", label: "Ugandan" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "emirati", label: "Emirati" },
  { value: "british", label: "British" },
  { value: "american", label: "American" },
  { value: "uruguayan", label: "Uruguayan" },
  { value: "uzbek", label: "Uzbek" },
  { value: "ni-vanuatu", label: "Ni-Vanuatu" },
  { value: "vatican", label: "Vatican" },
  { value: "venezuelan", label: "Venezuelan" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "yemeni", label: "Yemeni" },
  { value: "zambian", label: "Zambian" },
  { value: "zimbabwean", label: "Zimbabwean" }
];

export default function PersonalInfoForm({ data, onUpdate, onNext, onPrevious }: PersonalInfoFormProps) {
  const { t } = useLanguage();
  
  // Fetch user data for auto-population
  const { data: userData } = useQuery({
    queryKey: ['/api/user'],
    retry: false,
  });

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
  });

  // Auto-populate form with user data when available
  useEffect(() => {
    if (userData && userData.firstName && userData.lastName && userData.nationality) {
      const currentValues = form.getValues();
      
      // Only auto-populate if fields are empty
      if (!currentValues.applicantName && userData.firstName && userData.lastName) {
        form.setValue('applicantName', `${userData.firstName} ${userData.lastName}`);
      }
      
      if (!currentValues.nationality && userData.nationality) {
        form.setValue('nationality', userData.nationality);
      }
    }
  }, [userData, form]);

  const onSubmit = (values: PersonalInfo) => {
    onUpdate({ personalInfo: values });
    onNext();
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('personalInformation')}</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('fullName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('passportNumber')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('passportNumber')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dateOfBirth')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('nationality')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectNationalityPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalities.map((nationality) => (
                          <SelectItem key={nationality.value} value={nationality.value}>
                            {nationality.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('plannedTravelDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('durationOfStay')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder={t('daysPlaceholder')} 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Data Processing Consent */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <FormField
                control={form.control}
                name="dataProcessingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        {t('dataProcessingConsent')}
                      </FormLabel>
                      <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                        {t('dataProcessingConsentText')}
                      </p>
                      <Link href="/privacy-policy">
                        <span className="text-xs text-blue-700 dark:text-blue-300 underline hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer">
                          {t('learnMorePrivacy')}
                        </span>
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={onPrevious} className="flex-1">
                {t('previous')}
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-700 hover:bg-blue-800"
                disabled={!form.watch('dataProcessingConsent')}
              >
                {t('next')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
