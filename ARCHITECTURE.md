# MediaManager4U - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│                    (React + TailwindCSS)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Public     │  │    Client    │  │    Admin     │      │
│  │   Website    │  │    Portal    │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            │ REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      API LAYER                               │
│                  (Express.js + Node.js)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Leads   │  │ Clients  │  │ Projects │   │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Reports  │  │   Auth   │  │   File   │                  │
│  │  Routes  │  │Middleware│  │  Upload  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                               │
└───────────────┬───────────────────────┬─────────────────────┘
                │                       │
                │                       │
    ┌───────────▼──────────┐  ┌────────▼──────────┐
    │     MongoDB          │  │    Cloudinary     │
    │   (Database)         │  │  (File Storage)   │
    └──────────────────────┘  └───────────────────┘
```

---

## 📊 Data Flow Architecture

### 1. User Authentication Flow

```
User Input (Login)
    │
    ▼
React Component (Login.jsx)
    │
    ▼
Redux Action (login)
    │
    ▼
API Call (POST /api/auth/login)
    │
    ▼
Express Route Handler
    │
    ▼
User Model (MongoDB)
    │
    ▼
Password Verification (bcrypt)
    │
    ▼
JWT Token Generation
    │
    ▼
Response with Token + User Data
    │
    ▼
Redux Store Update
    │
    ▼
LocalStorage Save
    │
    ▼
Redirect to Dashboard
```

### 2. Lead Submission Flow

```
Contact Form Submission
    │
    ▼
React Component (Contact.jsx)
    │
    ▼
Redux Action (submitLead)
    │
    ▼
API Call (POST /api/leads)
    │
    ▼
Express Route Handler
    │
    ▼
Input Validation
    │
    ▼
Lead Model Save (MongoDB)
    │
    ├──────────────────┐
    │                  │
    ▼                  ▼
Success Response   Email Notification
    │              (Nodemailer)
    ▼                  │
Toast Notification    ▼
    │              Admin Email
    ▼
Form Reset
```

### 3. Report Upload Flow

```
Admin Uploads PDF
    │
    ▼
File Input (Admin Dashboard)
    │
    ▼
Multer Middleware
    │
    ▼
File Validation (PDF only, 10MB max)
    │
    ▼
Cloudinary Upload
    │
    ▼
Get Secure URL
    │
    ▼
Report Model Save (MongoDB)
    │
    ▼
Success Response
    │
    ▼
