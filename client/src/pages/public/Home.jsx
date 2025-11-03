import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import TrustBadges from '../../components/TrustBadges';
import FloatingCTA from '../../components/FloatingCTA';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import HowItWorks from '../../components/HowItWorks';
import InfluencerShowcase from '../../components/InfluencerShowcase';

const Home = () => {
  const services = [
    {
      icon: <FaRocket className="text-4xl text-primary" />,
      title: 'Personal Brand Building',
      description: 'Build authority and trust that attracts customers through Instagram, YouTube & LinkedIn'
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: 'Short-Form Content Creation',
      description: 'Viral Reels & Shorts that grow your reach and position you as an industry leader'
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'End-to-End Management',
      description: 'From strategy to posting - we handle everything while you focus on your business'
    }
  ];

  const stats = [
    { number: '100+', label: 'Indian Clients' },
    { number: '450K+', label: 'Followers Grown' },
    { number: '10x', label: 'Revenue Increase' },
    { number: '600M+', label: 'Active Users in India' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🇮🇳 Trusted by 100+ Indian Entrepreneurs
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
                Forget words — we <span className="text-gradient">build brands</span> that speak, connect, and convert through every post.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We help Indian entrepreneurs, coaches, and business owners build powerful personal brands that attract customers and drive revenue — without the stress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn btn-primary text-center text-lg">
                  📞 Free Consultation
                </Link>
                <Link to="/pricing" className="btn btn-outline text-center text-lg">
                  View Pricing
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div>•</div>
                <div>100+ Happy Clients</div>
                <div>•</div>
                <div>🇮🇳 Indian Business</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Influencer Showcase */}
      <InfluencerShowcase />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive digital marketing solutions for your business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card hover:scale-105"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build YOUR Brand?</h2>
          <p className="text-xl mb-8">Join 100+ Indian entrepreneurs who transformed their business with us</p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 text-lg">
            📞 Book a Free Strategy Call
          </Link>
        </div>
      </section>

      <FloatingCTA />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default Home;
