export default function TermsOfService() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-poppins font-bold text-primaryNavy dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-neutralDark dark:text-neutralMedium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              By accessing and using tseboIQ, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              2. Use License
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              Permission is granted to temporarily use tseboIQ for personal, non-commercial purposes only.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              3. User Account
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              4. Prohibited Uses
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              You may not use tseboIQ for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              5. Disclaimer
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              The materials on tseboIQ are provided on an 'as is' basis. tseboIQ makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              6. Limitations
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              In no event shall tseboIQ or its suppliers be liable for any damages arising out of the use or inability to use the materials on tseboIQ.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mt-8 mb-4">
              7. Contact
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium">
              If you have any questions about these Terms, please contact us at legal@tseboiq.co.za
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
