import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Button, Progress } from '@material-tailwind/react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { supabase } from '../lib/supabase'
import { getTopMatches } from '../lib/matching'

export default function CandidateDashboard() {
  const [profile, setProfile] = useState(null)
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [matchedJobs, setMatchedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { showToast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Load candidate profile
      const { data: candidate, error: candidateError } = await supabase
        .from('candidates')
        .select('*')
        .eq('auth_id', user.id)
        .single()

      if (candidateError) throw candidateError

      setProfile(candidate)

      // Load skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('skill_name')
        .eq('candidate_id', candidate.id)

      setSkills(skillsData?.map(s => s.skill_name) || [])

      // Load experience
      const { data: experienceData } = await supabase
        .from('experience')
        .select('*')
        .eq('candidate_id', candidate.id)

      setExperience(experienceData || [])

      // Load jobs and calculate matches
      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')

      if (jobs && jobs.length > 0) {
        const candidateProfile = {
          skills: skillsData?.map(s => s.skill_name) || [],
          experience_years: candidate.experience_years || 0,
          highest_qualification: candidate.highest_qualification || '',
          bio: candidate.bio || ''
        }

        const matches = await getTopMatches(candidateProfile, jobs, 3)
        setMatchedJobs(matches)
      } else {
        // Demo jobs if none exist
        setMatchedJobs([])
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentTeal mx-auto mb-4"></div>
          <p className="text-neutralDark dark:text-neutralMedium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="dark:bg-primaryLight max-w-md">
          <CardBody className="text-center">
            <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
              Complete Your Profile
            </h2>
            <p className="text-neutralDark dark:text-neutralMedium mb-6">
              Let's get started by setting up your profile to find the best job matches.
            </p>
            <Link to="/onboarding">
              <Button className="gradient-cta">
                Complete Profile
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-poppins font-bold text-primaryNavy dark:text-white">
            Welcome back, {profile.full_name}!
          </h1>
          <Link to="/onboarding">
            <Button className="bg-accentTeal hover:bg-accentLight transition-smooth">
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-hover dark:bg-primaryLight">
              <CardBody>
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Your Profile
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-neutralDark dark:text-neutralMedium">Email</p>
                    <p className="font-medium text-primaryNavy dark:text-white">{profile.email}</p>
                  </div>
                  
                  {profile.phone && (
                    <div>
                      <p className="text-sm text-neutralDark dark:text-neutralMedium">Phone</p>
                      <p className="font-medium text-primaryNavy dark:text-white">{profile.phone}</p>
                    </div>
                  )}
                  
                  {profile.location && (
                    <div>
                      <p className="text-sm text-neutralDark dark:text-neutralMedium">Location</p>
                      <p className="font-medium text-primaryNavy dark:text-white">{profile.location}</p>
                    </div>
                  )}
                  
                  {profile.highest_qualification && (
                    <div>
                      <p className="text-sm text-neutralDark dark:text-neutralMedium">Qualification</p>
                      <p className="font-medium text-primaryNavy dark:text-white">{profile.highest_qualification}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-neutralDark dark:text-neutralMedium">Experience</p>
                    <p className="font-medium text-primaryNavy dark:text-white">{profile.experience_years} years</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="card-hover dark:bg-primaryLight">
              <CardBody>
                <h3 className="text-xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Skills
                </h3>
                
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accentTeal text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutralDark dark:text-neutralMedium">No skills added yet</p>
                )}
              </CardBody>
            </Card>

            {profile.bio && (
              <Card className="card-hover dark:bg-primaryLight">
                <CardBody>
                  <h3 className="text-xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                    Bio
                  </h3>
                  <p className="text-neutralDark dark:text-neutralMedium">{profile.bio}</p>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Matched Jobs */}
            <Card className="dark:bg-primaryLight">
              <CardBody>
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-6">
                  Your Top Job Matches
                </h2>
                
                {matchedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {matchedJobs.map((job, index) => (
                      <Card key={index} className="card-hover dark:bg-primaryNavy">
                        <CardBody>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-poppins font-semibold text-primaryNavy dark:text-white">
                                {job.title}
                              </h3>
                              <p className="text-sm text-neutralDark dark:text-neutralMedium mt-1">
                                Match Score: {(job.matchScore * 100).toFixed(0)}%
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="inline-block px-3 py-1 bg-success text-white rounded-full text-sm">
                                #{index + 1} Match
                              </span>
                            </div>
                          </div>
                          
                          <Progress
                            value={job.matchScore * 100}
                            color="teal"
                            className="mb-3"
                          />
                          
                          <p className="text-neutralDark dark:text-neutralMedium mb-4">
                            {job.description}
                          </p>
                          
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-primaryNavy dark:text-white mb-2">
                              Required Skills:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {job.required_skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-1 rounded text-xs ${
                                    skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                                      ? 'bg-success text-white'
                                      : 'bg-neutralMedium dark:bg-primaryLight text-neutralDark dark:text-neutralMedium'
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-sm text-neutralDark dark:text-neutralMedium">
                            <p>Keyword Match: {(job.breakdown.keywordMatch * 100).toFixed(0)}%</p>
                            <p>Embedding Similarity: {(job.breakdown.embeddingSimilarity * 100).toFixed(0)}%</p>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-neutralDark dark:text-neutralMedium mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-xl font-poppins font-semibold text-primaryNavy dark:text-white mb-2">
                      No Job Matches Yet
                    </h3>
                    <p className="text-neutralDark dark:text-neutralMedium mb-6">
                      We're working on finding the perfect opportunities for you. Check back soon!
                    </p>
                    <p className="text-sm text-neutralDark dark:text-neutralMedium">
                      In the meantime, make sure your profile is complete to improve your matches.
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Experience Section */}
            {experience.length > 0 && (
              <Card className="dark:bg-primaryLight">
                <CardBody>
                  <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-6">
                    Work Experience
                  </h2>
                  
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-accentTeal pl-4">
                        <h3 className="text-lg font-semibold text-primaryNavy dark:text-white">
                          {exp.job_title}
                        </h3>
                        <p className="text-neutralDark dark:text-neutralMedium">
                          {exp.company} • {exp.duration_months} months
                        </p>
                        {exp.description && (
                          <p className="text-sm text-neutralDark dark:text-neutralMedium mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
