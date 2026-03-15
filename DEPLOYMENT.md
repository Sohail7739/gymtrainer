# Deployment Guide

## Quick Start Commands

```bash
# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/Sohail7739/gymtrainer.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Rayaan Fitness - Complete gym trainer website"

# Push to GitHub
git push -u origin main
```

## If you encounter issues:

### Repository already exists with content:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Force push (use with caution):
```bash
git push -f origin main
```

## After deployment:

### Install dependencies:
```bash
npm install
```

### Run development server:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
npm start
```

## Deploy to Vercel:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch
3. Your website will be live at: `https://your-project-name.vercel.app`

## Features Included:
- ✅ Bilingual support (Arabic/English)
- ✅ Client management system
- ✅ Workout assignment
- ✅ Nutrition planning
- ✅ Professional gym UI
- ✅ Responsive design
- ✅ Local storage database
- ✅ Saudi Arabian localization