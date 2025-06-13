import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";
import { registerSchema, loginSchema, type RegisterData, type LoginData } from "@shared/schema";
import { Link } from "wouter";
import { Shield, Globe, Clock, FileCheck } from "lucide-react";

const nationalities = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  { value: "algerian", label: "Algerian" },
  { value: "american", label: "American" },
  { value: "australian", label: "Australian" },
  { value: "brazilian", label: "Brazilian" },
  { value: "british", label: "British" },
  { value: "canadian", label: "Canadian" },
  { value: "chinese", label: "Chinese" },
  { value: "dutch", label: "Dutch" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "indian", label: "Indian" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "russian", label: "Russian" },
  { value: "spanish", label: "Spanish" },
  { value: "vietnamese", label: "Vietnamese" },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useLanguage();
  const { register, login, isRegistering, isLoggingIn } = useAuth();

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
    login(data);
  };

  const onRegister = (data: RegisterData) => {
    register(data);
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
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? t('signingIn') : t('signIn')}
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
                          disabled={isRegistering || !registerForm.watch('dataProcessingConsent')}
                        >
                          {isRegistering ? t('creatingAccount') : t('createAccount')}
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