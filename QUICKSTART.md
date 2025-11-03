# MediaManager4U - Quick Start Guide

Get up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
\`\`\`bash
npm run install-all
\`\`\`

### 2. Setup Environment
\`\`\`bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
\`\`\`

**Minimum required variables:**
- \`MONGODB_URI\` - Your MongoDB connection string
- \`JWT_SECRET\` - Any random string (e.g., "mysecretkey123")
- \`CLIENT_URL\` - http://localhost:5173

### 3. Start MongoDB

**Local:**
\`\`\`bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
\`\`\`

**Or use MongoDB Atlas** (free tier available)

### 4. Run the Application
\`\`\`bash
npm run dev
\`\`\`

Visit:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## 👤 Create Admin Account

### Option 1: Using the API

\`\`\`bash
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Admin User",
    "email": "admin@mediamanager4u.com",
    "password": "Admin@123",
    "businessName": "MediaManager4U"
  }'
\`\`\`

Then manually update the user role in MongoDB:
\`\`\`javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@mediamanager4u.com" },
  { $set: { role: "admin" } }
)
\`\`\`

### Option 2: Using MongoDB Directly

\`\`\`javascript
// Connect to MongoDB and run:
db.users.insertOne({
  name: "Admin User",
  email: "admin@mediamanager4u.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
\`\`\`

## 🎯 Test the Application

### 1. Public Website
- Visit http://localhost:5173
- Navigate through Home, About, Services, Contact
- Submit a test lead via Contact form

### 2. Admin Login
- Go to http://localhost:5173/login
- Login with admin credentials
- Explore the admin dashboard

### 3. Client Registration
- Go to http://localhost:5173/register
- Create a client account
- Login and view client dashboard

## 📝 Common Issues

### MongoDB Connection Error
\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:27017
\`\`\`
**Solution:** Make sure MongoDB is running

### Port Already in Use
\`\`\`
Error: Port 5000 is already in use
\`\`\`
**Solution:** Change PORT in .env file

### Module Not Found
\`\`\`
Error: Cannot find module 'express'
\`\`\`
**Solution:** Run \`npm install\` in root and \`cd client && npm install\`

## 🔧 Optional Configurations

### Email Notifications
To enable email notifications for new leads:
1. Setup Gmail App Password or use SendGrid
2. Add credentials to .env:
\`\`\`env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
\`\`\`

### File Uploads (Cloudinary)
To enable report uploads:
1. Create Cloudinary account
2. Add credentials to .env:
\`\`\`env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

## 🎨 Customization

### Change Brand Colors
Edit \`client/tailwind.config.js\`:
\`\`\`javascript
colors: {
  primary: '#F7931E',  // Change this
  secondary: '#000000', // Change this
}
\`\`\`

### Update Company Info
Edit \`client/src/components/Footer.jsx\` and other components

## 📚 Next Steps

1. ✅ Explore the admin dashboard
2. ✅ Create test clients and projects
3. ✅ Upload sample reports
4. ✅ Customize branding and content
5. ✅ Deploy to production

## 🚀 Ready to Deploy?

See [README.md](README.md) for detailed deployment instructions.

---

**Need help?** Check the full README or create an issue on GitHub.
