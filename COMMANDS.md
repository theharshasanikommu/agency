# MediaManager4U - Command Reference

Quick reference for all available commands.

---

## 📦 Installation Commands

```bash
# Install all dependencies (root + client)
npm run install-all

# Install root dependencies only
npm install

# Install client dependencies only
cd client && npm install
```

---

## 🚀 Development Commands

```bash
# Run both frontend and backend (recommended)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

---

## 🏗️ Build Commands

```bash
# Build frontend for production
npm run build

# Preview production build
cd client && npm run preview
```

Built files will be in `client/dist/`

---

## 👤 User Management Commands

```bash
# Create admin user
npm run create-admin

# Output:
# ✅ Admin user created successfully!
# 📧 Email: admin@mediamanager4u.com
# 🔑 Password: Admin@123
```

---

## 🗄️ Database Commands

```bash
# Connect to MongoDB (if using local)
mongosh

# Use the database
use mediamanager4u

# View collections
show collections

# View users
db.users.find().pretty()

# View leads
db.leads.find().pretty()

# Update user role to admin
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

# Delete all leads (careful!)
db.leads.deleteMany({})
```

---

## 🧪 Testing Commands

```bash
# Test API health
curl http://localhost:5000/api/health

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123"
  }'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mediamanager4u.com",
    "password": "Admin@123"
  }'
```

---

## 🔧 Utility Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB connection (local)
mongosh --eval "db.adminCommand('ping')"

# List running processes on port 5000
lsof -i :5000

# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Clear npm cache
npm cache clean --force

# Reinstall all dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

---

## 📝 Git Commands

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: MediaManager4U platform"

# Add remote repository
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main

# Create .gitignore (already created)
# Ensures .env and node_modules are not committed
```

---

## 🚢 Deployment Commands

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd client
vercel

# Deploy to production
vercel --prod
```

### Render (Backend)

```bash
# Push to GitHub first
git push origin main

# Then deploy via Render dashboard
# Or use Render CLI
render deploy
```

---

## 🔍 Debugging Commands

```bash
# View backend logs
npm run server

# View frontend logs
npm run client

# Check for errors in build
cd client && npm run build

# Test MongoDB connection
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mediamanager4u')
  .then(() => console.log('✅ Connected'))
  .catch(err => console.error('❌ Error:', err));
"
```

---

## 📊 Monitoring Commands

```bash
# Check disk space
df -h

# Check memory usage
free -m

# Check CPU usage
top

# View application logs
tail -f logs/app.log

# Monitor MongoDB
mongotop

# Monitor network
netstat -an | grep 5000
```

---

## 🧹 Cleanup Commands

```bash
# Remove node_modules
rm -rf node_modules client/node_modules

# Remove build files
rm -rf client/dist

# Remove logs
rm -rf logs/*.log

# Clean everything and reinstall
rm -rf node_modules client/node_modules client/dist
npm run install-all
```

---

## 🔐 Security Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check outdated packages
npm outdated

# Update packages
npm update

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📱 Quick Access URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

### Pages
- Home: http://localhost:5173/
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register
- Admin Dashboard: http://localhost:5173/admin/dashboard
- Client Dashboard: http://localhost:5173/client/dashboard

### API Endpoints
- Auth: http://localhost:5000/api/auth
- Leads: http://localhost:5000/api/leads
- Clients: http://localhost:5000/api/clients
- Projects: http://localhost:5000/api/projects
- Reports: http://localhost:5000/api/reports

---

## 🎯 Common Workflows

### Starting Fresh
```bash
npm run install-all
cp .env.example .env
# Edit .env with your credentials
npm run create-admin
npm run dev
```

### After Pulling Changes
```bash
git pull
npm install
cd client && npm install
npm run dev
```

### Before Deployment
```bash
npm run build
# Test the build
cd client && npm run preview
# Deploy
```

### Troubleshooting
```bash
# Stop all processes
# Kill ports 5000 and 5173
kill -9 $(lsof -t -i:5000)
kill -9 $(lsof -t -i:5173)

# Clean install
rm -rf node_modules client/node_modules
npm run install-all

# Restart
npm run dev
```

---

## 💡 Pro Tips

1. **Use tmux or screen** for running multiple terminals
2. **Set up aliases** in your `.bashrc` or `.zshrc`:
   ```bash
   alias mm4u-dev="cd ~/path/to/project && npm run dev"
   alias mm4u-admin="npm run create-admin"
   ```
3. **Use nodemon** for auto-restart (already configured)
4. **Check logs** regularly for errors
5. **Backup database** before major changes

---

**Quick Help:** Run `npm run` to see all available scripts

**Need more help?** Check README.md or QUICKSTART.md
