@echo off
echo 🚀 Deploying Rayaan Fitness to GitHub Pages...

echo 📦 Building project...
call npm run build

echo 📝 Adding changes to git...
git add .

echo 💾 Committing changes...
git commit -m "Deploy: %date% %time%"

echo 🌐 Pushing to GitHub...
git push origin main

echo ✅ Deployment initiated! Check GitHub Actions for progress.
echo 🌍 Your site will be available at: https://sohail7739.github.io/gymtrainer/
pause