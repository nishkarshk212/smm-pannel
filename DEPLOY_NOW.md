# 🚀 Deploy Your SMM Panel NOW - Step by Step

## ⚡ Quick Deployment (15 Minutes)

Follow these exact steps to deploy your website so Razorpay can verify it.

---

## 📋 **Pre-Deployment Checklist**

✅ Code is pushed to GitHub: https://github.com/nishkarshk212/smm-pannel  
✅ You have a Vercel account (create one if needed)  
✅ You have Razorpay account: https://razorpay.me/@nishkarshkumar  

---

## 🎯 **Step 1: Create Vercel Account**

1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Complete signup

---

## 🎯 **Step 2: Deploy Your Project**

### **2.1 Import Your Repository**

1. Go to: https://vercel.com/new
2. Under **"Import Git Repository"**, click **"Continue with GitHub"**
3. Find and select: **`nishkarshk212/smm-pannel`**
4. Click **"Import"**

### **2.2 Configure Project**

**Project Name**: `smm-panel` (or any name you prefer)  
**Framework Preset**: Next.js (should be auto-detected)  
**Root Directory**: `./`  
**Build Command**: `next build` (leave as default)  
**Output Directory**: `.next` (leave as default)  

Click **"Next"**

---

## 🎯 **Step 3: Add Environment Variables**

This is the MOST IMPORTANT step. Click on **"Environment Variables"** and add these ONE BY ONE:

### **Copy and paste these exactly:**

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `DATABASE_URL` | `postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres` | Copy exactly |
| `NEXTAUTH_SECRET` | `mnHQwT1zpqbaaqiZUSIoWJRqaKOUYSgXUMa9ThrKA+U=` | Copy exactly |
| `NEXTAUTH_URL` | `https://smm-panel.vercel.app` | We'll update this after deployment |
| `TELEGRAM_API_ID` | `30521437` | Copy exactly |
| `TELEGRAM_API_HASH` | `9b01f57a7511278377202d843c9bfc34` | Copy exactly |

**Click "Add" for each variable**

### **Payment Gateway Variables (Add at least ONE)**

#### **Option A: Razorpay (Recommended for India)**

If you have Razorpay keys, add these:

| Variable Name | Value | Where to get |
|--------------|-------|--------------|
| `RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxx` | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | `your_secret_here` | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | `whsec_xxxxxxxx` | Razorpay Dashboard → Settings → Webhooks |

**Don't have keys yet?** Skip this for now, we'll add them later.

#### **Option B: Stripe (For International)**

If you have Stripe keys, add these:

| Variable Name | Value | Where to get |
|--------------|-------|--------------|
| `STRIPE_SECRET_KEY` | `sk_test_xxxxxxxx` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxxxxxxx` | Stripe Dashboard → Webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_xxxxxxxx` | Stripe Dashboard → Developers → API Keys |

**Don't have keys yet?** Skip this for now, we'll add them later.

---

## 🎯 **Step 4: Deploy!**

1. Click **"Deploy"**
2. Wait 2-3 minutes while it builds
3. You'll see a success screen with your live URL

**Your URL will be something like:**
```
https://smm-panel-xxxx.vercel.app
```

**Copy this URL!** You'll need it.

---

## 🎯 **Step 5: Update NEXTAUTH_URL**

1. Go to your project in Vercel Dashboard
2. Click on **"Settings"** tab
3. Click on **"Environment Variables"**
4. Find `NEXTAUTH_URL`
5. Click **"Edit"**
6. Change value to your actual deployment URL:
   ```
   https://smm-panel-xxxx.vercel.app
   ```
   (Replace with your actual URL)
7. Click **"Save"**

---

## 🎯 **Step 6: Initialize Database**

Open your terminal and run this command:

```bash
cd /Users/nishkarshsharma/Documents/trae_projects/smm
DATABASE_URL="postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres" npx prisma db push
```

This creates all the tables in your database.

---

## 🎯 **Step 7: Test Your Website**

