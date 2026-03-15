#!/bin/bash

echo "🚀 Deploying Rayaan Fitness to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated! Check GitHub Actions for progress."
echo "🌍 Your site will be available at: https://sohail7739.github.io/gymtrainer/"