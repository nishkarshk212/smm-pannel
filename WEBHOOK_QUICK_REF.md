# ⚡ Razorpay Webhook - Quick Setup Card

## 🎯 **Your Webhook URL Format**

```
https://YOUR-DEPLOYED-URL/api/payments/razorpay/webhook
```

---

## 📝 **Real Examples**

### **Example 1: Vercel Default Domain**
If your site is: `https://smm-panel.vercel.app`

**Webhook URL:**
```
https://smm-panel.vercel.app/api/payments/razorpay/webhook
```

---

### **Example 2: Vercel with Hash**
If your site is: `https://smm-panel-abc123.vercel.app`

**Webhook URL:**
```
https://smm-panel-abc123.vercel.app/api/payments/razorpay/webhook
```

---

### **Example 3: Custom Domain**
If your site is: `https://mypanel.com`

**Webhook URL:**
```
https://mypanel.com/api/payments/razorpay/webhook
```

---

## 🔑 **What You Need to Fill in Razorpay**

### **Webhook Configuration Form:**

| Field | Your Value |
|-------|-----------|
| **Webhook URL** | `https://YOUR-URL.vercel.app/api/payments/razorpay/webhook` |
| **Webhook Name** | `SMM Panel Payment Handler` |
| **Active Events** | ✅ `payment.captured` |

---

## 🔐 **After Creating Webhook**

Razorpay will give you a **Webhook Secret** like:
```
whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Add this to Vercel:**

| Variable Name | Value |
|--------------|-------|
| `RAZORPAY_WEBHOOK_SECRET` | `whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |

---

## ✅ **Complete Razorpay Setup for Vercel**

Add these 3 environment variables to Vercel:

```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxx
```

---

## 🎯 **Step-by-Step (5 Minutes)**

1. ✅ Deploy website → Get URL from Vercel
2. ✅ Go to Razorpay → Settings → Webhooks
3. ✅ Click "Create Webhook"
4. ✅ Paste URL: `https://YOUR-URL.vercel.app/api/payments/razorpay/webhook`
5. ✅ Check `payment.captured`
6. ✅ Click Create
7. ✅ Copy Webhook Secret (`whsec_xxxxxxxx`)
8. ✅ Add to Vercel Environment Variables
9. ✅ Test with payment!

---

## 📚 **Full Guide**: [RAZORPAY_WEBHOOK_SETUP.md](./RAZORPAY_WEBHOOK_SETUP.md)
