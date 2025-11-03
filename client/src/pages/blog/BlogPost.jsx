import { useParams } from 'react-router-dom';
import BlogLayout from '../../layouts/BlogLayout';

const BlogPost = () => {
  const { slug } = useParams();

  // Static blog post data based on slug
  const getPostData = (slug) => {
    const posts = {
      'ultimate-personal-branding-2025': {
        title: 'The Ultimate 2025 Personal Branding Strategy: How to Build Authority That Sells',
        description: 'Master the art of personal branding in 2025 with proven strategies that turn your expertise into profitable opportunities.',
        author: 'MediaManager4U Team',
        date: '2025-01-15',
        readTime: '8',
        category: 'Personal Branding',
        keywords: ['personal branding', '2025 strategy', 'authority building']
      },
      'smart-creator-content-repurposing': {
        title: 'Smart Creator Content Repurposing: Maximize Your Reach Without Extra Work',
        description: 'Learn how to transform one piece of content into multiple formats to reach more audiences across different platforms.',
        author: 'MediaManager4U Team',
        date: '2025-01-10',
        readTime: '6',
        category: 'Content Strategy',
        keywords: ['content repurposing', 'creator economy', 'multi-platform']
      },
      'social-media-growth-pillars-2025': {
        title: 'The 3 Pillars of Social Media Growth in 2025: What Really Works',
        description: 'Discover the fundamental strategies that drive real growth on social media platforms in the current landscape.',
        author: 'MediaManager4U Team',
        date: '2025-01-05',
        readTime: '7',
        category: 'Social Media',
        keywords: ['social media growth', '2025 trends', 'engagement']
      }
    };

    return posts[slug] || {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      author: 'MediaManager4U Team',
      date: new Date().toISOString().split('T')[0],
      readTime: '1',
      category: 'General',
      keywords: []
    };
  };

  const post = getPostData(slug);

  return (
    <BlogLayout meta={post}>
      <div className="prose prose-lg max-w-none">
        <h1>{post.title}</h1>
        <p className="lead">
          {post.description}
        </p>
        {/* MDX content will be rendered here */}
      </div>
    </BlogLayout>
  );
};

export default BlogPost;