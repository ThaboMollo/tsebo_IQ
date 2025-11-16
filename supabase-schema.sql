-- tseboIQ Database Schema for Supabase
-- MVP Version - Candidate Only

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CANDIDATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    auth_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    bio TEXT,
    location TEXT,
    highest_qualification TEXT,
    experience_years INTEGER DEFAULT 0,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create index on auth_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_candidates_auth_id ON candidates (auth_id);

CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates (email);

-- ============================================
-- SKILLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    candidate_id UUID NOT NULL REFERENCES candidates (id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create index on candidate_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_skills_candidate_id ON skills (candidate_id);

-- ============================================
-- EXPERIENCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    candidate_id UUID NOT NULL REFERENCES candidates (id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    duration_months INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create index on candidate_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_experience_candidate_id ON experience (candidate_id);

-- ============================================
-- JOBS TABLE (Internal - For Matching Demo)
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT[] DEFAULT '{}',
    required_experience_years INTEGER DEFAULT 0,
    required_qualification TEXT,
    weight_skill_match FLOAT DEFAULT 0.4,
    weight_experience FLOAT DEFAULT 0.3,
    weight_embedding_similarity FLOAT DEFAULT 0.2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster job queries
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs (created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Candidates policies
CREATE POLICY "Users can view their own candidate profile" ON candidates FOR
SELECT USING (auth.uid () = auth_id);

CREATE POLICY "Users can insert their own candidate profile" ON candidates FOR
INSERT
WITH
    CHECK (auth.uid () = auth_id);

CREATE POLICY "Users can update their own candidate profile" ON candidates FOR
UPDATE USING (auth.uid () = auth_id);

-- Skills policies
CREATE POLICY "Users can view their own skills" ON skills FOR
SELECT USING (
        candidate_id IN (
            SELECT id
            FROM candidates
            WHERE
                auth_id = auth.uid ()
        )
    );

CREATE POLICY "Users can insert their own skills" ON skills FOR
INSERT
WITH
    CHECK (
        candidate_id IN (
            SELECT id
            FROM candidates
            WHERE
                auth_id = auth.uid ()
        )
    );

CREATE POLICY "Users can update their own skills" ON skills FOR
UPDATE USING (
    candidate_id IN (
        SELECT id
        FROM candidates
        WHERE
            auth_id = auth.uid ()
    )
);

CREATE POLICY "Users can delete their own skills" ON skills FOR DELETE USING (
    candidate_id IN (
        SELECT id
        FROM candidates
        WHERE
            auth_id = auth.uid ()
    )
);

-- Experience policies
CREATE POLICY "Users can view their own experience" ON experience FOR
SELECT USING (
        candidate_id IN (
            SELECT id
            FROM candidates
            WHERE
                auth_id = auth.uid ()
        )
    );

CREATE POLICY "Users can insert their own experience" ON experience FOR
INSERT
WITH
    CHECK (
        candidate_id IN (
            SELECT id
            FROM candidates
            WHERE
                auth_id = auth.uid ()
        )
    );

CREATE POLICY "Users can update their own experience" ON experience FOR
UPDATE USING (
    candidate_id IN (
        SELECT id
        FROM candidates
        WHERE
            auth_id = auth.uid ()
    )
);

CREATE POLICY "Users can delete their own experience" ON experience FOR DELETE USING (
    candidate_id IN (
        SELECT id
        FROM candidates
        WHERE
            auth_id = auth.uid ()
    )
);

-- Jobs policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view all jobs" ON jobs FOR
SELECT TO authenticated USING (true);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for candidates table
CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for jobs table
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Uncomment the following to insert sample jobs for testing the matching algorithm

/*
INSERT INTO jobs (title, description, required_skills, required_experience_years, required_qualification, weight_skill_match, weight_experience, weight_embedding_similarity)
VALUES
(
'Junior Software Developer',
'We are looking for a passionate junior developer to join our team. You will work on building web applications using modern technologies and frameworks.',
ARRAY['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
1,
'Diploma',
0.4,
0.3,
0.2
),
(
'Digital Marketing Specialist',
'Join our marketing team to create and execute digital marketing campaigns. Experience with social media, SEO, and content creation is essential.',
ARRAY['Social Media', 'SEO', 'Content Writing', 'Google Analytics', 'Marketing'],
2,
'Degree',
0.4,
0.3,
0.2
),
(
'Data Analyst',
'Analyze business data to provide insights and recommendations. Strong analytical skills and experience with data visualization tools required.',
ARRAY['Excel', 'SQL', 'Python', 'Data Analysis', 'Tableau'],
2,
'Degree',
0.4,
0.3,
0.2
),
(
'Customer Service Representative',
'Provide excellent customer service via phone, email, and chat. Strong communication skills and problem-solving abilities are essential.',
ARRAY['Communication', 'Customer Service', 'Problem Solving', 'Microsoft Office'],
0,
'Matric',
0.4,
0.3,
0.2
),
(
'Graphic Designer',
'Create visual content for digital and print media. Proficiency in Adobe Creative Suite and a strong portfolio are required.',
ARRAY['Photoshop', 'Illustrator', 'InDesign', 'Graphic Design', 'Creativity'],
1,
'Diploma',
0.4,
0.3,
0.2
);
*/

-- ============================================
-- NOTES FOR DEPLOYMENT
-- ============================================

/*
1. Run this SQL script in your Supabase SQL Editor
2. Make sure to set up your .env file with:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_OPENAI_API_KEY

3. Enable email authentication in Supabase:
- Go to Authentication > Providers
- Enable Email provider
- Configure email templates (optional)

4. For production:
- Move OpenAI API calls to a backend/edge function
- Set up proper CORS policies
- Configure custom domain and email templates
- Add rate limiting and security measures

5. To test the matching algorithm:
- Uncomment the sample data section above
- Create a candidate profile
- View matched jobs on the dashboard
*/