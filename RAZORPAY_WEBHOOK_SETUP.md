# 🎯 Razorpay Webhook Setup - Actual Values

## ⚠️ **IMPORTANT: You Need Your Vercel Deployment URL First!**

Your webhook URL depends on your deployed website URL.

---

## 📋 **Step 1: Get Your Deployment URL**

1. Go to https://vercel.com/dashboard
2. Click on your project (`smm-panel`)
3. Copy your URL from the top, it looks like:
   ```
   https://smm-panel-xxxx.vercel.app
   ```
   or if you added a custom domain:
   ```
   https://yourdomain.com
   ```

**Write down your URL!** You'll need it below.

---

## 🎯 **Step 2: Create Webhook in Razorpay**

### **2.1 Go to Webhooks Settings**

1. Login to: https://dashboard.razorpay.com
2. Go to: **Settings** (gear icon on left sidebar)
3. Click on: **Webhooks**
4. Click button: **Create Webhook** (top right)

---

### **2.2 Fill in Webhook Details**

#### **Webhook URL** (Replace with your actual URL)

```
https://YOUR-APP-URL.vercel.app/api/payments/razorpay/webhook
```

**Examples:**
- If your URL is `https://smm-panel.vercel.app`
  - Webhook URL: `https://smm-panel.vercel.app/api/payments/razorpay/webhook`

- If your URL is `https://smm-panel-abc123.vercel.app`
  - Webhook URL: `https://smm-panel-abc123.vercel.app/api/payments/razorpay/webhook`

- If your URL is `https://mypanel.com`
  - Webhook URL: `https://mypanel.com/api/payments/razorpay/webhook`

**⚠️ IMPORTANT:**
- Must start with `https://`
- Replace `YOUR-APP-URL.vercel.app` with your actual URL
- Path must be exactly: `/api/payments/razorpay/webhook`

---

#### **Active Events** (Select these checkboxes)

✅ **payment.captured** (REQUIRED - this updates user balance)  
✅ **payment.failed** (Recommended - track failed payments)  
☐ payment.refunded (Optional)  
☐ order.paid (Optional - already covered by payment.captured)  

**Minimum required:** `payment.captured`

---

#### **Webhook Name** (Optional but recommended)

```
SMM Panel - Payment Handler
```

Or any name you want to identify this webhook.

---

### **2.3 Click "Create Webhook"**

After filling in the details, click the **Create Webhook** button.

---

### **2.4 Copy Webhook Secret**

After creation, Razorpay will show you a **Webhook Secret**. It looks like:

```
whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**COPY THIS IMMEDIATELY!** You won't be able to see it again.

Example format:
```
whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## 🎯 **Step 3: Add Webhook Secret to Vercel**

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **Settings** tab
4. Click **Environment Variables**
5. Click **Add New**
6. Add this variable:

| Field | Value |
|-------|-------|
| **Name** | `RAZORPAY_WEBHOOK_SECRET` |
| **Value** | `whsec_xxxxxxxx` (paste your actual secret) |
| **Environment** | Select all (Production, Preview, Development) |

7. Click **Save**

---

## 📋 **Complete Vercel Environment Variables for Razorpay**

Make sure you have ALL three Razorpay variables:

| Variable Name | Value | Where to Get |
|--------------|-------|--------------|
| `RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxx` or `rzp_live_xxxxxxxx` | Razorpay → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | Your key secret | Razorpay → Settings → API Keys (click to reveal) |
| `RAZORPAY_WEBHOOK_SECRET` | `whsec_xxxxxxxx` | From webhook creation (Step 2.4) |

---

## 🧪 **Step 4: Test Your Webhook**

### **Option 1: Use Razorpay Test Mode**

1. Make sure you're in **Test Mode** in Razorpay (toggle at top)
2. Use test card: `4111 1111 1111 1111`
3. Complete a payment on your site
4. Check Vercel logs to see if webhook was received

### **Option 2: Send Test Webhook from Razorpay**

1. Go to Razorpay → Settings → Webhooks
2. Click on your webhook
3. Click **Send Test Webhook** button
4. Check if it succeeds

---

## ✅ **Webhook Checklist**

- [ ] Website is deployed and live on Vercel
- [ ] I have my deployment URL (e.g., `https://smm-panel.vercel.app`)
- [ ] Webhook URL is set to: `https://YOUR-URL.vercel.app/api/payments/razorpay/webhook`
- [ ] Event `payment.captured` is selected
- [ ] Webhook Secret is copied
- [ ] `RAZORPAY_WEBHOOK_SECRET` is added to Vercel
- [ ] Test payment successful
- [ ] User balance updated after payment

---

## 🆘 **Troubleshooting**

### **Webhook Not Receiving Events**

**Check 1: URL is Correct**
```
✅ Correct: https://smm-panel.vercel.app/api/payments/razorpay/webhook
❌ Wrong: http://smm-panel.vercel.app/api/payments/razorpay/webhook (no https)
❌ Wrong: https://smm-panel.vercel.app/api/razorpay/webhook (missing /payments)
❌ Wrong: https://smm-panel.vercel.app/webhook (incomplete path)
```

**Check 2: Webhook is Active**
- Go to Razorpay → Settings → Webhooks
- Make sure status shows "Active"

**Check 3: Vercel Logs**
- Go to Vercel → Your Project → Logs
- Filter by "razorpay" or "webhook"
- Look for errors

**Check 4: Environment Variables**
- Make sure `RAZORPAY_WEBHOOK_SECRET` is set in Vercel
- Make sure `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set

---

## 📊 **Example: Complete Setup**

Let's say your deployed URL is: `https://smm-panel.vercel.app`

### **Your Webhook Configuration:**

**Webhook URL:**
```
https://smm-panel.vercel.app/api/payments/razorpay/webhook
```

**Active Events:**
- ✅ payment.captured

**Webhook Secret:**
```
whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### **Your Vercel Environment Variables:**

```bash
RAZORPAY_KEY_ID=rzp_test_abc123xyz
RAZORPAY_KEY_SECRET=your_key_secret_here
RAZORPAY_WEBHOOK_SECRET=whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## 🎉 **After Webhook is Set Up**

Once everything is configured:

1. ✅ Users can add funds via Razorpay
2. ✅ Payment completes in Razorpay checkout
3. ✅ Webhook receives `payment.captured` event
4. ✅ User balance updates automatically
5. ✅ Success message shown to user

---

## 📞 **Need Help?**

1. **Check webhook logs in Razorpay:**
   - Settings → Webhooks → Click your webhook → View Logs

2. **Check Vercel logs:**
   - Your Project → Logs → Filter by "razorpay"

3. **Common Issues:**
   - Wrong webhook URL
   - Missing environment variables
   - Webhook secret mismatch
   - Database connection error

---

## 🚀 **Quick Summary**

1. **Deploy website** → Get URL
2. **Create webhook** → Use URL + `/api/payments/razorpay/webhook`
3. **Select events** → `payment.captured`
4. **Copy secret** → `whsec_xxxxxxxx`
5. **Add to Vercel** → `RAZORPAY_WEBHOOK_SECRET`
6. **Test payment** → Verify balance updates

---

**Once you have your Vercel URL, replace `YOUR-APP-URL.vercel.app` in the webhook URL and you're done!** 🎯
