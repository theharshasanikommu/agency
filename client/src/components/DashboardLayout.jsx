import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FaHome, FaUsers, FaProjectDiagram, FaFileAlt, FaEnvelope, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Leads', path: '/admin/leads', icon: <FaEnvelope /> },
    { name: 'Clients', path: '/admin/clients', icon: <FaUsers /> },
    { name: 'Projects', path: '/admin/projects', icon: <FaProjectDiagram /> },
    { name: 'Reports', path: '/admin/reports', icon: <FaFileAlt /> }
  ];

  const clientLinks = [
    { name: 'Dashboard', path: '/client/dashboard', icon: <FaHome /> },
    { name: 'Projects', path: '/client/projects', icon: <FaProjectDiagram /> },
    { name: 'Reports', path: '/client/reports', icon: <FaFileAlt /> }
  ];

  const links = user?.role === 'admin' ? adminLinks : clientLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-2xl text-gray-700"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M4U</span>
              </div>
              <span className="text-xl font-bold text-secondary hidden sm:inline">
                MediaManager<span className="text-primary">4U</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden sm:inline">{user?.name}</span>
            <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
              {user?.role}
            </span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors mt-8"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
