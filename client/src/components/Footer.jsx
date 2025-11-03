import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MediaManager<span className="text-primary">4U</span></h3>
            <p className="text-gray-400">
              Empowering Indian entrepreneurs to build powerful personal brands and attract customers through social media.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Personal Brand Building</li>
              <li>Short-Form Content Creation</li>
              <li>Instagram & YouTube Growth</li>
              <li>End-to-End Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-2xl text-gray-400 hover:text-primary transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl text-gray-400 hover:text-primary transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl text-gray-400 hover:text-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-gray-400">info@mediamanager4u.com</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MediaManager4U. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
