# 🚀 AVIATOR GAME - DEPLOYMENT GUIDE

## ✅ What's Been Done

Your SMM Panel has been completely transformed into an Aviator Crash Game with:

1. ✅ **Aviator Game Component** - Real-time animated multiplier graph
2. ✅ **Betting System** - Place bets, cash out, auto cash-out features
3. ✅ **Database Schema** - Game rounds, bets, transactions tables
4. ✅ **API Endpoints** - Bet placement, cash-out, game state, history
5. ✅ **Game Engine** - Automated round management and crash point generation
6. ✅ **Updated UI** - Landing page, dashboard, sidebar rebranded for Aviator
7. ✅ **Code Pushed to GitHub** - All changes committed and pushed

## 📋 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (RECOMMENDED)

1. **Go to Vercel**
   - Visit: https://vercel.com/dashboard
   - Login to your account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository: `nishkarshk212/smm-pannel`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL=postgresql://username:password@host:5432/dbname
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   NODE_ENV=production
   ```

   **Getting DATABASE_URL:**
   - Use Supabase (https://supabase.com)
   - Create a new project
   - Go to Settings → Database
   - Copy the Connection String (URI mode)
   
   **Generating NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live!

### Option 2: Deploy via CLI

```bash
cd /Users/nishkarshkr/Desktop/smmm/smm-pannel
vercel --prod
```

Follow the prompts to configure and deploy.

## 🔧 Post-Deployment Setup

### 1. Initialize Database

After deployment, run this command to set up your database:

```bash
# In your Vercel project settings, go to Storage
# Or run locally with your production DATABASE_URL:
npx prisma db push
npx prisma generate
```

### 2. Test the Game

1. Visit your deployed URL
2. Sign up/Login
3. Go to Dashboard → "Play Aviator"
4. Add funds to your wallet
5. Start playing!

## 🎮 Game Features Live

- ✅ Real-time crash game
- ✅ Animated multiplier graph
- ✅ Instant bet placement
- ✅ Auto cash-out system
- ✅ Transaction history
- ✅ Referral program
- ✅ Mobile responsive

## 📊 Admin Panel

Access admin features at: `your-domain.com/admin`

- View all bets
- Monitor transactions
- User management
- Game statistics

## ⚠️ Important Notes

1. **Database**: You MUST have a PostgreSQL database (Supabase recommended)
2. **Environment Variables**: All env vars must be set in Vercel
3. **First Run**: The game engine starts automatically in production
4. **Security**: Never commit your `.env` file

## 🆘 Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify DATABASE_URL is correct
- Check build logs in Vercel

### Database Connection Error
- Verify DATABASE_URL format
- Ensure database is accessible from Vercel
- Check Supabase IP whitelist

### Game Not Starting
- Check that NODE_ENV=production is set
- Verify database schema is pushed
- Check server logs

## 🎉 You're All Set!

Your Aviator game should now be live and ready for players!

**Next Steps:**
1. Test all features
2. Add payment gateways (Razorpay/Stripe already integrated)
3. Configure custom domain (optional)
4. Monitor analytics and user activity

## 📞 Need Help?

- Check the README.md for detailed documentation
- Open an issue on GitHub
- Contact support through the app

---

**Live URL**: Will be provided after deployment
**GitHub**: https://github.com/nishkarshk212/smm-pannel
