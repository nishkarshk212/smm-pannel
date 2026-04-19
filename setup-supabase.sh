#!/bin/bash

echo "🚀 Setting up Supabase for Aviator Earnings Platform..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "❌ .env.local file not found!"
  echo "Please create .env.local with your database password first."
  exit 1
fi

echo "📝 Step 1: Update your DATABASE_URL in .env.local"
echo "   Replace YOUR_PASSWORD with your actual Supabase database password"
echo ""
echo "   Current DATABASE_URL:"
grep "DATABASE_URL" .env.local
echo ""

read -p "Have you updated the password? (y/n): " password_updated
if [ "$password_updated" != "y" ]; then
  echo "Please update .env.local with your Supabase database password and run this script again."
  exit 1
fi

echo ""
echo "📦 Step 2: Installing Supabase CLI..."
npm install --save-dev supabase

echo ""
echo "🔧 Step 3: Initializing Supabase..."
npx supabase init --force

echo ""
echo "🔗 Step 4: Linking to your Supabase project..."
echo "   Project Reference: eetrvtexoirmmspgffak"
npx supabase link --project-ref eetrvtexoirmmspgffak

echo ""
echo "🗄️  Step 5: Pushing database schema..."
npx prisma generate
npx prisma db push

echo ""
echo "✅ Supabase setup complete!"
echo ""
echo "📊 Your Supabase Project Details:"
echo "   - Project URL: https://eetrvtexoirmmspgffak.supabase.co"
echo "   - Database: PostgreSQL"
echo "   - Project Reference: eetrvtexoirmmspgffak"
echo ""
echo "🚀 Next steps:"
echo "   1. Deploy to Vercel: npx vercel --prod"
echo "   2. Add environment variables in Vercel dashboard"
echo "   3. Access your app at: https://smm-sepia.vercel.app"
echo ""
