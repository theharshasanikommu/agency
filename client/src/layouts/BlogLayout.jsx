import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogLayout = ({ 
  children, 
  meta = {
    title: '',
    description: '',
    author: '',
    date: '',
    readTime: '',
    category: ''
  }
}) => {
  const formattedDate = meta.date ? new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category & Reading Time */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              {meta.category && (
                <Link 
                  to={`/blog/category/${meta.category.toLowerCase()}`}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20"
                >
                  {meta.category}
                </Link>
              )}
              {meta.readTime && (
                <span className="flex items-center gap-1">
                  <span>🕒</span>
                  <span>{meta.readTime} min read</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              {meta.title}
            </h1>

            {/* Author & Date */}
            {(meta.author || formattedDate) && (
              <div className="flex items-center gap-6 mb-8 text-gray-600">
                {meta.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-medium text-secondary">
                        {meta.author}
                      </div>
                      <div className="text-sm">
                        Author
                      </div>
                    </div>
                  </div>
                )}
                {formattedDate && (
                  <div className="text-sm">
                    Published on {formattedDate}
                  </div>
                )}
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:text-secondary prose-a:text-primary hover:prose-a:text-primary/80">
              {children}
            </div>

            {/* Schema.org Article markup */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": meta.title,
                "description": meta.description,
                "author": {
                  "@type": "Person",
                  "name": meta.author
                },
                "datePublished": meta.date,
                "publisher": {
                  "@type": "Organization",
                  "name": "MediaManager4U",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://your-domain.com/logo.png"
                  }
                }
              })}
            </script>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogLayout;