# 💰 Manual Payment System - Quick Setup Guide

## ✅ What's Been Added

A complete manual payment system where users can:
- ✅ Scan QR code or use UPI to send payment
- ✅ Use bank transfer details
- ✅ Submit payment proof with transaction ID
- ✅ Wait for admin approval
- ✅ Auto-receive balance once approved

---

## 🔧 Step 1: Update Your Payment Details

Open `src/app/dashboard/funds/ManualPayment.tsx` and update these lines with YOUR details:

```typescript
const PAYMENT_DETAILS = {
  upi: {
    id: "your-upi-id@paytm", // ← CHANGE THIS to your UPI ID
    name: "Your Business Name", // ← CHANGE THIS
  },
  qrCode: {
    upiUrl: `upi://pay?pa=your-upi-id@paytm&pn=Your%20Business%20Name&cu=INR`, // ← CHANGE THIS
  },
  bank: {
    accountName: "Your Name", // ← CHANGE THIS
    accountNumber: "1234567890", // ← CHANGE THIS
    ifsc: "SBIN0001234", // ← CHANGE THIS
    bankName: "State Bank of India", // ← CHANGE THIS
  },
};
```

### Example with Real Data:

```typescript
const PAYMENT_DETAILS = {
  upi: {
    id: "john@paytm",
    name: "John's SMM Panel",
  },
  qrCode: {
    upiUrl: `upi://pay?pa=john@paytm&pn=John's%20SMM%20Panel&cu=INR`,
  },
  bank: {
    accountName: "John Doe",
    accountNumber: "9876543210",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
  },
};
```

---

## 🚀 Step 2: Deploy to Vercel

The code is already pushed to GitHub. Vercel will auto-deploy, or run:

```bash
npx vercel --prod --yes
```

---

## 👨‍💼 Step 3: Set Yourself as Admin

To access the admin panel, you need ADMIN role in the database.

### Option A: Via Prisma Studio (Easy)

1. Open Prisma Studio:
```bash
npx prisma studio
```

2. Find your user in the `User` table
3. Change `role` from `"USER"` to `"ADMIN"`
4. Save

### Option B: Via Database Query

```bash
# Connect to your database and run:
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

---

## 📱 Step 4: Test the System

### As a User:

1. Go to: `http://localhost:3000/dashboard/funds` (or your production URL)
2. You'll see:
   - QR code (scan with any UPI app)
   - UPI ID with copy button
   - Bank details with copy buttons
3. Make a test payment (send ₹1 to your UPI)
4. Fill out the form:
   - Amount: `1`
   - Transaction ID: `UPI123456789` (from your payment app)
   - Upload screenshot (optional)
5. Click "Submit Payment Proof"

### As Admin:

1. Go to: `http://localhost:3000/admin/payments`
2. You'll see all pending payments
3. Click "Approve" or "Reject"
4. If approved, user's balance is automatically updated!

---

## 🎯 How It Works

### User Flow:
```
1. User visits /dashboard/funds
2. Sees QR code & payment details
3. Makes payment via UPI/Bank
4. Submits proof with transaction ID
5. Waits for approval (status: PENDING)
6. Gets notified when approved
7. Balance automatically added
```

### Admin Flow:
```
1. Admin visits /admin/payments
2. Sees all pending payments
3. Reviews transaction details
4. Clicks Approve or Reject
5. If approved: balance auto-added
6. Payment removed from pending list
```

---

## 📊 Database Structure

Payment model now includes:
- `status`: "PENDING" → "APPROVED" or "REJECTED"
- `provider`: "MANUAL" (for manual payments)
- `metadata`: JSON with payment method, transaction ID, etc.

---

## 🔐 Security Features

✅ Only admins can approve payments  
✅ Users can only see their own payments  
✅ Transaction IDs are recorded  
✅ Payment proofs can be uploaded  
✅ All changes are tracked in database  

---

## 📍 URLs

- **User Payment Page**: `/dashboard/funds`
- **Admin Approval Panel**: `/admin/payments`
- **API - Submit Payment**: `POST /api/payments/manual`
- **API - Admin Actions**: `GET/POST /api/admin/payments`

---

## 🎨 Customization

### Change QR Code Size:
In `ManualPayment.tsx`:
```typescript
<QRCodeSVG
  value={PAYMENT_DETAILS.qrCode.upiUrl}
  size={200} // ← Change this (default: 200)
  level="H"
/>
```

### Add Payment Instructions:
Edit the instructions section in `ManualPayment.tsx`:
```typescript
<ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside">
  <li>Your instruction here</li>
  <li>Another instruction</li>
</ol>
```

---

## 💡 Tips

1. **Use a dedicated UPI ID** for your business
2. **Enable notifications** on your UPI app to see payments instantly
3. **Check regularly** the admin panel for pending payments
4. **Respond quickly** to keep users happy
5. **Keep screenshots** as backup proof

---

## 🐛 Troubleshooting

### QR Code Not Showing?
- Make sure you installed `qrcode.react`: `npm install qrcode.react`
- Check that UPI URL format is correct

### Can't Access Admin Panel?
- Verify your user role is "ADMIN" in database
- Check authentication is working

### Payment Not Submitting?
- Check database connection
- Verify Prisma schema was pushed: `npx prisma db push`

### Balance Not Updating?
- Make sure you clicked "Approve" (not just changed status)
- Check transaction is completing successfully

---

## 🎉 You're All Set!

Your manual payment system is ready! Users can now:
- Scan & pay instantly
- Submit proof easily  
- Get balance after approval

No need for Razorpay/Stripe setup - just your UPI ID! 🚀
