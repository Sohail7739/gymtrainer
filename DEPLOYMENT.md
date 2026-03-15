# GitHub Pages Deployment Guide

## Prerequisites
- GitHub repository: `https://github.com/Sohail7739/gymtrainer`
- GitHub Pages enabled in repository settings

## Automatic Deployment (Recommended)

The project is configured for automatic deployment via GitHub Actions. Every push to the `main` branch will trigger a deployment.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Deploy Rayaan Fitness website"
   git push origin main
   ```

3. **Your site will be available at:**
   ```
   https://sohail7739.github.io/gymtrainer/
   ```

## Manual Deployment Commands

```bash
# Build the project
npm run build

# The built files will be in the 'out' directory
# GitHub Actions will automatically deploy these files
```

## Repository Setup (First Time)

```bash
# Initialize git repository (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/Sohail7739/gymtrainer.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Rayaan Fitness website"

# Push to GitHub
git push -u origin main
```

## Troubleshooting

### If deployment fails:
1. Check the Actions tab in your GitHub repository
2. Look for error messages in the workflow logs
3. Ensure all dependencies are properly listed in package.json

### If pages don't load correctly:
1. Verify GitHub Pages is set to "GitHub Actions" source
2. Check that the basePath in next.config.js matches your repository name
3. Wait a few minutes for DNS propagation

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Features Included:
- ✅ Bilingual support (Arabic/English)
- ✅ Client management system
- ✅ Workout assignment
- ✅ Nutrition planning
- ✅ Professional gym UI
- ✅ Responsive design
- ✅ Local storage database
- ✅ Saudi Arabian localization
- ✅ GitHub Pages deployment
- ✅ Automatic CI/CD pipeline