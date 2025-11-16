# tseboIQ - AI-Powered Talent Intelligence Platform

A modern, youth-friendly, AI-assisted talent intelligence platform built specifically for South African job seekers. This MVP focuses on the candidate experience with intelligent job matching powered by OpenAI embeddings.

## 🚀 Features

### Candidate Experience
- **Modern Authentication** - Email/password authentication via Supabase
- **Multi-Step Onboarding** - Smooth, guided profile creation
- **Skills Management** - Dynamic skill addition and management
- **Experience Tracking** - Detailed work history with descriptions
- **AI-Powered Matching** - Three-layer matching algorithm:
  - Keyword matching (40%)
  - Weighted scoring (30%)
  - OpenAI embedding similarity (20%)
- **Personalized Dashboard** - View profile, matched jobs, and insights
- **Dark/Light Theme** - Persistent theme with system preference detection

### Design System
- **Brand Colors**:
  - Primary Navy: `#0A1630`
  - Primary Light: `#12264F`
  - Accent Teal: `#22B4AE`
  - Accent Light: `#4BD0CA`
- **Typography**:
  - Headings: Poppins (600-700)
  - Body: Inter (400-500)
- **Animations**: Medium transitions (~250-300ms)
- **Components**: Material Tailwind + Custom Components

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Material Tailwind** - Pre-built components

### Backend & Services
- **Supabase** - Authentication, database, and storage
- **OpenAI API** - Embedding generation for semantic matching
- **PostgreSQL** - Database (via Supabase)

### Context Providers
- **ThemeContext** - Light/dark mode with persistence
- **AuthContext** - User authentication state
- **ToastContext** - Global notification system

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### Setup Steps

1. **Clone the repository**
```bash
cd c:/Users/ThaboMponya/Documents/DEV/APEX/tseboIQ
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. **Set up Supabase database**

- Go to your Supabase project SQL Editor
- Run the SQL script from `supabase-schema.sql`
- This will create all necessary tables, indexes, and RLS policies

5. **Enable email authentication in Supabase**

- Navigate to Authentication > Providers
- Enable the Email provider
- Configure email templates (optional)

6. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🗂 Project Structure

```
tseboIQ/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Toast.jsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── lib/                 # Utility libraries
│   │   ├── supabase.js      # Supabase client
│   │   └── matching.js      # AI matching algorithm
│   ├── pages/               # Route pages
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   ├── Auth.jsx
│   │   ├── Onboarding.jsx
│   │   ├── CandidateDashboard.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── supabase-schema.sql      # Database schema
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Core Features Explained

### 1. Authentication Flow
- Users register with email/password
- Supabase handles authentication and session management
- After registration → redirect to onboarding
- After login → redirect to dashboard

### 2. Onboarding Process
**4-Step Multi-Step Form:**
1. **Personal Details** - Name, phone, location, qualification, experience years
2. **Skills** - Dynamic skill addition/removal
3. **Experience** - Work history with repeatable blocks
4. **Review** - Final review before saving

### 3. AI Matching Algorithm

The matching system uses three layers:

#### Layer 1: Keyword Matching
- Compares candidate skills with job requirements
- Case-insensitive partial matching
- Returns percentage of matched skills

#### Layer 2: Weighted Scoring
Combines multiple factors:
- Skills match (40% weight)
- Experience years (30% weight)
- Qualification match (10% weight)

#### Layer 3: Embedding Similarity
- Uses OpenAI's `text-embedding-3-small` model
- Generates embeddings for:
  - Candidate profile (skills + bio + qualification)
  - Job description (title + description + requirements)
- Calculates cosine similarity
- Contributes 20% to final score

**Final Score** = (Weighted Score × 0.8) + (Embedding Similarity × 0.2)

### 4. Dashboard Features
- **Profile Overview** - Display all candidate information
- **Top 3 Job Matches** - AI-ranked job recommendations
- **Match Breakdown** - Show keyword match, weighted score, and embedding similarity
- **Skill Highlighting** - Visual indication of matched vs. unmatched skills
- **Edit Profile** - Quick access to onboarding form

## 🗄 Database Schema

### Tables

#### `candidates`
- Stores candidate profile information
- Links to Supabase auth via `auth_id`

#### `skills`
- One-to-many relationship with candidates
- Stores individual skills

#### `experience`
- One-to-many relationship with candidates
- Stores work experience entries

#### `jobs`
- Internal job postings for matching demo
- Includes matching weights and requirements

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Jobs are read-only for authenticated users

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primaryNavy: '#0A1630',
  primaryLight: '#12264F',
  accentTeal: '#22B4AE',
  accentLight: '#4BD0CA',
  // ... more colors
}
```

### Matching Weights
Adjust matching algorithm weights in the database or matching logic:

```js
const weights = {
  skills: 0.4,        // 40%
  experience: 0.3,    // 30%
  qualification: 0.1, // 10%
  embedding: 0.2      // 20%
}
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Checklist
- [ ] Set up production environment variables
- [ ] Configure Supabase production instance
- [ ] Move OpenAI API calls to backend/edge functions
- [ ] Set up custom domain
- [ ] Configure email templates in Supabase
- [ ] Enable rate limiting
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CORS policies
- [ ] Add analytics (e.g., Google Analytics)

## 🔒 Security Notes

### Current Implementation (MVP)
- OpenAI API calls are made from the browser
- API key is exposed in client-side code
- **⚠️ This is acceptable for MVP/testing only**

### Production Recommendations
1. **Move AI Processing to Backend**
   - Create Supabase Edge Functions
   - Call OpenAI API from server-side
   - Never expose API keys in client code

2. **Implement Rate Limiting**
   - Limit API calls per user
   - Add request throttling

3. **Add Input Validation**
   - Validate all user inputs
   - Sanitize data before database insertion

4. **Enable Security Headers**
   - CSP, HSTS, X-Frame-Options
   - Configure in hosting platform

## 📝 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile creation and editing
- [ ] Skill addition/removal
- [ ] Experience addition/removal
- [ ] Theme switching and persistence
- [ ] Job matching display
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Dark mode rendering
- [ ] Toast notifications
- [ ] Navigation and routing

### Sample Data
To test the matching algorithm, uncomment the sample data section in `supabase-schema.sql` and run it in your Supabase SQL Editor.

## 🐛 Known Limitations (MVP)

1. **No employer functionality** - Candidate-only MVP
2. **No job application system** - Display matches only
3. **No CV parsing** - Manual profile entry only
4. **No OAuth logins** - Email/password only
5. **Client-side API calls** - OpenAI calls from browser
6. **No real-time updates** - Requires page refresh
7. **No email notifications** - No automated emails
8. **No profile images** - Text-only profiles

## 🔮 Future Enhancements (v2)

### Planned Features
- Employer dashboard and job posting
- CV parsing and auto-fill
- LinkedIn/Google OAuth
- Real-time notifications
- Profile images and media
- Application tracking system
- Interview scheduling
- Skills assessments
- Referral system
- Mobile app (React Native)

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Support

For questions or issues:
- Email: hello@tseboiq.co.za
- Phone: +27 11 123 4567

---

**Built with ❤️ for South African Youth**

*tseboIQ - Your Future Starts Here*
