# 💳 Razorpay Integration Guide

## ✅ Your App is Deployed!

**Production URL**: https://smm-sepia.vercel.app  
**Inspect URL**: https://vercel.com/nishkarshk212s-projects/smm

---

## Step 1: Get Razorpay API Keys

### 1.1 Create Razorpay Account
1. Go to https://dashboard.razorpay.com/
2. Sign up or log in
3. Complete KYC verification (required for live mode)

### 1.2 Find Your API Keys
1. Go to **Settings** → **API Keys** (or **Account & Settings** → **API Keys**)
2. You'll see:
   - **Key ID** (starts with `rzp_test_` for test mode)
   - **Key Secret** (click "Generate" if not created)

### 1.3 Test Mode vs Live Mode
- **Test Mode**: Use for development (free, no real money)
- **Live Mode**: Use for production (requires KYC)

---

## Step 2: Add Razorpay Keys to Vercel

### Option A: Via Vercel Dashboard
1. Go to: https://vercel.com/nishkarshk212s-projects/smm/settings/environment-variables
2. Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxx` | Production |
| `RAZORPAY_KEY_SECRET` | `your_key_secret` | Production |
| `RAZORPAY_WEBHOOK_SECRET` | `your_webhook_secret` | Production |

3. Click **Save**

### Option B: Via CLI
```bash
cd /Users/nishkarshsharma/Documents/trae_projects/smm

# Add Razorpay Key ID
npx vercel env add RAZORPAY_KEY_ID production
# Enter your Key ID when prompted

# Add Razorpay Key Secret
npx vercel env add RAZORPAY_KEY_SECRET production
# Enter your Key Secret when prompted

# Add Razorpay Webhook Secret (we'll set this up in Step 3)
npx vercel env add RAZORPAY_WEBHOOK_SECRET production
# Enter webhook secret when prompted

# Redeploy
npx vercel --prod
```

---

## Step 3: Configure Razorpay Webhook

### 3.1 What is a Webhook?
A webhook notifies your app when a payment is completed. Razorpay sends a POST request to your server.

### 3.2 Set Up Webhook in Razorpay Dashboard

1. Go to **Settings** → **Webhooks**
2. Click **+ Add New Webhook**
3. Configure:
   - **Webhook URL**: `https://smm-sepia.vercel.app/api/payments/razorpay/webhook`
   - **Active**: ✅ Yes
   - **Alert Email**: Your email (for notifications)

4. **Select Events to Subscribe**:
   - ✅ `payment.captured` (Most important!)
   - ✅ `payment.failed` (Optional)
   - ✅ `order.paid` (Optional)

5. Click **Create Webhook**

### 3.3 Get Webhook Secret
After creating the webhook:
1. Click on the webhook you just created
2. Find **Webhook Secret** (or "Signing Secret")
3. Copy this secret
4. Add it to Vercel as `RAZORPAY_WEBHOOK_SECRET` (if you haven't already)

---

## Step 4: Test the Integration

### 4.1 Frontend Integration

Your app already has the backend ready. Now add the Razorpay checkout to your frontend.

Create a new file or update your funds page:

```typescript
// src/app/dashboard/funds/page.tsx (update existing)

import { useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function FundsPage() {
  const [amount, setAmount] = useState(100);

  const handlePayment = async () => {
    try {
      // Create order on your backend
      const response = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SMM Panel',
        description: 'Wallet Top-up',
        order_id: order.orderId,
        handler: async function (response: any) {
          // Payment successful
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          // Reload to see updated balance
          window.location.reload();
        },
        prefill: {
          name: 'Your Name',
          email: 'your@email.com',
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Funds</h1>
      
      <div className="max-w-md">
        <label className="block mb-2">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded mb-4"
          min="100"
        />
        
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
}
```

### 4.2 Add Razorpay Script to Layout

Update your root layout to include Razorpay SDK:

```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Razorpay SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
```

### 4.3 Add Razorpay Key ID to Environment Variables

You need to expose the Key ID to the frontend:

```bash
npx vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID production
# Enter your Key ID (rzp_test_xxxxxxxx)
```

**Important**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Step 5: Test Payments

### 5.1 Test Card Details (Test Mode Only)

Use these cards for testing:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: `1234`

**Failed Payment:**
- Card: `4000 0000 0000 0002`

### 5.2 Test UPI (Test Mode)
- Use any valid UPI ID format: `test@okaxis`
- No actual UPI app needed in test mode

### 5.3 Verify Webhook is Working

1. Make a test payment
2. Check Vercel logs: https://vercel.com/nishkarshk212s-projects/smm/logs
3. You should see: `Razorpay payment successful for user xxx, amount: ₹xxx`
4. Check your database - user balance should be updated

---

## Step 6: Go Live (Production Mode)

### 6.1 Complete KYC
1. Go to Razorpay Dashboard
2. Complete KYC verification
3. Wait for approval (usually 24-48 hours)

### 6.2 Switch to Live Keys
1. Get **Live API Keys** from Razorpay Dashboard
2. Update Vercel environment variables:
   ```bash
   npx vercel env rm RAZORPAY_KEY_ID production
   npx vercel env rm RAZORPAY_KEY_SECRET production
   
   npx vercel env add RAZORPAY_KEY_ID production
   # Enter LIVE key ID (rzp_live_xxxxxxxx)
   
   npx vercel env add RAZORPAY_KEY_SECRET production
   # Enter LIVE key secret
   ```

3. Update webhook URL to production URL
4. Redeploy: `npx vercel --prod`

### 6.3 Test Live Payment
- Make a small real payment (₹1)
- Verify webhook receives the event
- Check balance is updated

---

## Troubleshooting

### Payment Fails with "Invalid Key"
- Check `RAZORPAY_KEY_ID` is correct in Vercel
- Ensure it's exposed as `NEXT_PUBLIC_RAZORPAY_KEY_ID` for frontend

### Webhook Not Receiving Events
1. Check webhook URL is correct: `https://smm-sepia.vercel.app/api/payments/razorpay/webhook`
2. Verify webhook is **Active** in Razorpay Dashboard
3. Check Vercel logs for errors
4. Test webhook from Razorpay Dashboard (send test event)

### Balance Not Updating
1. Check webhook logs in Vercel
2. Verify `RAZORPAY_WEBHOOK_SECRET` is correct
3. Check database connection
4. Look for errors in webhook route

### CORS Errors
Your API routes should already handle this. If you see CORS errors, update the route:

```typescript
// Add to your API route
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

---

## Useful Links

- **Razorpay Dashboard**: https://dashboard.razorpay.com
- **Razorpay Docs**: https://razorpay.com/docs/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-upi-details/
- **Webhook Docs**: https://razorpay.com/docs/webhooks/
- **Your Vercel Logs**: https://vercel.com/nishkarshk212s-projects/smm/logs

---

## Quick Reference

### Environment Variables Needed:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=webhook_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

### Webhook URL:
```
https://smm-sepia.vercel.app/api/payments/razorpay/webhook
```

### Webhook Events:
- `payment.captured` ✅ (Required)
- `payment.failed` (Optional)
- `order.paid` (Optional)

### API Endpoints:
- Create Order: `POST /api/payments/razorpay`
- Webhook: `POST /api/payments/razorpay/webhook`

---

## Need Help?

1. Check Vercel logs: https://vercel.com/nishkarshk212s-projects/smm/logs
2. Check Razorpay logs: Dashboard → Logs
3. Review webhook delivery: Dashboard → Webhooks → Click webhook → Logs
