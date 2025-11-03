import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchLeads } from '../../store/slices/leadSlice';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaBriefcase, FaFileExcel, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminLeads = () => {
  const dispatch = useDispatch();
  const { leads, isLoading } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExportToExcel = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/leads/export/csv', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Leads exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export leads');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Leads Management</h1>
            <div className="text-gray-600 mt-1">Total: {leads.length} leads</div>
          </div>
          <button
            onClick={handleExportToExcel}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaFileExcel />
            Export to Excel
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : leads.length > 0 ? (
          <div className="grid gap-4">
            {leads.map((lead, index) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-secondary">{lead.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaEnvelope className="text-primary" />
                        <span>{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaPhone className="text-primary" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.businessName && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaBriefcase className="text-primary" />
                          <span>{lead.businessName}</span>
                        </div>
                      )}
                      <div className="text-gray-600">
                        <span className="font-semibold">Service:</span> {lead.service}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-gray-700"><span className="font-semibold">Message:</span> {lead.message}</p>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500">
                      Submitted: {new Date(lead.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No leads found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminLeads;
