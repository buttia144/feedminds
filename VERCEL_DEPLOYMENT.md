# Deploying FeedingMinds to Vercel

This guide will walk you through the process of deploying the FeedingMinds charity website to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a database set up
3. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Environment Variables

You'll need to set up the following environment variables in Vercel:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token generation
- `NODE_ENV`: Set to `production`

## Step 2: Deploy to Vercel

### Option 1: Using the Vercel Dashboard

1. Log in to your Vercel account
2. Click on "Import Project"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run vercel-build`
   - Output Directory: public
6. Add the environment variables mentioned above
7. Click "Deploy"

### Option 2: Using the Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project directory and run:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project
5. Add environment variables when prompted or later through the Vercel dashboard

## Step 3: Verify Deployment

1. Once deployed, Vercel will provide you with a URL for your application
2. Visit the URL to ensure the website is working correctly
3. Test the admin login at `[your-vercel-url]/pages/admin.html`

## Troubleshooting

### Database Connection Issues

- Ensure your MongoDB Atlas cluster is accessible from anywhere (0.0.0.0/0) or add Vercel's IP ranges to your allowlist
- Verify that your connection string is correct and includes the database name

### Image Upload Issues

- The current implementation uses Vercel's `/tmp` directory for temporary file storage
- For a production environment, consider using a cloud storage service like AWS S3, Google Cloud Storage, or Cloudinary

### Custom Domain

To use a custom domain:

1. Go to your project in the Vercel dashboard
2. Click on "Domains"
3. Add your domain and follow the instructions to configure DNS settings

## Next Steps for Production

For a production-ready deployment, consider implementing:

1. A proper image storage solution (AWS S3, Cloudinary, etc.)
2. Enhanced security measures (rate limiting, CSRF protection)
3. Performance optimizations (caching, CDN)
4. Monitoring and error tracking (Sentry, LogRocket)

## Need Help?

If you encounter any issues during deployment, refer to the [Vercel documentation](https://vercel.com/docs) or reach out to the project maintainers.