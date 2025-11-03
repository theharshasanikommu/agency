import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchClients } from '../../store/slices/clientSlice';
import { motion } from 'framer-motion';
import { FaBuilding, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';

const AdminClients = () => {
  const dispatch = useDispatch();
  const { clients, isLoading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary">Clients Management</h1>
          <div className="text-gray-600">Total: {clients.length}</div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : clients.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-2xl text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary">{client.businessName}</h3>
                      {client.industry && <p className="text-sm text-gray-600">{client.industry}</p>}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    client.status === 'active' ? 'bg-green-100 text-green-700' :
                    client.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {client.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {client.userId && (
                    <>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaEnvelope className="text-primary" />
                        <span className="text-sm">{client.userId.email}</span>
                      </div>
                      {client.userId.phone && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaPhone className="text-primary" />
                          <span className="text-sm">{client.userId.phone}</span>
                        </div>
                      )}
                    </>
                  )}
                  {client.website && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaGlobe className="text-primary" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">
                        {client.website}
                      </a>
                    </div>
                  )}
                </div>

                {client.services && client.services.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {client.services.map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                  <div>
                    <p className="text-gray-600">Contract Start</p>
                    <p className="font-semibold text-gray-800">
                      {client.contractStartDate ? new Date(client.contractStartDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {client.monthlyBudget && (
                    <div>
                      <p className="text-gray-600">Monthly Budget</p>
                      <p className="font-semibold text-gray-800">£{client.monthlyBudget.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No clients found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminClients;
