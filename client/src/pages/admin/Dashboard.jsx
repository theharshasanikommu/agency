import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchLeads } from '../../store/slices/leadSlice';
import { fetchClients } from '../../store/slices/clientSlice';
import { fetchProjects } from '../../store/slices/projectSlice';
import { FaEnvelope, FaUsers, FaProjectDiagram, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const { clients } = useSelector((state) => state.clients);
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchClients());
    dispatch(fetchProjects());
  }, [dispatch]);

  const stats = [
    { label: 'Total Leads', value: leads.length, icon: <FaEnvelope />, color: 'bg-blue-500' },
    { label: 'Active Clients', value: clients.filter(c => c.status === 'active').length, icon: <FaUsers />, color: 'bg-green-500' },
    { label: 'Active Projects', value: projects.filter(p => p.status === 'in-progress').length, icon: <FaProjectDiagram />, color: 'bg-purple-500' },
    { label: 'Total Projects', value: projects.length, icon: <FaChartLine />, color: 'bg-orange-500' }
  ];

  const leadsByStatus = [
    { name: 'New', value: leads.filter(l => l.status === 'new').length },
    { name: 'Contacted', value: leads.filter(l => l.status === 'contacted').length },
    { name: 'In Progress', value: leads.filter(l => l.status === 'in-progress').length },
    { name: 'Converted', value: leads.filter(l => l.status === 'converted').length }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your agency performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-secondary">{stat.value}</h3>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-secondary mb-6">Leads by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F7931E" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-secondary mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.service}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary mb-6">Recent Clients</h2>
          {clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Business Name</th>
                    <th className="text-left py-3 px-4">Services</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.slice(0, 5).map((client) => (
                    <tr key={client._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{client.businessName}</td>
                      <td className="py-3 px-4">{client.services?.join(', ') || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          client.status === 'active' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {client.contractStartDate ? new Date(client.contractStartDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No clients yet</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