1. Visit your deployed URL: `https://smm-panel-xxxx.vercel.app`
2. Create an account
3. Try to add funds (payment won't work yet without API keys)
4. Make sure the site loads properly

---

## ✅ **You're Done! Website is LIVE!**

Your website is now:
- ✅ Publicly accessible
- ✅ Has HTTPS security
- ✅ Can be verified by Razorpay
- ✅ Ready for payment integration

---

## 🎯 **Next: Get Razorpay API Keys**

Now that your website is live, let's get your Razorpay keys:

### **Step 1: Login to Razorpay**

1. Go to: https://dashboard.razorpay.com
2. Login with your credentials
3. You should see your account linked to: `@nishkarshkumar`

### **Step 2: Complete KYC (Required for Live Payments)**

1. Go to **Account & Settings → KYC**
2. Submit:
   - PAN Card
   - Bank Account Details
   - Business Details (can be Individual/Freelancer)
3. Wait for approval (usually 24-48 hours)

### **Step 3: Get API Keys**

1. Go to **Account & Settings → API Keys**
2. Click **"Generate Key"**
3. Copy these:
   - **Key ID**: `rzp_test_xxxxxxxx` (or `rzp_live_xxxxxxxx` for live)
   - **Key Secret**: Click to reveal and copy

### **Step 4: Create Webhook**

1. Go to **Account & Settings → Webhooks**
2. Click **"Create Webhook"**
3. **Webhook URL**: 
   ```
   https://smm-panel-xxxx.vercel.app/api/payments/razorpay/webhook
   ```
   (Replace with your actual URL)
4. **Active Events**: Select these:
   - ✅ `payment.captured`
   - ✅ `payment.failed` (optional)
5. Click **"Create"**
6. Copy the **Webhook Secret**

### **Step 5: Add Keys to Vercel**

Go back to Vercel → Your Project → Settings → Environment Variables

Add these:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxx
```

---

## 🎯 **Step 8: Create Razorpay UPI ID**

Once your website is verified and KYC is complete:

### **Option 1: Use Razorpay Payment Pages**

1. Go to **Payment Pages** in Razorpay dashboard
2. Create a payment page for your SMM Panel
3. Customers can pay via UPI, cards, etc.

### **Option 2: Get Business UPI ID**

After KYC approval, Razorpay provides:
- **Virtual Payment Address (VPA)**: `yourbusiness@razorpay`
- Can receive UPI payments directly

### **Option 3: Use Your Existing Link**

Your Razorpay payment link is already active:
```
https://razorpay.me/@nishkarshkumar
```

You can share this link for direct payments!

---

## 🆘 **Troubleshooting**

### **Build Failed?**
- Check environment variables are correct
- Look at build logs in Vercel
- Make sure all required variables are set

### **Database Error?**
- Verify DATABASE_URL is correct
- Run `npx prisma db push` again
- Check Supabase project is active

### **Can't Login?**
- Clear browser cookies
- Make sure NEXTAUTH_URL matches your deployment URL exactly
- Try in incognito mode

### **Payment Not Working?**
- Make sure you added Razorpay/Stripe keys to Vercel
- Check webhook is configured
- Look at Vercel logs for errors

---

## 📞 **Need Help?**

If you get stuck at any step:
1. Check the error message
2. Look at Vercel logs
3. Refer to [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md) for Razorpay help
4. Refer to [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for deployment help

---

## 🎉 **After Deployment**

Once deployed, your website will have:

✅ **User Registration** - Users can create accounts  
✅ **Login System** - Secure authentication  
✅ **Wallet System** - Add funds via Razorpay/Stripe  
✅ **Order Management** - Create Telegram member orders  
✅ **Support Tickets** - Customer support system  
✅ **Referral System** - Earn commissions  
✅ **Admin Dashboard** - Manage everything  

---

## 🚀 **Start Deploying NOW!**

1. Go to: https://vercel.com/new
2. Import: `nishkarshk212/smm-pannel`
3. Add environment variables (copy from above)
4. Click Deploy
5. Come back and tell me your deployment URL!

**I'll be here to help you with Razorpay setup once it's deployed!** 💪
