
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  // Blog categories
  const categories = [
    { name: "Law Updates", count: 15 },
    { name: "Student Life", count: 12 },
    { name: "Case Studies", count: 8 },
    { name: "Academic Tips", count: 10 },
    { name: "Faculty News", count: 6 },
  ];

  // Featured post
  const featuredPost = {
    id: 1,
    title: "New Developments in Constitutional Law: A Student's Perspective",
    excerpt: "The recent Supreme Court decisions have significantly impacted how we understand constitutional rights. This article explores the implications for law students and future practitioners.",
    date: "May 15, 2024",
    author: "Professor James Wilson",
    category: "Constitutional Law",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1200&auto=format&fit=crop"
  };

  // Recent posts
  const recentPosts = [
    {
      id: 1,
      title: "Legal Writing Tips for First-Year Law Students",
      excerpt: "Mastering the art of legal writing is essential for success in law school and beyond. This guide provides practical tips for improving your legal writing skills.",
      date: "May 10, 2024",
      author: "Dr. Samantha Brown",
      category: "Academic Tips",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Preparing for Moot Court Competitions: A Comprehensive Guide",
      excerpt: "Moot court competitions are an excellent way to develop advocacy skills. This guide provides tips for preparation and presentation.",
      date: "May 5, 2024",
      author: "Barrister John Adeyemi",
      category: "Student Life",
      image: "https://images.unsplash.com/photo-1505664063603-28e48c8ad148?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Evolution of Nigerian Criminal Law in the 21st Century",
      excerpt: "This article examines how Nigerian criminal law has evolved over the past two decades and the implications for current legal practice.",
      date: "April 28, 2024",
      author: "Prof. James Morgan",
      category: "Law Updates",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Balancing Law School and Mental Health: Strategies for Success",
      excerpt: "Law school can be stressful, but maintaining good mental health is crucial for academic success. This article provides practical strategies for finding balance.",
      date: "April 20, 2024",
      author: "Maria Gonzalez",
      category: "Student Life",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Legal Tech Tools Every Law Student Should Know About",
      excerpt: "Technology is transforming the legal industry. This article introduces essential tech tools that can help law students study more effectively.",
      date: "April 15, 2024",
      author: "Dr. Eric Knight",
      category: "Academic Tips",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Understanding Legal Ethics in the Digital Age",
      excerpt: "The digital age presents new ethical challenges for legal practitioners. This article explores how traditional ethical principles apply in a digital context.",
      date: "April 10, 2024",
      author: "Justice Amina Ibrahim",
      category: "Law Updates",
      image: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Blog Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Law School Blog</h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with the latest news, insights, and resources for law students at the University of Ibadan.
          </p>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="h-64 w-full object-cover md:h-full"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-3">
                  {featuredPost.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500 mr-4">{featuredPost.date}</span>
                  <User size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{featuredPost.author}</span>
                </div>
                <Link 
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700"
                >
                  Read full article <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {recentPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700 mb-2">
                      {post.category}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar size={14} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-gray-700 inline-flex items-center"
                      >
                        Read more <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-4">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe to Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest articles and resources straight to your inbox.
                </p>
                <div className="mb-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
