import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchProjects } from '../../store/slices/projectSlice';
import { fetchReports } from '../../store/slices/reportSlice';
import { FaProjectDiagram, FaFileAlt, FaChartLine } from 'react-icons/fa';

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { reports } = useSelector((state) => state.reports);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchReports());
  }, [dispatch]);

  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const stats = [
    { label: 'Active Projects', value: activeProjects, icon: <FaProjectDiagram />, color: 'bg-blue-500' },
    { label: 'Completed Projects', value: completedProjects, icon: <FaChartLine />, color: 'bg-green-500' },
    { label: 'Total Reports', value: reports.length, icon: <FaFileAlt />, color: 'bg-purple-500' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's an overview of your projects and reports</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Recent Projects */}
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary mb-6">Recent Projects</h2>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.service}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="font-semibold text-primary">{project.progress}%</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No projects yet</p>
          )}
        </div>

        {/* Recent Reports */}
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary mb-6">Recent Reports</h2>
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.slice(0, 5).map((report) => (
                <div key={report._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.month} {report.year}</p>
                  </div>
                  <a
                    href={report.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Report
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No reports available yet</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