Client Can View Report
```

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum: ['admin', 'client']),
  businessName: String,
  phone: String,
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Leads Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (indexed),
  phone: String,
  businessName: String,
  service: String (enum),
  message: String,
  status: String (enum, indexed),
  source: String,
  notes: String,
  assignedTo: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Clients Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  businessName: String,
  industry: String,
  website: String,
  address: {
    street: String,
    city: String,
    postcode: String,
    country: String
  },
  services: [String],
  monthlyBudget: Number,
  contractStartDate: Date,
  contractEndDate: Date,
  status: String (enum),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  clientId: ObjectId (ref: Client, indexed),
  service: String (enum),
  status: String (enum, indexed),
  progress: Number (0-100),
  startDate: Date,
  endDate: Date,
  budget: Number,
  assignedTo: [ObjectId] (ref: User),
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean
  }],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Reports Collection
```javascript
{
  _id: ObjectId,
  title: String,
  clientId: ObjectId (ref: Client, indexed),
  projectId: ObjectId (ref: Project),
  month: String,
  year: Number (indexed),
  fileURL: String,
  filePublicId: String,
  fileSize: Number,
  metrics: {
    reach: Number,
    engagement: Number,
    conversions: Number,
    roi: Number,
    customMetrics: Mixed
  },
  notes: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User Login
   ↓
2. Credentials Validation
   ↓
3. Password Hash Comparison (bcrypt)
   ↓
4. JWT Token Generation
   ↓
5. Token Sent to Client
   ↓
6. Client Stores Token (localStorage)
   ↓
7. Token Sent in Authorization Header
   ↓
8. Server Validates Token (middleware)
   ↓
9. Request Processed
```

### Authorization Layers
```
┌─────────────────────────────────────┐
│         Request Received            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Rate Limiting Check            │
│   (100 requests / 15 minutes)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      CORS Validation                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      JWT Token Validation           │
│      (protect middleware)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Role Authorization             │
│      (authorize middleware)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Route Handler                  │
└─────────────────────────────────────┘
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx
│
├── Public Routes
│   ├── Navbar
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Stats Section
│   │   ├── Services Section
│   │   └── CTA Section
│   ├── About
│   ├── Services
│   ├── Contact
│   └── Footer
│
├── Auth Routes
│   ├── Login
│   └── Register
│
├── Client Portal (Protected)
│   ├── DashboardLayout
│   │   ├── Sidebar
│   │   └── Navbar
│   ├── Client Dashboard
│   ├── Client Projects
│   └── Client Reports
│
└── Admin Dashboard (Protected)
    ├── DashboardLayout
    │   ├── Sidebar
    │   └── Navbar
    ├── Admin Dashboard
    │   └── Analytics Charts
    ├── Leads Management
    ├── Clients Management
    ├── Projects Management
    └── Reports Management
```

### State Management (Redux)

```
Store
│
├── auth
│   ├── user
│   ├── token
│   ├── isLoading
│   └── error
│
├── leads
│   ├── leads[]
│   ├── isLoading
│   └── error
│
├── clients
│   ├── clients[]
│   ├── isLoading
│   └── error
│
├── projects
│   ├── projects[]
│   ├── isLoading
│   └── error
│
└── reports
    ├── reports[]
    ├── isLoading
    └── error
```

---

## 🔄 API Request/Response Flow

### Example: Fetch Projects

```
Client Request:
GET /api/projects
Headers: {
  Authorization: "Bearer <jwt_token>"
}

↓

Server Processing:
1. Rate limit check
2. CORS validation
3. JWT verification
4. Extract user from token
5. Check user role
6. Query database
7. Filter by user role
8. Populate related data
9. Format response

↓

Server Response:
{
  success: true,
  projects: [...],
  totalPages: 5,
  currentPage: 1,
  total: 45
}

↓

Client Processing:
1. Axios interceptor
2. Redux action
3. Update store
4. Re-render components
```

---

## 📦 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────┐
│              Vercel (Frontend)              │
│         React App (Static Files)            │
│              Port: 443 (HTTPS)              │
└──────────────────┬──────────────────────────┘
                   │
                   │ API Calls
                   │
┌──────────────────▼──────────────────────────┐
│            Render (Backend)                 │
│         Express API Server                  │
│              Port: 443 (HTTPS)              │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐    ┌──────────────────┐
│   MongoDB    │    │   Cloudinary     │
│    Atlas     │    │  (File Storage)  │
└──────────────┘    └──────────────────┘
```

---

## 🔧 Development vs Production

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: Local MongoDB or Atlas
- Hot reload enabled
- Source maps enabled
- Debug logging

### Production
- Frontend: https://your-domain.vercel.app
- Backend: https://your-api.render.com
- Database: MongoDB Atlas
- Minified builds
- No source maps
- Error tracking
- Performance monitoring

---

## 📊 Performance Considerations

### Frontend Optimization
- Code splitting by route
- Lazy loading components
- Image optimization
- Caching strategies
- Minification

### Backend Optimization
- Database indexing
- Query optimization
- Connection pooling
- Rate limiting
- Caching (future: Redis)

### Database Optimization
- Indexed fields: email, status, clientId, year
- Compound indexes for common queries
- Lean queries for read operations
- Pagination for large datasets

---

## 🔍 Monitoring & Logging

### Recommended Setup
```
Application
    │
    ├── Error Tracking (Sentry)
    ├── Performance Monitoring (New Relic)
    ├── Uptime Monitoring (UptimeRobot)
    ├── Analytics (Google Analytics)
    └── Logs (Winston/Morgan)
```

---

This architecture provides:
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
- ✅ Reliability

Built with modern best practices and industry standards.
