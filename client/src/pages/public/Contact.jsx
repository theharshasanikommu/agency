import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TrustBadges from '../../components/TrustBadges';
import { submitLead } from '../../store/slices/leadSlice';
import { FaEnvelope, FaPhone, FaShieldAlt, FaLock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: 'Personal Brand Building',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill message from URL params
  useEffect(() => {
    const source = searchParams.get('source');
    const message = searchParams.get('message');
    
    if (message) {
      setFormData(prev => ({ ...prev, message, source: source || 'website' }));
    } else if (source) {
      setFormData(prev => ({ ...prev, source }));
    }
    
    // Show a toast notification about the source
    if (source) {
      toast.success('Form pre-filled based on your selection!', { duration: 3000 });
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(submitLead(formData)).unwrap();
      toast.success('Thank you! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        service: 'Personal Brand Building',
        message: ''
      });
    } catch (error) {
      toast.error(error || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-5xl font-bold text-secondary mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to build your personal brand? Book a free strategy call and let's grow your business together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <FaShieldAlt />
                  <span>Your Information is 100% Secure</span>
                </div>
                <p className="text-sm text-gray-600">We never share your data. Privacy protected.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 93939 79892"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your business name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Interested In *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option>Personal Brand Building</option>
                    <option>Short-Form Content Creation</option>
                    <option>End-to-End Management</option>
                    <option>Full Package</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-field"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="card">
                <h3 className="text-2xl font-bold text-secondary mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FaEnvelope className="text-2xl text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">mediamanagerofficial1@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaPhone className="text-2xl text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 93939 79892</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaWhatsapp className="text-2xl text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                      <p className="text-gray-600">+91 93939 79892</p>
                      <button
                        onClick={() => {
                          const message = encodeURIComponent(`Hi! I'm ${formData.name || 'interested'}. I'm interested in ${formData.service}. I would like to know more about your services.`);
                          window.open(`https://wa.me/919393979892?text=${message}`, '_blank');
                        }}
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                      >
                        <FaWhatsapp />
                        Chat Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <h3 className="text-2xl font-bold mb-4">💬 Prefer WhatsApp?</h3>
                <p className="mb-4">Get instant replies! Chat with us directly on WhatsApp.</p>
                <button
                  onClick={() => {
                    const message = encodeURIComponent('Hi! I want to grow my personal brand with MediaManager4U. I would like to know more about your services.');
                    window.open(`https://wa.me/919393979892?text=${message}`, '_blank');
                  }}
                  className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all w-full justify-center"
                >
                  <FaWhatsapp className="text-xl" />
                  Start WhatsApp Chat
                </button>
              </div>

              <div className="card bg-gradient-to-br from-primary to-accent text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Proven track record of success
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Transparent reporting
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Flexible packages
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBadges />
      
      <Footer />
    </div>
  );
};

export default Contact;
