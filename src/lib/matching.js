import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
})

/**
 * Calculate keyword match score between candidate skills and job requirements
 * @param {string[]} candidateSkills - Array of candidate skills
 * @param {string[]} requiredSkills - Array of required job skills
 * @returns {number} - Match percentage (0-1)
 */
function calculateKeywordMatch(candidateSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) return 0
  if (!candidateSkills || candidateSkills.length === 0) return 0

  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase().trim())
  const normalizedRequiredSkills = requiredSkills.map(s => s.toLowerCase().trim())

  const matchCount = normalizedRequiredSkills.filter(reqSkill =>
    normalizedCandidateSkills.some(candSkill => 
      candSkill.includes(reqSkill) || reqSkill.includes(candSkill)
    )
  ).length

  return matchCount / normalizedRequiredSkills.length
}

/**
 * Calculate weighted score combining multiple factors
 * @param {object} candidate - Candidate profile
 * @param {object} job - Job posting
 * @returns {number} - Weighted score (0-1)
 */
function calculateWeightedScore(candidate, job) {
  const skillMatch = calculateKeywordMatch(candidate.skills, job.required_skills)
  
  // Experience match (assuming job requires similar years)
  const requiredExperience = job.required_experience_years || 0
  const experienceMatch = candidate.experience_years >= requiredExperience ? 1 : 
    candidate.experience_years / Math.max(requiredExperience, 1)
  
  // Qualification match (simple keyword check)
  const qualificationMatch = job.required_qualification && candidate.highest_qualification ?
    candidate.highest_qualification.toLowerCase().includes(job.required_qualification.toLowerCase()) ? 1 : 0.5
    : 0.5

  // Apply weights
  const weights = {
    skills: job.weight_skill_match || 0.4,
    experience: job.weight_experience || 0.3,
    qualification: 0.1,
    embedding: job.weight_embedding_similarity || 0.2
  }

  return (
    skillMatch * weights.skills +
    experienceMatch * weights.experience +
    qualificationMatch * weights.qualification
  )
}

/**
 * Generate embedding for text using OpenAI
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} - Embedding vector
 */
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    return null
  }
}

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} - Similarity score (0-1)
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  if (normA === 0 || normB === 0) return 0

  return dotProduct / (normA * normB)
}

/**
 * Calculate embedding similarity between candidate and job
 * @param {object} candidate - Candidate profile
 * @param {object} job - Job posting
 * @returns {Promise<number>} - Similarity score (0-1)
 */
async function calculateEmbeddingSimilarity(candidate, job) {
  try {
    // Create candidate text
    const candidateText = `
      Skills: ${candidate.skills.join(', ')}
      Bio: ${candidate.bio || ''}
      Qualification: ${candidate.highest_qualification || ''}
      Experience: ${candidate.experience_years} years
    `.trim()

    // Create job text
    const jobText = `
      ${job.title}
      ${job.description}
      Required Skills: ${job.required_skills.join(', ')}
    `.trim()

    // Generate embeddings
    const [candidateEmbedding, jobEmbedding] = await Promise.all([
      generateEmbedding(candidateText),
      generateEmbedding(jobText)
    ])

    if (!candidateEmbedding || !jobEmbedding) return 0

    // Calculate similarity
    return cosineSimilarity(candidateEmbedding, jobEmbedding)
  } catch (error) {
    console.error('Error calculating embedding similarity:', error)
    return 0
  }
}

/**
 * Get matched jobs for a candidate
 * @param {object} candidateProfile - Complete candidate profile
 * @param {object[]} jobs - Array of job postings
 * @returns {Promise<object[]>} - Ranked array of job matches
 */
export async function getMatchedJobs(candidateProfile, jobs) {
  if (!jobs || jobs.length === 0) return []

  const matches = await Promise.all(
    jobs.map(async (job) => {
      // Calculate base weighted score (without embeddings)
      const weightedScore = calculateWeightedScore(candidateProfile, job)
      
      // Calculate embedding similarity
      const embeddingSimilarity = await calculateEmbeddingSimilarity(candidateProfile, job)
      
      // Combine scores
      const embeddingWeight = job.weight_embedding_similarity || 0.2
      const baseWeight = 1 - embeddingWeight
      
      const finalScore = (weightedScore * baseWeight) + (embeddingSimilarity * embeddingWeight)

      return {
        ...job,
        matchScore: finalScore,
        breakdown: {
          keywordMatch: calculateKeywordMatch(candidateProfile.skills, job.required_skills),
          weightedScore,
          embeddingSimilarity
        }
      }
    })
  )

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore)
}

/**
 * Get top N matched jobs
 * @param {object} candidateProfile - Complete candidate profile
 * @param {object[]} jobs - Array of job postings
 * @param {number} limit - Number of top matches to return
 * @returns {Promise<object[]>} - Top N job matches
 */
export async function getTopMatches(candidateProfile, jobs, limit = 3) {
  const matches = await getMatchedJobs(candidateProfile, jobs)
  return matches.slice(0, limit)
}
