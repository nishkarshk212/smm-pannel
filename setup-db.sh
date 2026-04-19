#!/bin/bash

echo "🗄️  Setting up SQLite database for local development..."
echo "========================================================"
echo ""

# Generate Prisma client
echo "📦 Generating Prisma Client..."
npx prisma generate
echo ""

# Create SQLite database
echo "🔨 Creating SQLite database..."
npx prisma db push --skip-generate
echo ""

echo "✅ Database created successfully!"
echo ""
echo "Your database file is at: prisma/dev.db"
echo ""
echo "To view the database:"
echo "  npx prisma studio"
echo ""
