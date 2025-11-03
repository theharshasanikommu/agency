import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchProjects } from '../../store/slices/projectSlice';
import { motion } from 'framer-motion';

const ClientProjects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-secondary">My Projects</h1>

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
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-2">{project.title}</h2>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'review' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                {project.milestones && project.milestones.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Milestones</h3>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            readOnly
                            className="w-5 h-5"
                          />
                          <span className={milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                            {milestone.title}
                          </span>
                        </div>
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

export default ClientProjects;
