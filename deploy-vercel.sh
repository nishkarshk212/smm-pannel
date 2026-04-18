#!/bin/bash

echo "🚀 SMM Panel - Vercel Deployment Script"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ No .env file found. Please create one from .env.example"
    exit 1
fi

echo ""
echo "📦 Loading environment variables from .env..."
echo ""

# Read environment variables from .env file
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key =~ ^#.*$ ]] || [[ -z $key ]]; then
        continue
    fi
    
    # Remove quotes from value
    value=$(echo $value | sed 's/^"//' | sed 's/"$//')
    value=$(echo $value | sed "s/^'//" | sed "s/'$//")
    
    # Export the variable
    export "$key=$value"
done < .env

# Verify required variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set in .env"
    exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ NEXTAUTH_SECRET is not set in .env"
    exit 1
fi

echo "✅ Environment variables loaded successfully"
echo ""

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git initialized"
fi

echo ""
echo "📝 Pushing to GitHub..."
echo "-----------------------"
echo ""

# Add all changes and commit
git add .
git commit -m "Deploy to Vercel - $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || echo "No changes to commit"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
    CURRENT_BRANCH="main"
    git branch -M main
fi

# Push to GitHub
git push origin $CURRENT_BRANCH 2>/dev/null || echo "⚠️  Could not push to GitHub (you may need to set up remote)"

echo ""
echo "🌐 Deploying to Vercel..."
echo "-------------------------"
echo ""

# Deploy to Vercel with environment variables
vercel --prod \
  --env DATABASE_URL="$DATABASE_URL" \
  --env NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
  --env NEXTAUTH_URL="$NEXTAUTH_URL" \
  --env TELEGRAM_API_ID="$TELEGRAM_API_ID" \
  --env TELEGRAM_API_HASH="$TELEGRAM_API_HASH" \
  --env STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
  --env STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" \
  --env NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
  --env RAZORPAY_KEY_ID="$RAZORPAY_KEY_ID" \
  --env RAZORPAY_KEY_SECRET="$RAZORPAY_KEY_SECRET" \
  --env RAZORPAY_WEBHOOK_SECRET="$RAZORPAY_WEBHOOK_SECRET"

echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo ""
echo "Next steps:"
echo "1. Update NEXTAUTH_URL in Vercel with your production URL"
echo "2. Configure Stripe webhook endpoint: https://your-app.vercel.app/api/payments/stripe/webhook"
echo "3. Configure Razorpay webhook endpoint: https://your-app.vercel.app/api/payments/razorpay/webhook"
echo "4. Set up custom domain (optional)"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
