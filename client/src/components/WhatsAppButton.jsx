import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ name = '', service = '' }) => {
  const phoneNumber = '919393979892'; // Your WhatsApp number (country code + number, no + or spaces)
  
  const generateMessage = () => {
    let message = 'Hi! I want to grow my personal brand with MediaManager4U.';
    
    if (name) {
      message = `Hi! I'm ${name}.`;
    }
    
    if (service) {
      message += ` I'm interested in ${service}.`;
    }
    
    if (!name && !service) {
      message += ' I would like to know more about your services.';
    }
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const message = generateMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleWhatsAppClick}
      className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
    >
      <FaWhatsapp className="text-2xl" />
      <span>Chat on WhatsApp</span>
    </motion.button>
  );
};

export default WhatsAppButton;
