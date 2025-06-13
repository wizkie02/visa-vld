import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNewAuth } from "@/hooks/use-new-auth";
import { useLanguage } from "@/lib/i18n";
import { registerSchema, loginSchema, type RegisterData, type LoginData } from "@shared/schema";
import { Link, useLocation } from "wouter";
import { Shield, Globe, Clock, FileCheck } from "lucide-react";

const nationalities = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  { value: "algerian", label: "Algerian" },
  { value: "andorran", label: "Andorran" },
  { value: "angolan", label: "Angolan" },
  { value: "antiguan", label: "Antiguan" },
  { value: "argentinian", label: "Argentinian" },
  { value: "armenian", label: "Armenian" },
  { value: "australian", label: "Australian" },
  { value: "austrian", label: "Austrian" },
  { value: "azerbaijani", label: "Azerbaijani" },
  { value: "bahamian", label: "Bahamian" },
  { value: "bahraini", label: "Bahraini" },
  { value: "bangladeshi", label: "Bangladeshi" },
  { value: "barbadian", label: "Barbadian" },
  { value: "belarusian", label: "Belarusian" },
  { value: "belgian", label: "Belgian" },
  { value: "belizean", label: "Belizean" },
  { value: "beninese", label: "Beninese" },
  { value: "bhutanese", label: "Bhutanese" },
  { value: "bolivian", label: "Bolivian" },
  { value: "bosnian", label: "Bosnian" },
  { value: "botswanan", label: "Botswanan" },
  { value: "brazilian", label: "Brazilian" },
  { value: "british", label: "British" },
  { value: "bruneian", label: "Bruneian" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "burkinabe", label: "Burkinabe" },
  { value: "burmese", label: "Burmese" },
  { value: "burundian", label: "Burundian" },
  { value: "cambodian", label: "Cambodian" },
  { value: "cameroonian", label: "Cameroonian" },
  { value: "canadian", label: "Canadian" },
  { value: "cape-verdean", label: "Cape Verdean" },
  { value: "central-african", label: "Central African" },
  { value: "chadian", label: "Chadian" },
  { value: "chilean", label: "Chilean" },
  { value: "chinese", label: "Chinese" },
  { value: "colombian", label: "Colombian" },
  { value: "comoran", label: "Comoran" },
  { value: "congolese", label: "Congolese" },
  { value: "costa-rican", label: "Costa Rican" },
  { value: "croatian", label: "Croatian" },
  { value: "cuban", label: "Cuban" },
  { value: "cypriot", label: "Cypriot" },
  { value: "czech", label: "Czech" },
  { value: "danish", label: "Danish" },
  { value: "djiboutian", label: "Djiboutian" },
  { value: "dominican", label: "Dominican" },
  { value: "dutch", label: "Dutch" },
  { value: "east-timorese", label: "East Timorese" },
  { value: "ecuadorean", label: "Ecuadorean" },
  { value: "egyptian", label: "Egyptian" },
  { value: "emirian", label: "Emirian" },
  { value: "equatorial-guinean", label: "Equatorial Guinean" },
  { value: "eritrean", label: "Eritrean" },
  { value: "estonian", label: "Estonian" },
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
  { value: "grenadian", label: "Grenadian" },
  { value: "guatemalan", label: "Guatemalan" },
  { value: "guinea-bissauan", label: "Guinea-Bissauan" },
  { value: "guinean", label: "Guinean" },
  { value: "guyanese", label: "Guyanese" },
  { value: "haitian", label: "Haitian" },
  { value: "herzegovinian", label: "Herzegovinian" },
  { value: "honduran", label: "Honduran" },
  { value: "hungarian", label: "Hungarian" },
  { value: "icelander", label: "Icelander" },
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
  { value: "kazakhstani", label: "Kazakhstani" },
  { value: "kenyan", label: "Kenyan" },
  { value: "kittian", label: "Kittian" },
  { value: "kuwaiti", label: "Kuwaiti" },
  { value: "kyrgyz", label: "Kyrgyz" },
  { value: "laotian", label: "Laotian" },
  { value: "latvian", label: "Latvian" },
  { value: "lebanese", label: "Lebanese" },
  { value: "liberian", label: "Liberian" },
  { value: "libyan", label: "Libyan" },
  { value: "liechtensteiner", label: "Liechtensteiner" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "luxembourgish", label: "Luxembourgish" },
  { value: "macedonian", label: "Macedonian" },
  { value: "malagasy", label: "Malagasy" },
  { value: "malawian", label: "Malawian" },
  { value: "malaysian", label: "Malaysian" },
  { value: "maldivan", label: "Maldivan" },
  { value: "malian", label: "Malian" },
  { value: "maltese", label: "Maltese" },
  { value: "marshallese", label: "Marshallese" },
  { value: "mauritanian", label: "Mauritanian" },
  { value: "mauritian", label: "Mauritian" },
  { value: "mexican", label: "Mexican" },
  { value: "micronesian", label: "Micronesian" },
  { value: "moldovan", label: "Moldovan" },
  { value: "monacan", label: "Monacan" },
  { value: "mongolian", label: "Mongolian" },
  { value: "moroccan", label: "Moroccan" },
  { value: "mosotho", label: "Mosotho" },
  { value: "motswana", label: "Motswana" },
  { value: "mozambican", label: "Mozambican" },
  { value: "namibian", label: "Namibian" },
  { value: "nauruan", label: "Nauruan" },
  { value: "nepalese", label: "Nepalese" },
  { value: "new-zealander", label: "New Zealander" },
  { value: "ni-vanuatu", label: "Ni-Vanuatu" },
  { value: "nicaraguan", label: "Nicaraguan" },
  { value: "nigerian", label: "Nigerian" },
  { value: "nigerien", label: "Nigerien" },
  { value: "north-korean", label: "North Korean" },
  { value: "northern-irish", label: "Northern Irish" },
  { value: "norwegian", label: "Norwegian" },
  { value: "omani", label: "Omani" },
  { value: "pakistani", label: "Pakistani" },
  { value: "palauan", label: "Palauan" },
  { value: "panamanian", label: "Panamanian" },
  { value: "papua-new-guinean", label: "Papua New Guinean" },
  { value: "paraguayan", label: "Paraguayan" },
  { value: "peruvian", label: "Peruvian" },
  { value: "philippine", label: "Philippine" },
  { value: "polish", label: "Polish" },
  { value: "portuguese", label: "Portuguese" },
  { value: "qatari", label: "Qatari" },
  { value: "romanian", label: "Romanian" },
  { value: "russian", label: "Russian" },
  { value: "rwandan", label: "Rwandan" },
  { value: "saint-lucian", label: "Saint Lucian" },
  { value: "salvadoran", label: "Salvadoran" },
  { value: "samoan", label: "Samoan" },
  { value: "san-marinese", label: "San Marinese" },
  { value: "sao-tomean", label: "Sao Tomean" },
  { value: "saudi", label: "Saudi" },
  { value: "scottish", label: "Scottish" },
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
  { value: "spanish", label: "Spanish" },
  { value: "sri-lankan", label: "Sri Lankan" },
  { value: "sudanese", label: "Sudanese" },
  { value: "surinamese", label: "Surinamese" },
  { value: "swazi", label: "Swazi" },
  { value: "swedish", label: "Swedish" },
  { value: "swiss", label: "Swiss" },
  { value: "syrian", label: "Syrian" },
  { value: "taiwanese", label: "Taiwanese" },
  { value: "tajik", label: "Tajik" },
  { value: "tanzanian", label: "Tanzanian" },
  { value: "thai", label: "Thai" },
  { value: "togolese", label: "Togolese" },
  { value: "tongan", label: "Tongan" },
  { value: "trinidadian", label: "Trinidadian" },
  { value: "tunisian", label: "Tunisian" },
  { value: "turkish", label: "Turkish" },
  { value: "tuvaluan", label: "Tuvaluan" },
  { value: "ugandan", label: "Ugandan" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "uruguayan", label: "Uruguayan" },
  { value: "american", label: "American" },
  { value: "uzbekistani", label: "Uzbekistani" },
  { value: "venezuelan", label: "Venezuelan" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "welsh", label: "Welsh" },
  { value: "yemenite", label: "Yemenite" },
  { value: "zambian", label: "Zambian" },
  { value: "zimbabwean", label: "Zimbabwean" },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useLanguage();
  const { registerMutation, loginMutation, user } = useNewAuth();
  const [, setLocation] = useLocation();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      nationality: "",
      dataProcessingConsent: false,
    },
  });

  const onLogin = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('heroSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-3 inline-block">
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('secureValidation')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('secureValidationDesc')}</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-3 inline-block">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('quickProcessing')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('quickProcessingDesc')}</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 mb-3 inline-block">
                  <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('globalSupport')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('globalSupportDesc')}</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 mb-3 inline-block">
                  <FileCheck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('comprehensiveReports')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('comprehensiveReportsDesc')}</p>
              </div>
            </div>
          </div>

          {/* Authentication Forms */}
          <div className="max-w-md mx-auto w-full">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('welcomeBack')}</CardTitle>
                <CardDescription>{t('accessYourAccount')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">{t('signIn')}</TabsTrigger>
                    <TabsTrigger value="register">{t('signUp')}</TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('username')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('enterUsername')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('password')}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t('enterPassword')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? t('signingIn') : t('signIn')}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('username')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('chooseUsername')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('firstName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('enterFirstName')} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('lastName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('enterLastName')} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('password')}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t('createPassword')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('nationality')}</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('selectNationality')} />
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
                          control={registerForm.control}
                          name="dataProcessingConsent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm">
                                  {t('dataProcessingConsent')}
                                </FormLabel>
                                <p className="text-xs text-muted-foreground">
                                  {t('dataProcessingConsentText')}
                                </p>
                                <Link href="/privacy-policy">
                                  <span className="text-xs text-blue-600 hover:text-blue-800 underline">
                                    {t('learnMorePrivacy')}
                                  </span>
                                </Link>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={registerMutation.isPending || !registerForm.watch('dataProcessingConsent')}
                        >
                          {registerMutation.isPending ? t('creatingAccount') : t('createAccount')}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}