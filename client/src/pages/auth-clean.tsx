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

const nationalities = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albanian" },
  { value: "algerian", label: "Algerian" },
  { value: "american", label: "American" },
  { value: "australian", label: "Australian" },
  { value: "british", label: "British" },
  { value: "canadian", label: "Canadian" },
  { value: "chinese", label: "Chinese" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "indian", label: "Indian" },
  { value: "japanese", label: "Japanese" },
  { value: "russian", label: "Russian" },
  { value: "spanish", label: "Spanish" }
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('heroTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('heroSubtitle')}
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