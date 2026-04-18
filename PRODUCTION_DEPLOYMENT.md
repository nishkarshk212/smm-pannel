# 🚀 Production Deployment Guide - SMM Panel Telegram

This guide will help you deploy your SMM Panel permanently for public use with Stripe payment integration.

## Prerequisites

1. **GitHub Account** - [Sign up here](https://github.com/)
2. **Vercel Account** - [Sign up here](https://vercel.com/) (Free tier available)
3. **Supabase Account** - Already set up with your database
4. **Stripe Account** - [Sign up here](https://stripe.com/) for payment processing

---

## Step 1: Set Up Stripe Payment Gateway

### 1.1 Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Complete account verification (required for live payments)

### 1.2 Get API Keys
1. Go to **Developers → API keys**
2. Copy these keys:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

### 1.3 Create Webhook Endpoint
1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL: `https://your-domain.com/api/payments/stripe/webhook`
   - (You'll update this after deployment)
4. Select events to listen for:
   - ✅ `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)

### 1.4 Enable Live Mode
1. Toggle **Viewing test data** to **Live** mode in Stripe dashboard
2. Complete Stripe verification to accept real payments

---

## Step 2: Prepare Your Code

### 2.1 Update .env File
Create a `.env` file with your production values:

```bash
# Database
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="[RUN: openssl rand -base64 32]"
NEXTAUTH_URL="[YOUR_VERCEL_URL]"  # e.g., https://your-app.vercel.app

# Telegram API
TELEGRAM_API_ID="30521437"
TELEGRAM_API_HASH="9b01f57a7511278377202d843c9bfc34"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."  # Your Stripe secret key
STRIPE_WEBHOOK_SECRET="whsec_..."  # Your webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."  # Your publishable key
```

### 2.2 Generate NEXTAUTH_SECRET
Run this command in your terminal:
```bash
openssl rand -base64 32
```

---

## Step 3: Push to GitHub

### 3.1 Initialize Git Repository
```bash
cd /Users/nishkarshsharma/Documents/trae_projects/smm
git init
```

### 3.2 Create .gitignore (if not exists)
Ensure `.env` is in your `.gitignore` to protect sensitive data:
```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Build output
.next/
out/

# Debug
npm-debug.log*

# IDE
.vscode/
.idea/
```

### 3.3 Commit and Push
```bash
git add .
git commit -m "Initial commit - Production ready SMM Panel with Stripe"
git branch -M main

# Create a new repository on GitHub and push
git remote add origin https://github.com/[YOUR_USERNAME]/[REPO_NAME].git
git push -u origin main
```

---

## Step 4: Deploy to Vercel

### 4.1 Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New → Project**
3. Import your GitHub repository
4. Select your repository

### 4.2 Configure Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 4.3 Add Environment Variables
In the **Environment Variables** section, add:

| Variable Name | Value |
|--------------|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `NEXTAUTH_SECRET` | Generated secret from Step 2.2 |
| `NEXTAUTH_URL` | Your Vercel deployment URL (e.g., `https://your-app.vercel.app`) |
| `TELEGRAM_API_ID` | `30521437` |
| `TELEGRAM_API_HASH` | `9b01f57a7511278377202d843c9bfc34` |
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Your webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |

### 4.4 Deploy
Click **Deploy** and wait for the build to complete (~2-3 minutes).

---

## Step 5: Initialize Database

After deployment, push your database schema to Supabase:

```bash
# Set your DATABASE_URL and run
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres" npx prisma db push
```

This will create all necessary tables in your production database.

---

## Step 6: Configure Stripe Webhook

### 6.1 Update Webhook URL
1. Go back to **Stripe Dashboard → Webhooks**
2. Edit your webhook endpoint
3. Update the URL to your production URL:
   ```
   https://your-app.vercel.app/api/payments/stripe/webhook
   ```

### 6.2 Test Webhook
1. Make a test payment on your site
2. Check Stripe dashboard for webhook delivery
3. Verify payment appears in your database

---

## Step 7: Set Custom Domain (Optional)

### 7.1 Add Domain to Vercel
1. Go to your project in Vercel
2. Navigate to **Settings → Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### 7.2 Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain:
```
NEXTAUTH_URL="https://yourdomain.com"
```

---

## Step 8: Production Testing

### 8.1 Test Payment Flow
1. Visit your deployed site
2. Create an account
3. Add funds using Stripe (use test card: `4242 4242 4242 4242`)
4. Verify balance updates
5. Create a test order

### 8.2 Verify Webhook
Check webhook logs in Stripe dashboard to ensure successful delivery.

---

## Important Security Notes

### 🔒 Environment Variables
- **NEVER** commit `.env` files to GitHub
- Store all API keys securely
- Rotate keys regularly

### 🔐 Stripe Security
- Use **HTTPS only** (Vercel provides this automatically)
- Keep webhook secret confidential
- Monitor Stripe dashboard for suspicious activity

### 📊 Database Security
- Enable Supabase Row Level Security (RLS) for production
- Use strong database passwords
- Regular backups

---

## Monitoring & Maintenance

### Vercel Analytics
- Enable Vercel Analytics to monitor traffic
- Set up alerts for downtime

### Stripe Monitoring
- Monitor failed payments
- Track revenue and disputes
- Set up email notifications

### Database Maintenance
- Regular backups (Supabase provides automatic backups)
- Monitor database size
- Clean up old sessions periodically

---

## Troubleshooting

### Payment Not Processing
1. Check Stripe webhook is configured correctly
2. Verify environment variables are set
3. Check Vercel logs for errors

### Database Connection Issues
1. Verify DATABASE_URL is correct
2. Check Supabase project is active
3. Ensure IP is not blocked

### Authentication Issues
1. Verify NEXTAUTH_URL matches your domain
2. Regenerate NEXTAUTH_SECRET
3. Clear browser cookies and retry

---

## Support

For issues or questions:
- Check Vercel deployment logs
- Review Stripe webhook delivery logs
- Inspect browser console for errors
- Check Supabase database logs

---

## Cost Estimation

### Free Tier (Good for starting)
- **Vercel**: Free (100GB bandwidth/month)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Stripe**: 2.9% + $0.30 per transaction

### Production Tier (As you scale)
- **Vercel Pro**: $20/month
- **Supabase Pro**: $25/month
- **Stripe**: Same rates, higher volume

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure Stripe payments
3. ✅ Test payment flow
4. ✅ Set up custom domain
5. ✅ Monitor and scale

Your SMM Panel is now ready for public use! 🎉
