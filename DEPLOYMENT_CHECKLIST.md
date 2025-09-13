# FeedingMinds Deployment Checklist

## Pre-Deployment Checks

- [ ] Run `npm run build:css` to generate the latest CSS files
- [ ] Ensure all HTML files use the compiled CSS and not the Tailwind CDN
- [ ] Verify that `vercel.json` includes the CSS directory in both builds and routes
- [ ] Check that `tailwind.config.js` includes all HTML files in the content array
- [ ] Make sure all environment variables are set up in Vercel

## Deployment Steps

### Using Vercel Dashboard

1. Log in to your Vercel account
2. Click on "Import Project"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run vercel-build`
   - Output Directory: public
6. Add the environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `NODE_ENV`: Set to `production`
7. Click "Deploy"

### Using Vercel CLI

1. Install the Vercel CLI: `npm install -g vercel`
2. Log in to Vercel: `vercel login`
3. Navigate to your project directory and run: `vercel`
4. Follow the prompts to configure your project
5. Add environment variables when prompted or later through the Vercel dashboard

## Post-Deployment Checks

- [ ] Verify that the website loads correctly
- [ ] Check that all styles are applied properly
- [ ] Test the admin login functionality
- [ ] Ensure all images and assets are loading
- [ ] Test responsive design on different devices

## Troubleshooting Common Issues

### Styling Issues

- If styles are not loading, check that the CSS directory is properly included in `vercel.json`
- Ensure there are no references to the Tailwind CDN in any HTML files
- Verify that the build process is generating the CSS files correctly

### Database Connection Issues

- Ensure your MongoDB Atlas cluster is accessible from anywhere (0.0.0.0/0) or add Vercel's IP ranges to your allowlist
- Verify that your connection string is correct and includes the database name

### Image Upload Issues

- The current implementation uses Vercel's `/tmp` directory for temporary file storage
- For a production environment, consider using a cloud storage service like AWS S3, Google Cloud Storage, or Cloudinary