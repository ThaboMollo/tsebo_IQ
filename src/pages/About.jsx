export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-poppins font-bold text-primaryNavy dark:text-white mb-8">
          About tseboIQ
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-neutralDark dark:text-neutralMedium mb-6">
            tseboIQ is a modern, AI-powered talent intelligence platform designed specifically for young South Africans entering the job market.
          </p>
          
          <h2 className="text-3xl font-poppins font-semibold text-primaryNavy dark:text-white mt-12 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-neutralDark dark:text-neutralMedium mb-6">
            We believe that every young person deserves access to opportunities that match their unique skills and potential. Our mission is to bridge the gap between talent and opportunity using cutting-edge AI technology.
          </p>
          
          <h2 className="text-3xl font-poppins font-semibold text-primaryNavy dark:text-white mt-12 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutralDark dark:text-neutralMedium mb-6">
            Our intelligent matching algorithm analyzes your skills, experience, and profile to connect you with opportunities that truly fit. We use a combination of keyword matching, weighted scoring, and AI embeddings to ensure the best possible matches.
          </p>
          
          <h2 className="text-3xl font-poppins font-semibold text-primaryNavy dark:text-white mt-12 mb-4">
            Built for Youth
          </h2>
          <p className="text-lg text-neutralDark dark:text-neutralMedium mb-6">
            We understand the challenges facing young South Africans in today's job market. That's why we've created a platform that's not just functional, but also engaging, modern, and easy to use.
          </p>
        </div>
      </div>
    </div>
  )
}
