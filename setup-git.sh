#!/bin/bash

# Git setup script for Rayaan Fitness project
echo "Setting up Git for Rayaan Fitness project..."

# Configure Git with your email
git config --global user.email "sohailm6890@gmail.com"
git config --global user.name "Sohail"

# Initialize repository
git init

# Add remote repository
git remote add origin https://github.com/Sohail7739/gymtrainer.git

# Add all files
git add .

# Commit with descriptive message
git commit -m "🏋️ Initial commit: Rayaan Fitness - Complete gym trainer website

Features:
- Bilingual support (Arabic/English)
- Client management system
- Workout assignment functionality
- Nutrition planning system
- Professional gym-themed UI
- High-quality gym images
- Responsive design for all devices
- Local storage database
- Saudi Arabian localization

Built with Next.js 14, TypeScript, and Tailwind CSS"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Repository: https://github.com/Sohail7739/gymtrainer"
echo "🚀 You can now deploy to Vercel or any other platform!"