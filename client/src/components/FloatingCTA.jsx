import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaTimes } from 'react-icons/fa';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            to="/contact"
            className="flex items-center gap-3 bg-gradient-to-r from-primary to-orange-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all group"
          >
            <FaPhone className="text-xl group-hover:rotate-12 transition-transform" />
            <span className="font-semibold hidden md:inline">Book Free Consultation</span>
            <span className="font-semibold md:hidden">Book Call</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
