# 💳 Razorpay Payment Gateway Setup Guide

Razorpay is perfect for Indian customers and supports UPI, Net Banking, Credit/Debit Cards, and Wallets.

---

## 🎯 Why Use Razorpay?

✅ **Indian Payment Methods**: UPI (GPay, PhonePe, Paytm), Net Banking, Cards, Wallets  
✅ **Lower Fees**: 2% per transaction (vs Stripe's 2.9%)  
✅ **Instant Settlements**: Money in your bank account in 2-7 days  
✅ **Easy KYC**: Complete verification online with PAN & Bank details  
✅ **Better for INR**: No currency conversion fees for Indian customers  

---

## 📋 Step-by-Step Setup

### Step 1: Create Razorpay Account

1. **Sign Up**: Go to https://dashboard.razorpay.com/signup
2. **Activate Account**: Verify your email and phone number
3. **Complete KYC** (Required for live payments):
   - PAN Card
   - Bank Account Details
   - Business details (can be individual/freelancer)

### Step 2: Get API Keys

#### Test Mode (For Development)
1. Go to **Settings → API Keys**
2. Click **Generate Key**
3. Copy these keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click to reveal)

#### Live Mode (For Production)
1. Complete KYC verification first
2. Switch to **Live Mode** (toggle at top)
3. Go to **Settings → API Keys**
4. Generate live keys:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret**

### Step 3: Configure Webhook

1. Go to **Settings → Webhooks**
2. Click **Create Webhook**
3. **Webhook URL**: `https://your-app.vercel.app/api/payments/razorpay/webhook`
4. **Active Events**: Select these events:
   - ✅ `payment.captured`
   - ✅ `payment.failed` (optional)
   - ✅ `order.paid` (optional)
5. Click **Create**
6. Copy the **Webhook Secret** (you'll need this)

### Step 4: Add Keys to Vercel

Add these environment variables in Vercel:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `RAZORPAY_KEY_ID` | From Step 2 | `rzp_test_xxxxxxxx` or `rzp_live_xxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | From Step 2 | Your key secret |
| `RAZORPAY_WEBHOOK_SECRET` | From Step 3 | Your webhook secret |

---

## 🧪 Testing Razorpay

### Test Card Details

Use these cards in test mode:

**Success:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Failure:**
- Card: `4000 0000 0000 0002`

### Test UPI

1. Select UPI as payment method
2. Enter any UPI ID (e.g., `test@razorpay`)
3. Complete payment

### Test Net Banking

1. Select Net Banking
2. Choose any bank
3. Use test credentials shown on screen

---

## 🚀 Production Checklist

### Before Going Live

- [ ] Complete Razorpay KYC verification
- [ ] Switch to Live Mode in Razorpay dashboard
- [ ] Generate live API keys
- [ ] Update webhook URL to production URL
- [ ] Add live keys to Vercel environment variables
- [ ] Test with real UPI/card payment (₹10)
- [ ] Verify webhook is receiving events
- [ ] Check bank account is linked for settlements

### Minimum Amount

- **Test Mode**: ₹100 minimum
- **Live Mode**: ₹100 minimum (you can change this)

---

## 💰 Pricing

### Transaction Fees

| Payment Method | Fee |
|---------------|-----|
| Cards, Wallets, Net Banking | 2% |
| UPI | 0% (Free until Dec 2024) |
| EMI | 3% |

### Example Calculation

For a ₹1000 payment:
- **UPI**: ₹0 fee → You receive ₹1000
- **Cards**: ₹20 fee → You receive ₹980
- **Net Banking**: ₹20 fee → You receive ₹980

---

## 🔧 Integration Details

### API Routes Created

1. **Create Order**: `/api/payments/razorpay` (POST)
   - Creates Razorpay order
   - Returns order ID for checkout

2. **Webhook Handler**: `/api/payments/razorpay/webhook` (POST)
   - Receives payment events
   - Verifies signature
   - Updates user balance automatically

### Payment Flow

```
User enters amount
    ↓
Click "Top up with Razorpay"
    ↓
Create order via API
    ↓
Razorpay checkout opens
    ↓
User pays (UPI/Card/NetBanking)
    ↓
Webhook receives payment.captured
    ↓
Balance updated automatically
    ↓
Success message shown
```

---

## 🆘 Troubleshooting

### Payment Not Processing

1. **Check API Keys**: Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel
2. **Check Webhook**: Ensure webhook URL is correct and active
3. **Check Logs**: Vercel Dashboard → Logs → Filter by "razorpay"

### Webhook Not Receiving Events

1. **Verify URL**: Must be `https://your-domain.com/api/payments/razorpay/webhook`
2. **Check Events**: Ensure `payment.captured` is selected
3. **Test Webhook**: Use Razorpay's "Test Webhook" button
4. **Check Signature**: Verify RAZORPAY_WEBHOOK_SECRET is correct

### Invalid Signature Error

1. Regenerate webhook secret in Razorpay dashboard
2. Update RAZORPAY_WEBHOOK_SECRET in Vercel
3. Redeploy your app

### Minimum Amount Error

- Minimum amount is ₹100 INR
- Make sure amount >= 100

---

## 📊 Monitoring

### Razorpay Dashboard

Monitor these metrics:
- **Payments**: Successful/Failed transactions
- **Settlements**: Money transferred to your bank
- **Webhooks**: Delivery status
- **Refunds**: If you issue any refunds

### Vercel Logs

Check logs for:
- Payment creation errors
- Webhook processing errors
- Database update failures

---

## 🎨 Customization

### Change Checkout Theme

In `FundsForm.tsx`, modify:

```typescript
theme: {
  color: '#3B82F6', // Change to your brand color
}
```

### Change Business Name

```typescript
name: 'SMM Panel', // Change to your business name
```

### Add Customer Details

```typescript
prefill: {
  name: user.name,
  email: user.email,
  contact: user.phone,
}
```

---

## 📱 Supported Payment Methods

### UPI Apps
- Google Pay (GPay)
- PhonePe
- Paytm
- BHIM
- WhatsApp Pay
- And 100+ UPI apps

### Cards
- Visa
- Mastercard
- RuPay
- American Express

### Net Banking
- All major Indian banks (SBI, HDFC, ICICI, Axis, etc.)

### Wallets
- Paytm Wallet
- Mobikwik
- Ola Money
- And more

---

## 🔐 Security

✅ **PCI DSS Compliant**: Razorpay handles card security  
✅ **Signature Verification**: Webhook signature verified  
✅ **HTTPS Only**: All communication encrypted  
✅ **No Card Storage**: Cards stored securely by Razorpay  

---

## 📞 Support

### Razorpay Support
- Email: support@razorpay.com
- Phone: +91-80-6873-6727
- Docs: https://razorpay.com/docs/

### Common Issues
- KYC delays: 2-3 business days
- Settlement delays: Check bank holidays
- Failed payments: Check Razorpay dashboard logs

---

## 🎯 Next Steps

1. ✅ Create Razorpay account
2. ✅ Get API keys
3. ✅ Configure webhook
4. ✅ Add keys to Vercel
5. ✅ Test with test cards
6. ✅ Complete KYC
7. ✅ Go live!

---

## 💡 Pro Tips

1. **Start with Test Mode**: Test everything before going live
2. **Enable All Payment Methods**: More options = more conversions
3. **Set Up Email Notifications**: Get notified for each payment
4. **Monitor Webhook Logs**: Catch issues early
5. **Keep KYC Documents Ready**: Speed up verification
6. **Use UPI**: It's free and most popular in India

---

Your SMM Panel now supports both **Stripe** (international) and **Razorpay** (India)! 🎉
