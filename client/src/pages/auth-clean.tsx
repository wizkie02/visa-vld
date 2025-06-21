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
import stackedLogo from "@assets/stacked_2@3x_1750492153267.webp";

const nationalities = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  { value: "algerian", label: "Algerian" },
  { value: "andorran", label: "Andorran" },
  { value: "angolan", label: "Angolan" },
  { value: "antiguans", label: "Antiguan or Barbudan" },
  { value: "argentinean", label: "Argentinean" },
  { value: "armenian", label: "Armenian" },
  { value: "australian", label: "Australian" },
  { value: "Austrian", label: "Austrian" },
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
  { value: "bosnian", label: "Bosnian or Herzegovinian" },
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
  { value: "cape_verdean", label: "Cape Verdean" },
  { value: "central_african", label: "Central African" },
  { value: "chadian", label: "Chadian" },
  { value: "chilean", label: "Chilean" },
  { value: "chinese", label: "Chinese" },
  { value: "colombian", label: "Colombian" },
  { value: "comoran", label: "Comoran" },
  { value: "congolese", label: "Congolese" },
  { value: "costa_rican", label: "Costa Rican" },
  { value: "croatian", label: "Croatian" },
  { value: "cuban", label: "Cuban" },
  { value: "cypriot", label: "Cypriot" },
  { value: "czech", label: "Czech" },
  { value: "danish", label: "Danish" },
  { value: "djibouti", label: "Djibouti" },
  { value: "dominican", label: "Dominican" },
  { value: "dutch", label: "Dutch" },
  { value: "east_timorese", label: "East Timorese" },
  { value: "ecuadorean", label: "Ecuadorean" },
  { value: "egyptian", label: "Egyptian" },
  { value: "emirian", label: "Emirian" },
  { value: "equatorial_guinean", label: "Equatorial Guinean" },
  { value: "eritrean", label: "Eritrean" },
  { value: "estonian", label: "Estonian" },
  { value: "ethiopian", label: "Ethiopian" },
  { value: "fijian", label: "Fijian" },
  { value: "filipino", label: "Filipino" },
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
  { value: "guinea_bissauan", label: "Guinea-Bissauan" },
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
  { value: "kittian_and_nevisian", label: "Kittian and Nevisian" },
  { value: "kuwaiti", label: "Kuwaiti" },
  { value: "kyrgyz", label: "Kyrgyz" },
  { value: "laotian", label: "Laotian" },
  { value: "latvian", label: "Latvian" },
  { value: "lebanese", label: "Lebanese" },
  { value: "liberian", label: "Liberian" },
  { value: "libyan", label: "Libyan" },
  { value: "liechtensteiner", label: "Liechtensteiner" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "luxembourger", label: "Luxembourger" },
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
  { value: "new_zealander", label: "New Zealander" },
  { value: "ni_vanuatu", label: "Ni-Vanuatu" },
  { value: "nicaraguan", label: "Nicaraguan" },
  { value: "nigerien", label: "Nigerien" },
  { value: "north_korean", label: "North Korean" },
  { value: "northern_irish", label: "Northern Irish" },
  { value: "norwegian", label: "Norwegian" },
  { value: "omani", label: "Omani" },
  { value: "pakistani", label: "Pakistani" },
  { value: "palauan", label: "Palauan" },
  { value: "panamanian", label: "Panamanian" },
  { value: "papua_new_guinean", label: "Papua New Guinean" },
  { value: "paraguayan", label: "Paraguayan" },
  { value: "peruvian", label: "Peruvian" },
  { value: "polish", label: "Polish" },
  { value: "portuguese", label: "Portuguese" },
  { value: "qatari", label: "Qatari" },
  { value: "romanian", label: "Romanian" },
  { value: "russian", label: "Russian" },
  { value: "rwandan", label: "Rwandan" },
  { value: "saint_lucian", label: "Saint Lucian" },
  { value: "salvadoran", label: "Salvadoran" },
  { value: "samoan", label: "Samoan" },
  { value: "san_marinese", label: "San Marinese" },
  { value: "sao_tomean", label: "Sao Tomean" },
  { value: "saudi", label: "Saudi" },
  { value: "scottish", label: "Scottish" },
  { value: "senegalese", label: "Senegalese" },
  { value: "serbian", label: "Serbian" },
  { value: "seychellois", label: "Seychellois" },
  { value: "sierra_leonean", label: "Sierra Leonean" },
  { value: "singaporean", label: "Singaporean" },
  { value: "slovakian", label: "Slovakian" },
  { value: "slovenian", label: "Slovenian" },
  { value: "solomon_islander", label: "Solomon Islander" },
  { value: "somali", label: "Somali" },
  { value: "south_african", label: "South African" },
  { value: "south_korean", label: "South Korean" },
  { value: "spanish", label: "Spanish" },
  { value: "sri_lankan", label: "Sri Lankan" },
  { value: "sudanese", label: "Sudanese" },
  { value: "surinamer", label: "Surinamer" },
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
  { value: "trinidadian_or_tobagonian", label: "Trinidadian or Tobagonian" },
  { value: "tunisian", label: "Tunisian" },
  { value: "turkish", label: "Turkish" },
  { value: "tuvaluan", label: "Tuvaluan" },
  { value: "ugandan", label: "Ugandan" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "uruguayan", label: "Uruguayan" },
  { value: "uzbekistani", label: "Uzbekistani" },
  { value: "venezuelan", label: "Venezuelan" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "welsh", label: "Welsh" },
  { value: "yemenite", label: "Yemenite" },
  { value: "zambian", label: "Zambian" },
  { value: "zimbabwean", label: "Zimbabwean" },
  { value: "american", label: "American" }
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useLanguage();
  const { registerMutation, loginMutation, user } = useNewAuth();
  const [, setLocation] = useLocation();

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
      firstName: "",
      lastName: "",
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={stackedLogo} alt="Visa Validator" className="h-24 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              AI-Powered Document Validation Service
            </p>
          </div>

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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                {t('agreeToDataProcessing')}
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                {t('dataProcessingConsent')}
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
  );
}