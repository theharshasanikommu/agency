import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchReports } from '../../store/slices/reportSlice';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt } from 'react-icons/fa';

const ClientReports = () => {
  const dispatch = useDispatch();
  const { reports, isLoading } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-secondary">My Reports</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : reports.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-lg mb-4">
                  <FaFileAlt className="text-3xl text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-2">{report.title}</h3>
                <p className="text-gray-600 mb-4">{report.month} {report.year}</p>
                
                {report.metrics && (
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    {report.metrics.reach && (
                      <div>
                        <p className="text-gray-600">Reach</p>
                        <p className="font-semibold text-gray-800">{report.metrics.reach.toLocaleString()}</p>
                      </div>
                    )}
                    {report.metrics.engagement && (
                      <div>
                        <p className="text-gray-600">Engagement</p>
                        <p className="font-semibold text-gray-800">{report.metrics.engagement}%</p>
                      </div>
                    )}
                  </div>
                )}

                {report.notes && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.notes}</p>
                )}

                <a
                  href={report.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <FaDownload />
                  <span>Download Report</span>
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reports available yet</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientReports;
