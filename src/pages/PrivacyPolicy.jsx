export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-poppins font-bold text-primaryNavy dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-neutralDark dark:text-neutralMedium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              We collect information you provide directly to us, including your name, email address, phone number, skills, experience, and other profile information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              We use the information we collect to provide, maintain, and improve our services, including matching you with relevant job opportunities.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              We do not share your personal information with third parties except as described in this policy or with your consent.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              4. Data Security
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              5. Your Rights
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              You have the right to access, update, or delete your personal information at any time through your account settings.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              6. Contact Us
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              If you have any questions about this Privacy Policy, please contact us at privacy@tseboiq.co.za
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
