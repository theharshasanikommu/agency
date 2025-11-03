import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaAward, FaHeart, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const values = [
    { icon: <FaAward />, title: 'Excellence', description: 'We deliver exceptional results that exceed expectations' },
    { icon: <FaHeart />, title: 'Passion', description: 'We love what we do and it shows in our work' },
    { icon: <FaLightbulb />, title: 'Innovation', description: 'We stay ahead with cutting-edge strategies' }
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
            <h1 className="text-5xl font-bold text-secondary mb-6">About MediaManager4U</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're an India-focused personal branding agency passionate about helping entrepreneurs, coaches, and business owners build authority and attract customers through social media.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a mission to empower Indian entrepreneurs, MediaManager4U has become the go-to personal branding agency for coaches, consultants, and business owners across India.
              </p>
              <p className="text-gray-600">
                We believe every Indian business owner deserves to build a powerful personal brand that attracts customers and drives revenue. Our team specializes in short-form content that goes viral and positions you as an industry leader.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary to-accent h-96 rounded-3xl"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
