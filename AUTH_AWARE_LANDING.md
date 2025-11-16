# Authentication-Aware Landing Page

## ✅ Smart Navigation Implemented

The Landing page now intelligently detects user authentication status and redirects accordingly.

---

## 🎯 How It Works

### User Flow Logic

The landing page now checks three states:

1. **Not Authenticated** → Redirect to `/auth` (login/register)
2. **Authenticated + No Profile** → Redirect to `/onboarding` (complete profile)
3. **Authenticated + Has Profile** → Redirect to `/dashboard/candidate` (view matches)

---

## 🔍 Profile Check Logic

### What Determines a "Complete Profile"?

The system checks if the user has:
- ✅ `full_name` (not empty)
- ✅ `phone` (not empty)
- ✅ `location` (not empty)

If all three fields are filled, the profile is considered complete.

### Database Query
```javascript
const { data } = await supabase
  .from('candidates')
  .select('id, full_name, phone, location')
  .eq('auth_id', user.id)
  .single()

if (data && data.full_name && data.phone && data.location) {
  setHasProfile(true) // Complete profile
} else {
  setHasProfile(false) // Incomplete profile
}
```

---

## 🎨 Dynamic Button Text

All CTA buttons on the landing page now show context-aware text:

### For Non-Authenticated Users
- "I'm Looking for a Job"
- "Upload Your CV Now"
- "Get Started Today"

### For Authenticated Users (No Profile)
- "Complete Your Profile"

### For Authenticated Users (Has Profile)
- "Go to Dashboard"

### While Checking
- "Loading..."

---

## 📦 Updated Buttons

### 1. Hero CTA Button
**Location**: Top of page, main call-to-action

**Behavior**:
- Not logged in → "I'm Looking for a Job" → `/auth`
- Logged in, no profile → "Complete Your Profile" → `/onboarding`
- Logged in, has profile → "Go to Dashboard" → `/dashboard/candidate`

### 2. CV Upload Button
**Location**: "Let Your CV Do the Talking" section

**Behavior**:
- Not logged in → "Upload Your CV Now" → `/auth`
- Logged in, no profile → "Complete Your Profile" → `/onboarding`
- Logged in, has profile → "Go to Dashboard" → `/dashboard/candidate`

### 3. Final CTA Button
**Location**: Bottom of page, final call-to-action

**Behavior**:
- Not logged in → "Get Started Today" → `/auth`
- Logged in, no profile → "Complete Your Profile" → `/onboarding`
- Logged in, has profile → "Go to Dashboard" → `/dashboard/candidate`

---

## 🔧 Implementation Details

### New Imports
```javascript
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
```

### State Management
```javascript
const { user } = useAuth()
const navigate = useNavigate()
const [hasProfile, setHasProfile] = useState(false)
const [checkingProfile, setCheckingProfile] = useState(false)
```

### Profile Check (useEffect)
```javascript
useEffect(() => {
  const checkProfile = async () => {
    if (user) {
      setCheckingProfile(true)
      try {
        const { data } = await supabase
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
```

### Click Handler
```javascript
const handleGetStarted = () => {
  if (user) {
    if (hasProfile) {
      navigate('/dashboard/candidate')
    } else {
      navigate('/onboarding')
    }
  } else {
    navigate('/auth')
  }
}
```

---

## 🎯 User Experience

### Scenario 1: New Visitor
1. Lands on homepage
2. Sees "I'm Looking for a Job" button
3. Clicks button → Redirected to `/auth`
4. Registers/logs in
5. Automatically redirected to `/onboarding`

### Scenario 2: Registered User (No Profile)
1. Logs in
2. Lands on homepage
3. Sees "Complete Your Profile" button
4. Clicks button → Redirected to `/onboarding`
5. Completes profile
6. Redirected to `/dashboard/candidate`

### Scenario 3: Existing User (Has Profile)
1. Logs in
2. Lands on homepage
3. Sees "Go to Dashboard" button
4. Clicks button → Redirected to `/dashboard/candidate`
5. Views matched jobs

### Scenario 4: Returning User
1. Already logged in (session active)
2. Visits homepage
3. Button automatically shows correct state
4. One click to dashboard or onboarding

---

## ✅ Benefits

### For Users
- ✅ No confusion about where to go
- ✅ Context-aware navigation
- ✅ Seamless experience
- ✅ No dead-end clicks
- ✅ Clear next steps

### For Business
- ✅ Improved conversion rate
- ✅ Reduced bounce rate
- ✅ Better user retention
- ✅ Clearer user journey
- ✅ Professional UX

---

## 🔒 Security

### Authentication Check
- Uses `useAuth()` context to check user state
- No manual token handling
- Secure session management via Supabase

### Profile Check
- Queries database with user's `auth_id`
- Only fetches user's own data (RLS enforced)
- Handles errors gracefully

---

## 🎨 UI States

### Loading State
```javascript
disabled={checkingProfile}
className="... disabled:opacity-50 disabled:cursor-not-allowed"
```

When checking profile:
- Button shows "Loading..."
- Button is disabled
- Cursor shows not-allowed
- Opacity reduced to 50%

### Active State
- Button is clickable
- Shows appropriate text
- Hover effects work
- Smooth transitions

---

## 📱 Responsive Behavior

All buttons maintain their smart behavior across all devices:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

The authentication check happens on component mount, so the correct button text appears immediately.

---

## 🧪 Testing

### Test Cases

**1. Not Logged In**
- [ ] Click hero button → Goes to `/auth`
- [ ] Click CV button → Goes to `/auth`
- [ ] Click final CTA → Goes to `/auth`

**2. Logged In (No Profile)**
- [ ] Buttons show "Complete Your Profile"
- [ ] Click any button → Goes to `/onboarding`

**3. Logged In (Has Profile)**
- [ ] Buttons show "Go to Dashboard"
- [ ] Click any button → Goes to `/dashboard/candidate`

**4. Loading State**
- [ ] Buttons show "Loading..." while checking
- [ ] Buttons are disabled during check
- [ ] Check completes quickly (< 1 second)

---

## 🔄 Flow Diagram

```
Landing Page
     │
     ├─ Not Authenticated?
     │       └─ Click Button → /auth → Register/Login
     │                                      │
     │                                      ├─ After Register → /onboarding
     │                                      └─ After Login → Check Profile
     │                                                           │
     │                                                           ├─ No Profile → /onboarding
     │                                                           └─ Has Profile → /dashboard/candidate
     │
     ├─ Authenticated + No Profile?
     │       └─ Click Button → /onboarding → Complete Profile → /dashboard/candidate
     │
     └─ Authenticated + Has Profile?
             └─ Click Button → /dashboard/candidate
```

---

## 🎉 Summary

**All CTA buttons on the landing page are now authentication-aware:**

✅ Detect if user is logged in
✅ Check if profile is complete
✅ Show appropriate button text
✅ Navigate to correct destination
✅ Provide seamless user experience
✅ Handle loading states gracefully
✅ Work across all devices

**Users always know their next step and get there with one click!** 🚀

---

*Authentication-aware navigation implemented - smart, seamless, and user-friendly.*
