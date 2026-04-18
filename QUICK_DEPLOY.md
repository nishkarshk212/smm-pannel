# ⚡ DEPLOY IN 5 MINUTES - Quick Reference Card

## 🎯 **Your Deployment Credentials**

### **Database** (Already configured)
```
DATABASE_URL=postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres
```

### **NextAuth Secret** (Generated for you)
```
NEXTAUTH_SECRET=mnHQwT1zpqbaaqiZUSIoWJRqaKOUYSgXUMa9ThrKA+U=
```

### **Telegram API** (Already configured)
```
TELEGRAM_API_ID=30521437
TELEGRAM_API_HASH=9b01f57a7511278377202d843c9bfc34
```

---

## 📝 **6 Steps to Deploy**

### ✅ **Step 1**: Go to Vercel
👉 https://vercel.com/new

### ✅ **Step 2**: Import Repository
👉 Select: `nishkarshk212/smm-pannel`

### ✅ **Step 3**: Add Environment Variables
Copy these from [DEPLOY_NOW.md](./DEPLOY_NOW.md)

### ✅ **Step 4**: Click Deploy
Wait 2-3 minutes

### ✅ **Step 5**: Update NEXTAUTH_URL
Change to: `https://your-app-name.vercel.app`

### ✅ **Step 6**: Initialize Database
```bash
DATABASE_URL="postgresql://postgres:Nishkarsh@242@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres" npx prisma db push
```

---

## 🎉 **Done!**

Your website will be live at: `https://your-app-name.vercel.app`

Then you can:
1. ✅ Get Razorpay API keys
2. ✅ Add them to Vercel
3. ✅ Start accepting payments!

---

## 📚 **Full Guide**: [DEPLOY_NOW.md](./DEPLOY_NOW.md)
