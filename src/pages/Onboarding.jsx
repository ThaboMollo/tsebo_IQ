import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Input, Textarea, Button, Stepper, Step } from '@material-tailwind/react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { supabase } from '../lib/supabase'

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    highestQualification: '',
    experienceYears: 0,
    bio: '',
    skills: [''],
    experience: [{
      jobTitle: '',
      company: '',
      durationMonths: 0,
      description: ''
    }]
  })

  useEffect(() => {
    loadExistingProfile()
  }, [user])

  const loadExistingProfile = async () => {
    if (!user) return

    try {
      const { data: candidate } = await supabase
        .from('candidates')
        .select('*')
        .eq('auth_id', user.id)
        .single()

      if (candidate) {
        const { data: skills } = await supabase
          .from('skills')
          .select('skill_name')
          .eq('candidate_id', candidate.id)

        const { data: experience } = await supabase
          .from('experience')
          .select('*')
          .eq('candidate_id', candidate.id)

        setFormData({
          fullName: candidate.full_name || '',
          phone: candidate.phone || '',
          location: candidate.location || '',
          highestQualification: candidate.highest_qualification || '',
          experienceYears: candidate.experience_years || 0,
          bio: candidate.bio || '',
          skills: skills?.map(s => s.skill_name) || [''],
          experience: experience?.length > 0 ? experience.map(e => ({
            jobTitle: e.job_title,
            company: e.company,
            durationMonths: e.duration_months,
            description: e.description
          })) : [{
            jobTitle: '',
            company: '',
            durationMonths: 0,
            description: ''
          }]
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    })
  }

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      skills: newSkills.length > 0 ? newSkills : ['']
    })
  }

  const updateSkill = (index, value) => {
    const newSkills = [...formData.skills]
    newSkills[index] = value
    setFormData({
      ...formData,
      skills: newSkills
    })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        jobTitle: '',
        company: '',
        durationMonths: 0,
        description: ''
      }]
    })
  }

  const removeExperience = (index) => {
    const newExperience = formData.experience.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      experience: newExperience.length > 0 ? newExperience : [{
        jobTitle: '',
        company: '',
        durationMonths: 0,
        description: ''
      }]
    })
  }

  const updateExperience = (index, field, value) => {
    const newExperience = [...formData.experience]
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    }
    setFormData({
      ...formData,
      experience: newExperience
    })
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Get or create candidate profile
      const { data: existingCandidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('auth_id', user.id)
        .single()

      let candidateId = existingCandidate?.id

      if (candidateId) {
        // Update existing profile
        await supabase
          .from('candidates')
          .update({
            full_name: formData.fullName,
            phone: formData.phone,
            location: formData.location,
            highest_qualification: formData.highestQualification,
            experience_years: formData.experienceYears,
            bio: formData.bio
          })
          .eq('id', candidateId)

        // Delete existing skills and experience
        await supabase.from('skills').delete().eq('candidate_id', candidateId)
        await supabase.from('experience').delete().eq('candidate_id', candidateId)
      } else {
        // Create new profile
        const { data: newCandidate } = await supabase
          .from('candidates')
          .insert({
            auth_id: user.id,
            email: user.email,
            full_name: formData.fullName,
            phone: formData.phone,
            location: formData.location,
            highest_qualification: formData.highestQualification,
            experience_years: formData.experienceYears,
            bio: formData.bio
          })
          .select()
          .single()

        candidateId = newCandidate.id
      }

      // Insert skills
      const skillsToInsert = formData.skills
        .filter(skill => skill.trim() !== '')
        .map(skill => ({
          candidate_id: candidateId,
          skill_name: skill.trim()
        }))

      if (skillsToInsert.length > 0) {
        await supabase.from('skills').insert(skillsToInsert)
      }

      // Insert experience
      const experienceToInsert = formData.experience
        .filter(exp => exp.jobTitle.trim() !== '' && exp.company.trim() !== '')
        .map(exp => ({
          candidate_id: candidateId,
          job_title: exp.jobTitle,
          company: exp.company,
          duration_months: exp.durationMonths,
          description: exp.description
        }))

      if (experienceToInsert.length > 0) {
        await supabase.from('experience').insert(experienceToInsert)
      }

      showToast({
        type: 'success',
        title: 'Profile Saved!',
        message: 'Your profile has been successfully updated.'
      })

      navigate('/dashboard/candidate')
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

  const steps = [
    { label: 'Personal', number: 1 },
    { label: 'Skills', number: 2 },
    { label: 'Experience', number: 3 },
    { label: 'Review', number: 4 }
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-poppins font-bold text-primaryNavy dark:text-white mb-8 text-center">
          Complete Your Profile
        </h1>

        <div className="mb-12">
          <Stepper activeStep={activeStep} className="dark:bg-primaryLight">
            {steps.map((step, index) => (
              <Step
                key={index}
                onClick={() => setActiveStep(index)}
                className={activeStep === index ? 'bg-accentTeal' : 'bg-neutralMedium dark:bg-primaryNavy'}
              >
                {step.number}
              </Step>
            ))}
          </Stepper>
        </div>

        <Card className="dark:bg-primaryLight">
          <CardBody>
            {/* Step 1: Personal Details */}
            {activeStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Personal Details
                </h2>
                
                <Input
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="dark:text-white"
                />
                
                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="dark:text-white"
                />
                
                <Input
                  label="Location (City, Province)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="dark:text-white"
                />
                
                <Input
                  label="Highest Qualification"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  className="dark:text-white"
                />
                
                <Input
                  type="number"
                  label="Years of Experience"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="dark:text-white"
                />
              </div>
            )}

            {/* Step 2: Skills */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Your Skills
                </h2>
                
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      label={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="dark:text-white flex-1"
                    />
                    {formData.skills.length > 1 && (
                      <Button
                        color="red"
                        onClick={() => removeSkill(index)}
                        className="flex-shrink-0"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  onClick={addSkill}
                  className="bg-accentTeal hover:bg-accentLight transition-smooth"
                >
                  Add Skill
                </Button>
              </div>
            )}

            {/* Step 3: Experience */}
            {activeStep === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Work Experience
                </h2>
                
                {formData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border border-neutralMedium dark:border-primaryNavy rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-primaryNavy dark:text-white">
                        Experience {index + 1}
                      </h3>
                      {formData.experience.length > 1 && (
                        <Button
                          size="sm"
                          color="red"
                          onClick={() => removeExperience(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <Input
                      label="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                      className="dark:text-white"
                    />
                    
                    <Input
                      label="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="dark:text-white"
                    />
                    
                    <Input
                      type="number"
                      label="Duration (months)"
                      value={exp.durationMonths}
                      onChange={(e) => updateExperience(index, 'durationMonths', parseInt(e.target.value) || 0)}
                      min="0"
                      className="dark:text-white"
                    />
                    
                    <Textarea
                      label="Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                      className="dark:text-white"
                    />
                  </div>
                ))}
                
                <Button
                  onClick={addExperience}
                  className="bg-accentTeal hover:bg-accentLight transition-smooth"
                >
                  Add Experience
                </Button>
                
                <Textarea
                  label="Professional Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={5}
                  className="dark:text-white"
                />
              </div>
            )}

            {/* Step 4: Review */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-poppins font-semibold text-primaryNavy dark:text-white mb-4">
                  Review Your Profile
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primaryNavy dark:text-white">Personal Details</h3>
                    <p className="text-neutralDark dark:text-neutralMedium">Name: {formData.fullName}</p>
                    <p className="text-neutralDark dark:text-neutralMedium">Phone: {formData.phone}</p>
                    <p className="text-neutralDark dark:text-neutralMedium">Location: {formData.location}</p>
                    <p className="text-neutralDark dark:text-neutralMedium">Qualification: {formData.highestQualification}</p>
                    <p className="text-neutralDark dark:text-neutralMedium">Experience: {formData.experienceYears} years</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primaryNavy dark:text-white">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.filter(s => s.trim() !== '').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-accentTeal text-white rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primaryNavy dark:text-white">Experience</h3>
                    {formData.experience.filter(e => e.jobTitle.trim() !== '').map((exp, index) => (
                      <div key={index} className="mt-2">
                        <p className="text-neutralDark dark:text-neutralMedium font-medium">
                          {exp.jobTitle} at {exp.company}
                        </p>
                        <p className="text-sm text-neutralDark dark:text-neutralMedium">
                          {exp.durationMonths} months
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primaryNavy dark:text-white">Bio</h3>
                    <p className="text-neutralDark dark:text-neutralMedium">{formData.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                className="bg-neutralMedium dark:bg-primaryNavy"
              >
                Back
              </Button>
              
              {activeStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="gradient-cta"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gradient-cta"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
