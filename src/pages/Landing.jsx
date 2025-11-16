import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
import { 
  UserCircle, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  Award,
  FileText,
  Search,
  Lock
} from 'lucide-react'

export default function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [hasProfile, setHasProfile] = useState(false)
  const [checkingProfile, setCheckingProfile] = useState(false)

  useEffect(() => {
    // Check if user has completed their profile
    const checkProfile = async () => {
      if (user) {
        setCheckingProfile(true)
        try {
          const { data, error } = await supabase
            .from('candidates')
            .select('id, full_name, phone, location')
            .eq('auth_id', user.id)
            .single()

          if (data && data.full_name && data.phone && data.location) {
            setHasProfile(true)
          } else {
            setHasProfile(false)
          }
        } catch (error) {
          setHasProfile(false)
        } finally {
          setCheckingProfile(false)
        }
      }
    }

    checkProfile()
  }, [user])

  const handleGetStarted = () => {
    if (user) {
      // User is authenticated
      if (hasProfile) {
        // Has completed profile, go to dashboard
        navigate('/dashboard/candidate')
      } else {
        // Needs to complete profile, go to onboarding
        navigate('/onboarding')
      }
    } else {
      // Not authenticated, go to auth page
      navigate('/auth')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,180,174,0.15),transparent)]"></div>
        
        <div className="container mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Smarter Talent. Better Matches. Your Future, Simplified.
            </h1>
            <p className="text-lg md:text-xl text-neutralMedium mb-12 max-w-2xl mx-auto">
              Build your profile, get matched to real roles, and start your next chapter with confidence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={handleGetStarted}
                disabled={checkingProfile}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl shadow-card hover:shadow-hover transition-brand duration-brand ease-brand hover:-translate-y-1 normal-case disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkingProfile ? 'Loading...' : user ? (hasProfile ? 'Go to Dashboard' : 'Complete Your Profile') : 'I\'m Looking for a Job'}
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 text-neutralMedium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm md:text-base">1000+ Matches Made</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm md:text-base">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm md:text-base">POPIA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-primaryLight transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-primary dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutralDark max-w-2xl mx-auto">
              Three simple steps to unlock your career potential
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl bg-primary shadow-card hover:shadow-hover hover:-translate-y-1 transition-brand duration-brand ease-brand p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl text-white mb-3">
                Create Your Profile
              </h3>
              <p className="text-neutralMedium leading-relaxed">
                Tell us about your skills, experience, and career goals. Our smart onboarding makes it quick and easy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-primary shadow-card hover:shadow-hover hover:-translate-y-1 transition-brand duration-brand ease-brand p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl text-white mb-3">
                We Match You to Roles
              </h3>
              <p className="text-neutralMedium leading-relaxed">
                Our AI-powered algorithm analyzes your profile and finds the best opportunities that match your unique strengths.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-primary shadow-card hover:shadow-hover hover:-translate-y-1 transition-brand duration-brand ease-brand p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl text-white mb-3">
                Apply & Get Seen
              </h3>
              <p className="text-neutralMedium leading-relaxed">
                Review your top matches, apply with confidence, and let employers discover your potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 6 Cards Grid */}
      <section className="py-20 px-6 md:px-12 bg-neutralLight dark:bg-primary transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-primary dark:text-white mb-4">
              Why Choose tseboIQ?
            </h2>
            <p className="text-lg text-neutralDark max-w-2xl mx-auto">
              Everything you need to succeed in your job search
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                AI-Powered Matching
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Advanced algorithms match your skills with the perfect opportunities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Youth-Focused
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Built specifically for young South Africans entering the job market.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Fast & Simple
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Create your profile in minutes and start discovering opportunities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Your data is protected with enterprise-grade security and POPIA compliance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Quality Opportunities
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Access verified job listings from trusted South African employers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl bg-primary shadow-card p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Smart Search
              </h3>
              <p className="text-neutralDark leading-relaxed">
                Find roles that truly match your skills, experience, and aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Let Your CV Do the Talking Section */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-primaryLight transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="bg-gradient-to-br from-primary to-[#0A3A48] rounded-2xl p-8 md:p-12">
              <div className="inline-block bg-accent text-white font-medium rounded-full px-4 py-1 text-sm mb-6">
                For Job Seekers
              </div>
              <h2 className="font-heading text-4xl font-semibold text-white mb-8">
                Let Your CV Do the Talking
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-neutralMedium">
                    Upload your CV and let our AI extract your skills automatically
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-neutralMedium">
                    Get matched to roles that align with your experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-neutralMedium">
                    Stand out with a professional, AI-optimized profile
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-neutralMedium">
                    Track your applications and get real-time updates
                  </span>
                </li>
              </ul>
              <Button 
                onClick={handleGetStarted}
                disabled={checkingProfile}
                className="bg-gradient-button text-primary font-semibold px-6 py-3 rounded-xl shadow-hover hover:shadow-glow transition-brand duration-brand ease-brand normal-case disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkingProfile ? 'Loading...' : user ? (hasProfile ? 'Go to Dashboard' : 'Complete Your Profile') : 'Upload Your CV Now'}
              </Button>
            </div>

            {/* Right Side - Mock Input Panel */}
            <div className="rounded-xl bg-primary shadow-glow p-8 border border-accent/20">
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <div className="bg-primaryLight rounded-lg px-4 py-3 text-neutralMedium">
                    John Doe
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email Address</label>
                  <div className="bg-primaryLight rounded-lg px-4 py-3 text-neutralMedium">
                    john.doe@example.com
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Upload CV</label>
                  <div className="bg-primaryLight rounded-lg px-4 py-3 border-2 border-dashed border-accent/30 text-center">
                    <FileText className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-neutralMedium text-sm">Drag & drop or click to upload</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutralMedium text-sm">
                  <Lock className="w-4 h-4 text-accent" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-primary to-primaryLight">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg md:text-xl text-neutralMedium mb-10 max-w-2xl mx-auto">
            Join thousands of young South Africans already using tseboIQ to discover their career path.
          </p>
          <Button 
            size="lg"
            onClick={handleGetStarted}
            disabled={checkingProfile}
            className="bg-gradient-button text-primary font-semibold text-lg px-12 py-4 rounded-xl shadow-hover hover:shadow-glow transition-brand duration-brand ease-brand hover:-translate-y-1 normal-case disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkingProfile ? 'Loading...' : user ? (hasProfile ? 'Go to Dashboard' : 'Complete Your Profile') : 'Get Started Today'}
          </Button>
        </div>
      </section>
    </div>
  )
}
