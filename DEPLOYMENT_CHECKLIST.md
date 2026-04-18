# 🚀 Quick Deployment Checklist

## ✅ Completed
- [x] Stripe payment gateway integrated
- [x] Razorpay payment gateway integrated (UPI, Cards, NetBanking)
- [x] Webhook handlers created for both gateways
- [x] Production deployment guide created
- [x] Code pushed to GitHub: https://github.com/nishkarshk212/smm-pannel

## 📋 What You Need To Do

### 1. Get Payment Gateway API Keys (10 minutes)

#### Option A: Stripe (International)
1. Go to https://dashboard.stripe.com
2. Sign up or log in
3. Go to **Developers → API keys**
4. Copy these 3 keys:
   - **Secret key** (sk_live_... or sk_test_...)
   - **Publishable key** (pk_live_... or pk_test_...)
   - Create webhook endpoint and get **Webhook secret** (whsec_...)

#### Option B: Razorpay (India - Recommended for Indian users)
1. Go to https://dashboard.razorpay.com
2. Sign up or log in
3. Go to **Settings → API Keys**
4. Copy these 3 keys:
   - **Key ID** (rzp_live_... or rzp_test_...)
   - **Key Secret**
   - Create webhook and get **Webhook Secret**

**Note**: You can use both! Users will choose at checkout.

### 2. Deploy to Vercel (10 minutes)
1. Go to https://vercel.com/new
2. Import your GitHub repository: `nishkarshk212/smm-pannel`
3. Add these environment variables:

```
DATABASE_URL=postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app-name.vercel.app
TELEGRAM_API_ID=30521437
TELEGRAM_API_HASH=9b01f57a7511278377202d843c9bfc34

# Stripe (Optional - for international payments)
STRIPE_SECRET_KEY=<from Stripe dashboard>
STRIPE_WEBHOOK_SECRET=<from webhook setup>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from Stripe dashboard>

# Razorpay (Optional - for Indian payments)
RAZORPAY_KEY_ID=<from Razorpay dashboard>
RAZORPAY_KEY_SECRET=<from Razorpay dashboard>
RAZORPAY_WEBHOOK_SECRET=<from webhook setup>
```

4. Click **Deploy**
5. Wait 2-3 minutes for build

### 3. Initialize Database (1 minute)
After deployment, run this command:
```bash
DATABASE_URL="postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres" npx prisma db push
```

### 4. Configure Payment Webhooks (5 minutes)

#### Stripe Webhook
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-app-name.vercel.app/api/payments/stripe/webhook`
3. Select event: `checkout.session.completed`
4. Copy the signing secret to Vercel

#### Razorpay Webhook
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add endpoint: `https://your-app-name.vercel.app/api/payments/razorpay/webhook`
3. Select events: `payment.captured`
4. Copy the webhook secret to Vercel

### 5. Test Payment (5 minutes)
1. Visit your deployed site
2. Create account
3. Choose payment method (Stripe or Razorpay)
4. Add funds:
   - **Stripe** (USD): Test card `4242 4242 4242 4242`
   - **Razorpay** (INR): Test card `4111 1111 1111 1111` or UPI `test@razorpay`
5. Verify balance updates

## 🎉 Done! Your panel is live!

## 📚 Documentation
- Full guide: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- Run automated deploy: `./deploy.sh`

## 💰 Pricing
- **Vercel**: Free tier (100GB bandwidth/month)
- **Supabase**: Free tier (500MB database)
- **Stripe**: 2.9% + $0.30 per transaction (International)
- **Razorpay**: 2% per transaction (India), UPI is FREE!

## 🔧 Need Help?
Check the full deployment guide or contact support.
