# 🔧 Fix Supabase Connection on Vercel

## Problem:
Database works locally but NOT on Vercel because Supabase is blocking Vercel's IPs.

## Solution: Use Supabase Connection Pooler

### Step 1: Get Connection Pooler URL

1. Go to: **https://supabase.com/dashboard**
2. Select your project
3. Go to: **Settings** (gear icon in left sidebar)
4. Click on: **Database**
5. Scroll to: **"Connection Pooling"** section
6. Find: **"Transaction mode"** (port 6543)
7. Copy the connection string

It looks like:
```
postgresql://postgres.[your-project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### Step 2: Update Vercel Environment Variable

Run this command with YOUR connection pooler URL:

```bash
npx vercel env rm DATABASE_URL production
npx vercel env add DATABASE_URL production
# Paste your connection pooler URL when prompted
```

### Step 3: Redeploy

```bash
npx vercel --prod --yes
```

---

## Alternative: Disable IP Restrictions

### If you want to use the direct connection:

1. Go to Supabase Dashboard
2. Settings → Database
3. Find **"Network Restrictions"**
4. Change from **"Restrict to IPs"** to **"Allow all IPs"**
5. Save
6. Redeploy to Vercel

⚠️ **Warning**: This allows connections from anywhere (less secure)

---

## Verify It Works

After updating, test locally:
```bash
npx prisma db pull
```

Then deploy:
```bash
npx vercel --prod --yes
```

---

## Your Current Database Details:

- **Host**: `db.eetrvtexoirmmspgffak.supabase.co`
- **Port**: `5432` (direct) or `6543` (pooler)
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: `Nishkarsh@242`

---

**Once you update to the connection pooler, it will work on Vercel!** 🚀
