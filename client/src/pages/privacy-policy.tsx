import { useLanguage } from "@/lib/i18n";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {t('privacyPolicy')}
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataCollection')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('dataCollectionDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t('personalInformation')}: {t('personalInfoDesc')}</li>
                <li>{t('uploadedDocuments')}: {t('documentsDesc')}</li>
                <li>{t('paymentInformation')}: {t('paymentDesc')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('aiProcessing')}
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  {t('openaiProcessing')}
                </h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                  {t('openaiProcessingDesc')}
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>{t('dataRetention')}:</strong> {t('dataRetentionDesc')}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>{t('dataLocation')}:</strong> {t('dataLocationDesc')}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>{t('complianceStandards')}:</strong> {t('complianceDesc')}
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>{t('openaiTerms')}:</strong> {t('openaiTermsDesc')} 
                  <a 
                    href="https://openai.com/enterprise-privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100"
                  >
                    {t('openaiDpaLink')}
                  </a> {t('and')} 
                  <a 
                    href="https://openai.com/policies/api-data-usage-policies" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100"
                  >
                    {t('openaiDataPolicy')}
                  </a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataProtectionRights')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t('dataRightsDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>{t('accessRight')}:</strong> {t('accessRightDesc')}</li>
                <li><strong>{t('correctionRight')}:</strong> {t('correctionRightDesc')}</li>
                <li><strong>{t('deletionRight')}:</strong> {t('deletionRightDesc')}</li>
                <li><strong>{t('portabilityRight')}:</strong> {t('portabilityRightDesc')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataSecurityMeasures')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t('securityDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t('encryptionInTransit')}</li>
                <li>{t('encryptionAtRest')}</li>
                <li>{t('accessControls')}</li>
                <li>{t('automaticDeletion')}</li>
                <li>{t('securePaymentProcessing')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('cookiesTracking')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('cookiesDesc')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('contactPrivacy')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('contactPrivacyDesc')}
              </p>
            </section>

            <section className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>{t('lastUpdated')}:</strong> {t('lastUpdatedDate')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}