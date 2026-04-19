# 🚀 Supabase Setup Guide - Aviator Earnings Platform

## ✅ What's Already Done

1. ✅ **Vercel Analytics** - Installed and configured with new import
2. ✅ **Supabase URL** - Configured: `https://eetrvtexoirmmspgffak.supabase.co`
3. ✅ **Supabase Anon Key** - Added to environment variables
4. ✅ **Database Schema** - Prisma schema ready

## 📋 Setup Steps

### Step 1: Update Database Password

Open `.env.local` and replace `YOUR_PASSWORD` with your actual Supabase database password:

```bash
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres"
```

**Where to find your password:**
1. Go to https://supabase.com/dashboard
2. Select your project: `eetrvtexoirmmspgffak`
3. Go to **Project Settings** → **Database**
4. Find your database password and copy it

### Step 2: Initialize Supabase CLI

Run the automated setup script:

```bash
./setup-supabase.sh
```

Or run these commands manually:

```bash
# Login to Supabase
npx supabase login

# Initialize Supabase
npx supabase init

# Link to your project
npx supabase link --project-ref eetrvtexoirmmspgffak
```

### Step 3: Push Database Schema

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Step 4: Verify Database Connection

```bash
# Test connection by querying the database
npx prisma db pull
```

## 🔧 Environment Variables

### Required Variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://eetrvtexoirmmspgffak.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_kkmtfw7kjDlPhGp6BoURuQ_SEB29rbZ"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateways (Optional)
RAZORPAY_KEY_ID="your-key"
RAZORPAY_KEY_SECRET="your-secret"
STRIPE_SECRET_KEY="your-key"
```

### Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## 🌐 Deploy to Vercel

### Option 1: Automatic (Recommended)

```bash
npx vercel --prod
```

### Option 2: Via GitHub

1. Push code to GitHub (already done ✅)
2. Go to https://vercel.com/dashboard
3. Import your repository
4. Add environment variables
5. Deploy!

### Add Environment Variables to Vercel:

In your Vercel dashboard, add these variables:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your Vercel URL)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Payment gateway keys (if using)

## 📊 Supabase Project Info

- **Project URL**: https://eetrvtexoirmmspgffak.supabase.co
- **Project Reference**: `eetrvtexoirmmspgffak`
- **Database**: PostgreSQL
- **Host**: db.eetrvtexoirmmspgffak.supabase.co
- **Port**: 5432
- **Database Name**: postgres
- **User**: postgres

## 🔍 Useful Commands

```bash
# View database tables
npx prisma studio

# Generate Prisma types
npx prisma generate

# Push schema changes
npx prisma db push

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# View Supabase logs
npx supabase logs

# Start local Supabase (for testing)
npx supabase start
```

## ✅ Verification Checklist

- [ ] Database password updated in `.env.local`
- [ ] Supabase CLI installed
- [ ] Supabase project linked
- [ ] Database schema pushed
- [ ] Prisma client generated
- [ ] Environment variables set in Vercel
- [ ] App deployed successfully
- [ ] Analytics working

## 🚨 Troubleshooting

### Connection Error
- Check your database password is correct
- Verify the DATABASE_URL format
- Ensure your Supabase project is active

### Build Fails
- Run `npx prisma generate` locally first
- Check all TypeScript errors are fixed
- Verify all dependencies are installed

### Analytics Not Working
- Verify `@vercel/analytics` is installed
- Check import: `import { Analytics } from "@vercel/analytics/next"`
- Ensure Analytics component is in layout.tsx

## 📞 Support

If you need help:
1. Check Supabase dashboard: https://supabase.com/dashboard
2. Check Vercel logs: https://vercel.com/dashboard
3. Review Prisma docs: https://www.prisma.io/docs

---

**Your Aviator Earnings Platform is ready! 🎮**
