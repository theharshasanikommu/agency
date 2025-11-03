import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaInstagram, FaLinkedin, FaRocket } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getContactUrl, getWhatsAppUrl } from '../../utils/contactUtils';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('instagram');

  const instagramPlans = [
    {
      name: 'START',
      price: '₹29,999',
      period: '/ month',
      description: 'Best for: Creators & small business owners starting their personal brand journey.',
      features: [
        'Onboarding Call + Strategy Setup',
        'Audience & Competitor Research',
        'Script Writing (Hooks + Story Angles)',
        'Editing & Uploading',
        '8 Short-Form Videos / Month',
        '3 Sales-Focused Instagram Stories',
        'Weekday Email Support',
        '🎁 BONUS: Profile Optimization Checklist'
      ],
      icon: '🌱',
      popular: false,
      sourceId: 'pricing-instagram-start'
    },
    {
      name: 'GROW',
      price: '₹49,999',
      period: '/ month',
      description: 'Best for: Entrepreneurs ready to grow consistently & attract ideal clients.',
      features: [
        'Monthly Review Calls',
        'Research + Story-Based Scripting',
        'Professional Editing',
        'Uploading & Scheduling',
        '15 Short-Form Videos / Month',
        '7 Sales-Focused Instagram Stories',
        '24/7 Email & WhatsApp Support',
        'Monthly Growth Report',
        '🎁 BONUS: Profile Optimization Checklist'
      ],
      icon: '⚡',
      popular: true,
      sourceId: 'pricing-instagram-grow'
    },
    {
      name: 'SCALE',
      price: '₹69,999',
      period: '/ month',
      description: 'Best for: Founders & creators scaling their business through video marketing.',
      features: [
        'Deep Research + Strategy',
        'High-Conversion Scripts',
        'Premium Editing & Scheduling',
        '20 Short-Form Videos / Month',
        '10 Sales-Focused Instagram Stories',
        '24/7 Email & WhatsApp Support',
        'Monthly Analytics Report',
        '🎁 BONUS: Profile Optimization Checklist'
      ],
      icon: '🚀',
      popular: false,
      sourceId: 'pricing-instagram-scale'
    },
    {
      name: 'DOMINATE',
      price: '₹89,999',
      period: '/ month',
      description: 'Best for: Industry leaders who want complete social domination.',
      features: [
        'Priority Onboarding + Bi-Weekly Review Calls',
        'Advanced Research + Strategy',
        'Premium Script Writing (Hook + CTA)',
        'High-Quality Editing & Uploading',
        '30 Short-Form Videos / Month',
        '15 Sales-Focused Instagram Stories',
        '24/7 Email & WhatsApp Support',
        'Monthly Growth Report',
        '🎁 BONUS: Profile Optimization Checklist'
      ],
      icon: '👑',
      popular: false,
      sourceId: 'pricing-instagram-dominate'
    }
  ];

  const linkedinPlans = [
    {
      name: 'START',
      price: '₹24,999',
      period: '/ month',
      description: 'Best for: Professionals beginning their LinkedIn brand.',
      features: [
        'Profile Audit + Optimization Checklist',
        '4 Text Posts / Month',
        '2 Carousel Posts / Month',
        'Hashtag Research + Basic Strategy',
        'Monthly Analytics Report',
        'Email Support'
      ],
      icon: '🌱',
      popular: false,
      sourceId: 'pricing-linkedin-start'
    },
    {
      name: 'GROW',
      price: '₹44,999',
      period: '/ month',
      description: 'Best for: Founders and coaches ready to grow visibility & engagement.',
      features: [
        'Full LinkedIn Profile Optimization',
        '8 Text + Visual Posts / Month',
        '2 Video Scripts / Month',
        'Content Calendar + Strategy',
        'Engagement Guide',
        'Monthly Growth Report',
        'Email + WhatsApp Support'
      ],
      icon: '⚡',
      popular: true,
      sourceId: 'pricing-linkedin-grow'
    },
    {
      name: 'SCALE',
      price: '₹64,999',
      period: '/ month',
      description: 'Best for: Thought leaders aiming for consistent inbound leads.',
      features: [
        'Advanced Profile Optimization',
        '12 Posts / Month (Text, Carousel, Video Mix)',
        'End-to-End Video System (Research → Script → Edit)',
        'Competitor Research + Engagement Plan',
        'Bi-Weekly Performance Calls',
        'Monthly Analytics Report'
      ],
      icon: '🚀',
      popular: false,
      sourceId: 'pricing-linkedin-scale'
    },
    {
      name: 'DOMINATE',
      price: '₹89,999',
      period: '/ month',
      description: 'Best for: CEOs, coaches & creators who want full control of their niche.',
      features: [
        'Personal Brand Strategy (Full Funnel)',
        '15–20 Posts / Month',
        'Complete Video System (Research → Script → Edit → Upload)',
        'Engagement & DM Management',
        'Bi-Weekly Strategy Calls',
        'Advanced Analytics & Growth Tracking',
        'Priority Support'
      ],
      icon: '👑',
      popular: false,
      sourceId: 'pricing-linkedin-dominate'
    }
  ];

  const comboPlans = [
    {
      name: 'BUILD',
      price: '₹69,999',
      period: '/ month',
      description: 'Perfect for solopreneurs who want balanced growth on both platforms.',
      features: [
        'Instagram START + LinkedIn START',
        '8 Shorts + 6 LinkedIn Posts Monthly',
        'Shared Brand Strategy & Calendar',
        'Profile Optimization for Both Platforms',
        'Monthly Analytics Report'
      ],
      icon: '💡',
      popular: false,
      sourceId: 'pricing-combo-build'
    },
    {
      name: 'GROWTH',
      price: '₹99,999',
      period: '/ month',
      description: 'Ideal for founders scaling visibility & lead generation simultaneously.',
      features: [
        'Instagram GROW + LinkedIn GROW',
        '15 Shorts + 10 LinkedIn Posts Monthly',
        'Cross-Platform Branding',
        'Strategy Calls + Content Planning',
        'Priority Support'
      ],
      icon: '💎',
      popular: true,
      sourceId: 'pricing-combo-growth'
    },
    {
      name: 'AUTHORITY',
      price: '₹1,29,999',
      period: '/ month',
      description: 'Best for brands ready to dominate both Instagram & LinkedIn together.',
      features: [
        'Instagram SCALE + LinkedIn SCALE',
        '20 Shorts + 12 LinkedIn Posts Monthly',
        'High-Performance Content System',
        'Full Research, Scriptwriting, Editing, and Posting',
        'Advanced Analytics + Growth Reports'
      ],
      icon: '👑',
      popular: false,
      sourceId: 'pricing-combo-authority'
    }
  ];

  const getCurrentPlans = () => {
    switch (activeTab) {
      case 'instagram':
        return instagramPlans;
      case 'linkedin':
        return linkedinPlans;
      case 'combo':
        return comboPlans;
      default:
        return instagramPlans;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">MediaManager4U</span> Pricing Plans
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              We help Indian Entrepreneurs, Coaches & Founders grow their brand, attract clients, and convert followers — through done-for-you social media systems.
            </p>
            <p className="text-lg text-gray-500">
              At MediaManager4U, we don't just grow followers — we help you build a brand that sells, attracts clients, and runs on systems, not stress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'instagram'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaInstagram className="text-xl" />
              Instagram Growth
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'linkedin'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaLinkedin className="text-xl" />
              LinkedIn Growth
            </button>
            <button
              onClick={() => setActiveTab('combo')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'combo'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaRocket className="text-xl" />
              Combo Plans
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {getCurrentPlans().map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary to-orange-600 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-primary transition-all'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-primary px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheck className={`mt-1 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={getContactUrl(plan.sourceId, plan.name, plan.price)}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-orange-600'
                  }`}
                >
                  Book a Call
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a Strategy Call Today and let's build your digital presence from the ground up.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-xl"
            >
              📞 Book a Free Strategy Call
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
