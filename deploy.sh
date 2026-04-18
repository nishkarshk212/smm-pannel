#!/bin/bash

echo "🚀 SMM Panel - Quick Deployment Script"
echo "======================================"
echo ""

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Please create one from .env.example"
    exit 1
fi

echo ""
echo "📝 Step 1: Push to GitHub"
echo "-------------------------"
echo ""

# Get repository URL
read -p "Enter your GitHub repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL is required"
    exit 1
fi

# Add remote and push
git remote remove origin 2>/dev/null
git remote add origin $REPO_URL
git add .
git commit -m "Production deployment - $(date '+%Y-%m-%d %H:%M:%S')"
git branch -M main
git push -u origin main -f

echo ""
echo "✅ Code pushed to GitHub"
echo ""
echo "🌐 Step 2: Deploy to Vercel"
echo "---------------------------"
echo ""
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'Add New → Project'"
echo "3. Import your GitHub repository"
echo "4. Add these environment variables:"
echo ""
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo "   - TELEGRAM_API_ID"
echo "   - TELEGRAM_API_HASH"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo ""
echo "5. Click Deploy"
echo ""
echo "📋 Step 3: Initialize Database"
echo "------------------------------"
echo ""
read -p "Enter your DATABASE_URL: " DB_URL

if [ -n "$DB_URL" ]; then
    echo "Pushing database schema..."
    DATABASE_URL="$DB_URL" npx prisma db push
    echo "✅ Database initialized"
fi

echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo ""
echo "Next steps:"
echo "1. Configure Stripe webhook endpoint: https://your-app.vercel.app/api/payments/stripe/webhook"
echo "2. Test payment flow with card: 4242 4242 4242 4242"
echo "3. Set up custom domain (optional)"
echo ""
echo "For detailed instructions, see PRODUCTION_DEPLOYMENT.md"
