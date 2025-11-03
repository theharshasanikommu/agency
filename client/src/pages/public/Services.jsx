import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HowItWorks from '../../components/HowItWorks';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGoogle, FaChartBar } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      title: 'Personal Brand Building',
      description: 'Build a powerful personal brand that positions you as an industry leader in India',
      features: ['Instagram Growth Strategy', 'YouTube Shorts & Reels', 'LinkedIn Authority Building', 'Brand Positioning'],
      icon: <FaInstagram className="text-5xl text-primary" />
    },
    {
      title: 'Short-Form Content Creation',
      description: 'Viral Reels and Shorts that grow your reach and attract Indian customers',
      features: ['Research & Scripting', 'Professional Editing', 'Trending Audio Selection', 'Hook Optimization'],
      icon: <FaChartBar className="text-5xl text-primary" />
    },
    {
      title: 'End-to-End Management',
      description: 'Complete social media management - you film, we handle everything else',
      features: ['Content Strategy', 'Posting & Scheduling', 'Analytics & Reporting', 'Monthly Growth Reports'],
      icon: <FaLinkedin className="text-5xl text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-secondary mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete personal branding solutions for Indian entrepreneurs, coaches, and business owners
            </p>
          </motion.div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="mb-4">{service.icon}</div>
                    <h2 className="text-3xl font-bold text-secondary mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-primary to-accent h-64 rounded-2xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      <Footer />
    </div>
  );
};

export default Services;
