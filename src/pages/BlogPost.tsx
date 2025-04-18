
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Edit, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          author:author_id(username, full_name, avatar_url)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      toast.error("Failed to load blog post");
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-16">
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
    );
  }

  if (!post) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Button onClick={() => navigate("/blog")}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <div className="inline-block bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-3">
                {post.category}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
              <div className="flex items-center text-white/90">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm mr-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <User size={16} className="mr-2" />
                <span className="text-sm">
                  {post.is_anonymous 
                    ? "Anonymous" 
                    : (post.author?.full_name || post.author?.username || "Unknown")}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Author edit controls */}
            {user && post.author_id === user.id && (
              <div className="flex justify-end mb-6 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/blog/edit/${post.id}`)}
                  className="flex items-center gap-1"
                >
                  <Edit size={14} />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeletePost}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash size={14} />
                  Delete
                </Button>
              </div>
            )}

            {/* Blog content */}
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
