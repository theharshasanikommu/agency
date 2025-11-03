import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initGA, usePageTracking } from './utils/analytics';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';
import FAQ from './pages/public/FAQ';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Client Portal
import ClientDashboard from './pages/client/Dashboard';
import ClientProjects from './pages/client/Projects';
import ClientReports from './pages/client/Reports';

// Admin Dashboard
import AdminDashboard from './pages/admin/Dashboard';
import AdminLeads from './pages/admin/Leads';
import AdminClients from './pages/admin/Clients';
import AdminProjects from './pages/admin/Projects';
import AdminReports from './pages/admin/Reports';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Blog Pages
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';

function App() {
  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  // Track page views
  usePageTracking();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Blog Routes */}
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Client Portal */}
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/projects"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/reports"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientReports />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLeads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminClients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
