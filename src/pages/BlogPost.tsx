
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BlogPost = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  
  // Sample blog post data
  const blogPost = {
    id: parseInt(id || '1'),
    title: "Understanding Legal Ethics in the Digital Age",
    excerpt: "The digital age presents new ethical challenges for legal practitioners. This article explores how traditional ethical principles apply in a digital context.",
    content: `
      <p class="mb-4">The practice of law has been fundamentally transformed by the digital revolution. From cloud-based document storage to artificial intelligence-powered legal research tools, technology has reshaped how legal professionals work. However, these technological advancements have introduced complex ethical questions that weren't contemplated by traditional legal ethics frameworks.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Client Confidentiality in the Digital Age</h2>
      
      <p class="mb-4">Perhaps the most critical ethical obligation for lawyers is maintaining client confidentiality. In the digital context, this presents unique challenges:</p>
      
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li>Cloud storage and remote access to client files increase convenience but may introduce security vulnerabilities</li>
        <li>Email communications containing sensitive client information must be properly secured</li>
        <li>Use of public Wi-Fi networks for accessing confidential information creates significant risks</li>
        <li>Third-party service providers may have access to client data, requiring careful vendor selection and management</li>
      </ul>
      
      <p class="mb-4">According to the American Bar Association's Formal Opinion 477R, lawyers must make "reasonable efforts" to prevent inadvertent or unauthorized access to client information. What constitutes "reasonable efforts" has evolved with technology, requiring lawyers to stay informed about cybersecurity best practices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Competence with Technology</h2>
      
      <p class="mb-4">The duty of competence has expanded to include technological proficiency. Lawyers must understand the technology they use in their practice to:
      </p>
      
      <ol class="list-decimal ml-6 mb-4 space-y-2">
        <li>Effectively represent clients whose matters involve technology</li>
        <li>Protect client confidentiality through appropriate security measures</li>
        <li>Comply with court technology requirements</li>
        <li>Properly supervise non-lawyer assistants who use technology</li>
      </ol>
      
      <p class="mb-4">This doesn't mean lawyers must become IT experts, but they must understand the benefits and risks of relevant technologies.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Social Media Considerations</h2>
      
      <p class="mb-4">Social media presents unique ethical challenges for legal practitioners. Issues include:</p>
      
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li>Inadvertent formation of attorney-client relationships through online interactions</li>
        <li>Breaches of confidentiality through seemingly innocuous posts</li>
        <li>Ex parte communications with represented parties or judges</li>
        <li>Unauthorized practice of law across jurisdictional boundaries</li>
      </ul>
      
      <p class="mb-4">Many jurisdictions have issued ethics opinions specifically addressing social media use by attorneys, emphasizing that traditional ethics rules apply in the digital realm.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">As technology continues to evolve, so too will the ethical challenges facing legal practitioners. The fundamental principles of legal ethics – confidentiality, competence, independence, and loyalty to clients – remain unchanged, but their application in digital contexts requires careful consideration and ongoing education.</p>
      
      <p class="mb-4">Law schools and continuing legal education providers must ensure lawyers are equipped to navigate these ethical challenges. Meanwhile, bar associations and courts must continue developing guidance that addresses emerging technologies and their implications for legal practice.</p>
      
      <p>By thoughtfully applying traditional ethical principles to new technological contexts, the legal profession can embrace digital innovation while maintaining its core values and responsibilities.</p>
    `,
    date: "April 10, 2024",
    author: "Justice Amina Ibrahim",
    category: "Legal Ethics",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Legal Ethics", "Digital Law", "Technology", "Professional Responsibility"]
  };

  // Related posts
  const relatedPosts = [
    {
      id: 2,
      title: "Legal Writing Tips for First-Year Law Students",
      excerpt: "Mastering the art of legal writing is essential for success in law school and beyond.",
      date: "May 10, 2024",
      author: "Dr. Samantha Brown",
      category: "Academic Tips",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Evolution of Nigerian Criminal Law in the 21st Century",
      excerpt: "This article examines how Nigerian criminal law has evolved over the past two decades.",
      date: "April 28, 2024",
      author: "Prof. James Morgan",
      category: "Law Updates",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Balancing Law School and Mental Health: Strategies for Success",
      excerpt: "Law school can be stressful, but maintaining good mental health is crucial for academic success.",
      date: "April 20, 2024",
      author: "Maria Gonzalez",
      category: "Student Life",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
    }
  ];

  if (!blogPost) {
    return <div className="min-h-screen flex items-center justify-center">Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to all articles
        </Link>

        {/* Blog post header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-4">
            {blogPost.category}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogPost.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-3 sm:gap-4 mb-6">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="text-sm sm:text-base">{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm sm:text-base">{blogPost.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span className="text-sm sm:text-base">{blogPost.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="mb-8 sm:mb-10">
          <img 
            src={blogPost.image} 
            alt={blogPost.title}
            className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-xl"
          />
        </div>

        {/* Blog content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>

        {/* Tags */}
        <div className="mt-8 sm:mt-10 mb-10 sm:mb-16">
          <h3 className="text-lg font-bold mb-3 sm:mb-4">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag, index) => (
              <Link 
                key={index} 
                to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <span className="flex items-center">
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-10 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map(post => (
              <div 
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700 mb-2">
                    {post.category}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Read article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
