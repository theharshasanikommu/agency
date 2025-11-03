# Quick Setup Instructions for MediaManager4U

## ✅ Your MongoDB Atlas is Ready!

Your connection string:
```
mongodb+srv://sanikommuharshavardhanreddy6_db_user:<db_password>@mediamanager4u.7lnzcid.mongodb.net/?appName=mediamanager4u
```

## 🔧 Step-by-Step Setup

### 1. Create your `.env` file

Copy the `.env.example` file:
```bash
cp .env.example .env
```

### 2. Update your `.env` file with these values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas - REPLACE <db_password> with your actual password
MONGODB_URI=mongodb+srv://sanikommuharshavardhanreddy6_db_user:<db_password>@mediamanager4u.7lnzcid.mongodb.net/?appName=mediamanager4u

# JWT Secret - Generate a random string or use this
JWT_SECRET=mediamanager4u_secret_key_2024_harsha_reddy
JWT_EXPIRE=7d

# Cloudinary (Optional - for file uploads)
# Sign up at https://cloudinary.com to get these
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Optional - for notifications)
# Use Gmail App Password or SendGrid
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=MediaManager4U <noreply@mediamanager4u.com>

# Frontend URL
CLIENT_URL=http://localhost:5173

# Admin Default Credentials
ADMIN_EMAIL=admin@mediamanager4u.com
ADMIN_PASSWORD=Admin@123
```

### 3. Important: Replace `<db_password>`

In your `.env` file, replace `<db_password>` with your actual MongoDB Atlas password.

**Example:**
If your password is `MyPass123`, change:
```
mongodb+srv://...:<db_password>@...
```
to:
```
mongodb+srv://...:MyPass123@...
```

⚠️ **Note:** If your password contains special characters (@, #, $, etc.), you need to URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

### 4. Install Dependencies

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### 5. Create Admin User

```bash
npm run create-admin
```

This creates an admin account with:
- Email: admin@mediamanager4u.com
- Password: Admin@123

### 6. Start the Application

```bash
npm run dev
```

This starts both frontend and backend:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 7. Test Your Setup

1. **Visit the website:** http://localhost:5173
2. **Login as admin:** http://localhost:5173/login
   - Email: admin@mediamanager4u.com
   - Password: Admin@123
3. **Explore the dashboard**

---

## 🎯 Quick Test Checklist

- [ ] Dependencies installed
- [ ] `.env` file created with MongoDB URI
- [ ] Password replaced in connection string
- [ ] Admin user created
- [ ] Application running
- [ ] Can access frontend
- [ ] Can login as admin
- [ ] Dashboard loads

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongooseServerSelectionError: Could not connect to any servers
```

**Solutions:**
1. Check your password is correct and URL-encoded
2. Verify your IP is whitelisted in MongoDB Atlas
   - Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
3. Check your internet connection

### Port Already in Use
```
Error: Port 5000 is already in use
```

**Solution:** Change PORT in `.env` to 5001 or another available port

### Module Not Found
```
Error: Cannot find module 'express'
```

**Solution:** Run `npm install` in the root directory

---

## 📝 Optional Configurations

### Email Notifications (Optional)

To enable email notifications for new leads:

1. **Using Gmail:**
   - Enable 2-factor authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Add to `.env`:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

2. **Using SendGrid:**
   - Sign up at https://sendgrid.com
   - Get API key
   - Update `.env` accordingly

### File Uploads (Optional)

To enable report uploads:

1. Create account at https://cloudinary.com
2. Get your credentials from dashboard
3. Add to `.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 You're All Set!

Your MediaManager4U platform is ready to use!

**Next Steps:**
1. ✅ Customize branding and colors
2. ✅ Add your business information
3. ✅ Create test clients and projects
4. ✅ Upload sample reports
5. ✅ Deploy to production (see DEPLOYMENT.md)

---

## 📞 Need Help?

- Check README.md for detailed documentation
- Review QUICKSTART.md for common issues
- See DEPLOYMENT.md for production setup

**Happy building! 🎉**
