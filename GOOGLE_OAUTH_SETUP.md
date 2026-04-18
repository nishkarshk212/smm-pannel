# Google OAuth Setup Guide

## Overview
Your application now supports Google Sign-In for both **Sign Up** and **Sign In** functionality.

## Features Added ✅

1. **Toggle between Sign In and Sign Up** - Users can switch between modes
2. **Google OAuth Integration** - One-click authentication with Google
3. **Email-based authentication** - Continue with email (demo mode)
4. **Beautiful UI** - Modern design with Google branding

## Setup Instructions

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**

### Step 2: Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure the **OAuth consent screen**:
   - Choose "External" user type
   - Fill in required app information
   - Add your email for testing

4. Create OAuth Client ID:
   - **Application type**: Web application
   - **Name**: SMM Panel (or your preferred name)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)

5. Click **Create** and copy your:
   - **Client ID**
   - **Client Secret**

### Step 3: Update Environment Variables

Open your `.env` file and replace the placeholder values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-actual-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-actual-client-secret"
```

### Step 4: Restart Development Server

```bash
npm run dev
```

### Step 5: Test Google Sign-In

1. Navigate to `http://localhost:3000/api/auth/signin`
2. You'll see:
   - **Sign In** / **Sign Up** toggle buttons
   - **Sign in with Google** button (prominent, with Google logo)
   - Email sign-in option (below divider)
3. Click the Google button to test authentication

## How It Works

### Sign Up Flow
1. User clicks "Sign Up" tab
2. User clicks "Sign up with Google"
3. Google authentication window opens
4. After successful auth, user is redirected to `/dashboard`
5. New user account is automatically created in database

### Sign In Flow
1. User clicks "Sign In" tab
2. User clicks "Sign in with Google"
3. Google authentication window opens
4. After successful auth, user is redirected to `/dashboard`
5. Existing user is logged in

## Files Modified

- `src/lib/auth.ts` - Added Google OAuth provider
- `src/app/api/auth/signin/page.tsx` - Updated UI with toggle and Google button
- `.env` - Added Google credentials placeholders
- `.env.example` - Added Google credentials documentation

## Production Deployment

When deploying to production:

1. Update Google Cloud Console with production URLs:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

2. Update environment variables on your hosting platform (Vercel, etc.):
   ```
   GOOGLE_CLIENT_ID=your-production-client-id
   GOOGLE_CLIENT_SECRET=your-production-client-secret
   NEXTAUTH_URL=https://yourdomain.com
   ```

## Troubleshooting

### "Invalid Client" Error
- Make sure your redirect URI in Google Cloud Console exactly matches:
  `http://localhost:3000/api/auth/callback/google`

### "Access Blocked" Error
- Your app might be in testing mode
- Add your email as a test user in Google Cloud Console
- Or publish the app (requires verification)

### Environment Variables Not Loading
- Restart your dev server after updating `.env`
- Run: `pkill -f "next dev"` then `npm run dev`

## Next Steps

- [ ] Get your Google OAuth credentials from Google Cloud Console
- [ ] Update `.env` with real credentials
- [ ] Test Google sign-in locally
- [ ] Deploy to production with production credentials
