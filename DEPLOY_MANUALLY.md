# 🚀 Deploy to Vercel - Manual Steps

## The automated script has issues with interactive prompts. Follow these simple steps instead:

### Step 1: Go to Vercel Dashboard
Open: https://vercel.com/new

### Step 2: Import Your GitHub Repository
1. Click **"Import Git Repository"**
2. Select your repository: `nishkarshk212/smm-pannel`
3. Click **Import**

### Step 3: Configure Project
- **Project Name**: `smm-panel-telegram` (or your choice)
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `prisma generate && next build` (already in vercel.json)
- **Output Directory**: `.next` (already configured)

### Step 4: Add Environment Variables

Copy these from your `.env` file and add them in the "Environment Variables" section:

| Variable Name | Value (from your .env) |
|--------------|------------------------|
| `DATABASE_URL` | `postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres` |
| `NEXTAUTH_SECRET` | `yoursecret` |
| `NEXTAUTH_URL` | `http://localhost:3000` (update after deploy) |
| `TELEGRAM_API_ID` | `30521437` |
| `TELEGRAM_API_HASH` | `9b01f57a7511278377202d843c9bfc34` |

**Optional** (if you have payment gateways set up):
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

### Step 5: Deploy!
Click **"Deploy"** button

### Step 6: After Deployment
1. Wait for build to complete (~2-3 minutes)
2. Copy your production URL (e.g., `https://smm-panel-telegram.vercel.app`)
3. Update `NEXTAUTH_URL` in Vercel Settings → Environment Variables
4. Redeploy (Vercel will auto-trigger)

## Alternative: Use Vercel CLI Non-Interactive Mode

If you prefer CLI, run this in your terminal:

```bash
cd /Users/nishkarshsharma/Documents/trae_projects/smm

# Login first (if not already)
npx vercel login

# Deploy with all env vars (non-interactive)
npx vercel --prod --yes \
  --env DATABASE_URL="postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres" \
  --env NEXTAUTH_SECRET="yoursecret" \
  --env NEXTAUTH_URL="http://localhost:3000" \
  --env TELEGRAM_API_ID="30521437" \
  --env TELEGRAM_API_HASH="9b01f57a7511278377202d843c9bfc34"
```

The `--yes` flag skips interactive prompts!

## Troubleshooting

### Build Fails?
- Check that `vercel.json` has: `"buildCommand": "prisma generate && next build"`
- Ensure all environment variables are set
- Check build logs in Vercel dashboard

### Prisma Error?
- The fix is already in place - `prisma generate` runs before build
- If still failing, clear build cache in Vercel dashboard

### Need to Update Environment Variables?
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Edit and redeploy

## Your Repository URL:
https://github.com/nishkarshk212/smm-pannel

## Direct Deploy Link:
https://vercel.com/new/git/external?repository-url=https://github.com/nishkarshk212/smm-pannel
