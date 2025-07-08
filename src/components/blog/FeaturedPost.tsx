
import { Link } from "react-router-dom";
import { Calendar, User, Eye, MessageCircle, Edit } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedPostProps {
  post: BlogPost;
  currentUserId?: string;
}

const FeaturedPost = ({ post, currentUserId }: FeaturedPostProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
  };

  const canEdit = currentUserId && currentUserId === post.author_id;

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white">
        Featured
      </Badge>
      
      <div className="md:flex">
        <div className="md:w-3/5">
          <div className="relative h-64 md:h-80">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2 bg-white/90 text-gray-800">
                {post.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-gray-600 mb-4 line-clamp-4">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>
                  {post.is_anonymous 
                    ? "Anonymous" 
                    : (post.author?.full_name || post.author?.username || "Unknown")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{post.view_count || 0} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} />
                <span>{post.comments_count || 0} comments</span>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Link
              to={`/blog/${post.id}`}
              className="flex-1 inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Read Full Article
            </Link>
            
            {canEdit && (
              <Link
                to={`/blog/edit/${post.id}`}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                title="Edit Post"
              >
                <Edit size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
