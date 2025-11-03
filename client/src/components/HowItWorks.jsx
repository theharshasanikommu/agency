import { motion } from 'framer-motion';
import { FaSearch, FaPencilAlt, FaVideo, FaUpload } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <FaSearch className="text-4xl" />,
      title: 'RESEARCH',
      description: 'We find and study the top creators and best performing content in your niche on social media.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '02',
      icon: <FaPencilAlt className="text-4xl" />,
      title: 'SCRIPT',
      description: 'Using the research and information on you and your business, we script an entire month of short-form content.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '03',
      icon: <FaVideo className="text-4xl" />,
      title: 'FILM & EDIT',
      description: 'You film the scripts. We edit the videos to perfection with trending audio, captions, and effects.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      number: '04',
      icon: <FaUpload className="text-4xl" />,
      title: 'UPLOAD',
      description: 'We upload the content on your chosen social media channels (Instagram, TikTok, Facebook, YouTube, LinkedIn).',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step system to build your personal brand and grow your business on social media
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-12 last:mb-0"
            >
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-3xl font-bold text-secondary">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className={`relative bg-gradient-to-br ${step.color} rounded-3xl p-12 text-white shadow-2xl hover:scale-105 transition-transform`}>
                    <div className="flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-primary to-orange-600 text-white px-8 py-4 rounded-2xl shadow-xl">
            <p className="text-lg font-semibold mb-2">
              ⏱️ Average Time Investment: Just 4 Hours Per Month
            </p>
            <p className="text-white/90">
              You focus on filming. We handle everything else.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
