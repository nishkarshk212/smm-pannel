# 🚀 Quick Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```
3. **GitHub Repository**: Your code should be pushed to GitHub

## Method 1: Automated Deployment (Recommended)

### Step 1: Login to Vercel

```bash
vercel login
```

### Step 2: Run Deployment Script

```bash
./deploy-vercel.sh
```

This script will:
- ✅ Load environment variables from your `.env` file
- ✅ Push code to GitHub
- ✅ Deploy to Vercel with all environment variables
- ✅ Set up production build

### Step 3: First Time Setup

On first run, Vercel CLI will ask:
- **Set up and deploy?** → Yes
- **Which scope?** → Choose your account
- **Link to existing project?** → No (first time)
- **Project name?** → smm-panel (or your preferred name)
- **Directory?** → `.` (current directory)

## Method 2: Manual Deployment

### Step 1: Link Project

```bash
vercel link
```

### Step 2: Add Environment Variables

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add TELEGRAM_API_ID
vercel env add TELEGRAM_API_HASH
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add RAZORPAY_WEBHOOK_SECRET
```

### Step 3: Deploy

```bash
vercel --prod
```

## Method 3: GitHub Integration (Auto-Deploy)

### Step 1: Connect to Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New → Project"**
3. Import your GitHub repository
4. Configure environment variables (copy from `.env`)
5. Click **Deploy**

### Step 2: Auto-Deploy on Push

Once connected, every push to `main` branch will automatically deploy!

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth encryption key | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `TELEGRAM_API_ID` | Telegram API ID | `12345678` |
| `TELEGRAM_API_HASH` | Telegram API Hash | `abc123def456` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `RAZORPAY_KEY_ID` | Razorpay key ID | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | `your_secret` |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook secret | `your_webhook_secret` |

## Post-Deployment Setup

### 1. Update NEXTAUTH_URL

After deployment, update NEXTAUTH_URL with your production URL:

```bash
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL production
# Enter your production URL: https://your-app.vercel.app
```

### 2. Initialize Database

Run this once after first deployment:

```bash
# Get your production DATABASE_URL from Vercel
vercel env pull .env.production

# Push schema to production database
npx prisma db push --schema=./prisma/schema.prisma
```

### 3. Configure Webhooks

**Stripe Webhook:**
- URL: `https://your-app.vercel.app/api/payments/stripe/webhook`
- Events: `checkout.session.completed`

**Razorpay Webhook:**
- URL: `https://your-app.vercel.app/api/payments/razorpay/webhook`
- Events: `payment.captured`

### 4. Set Custom Domain (Optional)

```bash
vercel domains add yourdomain.com
```

## Useful Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add VARIABLE_NAME

# Remove deployment
vercel rm [deployment-url]

# Open dashboard
vercel dashboard
```

## Troubleshooting

### Build Fails

1. Check logs: `vercel logs`
2. Verify all environment variables are set
3. Ensure DATABASE_URL is accessible from Vercel

### Database Connection Error

1. Make sure your database allows connections from Vercel IPs
2. Check DATABASE_URL format
3. For Supabase: Enable "Database Password Reset" if needed

### Environment Variables Not Working

1. Verify they're set for production: `vercel env ls`
2. Redeploy: `vercel --prod`
3. Check in Vercel Dashboard → Settings → Environment Variables

## Quick Deploy Commands

```bash
# Login
vercel login

# Deploy with env vars (one-liner)
./deploy-vercel.sh

# Or manual deploy
vercel --prod
```

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deploy: https://nextjs.org/docs/deployment
- Project Issues: Check `.env.example` for required variables
