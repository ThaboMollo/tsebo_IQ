# tseboIQ Setup Guide

This guide will walk you through setting up the tseboIQ MVP from scratch.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier is fine)
- An OpenAI API key

## Step-by-Step Setup

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React 18
- Vite
- React Router
- Tailwind CSS
- Material Tailwind
- Supabase client
- OpenAI SDK

### 2. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - Project name: `tseboiq` (or your preferred name)
   - Database password: (generate a strong password)
   - Region: Choose closest to South Africa
5. Wait for the project to be created (~2 minutes)

#### Get Your Supabase Credentials

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Go to "API" section
3. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

#### Run the Database Schema

1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open the `supabase-schema.sql` file from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

#### Enable Email Authentication

1. In Supabase dashboard, go to "Authentication" > "Providers"
2. Find "Email" and make sure it's enabled
3. (Optional) Customize email templates under "Email Templates"

### 3. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Go to "API Keys" section
4. Click "Create new secret key"
5. Give it a name (e.g., "tseboIQ MVP")
6. Copy the key (starts with `sk-...`)
7. **Important**: Save this key securely - you won't be able to see it again!

### 4. Create Environment File

1. In the project root, create a file named `.env`
2. Add the following (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-...
```

3. Save the file

**⚠️ Important**: Never commit the `.env` file to git! It's already in `.gitignore`.

### 5. Start the Development Server

```bash
npm run dev
```

The application should open automatically at `http://localhost:3000`

If it doesn't open automatically, open your browser and navigate to the URL shown in the terminal.

## Testing the Application

### 1. Create a Test Account

1. Click "Get Started" on the landing page
2. Switch to the "Register" tab
3. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
4. Click "Create Account"

### 2. Complete Your Profile

You'll be redirected to the onboarding flow:

**Step 1: Personal Details**
- Full Name: (pre-filled)
- Phone: +27 11 123 4567
- Location: Johannesburg, Gauteng
- Highest Qualification: Bachelor's Degree
- Years of Experience: 2

**Step 2: Skills**
- Add skills like: JavaScript, React, HTML, CSS, Git
- Click "Add Skill" to add more
- Click "Next"

**Step 3: Experience**
- Job Title: Junior Developer
- Company: Tech Company
- Duration: 12 months
- Description: Worked on web applications...
- Add bio: "Passionate developer with experience in modern web technologies..."
- Click "Next"

**Step 4: Review**
- Review all information
- Click "Save Profile"

### 3. View Your Dashboard

You'll be redirected to your candidate dashboard where you can:
- View your profile information
- See your skills
- View work experience
- See matched jobs (if sample data was added)

### 4. Add Sample Jobs (Optional)

To test the AI matching algorithm:

1. Go back to Supabase SQL Editor
2. Open `supabase-schema.sql`
3. Scroll to the bottom and find the commented sample data section
4. Uncomment the INSERT statements (remove `/*` and `*/`)
5. Run just that section in the SQL Editor
6. Refresh your dashboard to see matched jobs

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure your `.env` file exists and has the correct variable names starting with `VITE_`

### Issue: Database errors when creating profile

**Solution**: 
1. Check that the SQL schema was run successfully in Supabase
2. Verify RLS policies are enabled
3. Check browser console for specific error messages

### Issue: No matched jobs showing

**Solution**:
1. Make sure you've added sample jobs to the database
2. Check that your OpenAI API key is valid
3. Check browser console for API errors
4. Verify you have credits in your OpenAI account

### Issue: Theme not persisting

**Solution**: 
1. Check browser localStorage is enabled
2. Clear browser cache and try again

### Issue: Build errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR - changes to your code will reflect immediately in the browser without a full page reload.

### Viewing Dark Mode

Click the moon/sun icon in the navbar to toggle between light and dark themes.

### Editing Your Profile

Click "Edit Profile" on the dashboard to go back to the onboarding flow and update your information.

### Browser DevTools

Press F12 to open browser DevTools and check:
- Console for errors
- Network tab for API calls
- Application > Local Storage to see stored data

## Next Steps

Once you have the MVP running:

1. **Customize the branding** - Edit colors in `tailwind.config.js`
2. **Add more sample jobs** - Test the matching algorithm
3. **Invite test users** - Get feedback on the onboarding flow
4. **Monitor performance** - Check OpenAI API usage
5. **Plan v2 features** - Employer dashboard, CV parsing, etc.

## Production Deployment

When ready to deploy:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Choose a hosting platform**:
   - Vercel (recommended for React apps)
   - Netlify
   - AWS Amplify
   - Cloudflare Pages

3. **Set environment variables** in your hosting platform

4. **Deploy** following your platform's instructions

5. **Set up custom domain** (optional)

## Support

If you encounter issues:

1. Check the main README.md for detailed documentation
2. Review error messages in browser console
3. Check Supabase logs in the dashboard
4. Verify all environment variables are set correctly

---

**You're all set! Welcome to tseboIQ! 🚀**
