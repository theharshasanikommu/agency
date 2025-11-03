// Utility functions for tracking contact sources

export const generateContactMessage = (source, planName = '', planPrice = '') => {
  const messages = {
    // Pricing page sources
    'pricing-instagram-start': `Hi! I'm interested in the Instagram START plan (₹29,999/month). I'd like to book a strategy call.`,
    'pricing-instagram-grow': `Hi! I'm interested in the Instagram GROW plan (₹49,999/month). I'd like to book a strategy call.`,
    'pricing-instagram-scale': `Hi! I'm interested in the Instagram SCALE plan (₹69,999/month). I'd like to book a strategy call.`,
    'pricing-instagram-dominate': `Hi! I'm interested in the Instagram DOMINATE plan (₹89,999/month). I'd like to book a strategy call.`,
    
    'pricing-linkedin-start': `Hi! I'm interested in the LinkedIn START plan (₹24,999/month). I'd like to book a strategy call.`,
    'pricing-linkedin-grow': `Hi! I'm interested in the LinkedIn GROW plan (₹44,999/month). I'd like to book a strategy call.`,
    'pricing-linkedin-scale': `Hi! I'm interested in the LinkedIn SCALE plan (₹64,999/month). I'd like to book a strategy call.`,
    'pricing-linkedin-dominate': `Hi! I'm interested in the LinkedIn DOMINATE plan (₹89,999/month). I'd like to book a strategy call.`,
    
    'pricing-combo-build': `Hi! I'm interested in the COMBO BUILD plan (₹69,999/month). I'd like to book a strategy call.`,
    'pricing-combo-growth': `Hi! I'm interested in the COMBO GROWTH plan (₹99,999/month). I'd like to book a strategy call.`,
    'pricing-combo-authority': `Hi! I'm interested in the COMBO AUTHORITY plan (₹1,29,999/month). I'd like to book a strategy call.`,
    
    // Home page
    'home-hero': `Hi! I found you through your homepage. I want to build my personal brand and grow my business.`,
    'home-cta': `Hi! I'm ready to transform my digital presence. Let's discuss how you can help.`,
    
    // Services page
    'services-personal-brand': `Hi! I'm interested in Personal Brand Building services. I'd like to know more.`,
    'services-content-creation': `Hi! I'm interested in Short-Form Content Creation. I'd like to know more.`,
    'services-management': `Hi! I'm interested in End-to-End Management services. I'd like to know more.`,
    
    // FAQ page
    'faq': `Hi! I have some questions after reading your FAQ. I'd like to discuss my needs.`,
    
    // Default
    'default': `Hi! I want to grow my personal brand with MediaManager4U. I'd like to book a strategy call.`
  };

  return messages[source] || messages['default'];
};

export const getContactUrl = (source, planName = '', planPrice = '') => {
  const message = generateContactMessage(source, planName, planPrice);
  return `/contact?source=${encodeURIComponent(source)}&message=${encodeURIComponent(message)}`;
};

export const getWhatsAppUrl = (source, planName = '', planPrice = '') => {
  const phoneNumber = '919393979892';
  const message = generateContactMessage(source, planName, planPrice);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
