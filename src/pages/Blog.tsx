import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Grid, List, Filter } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import BlogHeader from '@/components/blog/BlogHeader';
import BlogSidebar from '@/components/blog/BlogSidebar';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostCard from '@/components/blog/BlogPostCard';

import type { BlogPost, BlogCategory, BlogTag } from '@/types/blog';

const Blog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data state
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all blog posts - select all required columns
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select("id, title, content, excerpt, slug, image_url, author_id, created_at, updated_at, published_at, status, category, tags, is_anonymous, is_featured, view_count")
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (postsData && postsData.length > 0) {
        // Get author details for non-anonymous posts
        const authorIds = [...new Set(
          postsData
            .filter(post => !post.is_anonymous)
            .map(post => post.author_id)
        )];
        
        let authorsMap = {};
        if (authorIds.length > 0) {
          const { data: authorsData } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url, bio')
            .in('id', authorIds);
            
          authorsMap = authorsData ? 
            authorsData.reduce((map: any, author) => {
              map[author.id] = author;
              return map;
            }, {}) : {};
        }
          
        // Process posts with WordPress-like features
        const processedPosts = (postsData as BlogPost[]).map((post: any) => {
          const processed: BlogPost = {
            ...post,
            tags: post.tags || [],
            view_count: post.view_count ?? 0,
            comments_count: post.comments_count ?? 0,
            status: post.status as 'draft' | 'published' | 'private',
          };
          
          if (!post.is_anonymous && post.author_id && authorsMap[post.author_id]) {
            processed.author = authorsMap[post.author_id];
          }
          
          if (!processed.image_url || processed.image_url.includes('blob:')) {
            processed.image_url = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
          }
          
          return processed;
        });

        // Separate featured and regular posts
        const featured = processedPosts.filter(post => post.is_featured);
        const regular = processedPosts.filter(post => !post.is_featured);
        
        setFeaturedPosts(featured);
        setPosts(regular);
        
        // Generate categories and tags from posts
        generateCategoriesAndTags(processedPosts);
      } else {
        setFeaturedPosts([]);
        setPosts([]);
        setCategories([]);
        setTags([]);
      }
    } catch (error: any) {
      console.error('Error fetching blog data:', error);
      setError('Failed to load blog posts. Please try again later.');
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCategoriesAndTags = (posts: BlogPost[]) => {
    // Generate categories
    const categoryMap = new Map<string, number>();
    posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });
    
    const categoriesData = Array.from(categoryMap.entries()).map(([name, count], index) => ({
      id: index + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      post_count: count
    }));
    
    setCategories(categoriesData);
    
    // Generate tags
    const tagMap = new Map<string, number>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          const count = tagMap.get(tag) || 0;
          tagMap.set(tag, count + 1);
        });
      }
    });
    
    const tagsData = Array.from(tagMap.entries())
      .map(([name, count], index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        post_count: count
      }))
      .sort((a, b) => b.post_count - a.post_count);
    
    setTags(tagsData);
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
        fetchBlogData();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  // Filter and sort posts
  const getFilteredPosts = () => {
    let filtered = [...posts];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags?.includes(selectedTag));
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort posts
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      case 'comments':
        filtered.sort((a, b) => (b.comments_count || 0) - (a.comments_count || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    
    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load blog</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchBlogData} className="bg-gray-900 hover:bg-gray-800">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
            <div className="grid gap-8">
              {featuredPosts.slice(0, 2).map(post => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
                {user && (
                  <Button 
                    onClick={() => navigate('/blog/new')}
                    className="bg-gray-900 hover:bg-gray-800"
                  >
                    <Plus className="mr-2" size={18} />
                    Write Post
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="comments">Most Comments</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredPosts.map(post => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    currentUserId={user?.id}
                    onEdit={(id) => navigate(`/blog/edit/${id}`)}
                    onDelete={handleDeletePost}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedCategory !== 'All' || selectedTag
                    ? 'No posts found matching your criteria'
                    : 'No blog posts available'}
                </p>
                {user && !searchTerm && selectedCategory === 'All' && !selectedTag && (
                  <Button 
                    onClick={() => navigate('/blog/new')}
                    className="bg-gray-900 hover:bg-gray-800"
                  >
                    <Plus className="mr-2" size={18} />
                    Write the First Post
                  </Button>
                )}
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className={`lg:col-span-4 mt-8 lg:mt-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <BlogSidebar
              categories={categories}
              tags={tags}
              onCategorySelect={setSelectedCategory}
              onTagSelect={setSelectedTag}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
