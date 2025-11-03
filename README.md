# MediaManager4U - Full-Stack SaaS Agency Platform

A complete digital marketing agency management platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

### Public Website
- Modern, responsive landing page
- Service showcase
- Contact form with lead capture
- About page with agency information

### Client Portal
- Secure authentication
- Project tracking dashboard
- Real-time progress monitoring
- Monthly report downloads
- Profile management

### Admin Dashboard
- Lead management system
- Client CRM
- Project management
- Report upload and distribution
- Analytics and insights
- User management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - File storage
- **Nodemailer** - Email notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Cloudinary account (for file uploads)
- Email service (Gmail, SendGrid, etc.)

## 🔧 Installation

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd personal-website-7
\`\`\`

### 2. Install dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
\`\`\`

### 3. Environment Setup

Create a \`.env\` file in the root directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/mediamanager4u
# For production use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediamanager4u

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Nodemailer with Gmail)
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
\`\`\`

### 4. Setup MongoDB

**Option A: Local MongoDB**
\`\`\`bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
\`\`\`

**Option B: MongoDB Atlas (Recommended for production)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to \`.env\`

### 5. Setup Cloudinary

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from dashboard
3. Add to \`.env\` file

### 6. Setup Email Service

**For Gmail:**
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in \`.env\`

## 🚀 Running the Application

### Development Mode

\`\`\`bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run client
\`\`\`

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

\`\`\`bash
# Build frontend
npm run build

# The built files will be in client/dist/
\`\`\`

## 👤 Default Admin Account

After setting up, create an admin account manually in MongoDB or use the registration endpoint with role modification.

**Default credentials (if seeded):**
- Email: admin@mediamanager4u.com
- Password: Admin@123

## 📁 Project Structure

\`\`\`
mediamanager4u/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── public/    # Public pages
│   │   │   ├── auth/      # Auth pages
│   │   │   ├── client/    # Client portal
│   │   │   └── admin/     # Admin dashboard
│   │   ├── store/         # Redux store
│   │   │   └── slices/    # Redux slices
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── README.md
\`\`\`

## 🔐 API Endpoints

### Authentication
- POST \`/api/auth/register\` - Register new user
- POST \`/api/auth/login\` - Login user
- GET \`/api/auth/me\` - Get current user
- PUT \`/api/auth/update-profile\` - Update profile
- PUT \`/api/auth/change-password\` - Change password

### Leads
- POST \`/api/leads\` - Submit lead (public)
- GET \`/api/leads\` - Get all leads (admin)
- GET \`/api/leads/:id\` - Get single lead (admin)
- PUT \`/api/leads/:id\` - Update lead (admin)
- DELETE \`/api/leads/:id\` - Delete lead (admin)

### Clients
- POST \`/api/clients\` - Create client (admin)
- GET \`/api/clients\` - Get all clients (admin)
- GET \`/api/clients/my-profile\` - Get client profile (client)
- GET \`/api/clients/:id\` - Get single client
- PUT \`/api/clients/:id\` - Update client (admin)
- DELETE \`/api/clients/:id\` - Delete client (admin)

### Projects
- POST \`/api/projects\` - Create project (admin)
- GET \`/api/projects\` - Get projects
- GET \`/api/projects/:id\` - Get single project
- PUT \`/api/projects/:id\` - Update project (admin)
- DELETE \`/api/projects/:id\` - Delete project (admin)

### Reports
- POST \`/api/reports\` - Upload report (admin)
- GET \`/api/reports\` - Get reports
- DELETE \`/api/reports/:id\` - Delete report (admin)

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Render/Railway)

1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)

1. Create cluster
2. Whitelist IP addresses
3. Create database user
4. Get connection string

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- Rate limiting
- CORS protection
- Helmet security headers

## 📊 Data Models

### User
- name, email, password
- role (admin/client)
- businessName, phone
- timestamps

### Lead
- name, email, phone, businessName
- service, message
- status (new/contacted/in-progress/converted/closed)
- timestamps

### Client
- userId (ref: User)
- businessName, industry, website
- services, monthlyBudget
- contractStartDate, contractEndDate
- status (active/paused/cancelled)

### Project
- title, description
- clientId (ref: Client)
- service, status, progress
- startDate, endDate, budget
- assignedTo (ref: User[])
- milestones

### Report
- title, clientId, projectId
- month, year
- fileURL, filePublicId
- metrics (reach, engagement, conversions, ROI)
- notes

## 🧪 Testing

\`\`\`bash
# Run tests (when implemented)
npm test
\`\`\`

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

**Harshavardhan Reddy Sanikommu**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📞 Support

For support, email info@mediamanager4u.com or create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
# agency
