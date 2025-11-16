# 🎯 START HERE - tseboIQ MVP

Welcome to tseboIQ! This document will guide you through everything you need to know.

## 📖 What is tseboIQ?

tseboIQ is a modern, AI-powered talent intelligence platform built specifically for South African youth. This MVP focuses on the candidate experience with intelligent job matching powered by OpenAI embeddings.

---

## 🚀 Quick Start (5 Minutes)

**Want to get running immediately?** → Read `QUICK_START.md`

```bash
npm install
# Create .env file with your credentials
npm run dev
```

---

## 📚 Documentation Guide

### 🟢 For First-Time Setup
1. **`QUICK_START.md`** - Get running in 5 minutes
2. **`SETUP_GUIDE.md`** - Detailed step-by-step setup instructions
3. **`supabase-schema.sql`** - Database setup (run in Supabase)

### 🔵 For Understanding the Project
1. **`README.md`** - Complete project documentation
2. **`PROJECT_SUMMARY.md`** - Full project overview and checklist
3. **`DIRECTORY_STRUCTURE.txt`** - Visual file structure guide

### 🟡 For Development
1. **`src/`** - All source code
2. **`tailwind.config.js`** - Customize colors and design
3. **`src/lib/matching.js`** - AI matching algorithm

### 🔴 For Production Deployment
1. **`PRODUCTION_CHECKLIST.md`** - Complete pre-launch checklist
2. **`.env.example`** - Environment variables template

---

## 🎯 What's Included in This MVP

### ✅ Features
- Email/password authentication (Supabase)
- Multi-step onboarding (4 steps)
- Dynamic skills management
- Work experience tracking
- AI-powered job matching (3-layer algorithm)
- Top 3 job recommendations
- Match score visualization
- Dark/light theme with persistence
- Toast notifications
- Responsive design (mobile, tablet, desktop)
- Complete candidate dashboard

### ✅ Pages
- Landing page with hero section
- About, Contact, Privacy Policy, Terms of Service
- Login/Register page
- Onboarding flow (4 steps)
- Candidate dashboard
- 404 Not Found page

### ✅ Technical Stack
- **Frontend**: React 18, Vite, React Router v6
- **Styling**: Tailwind CSS, Material Tailwind
- **Backend**: Supabase (Auth + Database)
- **AI**: OpenAI Embeddings API
- **Database**: PostgreSQL (via Supabase)

---

## 🚫 What's NOT Included (By Design)

This is a strict MVP focused on candidates only:
- ❌ No employer flows
- ❌ No job posting pages
- ❌ No CV parsing
- ❌ No OAuth logins
- ❌ No multi-role systems

*These features are planned for v2.*

---

## 📁 Project Structure

```
tseboIQ/
├── 📄 Documentation (7 files)
│   ├── START_HERE.md (you are here)
│   ├── QUICK_START.md
│   ├── SETUP_GUIDE.md
│   ├── README.md
│   ├── PROJECT_SUMMARY.md
│   ├── DIRECTORY_STRUCTURE.txt
│   └── PRODUCTION_CHECKLIST.md
│
├── ⚙️ Configuration (6 files)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── .gitignore
│
├── 🗄️ Database
│   └── supabase-schema.sql
│
└── 💻 Source Code (src/)
    ├── components/ (4 files)
    ├── contexts/ (3 files)
    ├── lib/ (2 files)
    ├── pages/ (9 files)
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## 🎨 Key Features Explained

### 1. AI Matching Algorithm
Located in `src/lib/matching.js`

**Three-layer scoring system:**
- **Layer 1**: Keyword matching (40% weight)
- **Layer 2**: Weighted scoring - experience, qualification (30% weight)
- **Layer 3**: OpenAI embedding similarity (20% weight)

**Result**: Ranked list of top job matches

### 2. Onboarding Flow
Located in `src/pages/Onboarding.jsx`

**4-step process:**
1. Personal details (name, phone, location, qualification, experience)
2. Skills (dynamic add/remove)
3. Experience (repeatable blocks) + Bio
4. Review and save

### 3. Candidate Dashboard
Located in `src/pages/CandidateDashboard.jsx`

**Displays:**
- Profile overview
- Skills badges
- Work experience timeline
- Top 3 matched jobs with scores
- Match breakdown (keyword, weighted, embedding)

---

## 🔑 Required Credentials

You'll need:

### 1. Supabase (Free Tier)
- Project URL
- Anon/Public Key
- Sign up at [supabase.com](https://supabase.com)

### 2. OpenAI (Paid)
- API Key
- Sign up at [platform.openai.com](https://platform.openai.com)
- Requires credit card for API access

---

## 🎯 Your Next Steps

### Step 1: Read Documentation
Choose based on your goal:
- **Just want to run it?** → `QUICK_START.md`
- **Want to understand everything?** → `SETUP_GUIDE.md`
- **Planning production?** → `PRODUCTION_CHECKLIST.md`

### Step 2: Set Up Environment
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Run database schema in Supabase
# Copy supabase-schema.sql to Supabase SQL Editor
```

