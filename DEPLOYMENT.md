# Deploying Property Hub to Vercel

## Prerequisites

1. **MongoDB Database**: You'll need a MongoDB database (MongoDB Atlas recommended)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Database

1. Create a MongoDB Atlas account or use your existing MongoDB database
2. Get your MongoDB connection string
3. Create a JWT secret for authentication

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

### Frontend Variables:
- `VITE_API_URL`: `https://your-app.vercel.app/api`

### Backend Variables:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: `production`

## Step 4: Update CORS Settings

After deployment, update the CORS origins in `backend/server.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-actual-domain.vercel.app'] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'],
  credentials: true
}));
```

Replace `your-actual-domain.vercel.app` with your actual Vercel domain.

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Test the API endpoints at `/api/health`
3. Test user registration and login
4. Test property creation and listing

## Troubleshooting

### Common Issues:

1. **MongoDB Connection**: Ensure your MongoDB URI is correct and the database is accessible
2. **CORS Errors**: Update the CORS origins with your actual domain
3. **Build Errors**: Check that all dependencies are properly installed
4. **Environment Variables**: Ensure all required environment variables are set in Vercel

### File Upload Issues:

The current setup uses local file storage. For production, consider:
- Using cloud storage (AWS S3, Cloudinary, etc.)
- Implementing proper file upload handling for serverless environments

## Next Steps

1. Set up a custom domain (optional)
2. Configure automatic deployments from your Git repository
3. Set up monitoring and analytics
4. Implement proper error handling and logging 