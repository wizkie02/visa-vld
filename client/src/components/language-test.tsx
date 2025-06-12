import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LanguageTest() {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const testLanguages = ['en', 'vi', 'zh', 'es', 'fr', 'hi'];

  return (
    <Card className="max-w-2xl mx-auto m-4">
      <CardHeader>
        <CardTitle>Language Switching Test</CardTitle>
        <p>Current Language: {currentLanguage}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Quick Language Switch:</h3>
            <div className="flex flex-wrap gap-2">
              {testLanguages.map(lang => (
                <Button
                  key={lang}
                  variant={currentLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeLanguage(lang)}
                >
                  {availableLanguages.find(l => l.code === lang)?.nativeName || lang}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Translation Test:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>App Name:</strong> {t('appName')}
              </div>
              <div>
                <strong>Home Title:</strong> {t('homeTitle')}
              </div>
              <div>
                <strong>Start Validation:</strong> {t('startValidation')}
              </div>
              <div>
                <strong>Back:</strong> {t('back')}
              </div>
              <div>
                <strong>Next:</strong> {t('next')}
              </div>
              <div>
                <strong>Previous:</strong> {t('previous')}
              </div>
              <div>
                <strong>Tourist:</strong> {t('tourist')}
              </div>
              <div>
                <strong>Business:</strong> {t('business')}
              </div>
              <div>
                <strong>Personal Info:</strong> {t('personalInfo')}
              </div>
              <div>
                <strong>Full Name:</strong> {t('fullName')}
              </div>
              <div>
                <strong>Upload Files:</strong> {t('uploadFiles')}
              </div>
              <div>
                <strong>Payment:</strong> {t('payment')}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Navigation Test:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Step Destination:</strong> {t('stepDestination')}</div>
              <div><strong>Step Nationality:</strong> {t('stepNationality')}</div>
              <div><strong>Step Requirements:</strong> {t('stepRequirements')}</div>
              <div><strong>Step Upload:</strong> {t('stepUpload')}</div>
              <div><strong>Step Information:</strong> {t('stepInformation')}</div>
              <div><strong>Step Review:</strong> {t('stepReview')}</div>
              <div><strong>Step Payment:</strong> {t('stepPayment')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}