### Step 3: Start Development
```bash
npm run dev
```

### Step 4: Test the Application
1. Register a new account
2. Complete onboarding
3. View your dashboard
4. (Optional) Add sample jobs to test matching

---

## 🐛 Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
→ Check your `.env` file exists and has correct variable names

**No matched jobs showing**
→ Add sample jobs by uncommenting the INSERT statements in `supabase-schema.sql`

**Build errors**
```bash
rm -rf node_modules
npm install
npm run dev
```

**More help?** → See `SETUP_GUIDE.md` troubleshooting section

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primaryNavy: '#0A1630',   // Your navy
  accentTeal: '#22B4AE',    // Your teal
}
```

### Adjust Matching Weights
Edit `src/lib/matching.js`:
```javascript
const weights = {
  skills: 0.4,      // 40%
  experience: 0.3,  // 30%
  embedding: 0.2    // 20%
}
```

---

## 📊 Project Stats

- **Total Files**: 37
- **React Components**: 13
- **Pages**: 9
- **Context Providers**: 3
- **Database Tables**: 4
- **Lines of Code**: ~3,500+
- **Documentation**: ~3,000+ lines

---

## 🚀 Deployment

### For Testing/Demo
```bash
npm run build
npm run preview
```

### For Production
See `PRODUCTION_CHECKLIST.md` for complete deployment guide.

**Recommended platforms:**
- Vercel (easiest for React)
- Netlify
- AWS Amplify
- Cloudflare Pages

---

## 🔮 Future Enhancements (v2)

When ready to expand:
- Employer dashboard and job posting
- CV parsing with AI
- LinkedIn/Google OAuth
- Real-time notifications
- Profile images and media
- Application tracking system
- Interview scheduling
- Skills assessments
- Referral system
- Mobile app (React Native)

---

## 📞 Support

### Documentation
- All questions answered in the 7 documentation files
- Check `SETUP_GUIDE.md` for detailed instructions
- See `DIRECTORY_STRUCTURE.txt` for file locations

### Contact
- Email: hello@tseboiq.co.za
- Phone: +27 11 123 4567

---

## ✅ Pre-Flight Checklist

Before you start, make sure you have:
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Supabase account created
- [ ] OpenAI API key obtained
- [ ] Read `QUICK_START.md` or `SETUP_GUIDE.md`

---

## 🎉 You're Ready!

Everything you need is in this project. The MVP is:
- ✅ Complete and functional
- ✅ Well-documented
- ✅ Ready for testing
- ✅ Ready for demos
- ✅ Ready for production (with checklist)

**Choose your path:**
- 🏃 **Fast track**: `QUICK_START.md` → Start coding
- 📚 **Thorough**: `SETUP_GUIDE.md` → Understand everything
- 🚀 **Production**: `PRODUCTION_CHECKLIST.md` → Deploy safely

---

## 💡 Pro Tips

1. **Start with Quick Start** - Get it running first, understand later
2. **Use sample data** - Uncomment job data in SQL schema to test matching
3. **Check browser console** - Most errors show up there
4. **Read error messages** - They're usually helpful
5. **Test on mobile** - Responsive design is built-in

---

## 📖 Documentation Map

```
START_HERE.md (you are here)
    ↓
QUICK_START.md (5-minute setup)
    ↓
SETUP_GUIDE.md (detailed instructions)
    ↓
README.md (complete documentation)
    ↓
PROJECT_SUMMARY.md (project overview)
    ↓
PRODUCTION_CHECKLIST.md (deployment guide)
```

---

## 🎯 Success Criteria

You'll know you're successful when:
- ✅ App runs on localhost:3000
- ✅ You can register an account
- ✅ You can complete onboarding
- ✅ Dashboard shows your profile
- ✅ (Optional) Matched jobs appear

---

## 🙏 Final Notes

This MVP was built **exactly to specification**:
- Nothing more than required
- Nothing less than required
- Clean, maintainable code
- Comprehensive documentation
- Ready for testing and feedback

**Your journey starts now. Good luck! 🚀**

---

**Built with ❤️ for South African Youth**

*tseboIQ - Your Future Starts Here*
