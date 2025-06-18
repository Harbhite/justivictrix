import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Edit, Trash, AlertCircle, Eye, Share2, Bookmark, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogComments from "@/components/blog/BlogComments";
import DOMPurify from "dompurify";
import type { BlogPost, BlogComment } from "@/types/blog";

type RelatedPost = {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
  category: string;
  view_count: number;
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Select all required fields for single blog post
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, excerpt, slug, image_url, author_id, created_at, updated_at, published_at, status, category, tags, is_anonymous, is_featured, view_count")
        .eq("id", Number(id))
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("No post found.");
      const blogPost: BlogPost = {
        ...data,
        tags: data.tags || [],
        view_count: data.view_count ?? 0,
        comments_count: 0,
        status: data.status as 'draft' | 'published' | 'private',
      };
      // Fetch author details if not anonymous
      if (!blogPost.is_anonymous && blogPost.author_id) {
        const { data: authorData } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url, bio")
          .eq("id", blogPost.author_id)
          .maybeSingle();
        if (authorData) blogPost.author = authorData;
      }
      if (!blogPost.image_url || blogPost.image_url.includes('blob:')) {
        blogPost.image_url = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
      }
      // Add view (persist to db if you want, omitted for safety)
      blogPost.view_count = (blogPost.view_count || 0) + 1;
      await supabase
        .from("blog_posts")
        .update({ view_count: blogPost.view_count })
        .eq("id", Number(id));
      setPost(blogPost);
      fetchRelatedPosts(blogPost.category, Number(id));
    } catch (error: any) {
      console.error("Error fetching blog post:", error);
      setError(error.message || "Failed to load blog post");
      toast.error("Failed to load blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      // For now, we'll use mock comments since we don't have a comments table
      const mockComments: BlogComment[] = [
        {
          id: 1,
          post_id: Number(id),
          author_name: "John Doe",
          author_email: "john@example.com",
          content: "Great article! Really insightful analysis on this legal topic.",
          created_at: new Date().toISOString(),
          status: "approved"
        },
        {
          id: 2,
          post_id: Number(id),
          author_name: "Jane Smith",
          author_email: "jane@example.com",
          content: "Thanks for sharing this. It helped clarify some concepts I was struggling with.",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          status: "approved"
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchRelatedPosts = async (category: string, currentPostId: number) => {
    try {
      // Select minimal columns for preview (matching RelatedPost type)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, image_url, created_at, category, view_count")
        .eq("category", category)
        .eq("status", "published")
        .neq("id", currentPostId)
        .limit(3);

      if (!error && data) {
        setRelatedPosts(
          data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            image_url: post.image_url,
            created_at: post.created_at,
            category: post.category,
            view_count: post.view_count ?? 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!user || !post) return;
    
    if (post.author_id !== user.id) {
      toast.error("You can only delete your own posts");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase
          .from("blog_posts")
          .delete()
          .eq("id", post.id);
          
        if (error) throw error;
        
        toast.success("Blog post deleted successfully");
        navigate("/blog");
      } catch (error) {
        console.error("Error deleting blog post:", error);
        toast.error("Failed to delete blog post");
      }
    }
  };

  const handleAddComment = (comment: Omit<BlogComment, 'id' | 'created_at'>) => {
    const newComment: BlogComment = {
      ...comment,
      id: comments.length + 1,
      created_at: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    toast.success("Comment added successfully!");
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h1 className="text-2xl font-bold mb-4">
            {error ? "Error loading blog post" : "Blog post not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The blog post you're looking for doesn't exist or may have been deleted."}
          </p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        {/* Post Header */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/90 text-gray-800">{post.category}</Badge>
                {post.is_featured && (
                  <Badge className="bg-red-500 text-white">Featured</Badge>
                )}
                <Badge variant="outline" className="bg-white/90 text-gray-800">
                  {post.status}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>
                    {post.is_anonymous 
                      ? "Anonymous" 
                      : (post.author?.full_name || post.author?.username || "Unknown")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{post.view_count} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6 sm:p-8">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart size={16} className="mr-1" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark size={16} className="mr-1" />
                  Bookmark
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
              </div>
              
              {user && post.author_id === user.id && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/blog/edit/${post.id}`)}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeletePost}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none prose-lg">
              {post.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                />
              )}
            </div>

            {/* Author Bio */}
            {!post.is_anonymous && post.author && (
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    {post.author.avatar_url ? (
                      <img 
                        src={post.author.avatar_url} 
                        alt={post.author.full_name || post.author.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-medium">
                        {(post.author.full_name || post.author.username || 'U').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {post.author.full_name || post.author.username}
                    </h4>
                    {post.author.bio && (
                      <p className="text-gray-600 text-sm mt-1">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={relatedPost.image_url}
                    alt={relatedPost.title}
                    className="w-full h-40 object-cover"
                    onError={handleImageError}
                  />
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      <button
                        onClick={() => navigate(`/blog/${relatedPost.id}`)}
                        className="hover:text-gray-700 text-left"
                      >
                        {relatedPost.title}
                      </button>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{relatedPost.view_count} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <BlogComments
          postId={post.id}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default BlogPostPage;
