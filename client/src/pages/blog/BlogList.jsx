import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BlogList = () => {
  // Static blog posts data
  const posts = [
    {
      slug: 'ultimate-personal-branding-2025',
      title: 'The Ultimate 2025 Personal Branding Strategy: How to Build Authority That Sells',
      description: 'Master the art of personal branding in 2025 with proven strategies that turn your expertise into profitable opportunities.',
      author: 'MediaManager4U Team',
      date: '2025-01-15',
      readTime: '8',
      category: 'Personal Branding',
      keywords: ['personal branding', '2025 strategy', 'authority building']
    },
    {
      slug: 'smart-creator-content-repurposing',
      title: 'Smart Creator Content Repurposing: Maximize Your Reach Without Extra Work',
      description: 'Learn how to transform one piece of content into multiple formats to reach more audiences across different platforms.',
      author: 'MediaManager4U Team',
      date: '2025-01-10',
      readTime: '6',
      category: 'Content Strategy',
      keywords: ['content repurposing', 'creator economy', 'multi-platform']
    },
    {
      slug: 'social-media-growth-pillars-2025',
      title: 'The 3 Pillars of Social Media Growth in 2025: What Really Works',
      description: 'Discover the fundamental strategies that drive real growth on social media platforms in the current landscape.',
      author: 'MediaManager4U Team',
      date: '2025-01-05',
      readTime: '7',
      category: 'Social Media',
      keywords: ['social media growth', '2025 trends', 'engagement']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-secondary mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert tips, strategies, and case studies to help you build a powerful personal brand.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🕒</span>
                      <span>{post.readTime} min read</span>
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogList;