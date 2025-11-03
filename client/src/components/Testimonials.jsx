import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Career Coach',
      location: 'Mumbai, India',
      image: '👩‍💼',
      rating: 5,
      text: 'MediaManager4U transformed my personal brand! I grew from 1,000 to 450K followers in just 6 months. My coaching business revenue increased 10x. They handle everything while I focus on my clients.',
      result: '1K → 450K followers | 10x Revenue'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Digital Marketing Consultant',
      location: 'Bangalore, India',
      image: '👨‍💻',
      rating: 5,
      text: 'Started from zero and reached 100K followers in 7 months! The team understands the Indian market perfectly. My consultation bookings have tripled, and I\'m now recognized as an industry leader.',
      result: '0 → 100K followers | 3x Bookings'
    },
    {
      name: 'Anita Desai',
      role: 'Real Estate Professional',
      location: 'Delhi, India',
      image: '👩‍💼',
      rating: 5,
      text: 'The best investment I made for my business! Their short-form content strategy is brilliant. I now get 5-10 qualified leads every week just from Instagram. Highly recommend!',
      result: '5-10 leads per week'
    },
    {
      name: 'Vikram Patel',
      role: 'Fitness Coach',
      location: 'Pune, India',
      image: '💪',
      rating: 5,
      text: 'Professional, responsive, and results-driven! They helped me position myself as THE fitness expert in my city. My online coaching program is now fully booked for the next 3 months.',
      result: 'Fully booked for 3 months'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Real Stories, Real Results 🇮🇳
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of Indian entrepreneurs who transformed their business with our personal branding system
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all relative"
            >
              <FaQuoteLeft className="text-3xl text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="bg-primary/10 rounded-lg p-3 border-l-4 border-primary">
                <p className="text-sm font-semibold text-primary">
                  📈 {testimonial.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Happy Indian Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">450K+</div>
                <div className="text-gray-600">Followers Grown</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10x</div>
                <div className="text-gray-600">Average Revenue Growth</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
