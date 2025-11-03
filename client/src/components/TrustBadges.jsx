import { FaShieldAlt, FaLock, FaCheckCircle, FaHeadset, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaMapMarkerAlt className="text-3xl text-primary" />,
      title: 'Indian Business',
      description: 'Local support, Indian market expertise'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-primary" />,
      title: '100% Secure',
      description: 'Your data is safe with us'
    },
    {
      icon: <FaLock className="text-3xl text-primary" />,
      title: 'Privacy Protected',
      description: 'We never share your information'
    },
    {
      icon: <FaCheckCircle className="text-3xl text-primary" />,
      title: 'Proven Results',
      description: '100+ successful Indian clients'
    },
    {
      icon: <FaHeadset className="text-3xl text-primary" />,
      title: '24/7 Support',
      description: 'Always here to help you grow'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{badge.title}</div>
                <div className="text-xs text-gray-600">{badge.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
