# MediaManager4U - Deployment Guide

Complete guide to deploy your application to production.

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)
**Best for:** Quick deployment, free tier available

### Option 2: Railway (Full Stack)
**Best for:** All-in-one solution

### Option 3: AWS/DigitalOcean
**Best for:** Full control, scalability

---

## 🚀 Option 1: Vercel + Render

### Part A: Deploy Backend to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** mediamanager4u-api
     - **Environment:** Node
     - **Build Command:** \`npm install\`
     - **Start Command:** \`node server/server.js\`
     - **Plan:** Free

3. **Add Environment Variables**
   \`\`\`
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret-key>
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-secret>
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=<your-email>
   EMAIL_PASSWORD=<your-app-password>
   EMAIL_FROM=MediaManager4U <noreply@mediamanager4u.com>
   CLIENT_URL=<your-vercel-url>
   \`\`\`

4. **Deploy**
   - Click "Create Web Service"
   - Note your API URL (e.g., https://mediamanager4u-api.onrender.com)

### Part B: Deploy Frontend to Vercel

1. **Update API URL**
   - Edit \`client/src/utils/api.js\`
   - Change baseURL to your Render API URL

2. **Deploy to Vercel**
   \`\`\`bash
   # Install Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Deploy
   cd client
   vercel
   \`\`\`

3. **Configure Vercel**
   - Framework Preset: Vite
   - Build Command: \`npm run build\`
   - Output Directory: \`dist\`
   - Install Command: \`npm install\`

4. **Add Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: \`VITE_API_URL=<your-render-api-url>\`

---

## 🚀 Option 2: Railway (Full Stack)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add MongoDB**
   - Click "New" → "Database" → "MongoDB"
   - Copy connection string

4. **Configure Backend Service**
   - Add all environment variables
   - Set start command: \`node server/server.js\`

5. **Configure Frontend Service**
   - Add new service from same repo
   - Set root directory: \`client\`
   - Build command: \`npm run build\`
   - Start command: \`npx serve -s dist\`

---

## 🗄️ MongoDB Atlas Setup

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Configure Access**
   - Database Access → Add Database User
   - Network Access → Add IP Address (0.0.0.0/0 for development)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace \`<password>\` with your database user password

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS only
- [ ] Set secure CORS origins
- [ ] Whitelist specific IPs in MongoDB
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Regular security updates

---

## 🔧 Production Optimizations

### Backend
\`\`\`javascript
// server/server.js
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
\`\`\`

### Frontend
\`\`\`javascript
// client/vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
})
\`\`\`

---

## 📊 Monitoring & Analytics

### Recommended Tools
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **LogRocket** - Session replay
- **Uptime Robot** - Uptime monitoring

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
\`\`\`yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`

---

## 🐛 Troubleshooting

### CORS Errors
Update backend CORS configuration:
\`\`\`javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'http://localhost:5173'
  ],
  credentials: true
}));
\`\`\`

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions

### Build Failures
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

---

## 📝 Post-Deployment Checklist

- [ ] Test all user flows
- [ ] Verify email notifications
- [ ] Test file uploads
- [ ] Check mobile responsiveness
- [ ] Test authentication
- [ ] Verify API endpoints
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Update DNS records
- [ ] Enable SSL certificate

---

## 🎉 You're Live!

Your MediaManager4U platform is now deployed and ready to use!

**Next Steps:**
1. Share the URL with your team
2. Create client accounts
3. Start managing projects
4. Monitor performance

Need help? Create an issue on GitHub or contact support.
