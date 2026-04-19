# 🚨 CRITICAL: Database Setup Required for Production

## Problem
SQLite doesn't work on Vercel's serverless platform because the filesystem is read-only after deployment.

## Solution: Use a Free Cloud Database

### Option 1: Neon (Recommended - Free Serverless PostgreSQL)

**Setup Time: 2 minutes**

1. **Go to**: https://neon.tech
2. **Sign up** with your GitHub account
3. **Create a new project**
   - Project name: `smm-panel`
   - Region: Choose closest to your users (e.g., US East)
4. **Get your connection string**
   - Go to your project dashboard
   - Copy the connection string (looks like):
     ```
     postgresql://user:password@ep-xxx-yyy.us-east-2.aws.neon.tech/dbname?sslmode=require
     ```
5. **Update your `.env` file**:
   ```env
   DATABASE_URL="your-neon-connection-string-here"
   ```
6. **Push to GitHub and redeploy**:
   ```bash
   git add .
   git commit -m "Use Neon database for production"
   git push
   bash deploy-vercel.sh
   ```

### Option 2: Supabase (Reactivate Your Project)

If your Supabase project was paused:

1. **Go to**: https://supabase.com/dashboard
2. **Find your project**: `eetrvtexoirmmspgffak`
3. **Click "Resume Project"** (if paused)
4. **Go to Project Settings → Database**
5. **Copy the connection string**
6. **Update `.env`**:
   ```env
   DATABASE_URL="your-supabase-connection-string"
   ```
7. **Redeploy**

### Option 3: Vercel Postgres (Built-in)

1. **Go to**: https://vercel.com/dashboard
2. **Select your project**: `smm`
3. **Go to Storage tab**
4. **Click "Create Database" → "Postgres"**
5. **Connect it to your project**
6. **Vercel will automatically set `DATABASE_URL`**
7. **Redeploy**

## After Setting Up Database

1. **Deploy to Vercel**:
   ```bash
   bash deploy-vercel.sh
   ```

2. **Initialize database schema** (first time only):
   - Vercel will run `prisma generate` automatically
   - The schema will be created on first connection

3. **Test your app**:
   - Visit: https://smm-sepia.vercel.app
   - Sign in with any email
   - Should work without database errors!

## Why Not SQLite?

- ❌ SQLite stores data in a local file
- ❌ Vercel's serverless functions are read-only after build
- ❌ Data doesn't persist between deployments
- ✅ Cloud databases (PostgreSQL/MySQL) work perfectly with Vercel
- ✅ Data persists permanently
- ✅ Auto-scaling and backups included

## Need Help?

If you're stuck, use **Neon** (Option 1) - it's the easiest and most reliable for Vercel deployments.
