@echo off
echo Setting up Git for Rayaan Fitness project...

REM Configure Git with your email
git config --global user.email "sohailm6890@gmail.com"
git config --global user.name "Sohail"

REM Initialize repository
git init

REM Add remote repository
git remote add origin https://github.com/Sohail7739/gymtrainer.git

REM Add all files
git add .

REM Commit with descriptive message
git commit -m "🏋️ Initial commit: Rayaan Fitness - Complete gym trainer website - Features: Bilingual support, Client management, Workout assignment, Nutrition planning, Professional gym UI, Responsive design, Local storage database, Saudi Arabian localization - Built with Next.js 14, TypeScript, and Tailwind CSS"

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo ✅ Successfully pushed to GitHub!
echo 🌐 Repository: https://github.com/Sohail7739/gymtrainer
echo 🚀 You can now deploy to Vercel or any other platform!

pause