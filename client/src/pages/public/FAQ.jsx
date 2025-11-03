import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I know if I am fit?",
      answer: "If you're a business owner, coach, or professional who wants to grow your brand and sell through social media, and you're ready to invest in a system that actually delivers results — then book a call. If you're looking for free hacks or not willing to invest in your own growth, this is not for you."
    },
    {
      question: "What is the point of building your personal brand?",
      answer: `Let's look at what these people have in common 👇

Virat Kohli – One8 & Wrogn
Deepika Padukone – 82°E
Ranveer Singh – The Label Life
Aman Gupta – boAt
Anand Mahindra – Mahindra Group's modern image

All these people built powerful personal brands first — their faces, opinions, and lifestyle became their marketing. So when they launched their own products, people trusted them instantly — and their businesses exploded.

Today, you don't need to be a Bollywood star to do this. With social media, even a regular business owner can build a strong personal brand that drives sales and makes your business the go-to name in your industry.

If you don't take that opportunity, your competitors will — and they'll take your customers too.`
    },
    {
      question: "Why should my business be on social media?",
      answer: `📱 Over 600 million active users in India
🔍 54% of buyers research a product on social media before buying
💰 71% of purchase decisions start on platforms like Instagram and YouTube

Your customers are already scrolling — you just need to show up where they are.`
    },
    {
      question: "How much time does it take?",
      answer: `We handle everything end-to-end — strategy, research, scripting, editing, and uploading. All you need to do is film, since it's your personal brand.

On average, our clients spend about 4 hours a month filming. However, this depends on your style and how comfortable you are on camera — so it varies from person to person.`
    },
    {
      question: "What kind of results can I expect?",
      answer: `Results depend on your niche, audience, and posting frequency — but here's what you can expect with consistency 👇

• A career coach client grew from 1,000 to 450K followers in 6 months
• A digital marketing consultant grew from 0 to 100K in 7 months

Both saw a 10x increase in business revenue, built loyal communities, and positioned themselves as industry leaders.

Social media growth takes time — but the ROI is long-term. Unlike ads, your brand keeps growing even when you stop spending.`
    },
    {
      question: "What is short-form content?",
      answer: `Short-form content are videos under 60 seconds, made for mobile in 9:16 format — these are your:

• Instagram Reels
• YouTube Shorts
• Facebook Reels
• TikToks (for global audience)

Short videos are the fastest way to grow your reach, build authority, and drive customers.`
    },
    {
      question: "Which social media platforms do you work with?",
      answer: `We manage:

• Instagram
• YouTube
• Facebook
• LinkedIn
• Twitter (X)

But we focus mainly on Instagram, because it's currently the best platform in India to build your personal brand and attract clients.`
    },
    {
      question: "How long does it take to see results?",
      answer: `You'll start seeing results as soon as your videos go live!

The process — strategy call, research, scripting, filming, and editing — usually takes 2–3 weeks. After that, the posting starts and results begin to roll in 🚀`
    },
    {
      question: "Do I need to already have followers to start?",
      answer: `Not at all! Most of our clients start from zero. You don't need followers — you need a clear message and a consistent system. We'll help you find your niche, position your personal brand, and grow your audience from scratch.`
    },
    {
      question: "What kind of businesses do you work with?",
      answer: `We work with:

• Coaches, consultants, and educators
• Agency owners and freelancers
• Founders, startups, and local business owners
• Real estate professionals, doctors, and finance experts
• Anyone who wants to build authority and attract clients online

If your goal is to grow and sell on social media — we can help.`
    },
    {
      question: "Do I have to show my face on camera?",
      answer: `Ideally yes, because your personal brand = your face. But if you're camera-shy, we can create a faceless brand strategy using voiceovers, stock visuals, and storytelling until you're ready to show up.`
    },
    {
      question: "How much does it cost?",
      answer: `Our pricing depends on your goals, industry, and how involved you want us to be (strategy only vs full content management). We'll discuss exact packages during your free strategy call. We keep our plans affordable for Indian business owners, without compromising on quality.`
    },
    {
      question: "Do you offer paid ads or only organic growth?",
      answer: `We specialize in organic growth — building strong personal brands and trust that attract real customers. However, if you want to scale faster, we can design and run Instagram or Facebook ad campaigns that convert viewers into paying clients.`
    },
    {
      question: "Do you guarantee followers or sales?",
      answer: `We don't believe in fake promises or bots. Instead of vanity metrics, we focus on building genuine visibility, authority, and leads. Our system is designed to bring consistent growth and brand trust that lasts.`
    },
    {
      question: "Can I approve the content before posting?",
      answer: `Absolutely. You'll always have final approval before anything goes live. We'll share the scripts, edits, and posting schedule with you — your brand, your voice, our execution.`
    },
    {
      question: "How do I shoot videos if I've never done it before?",
      answer: `Don't worry — most of our clients are first-timers. We'll guide you step-by-step:

• What setup to use (even just a phone)
• Lighting, framing, and posture
• How to speak confidently

We'll even send you sample video templates and help you record like a pro in a few tries.`
    },
    {
      question: "What if I don't have time?",
      answer: `That's exactly why we exist. You only need a few hours a month to film — we handle everything else:

✅ Research
✅ Scripting
✅ Editing
✅ Posting & Analytics

We make building your personal brand as hands-free as possible.`
    },
    {
      question: "How do I track performance?",
      answer: `We share monthly growth reports with analytics on:

• Follower growth
• Engagement rate
• Reach & impressions
• Top-performing content

You'll always know exactly what's working and what to improve.`
    },
    {
      question: "What happens after I book a call?",
      answer: `Once you book a call:

1. We understand your goals, business, and audience.
2. We audit your current online presence (if any).
3. We create a custom growth plan for your personal brand.
4. If we're a good fit, we move forward with onboarding and start building your content system.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about building your personal brand and growing your business on social media
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="text-primary flex-shrink-0">
                    {openIndex === index ? (
                      <FaChevronUp className="w-5 h-5" />
                    ) : (
                      <FaChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Grow Your Brand?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              If you're serious about growing your business, building your brand, and attracting customers through social media — book a free strategy call today and let's make it happen.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Book a Free Strategy Call
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
