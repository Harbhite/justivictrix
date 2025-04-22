
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Plus, Edit, Trash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { BlogPost } from '@/types/blog';

const Blog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  
  // Blog categories
  const categories = [
    { name: "All", count: 0 },
    { name: "Law Updates", count: 0 },
    { name: "Student Life", count: 0 },
    { name: "Case Studies", count: 0 },
    { name: "Academic Tips", count: 0 },
    { name: "Faculty News", count: 0 },
    { name: "General", count: 0 },
  ];

  // Load blog posts from the database
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      // Get all blog posts without joining with profiles
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // If we have posts, get author details separately for non-anonymous posts
      if (postsData && postsData.length > 0) {
        // Get all unique author IDs from non-anonymous posts
        const authorIds = [...new Set(
          postsData
            .filter(post => !post.is_anonymous)
            .map(post => post.author_id)
        )];
        
        // Fetch author details for these IDs
        const { data: authorsData } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url')
          .in('id', authorIds);
          
        // Create a map of author details by ID
        const authorsMap = authorsData ? 
          authorsData.reduce((map: any, author) => {
            map[author.id] = author;
            return map;
          }, {}) : {};
          
        // Add author details to each post
        postsData.forEach((post: BlogPost) => {
          if (!post.is_anonymous && post.author_id && authorsMap[post.author_id]) {
            post.author = authorsMap[post.author_id];
          }
        });

        // Update category counts
        const newCategories = [...categories];
        const categoryCounts = postsData.reduce((acc: any, post) => {
          acc[post.category] = (acc[post.category] || 0) + 1;
          return acc;
        }, {});
        
        newCategories.forEach(cat => {
          if (cat.name === 'All') {
            cat.count = postsData.length;
          } else {
            cat.count = categoryCounts[cat.name] || 0;
          }
        });
        
        // Set the featured post to the most recent one
        setFeaturedPost(postsData[0]);
        
        // Set the recent posts to the rest
        setRecentPosts(postsData.slice(1));
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id)
          .eq('author_id', user.id);
          
        if (error) throw error;
        
        toast.success('Blog post deleted successfully');
        fetchBlogPosts();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  // Filter posts by category
  const filteredPosts = category === 'All' 
    ? recentPosts 
    : recentPosts.filter(post => post.category === category);
    
  // Filter posts by search term
  const searchFilteredPosts = searchTerm
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Blog Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Law School Blog</h1>
            {user && (
              <Button 
                onClick={() => navigate('/blog/new')}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Plus className="mr-2" size={18} />
                Write New Post
              </Button>
            )}
          </div>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with the latest news, insights, and resources for law students at the University of Ibadan.
          </p>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-60 bg-gray-200 rounded-xl"></div>
              <div className="h-60 bg-gray-200 rounded-xl"></div>
              <div className="h-60 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image_url} 
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
                        <span className="text-sm text-gray-500 mr-4">
                          {new Date(featuredPost.created_at).toLocaleDateString()}
                        </span>
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">
                          {featuredPost.is_anonymous 
                            ? "Anonymous" 
                            : (featuredPost.author?.full_name || featuredPost.author?.username || "Unknown")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/blog/${featuredPost.id}`}
                          className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700"
                        >
                          Read full article <ArrowRight size={16} className="ml-1" />
                        </Link>
                        
                        {user && featuredPost.author_id === user.id && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/blog/edit/${featuredPost.id}`)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeletePost(featuredPost.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
                  
                  {/* Category Filter (Mobile Dropdown) */}
                  <div className="lg:hidden">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name} ({cat.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Category Filter (Desktop Pills) */}
                <div className="hidden lg:flex mb-6 space-x-2 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        category === cat.name
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
                
                {searchFilteredPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {searchFilteredPosts.map((post: any) => (
                      <div 
                        key={post.id}
                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={post.image_url} 
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
                              <span className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Link 
                                to={`/blog/${post.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-gray-700 inline-flex items-center"
                              >
                                Read more <ArrowRight size={14} className="ml-1" />
                              </Link>
                              
                              {user && post.author_id === user.id && (
                                <div className="flex ml-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(`/blog/edit/${post.id}`);
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDeletePost(post.id);
                                    }}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <Trash size={14} />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No blog posts found</p>
                    {user && (
                      <Button 
                        onClick={() => navigate('/blog/new')}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <Plus className="mr-2" size={18} />
                        Write the First Post
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="mt-12 lg:mt-0 lg:col-span-4">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.filter(c => c.name !== 'All').map((category, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => setCategory(category.name)}
                          className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                        >
                          <span className="text-gray-700">{category.name}</span>
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </button>
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
        </>
      )}
    </div>
  );
};

export default Blog;
