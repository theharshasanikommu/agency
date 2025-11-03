import readingTime from 'reading-time';

export const processBlogPost = async (mdxContent, meta = {}) => {
  // Calculate reading time
  const stats = readingTime(mdxContent);
  
  return {
    ...meta,
    readTime: Math.ceil(stats.minutes),
    // Add more processing as needed (excerpt generation, etc.)
  };
};

export const validateBlogMeta = (meta) => {
  const requiredFields = ['title', 'description', 'author', 'date', 'category'];
  const missingFields = requiredFields.filter(field => !meta[field]);
  
  if (missingFields.length > 0) {
    console.warn(`Blog post missing required fields: ${missingFields.join(', ')}`);
    return false;
  }
  
  return true;
};

// Schema.org Article metadata generator
export const generateArticleSchema = (meta, url) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    author: {
      '@type': 'Person',
      name: meta.author
    },
    datePublished: meta.date,
    dateModified: meta.updated || meta.date,
    publisher: {
      '@type': 'Organization',
      name: 'MediaManager4U',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    // Add more schema properties as needed
  };
};