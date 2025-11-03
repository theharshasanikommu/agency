import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: 'Personal Brand Building'
  });

  const phoneNumber = '919393979892';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm ${formData.name}. I'm interested in ${formData.service}. I would like to know more about your services.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setFormData({ name: '', service: 'Personal Brand Building' });
  };

  const handleQuickChat = () => {
    const message = 'Hi! I want to grow my personal brand with MediaManager4U. I would like to know more about your services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-50">
          {/* Chat Form */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="mb-4 bg-white rounded-2xl shadow-2xl p-6 w-80"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-3xl text-green-500" />
                    <div>
                      <h3 className="font-bold text-gray-900">Chat with us!</h3>
                      <p className="text-xs text-gray-500">We reply instantly</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interested In
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>Personal Brand Building</option>
                      <option>Short-Form Content Creation</option>
                      <option>End-to-End Management</option>
                      <option>Instagram Growth</option>
                      <option>LinkedIn Growth</option>
                      <option>Combo Plans</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button
                    onClick={handleWhatsAppClick}
                    disabled={!formData.name}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaWhatsapp className="text-xl" />
                    Start Chat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {!isOpen ? (
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(true)}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all group relative"
                >
                  <FaWhatsapp className="text-3xl" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleQuickChat}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-all"
                >
                  Quick Chat
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-2xl transition-all"
              >
                <FaTimes className="text-2xl" />
              </motion.button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
