import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const InfluencerShowcase = () => {
  const influencers = [
    {
      name: "Dr. Tanaya Narendra",
      role: "Doctor & Health Educator",
      followers: "1.2M+",
      platform: "Instagram",
      icon: <FaInstagram />,
      image: "/images/influencers/dr-cuterus.jpg",
      description: "Made medical knowledge accessible & built a healthcare brand",
      category: "Healthcare"
    },
    {
      name: "Rachana Ranade",
      role: "CA & Financial Educator",
      followers: "4.2M+",
      platform: "YouTube",
      icon: <FaYoutube />,
      image: "/images/influencers/rachana-ranade.jpg",
      description: "Simplified stock market education for millions",
      category: "Finance"
    },
    {
      name: "Madhur Sharma",
      role: "Tech Lead & Coding Mentor",
      followers: "800K+",
      platform: "LinkedIn & YouTube",
      icon: <FaLinkedin />,
      image: "/images/influencers/madhur-sharma.jpg",
      description: "Helps developers land top tech jobs",
      category: "Technology"
    },
    {
      name: "Chef Ranveer Brar",
      role: "Celebrity Chef & Restaurateur",
      followers: "5M+",
      platform: "Instagram & YouTube",
      icon: <FaYoutube />,
      image: "/images/influencers/ranveer-brar.jpg",
      description: "Built a culinary empire through content",
      category: "Food"
    },
    {
      name: "Ankita Sancheti",
      role: "Interior Designer",
      followers: "950K+",
      platform: "Instagram",
      icon: <FaInstagram />,
      image: "/images/influencers/ankita-design.jpg",
      description: "Transformed home design consulting through social",
      category: "Design"
    },
    {
      name: "Dr. Vivek Bindra",
      role: "Business Coach",
      followers: "18M+",
      platform: "YouTube",
      icon: <FaYoutube />,
      image: "/images/influencers/vivek-bindra.jpg",
      description: "Leading business knowledge platform in India",
      category: "Business"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Success Has Many Faces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From doctors to designers, tech leaders to chefs — see how professionals across India 
            are building powerful personal brands in their unique fields.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl text-primary">
                  {influencer.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{influencer.name}</h3>
                <p className="text-primary font-medium mb-1">{influencer.role}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="font-semibold">{influencer.followers}</span>
                  <span>followers on</span>
                  <span className="font-medium">{influencer.platform}</span>
                </div>
                <p className="text-gray-600">{influencer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whatever your profession, there's room at the top. Let's build your authority and turn your expertise into influence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Start Your Journey
              <span className="text-xl">→</span>
            </a>
            <a
              href="/services"
              className="btn btn-outline inline-flex items-center gap-2"
            >
              Explore Services
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerShowcase;