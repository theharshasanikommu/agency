# Deployment Plan: Vercel + Render

## Step 1: Deploy Backend to Render
- [ ] Create Render account at render.com and sign up with GitHub
- [ ] Create new Web Service: Connect GitHub repo (https://github.com/theharshasanikommu/agency.git)
- [ ] Configure service:
  - Name: mediamanager4u-api
  - Environment: Node
  - Build Command: npm install
  - Start Command: node server/server.js
  - Plan: Free
- [ ] Add environment variables (NODE_ENV=production, MONGODB_URI, JWT_SECRET, etc.)
- [ ] Deploy and note the API URL (e.g., https://mediamanager4u-api.onrender.com)

## Step 2: Update Frontend API Configuration
- [ ] Edit client/src/utils/api.js: Change baseURL from '/api' to the Render API URL
- [ ] Commit and push changes to GitHub

## Step 3: Deploy Frontend to Vercel
- [ ] Install Vercel CLI: npm install -g vercel
- [ ] Login: vercel login
- [ ] Deploy: cd client && vercel
- [ ] Configure:
  - Framework Preset: Vite
  - Build Command: npm run build
  - Output Directory: dist
  - Install Command: npm install
- [ ] Add environment variable: VITE_API_URL=<render-api-url>
- [ ] Deploy and note the frontend URL

## Step 4: Post-Deployment Testing
- [ ] Test all user flows on deployed site
- [ ] Verify API endpoints work
- [ ] Check mobile responsiveness
- [ ] Test authentication and admin/client dashboards
