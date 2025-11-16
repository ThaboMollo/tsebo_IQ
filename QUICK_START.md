# 🚀 tseboIQ - Quick Start Guide

## ⚡ Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Set Up Environment Variables (1 min)

Create `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-...
```

**Get your credentials:**
- **Supabase**: [supabase.com](https://supabase.com) → New Project → Settings → API
- **OpenAI**: [platform.openai.com](https://platform.openai.com) → API Keys

### Step 3: Set Up Database (2 min)

1. Go to your Supabase project
2. Click **SQL Editor** in sidebar
3. Click **New Query**
4. Copy all content from `supabase-schema.sql`
5. Paste and click **Run**

### Step 4: Enable Email Auth (30 sec)

1. In Supabase, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled

### Step 5: Start Development Server (30 sec)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 First Test

1. Click **"Get Started"**
2. Register a new account
3. Complete the 4-step onboarding
4. View your dashboard

---

## 📝 Essential Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Troubleshooting
rm -rf node_modules  # Clear dependencies
npm install          # Reinstall
```

---

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| `.env` | Your API keys (create this) |
| `supabase-schema.sql` | Database setup (run in Supabase) |
| `src/pages/Onboarding.jsx` | Profile creation form |
| `src/pages/CandidateDashboard.jsx` | Main dashboard |
| `src/lib/matching.js` | AI matching algorithm |

---

## 🐛 Common Issues

### "Missing Supabase environment variables"
→ Make sure `.env` file exists with correct variable names

### No matched jobs showing
→ Uncomment sample data in `supabase-schema.sql` and run it

### Build errors
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 📚 Full Documentation

- **Complete Setup**: See `SETUP_GUIDE.md`
- **Project Overview**: See `README.md`
- **File Structure**: See `DIRECTORY_STRUCTURE.txt`
- **Project Summary**: See `PROJECT_SUMMARY.md`

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```js
colors: {
  primaryNavy: '#0A1630',   // Your color
  accentTeal: '#22B4AE',    // Your color
}
```

### Adjust Matching Weights
Edit `src/lib/matching.js`:
```js
const weights = {
  skills: 0.4,      // 40%
  experience: 0.3,  // 30%
  embedding: 0.2    // 20%
}
```

---

## 🚀 Deploy to Production

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

**Remember to set environment variables in your hosting platform!**

---

## 🎉 You're Ready!

The tseboIQ MVP is now running. Start testing, get feedback, and iterate!

**Need help?** Check the full documentation files or contact support.

---

**Built with ❤️ for South African Youth**
