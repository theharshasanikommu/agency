import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchProjects } from '../../store/slices/projectSlice';
import { motion } from 'framer-motion';

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary">Projects Management</h1>
          <div className="text-gray-600">Total: {projects.length}</div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-secondary mb-2">{project.title}</h2>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    {project.clientId && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Client:</span> {project.clientId.businessName}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'review' ? 'bg-purple-100 text-purple-700' :
                    project.status === 'on-hold' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold text-gray-800">{project.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  {project.budget && (
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold text-gray-800">£{project.budget.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {project.assignedTo && project.assignedTo.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Assigned to:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.assignedTo.map((user) => (
                        <span key={user._id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {user.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No projects found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminProjects;
