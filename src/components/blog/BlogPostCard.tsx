
import { Link } from "react-router-dom";
import { Calendar, User, Eye, MessageCircle, Edit, Trash } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface BlogPostCardProps {
  post: BlogPost;
  currentUserId?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  variant?: "grid" | "list";
}

const BlogPostCard = ({ 
  post, 
  currentUserId, 
  onEdit, 
  onDelete, 
  variant = "grid" 
}: BlogPostCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
  };

  const isOwner = currentUserId && post.author_id === currentUserId;

  if (variant === "list") {
    return (
      <article className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              onError={handleImageError}
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              {isOwner && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onEdit?.(post.id)}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete?.(post.id)}>
                    <Trash size={14} />
                  </Button>
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              <Link to={`/blog/${post.id}`} className="hover:text-gray-700">
                {post.title}
              </Link>
            </h2>
            
            <div className="text-gray-600 mb-4 line-clamp-3">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.excerpt || ""}</ReactMarkdown>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
                <span>{post.view_count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} />
                <span>{post.comments_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        {post.is_featured && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            Featured
          </Badge>
        )}
        {isOwner && (
          <div className="absolute top-3 right-3 flex gap-1">
            <Button size="sm" variant="secondary" onClick={() => onEdit?.(post.id)}>
              <Edit size={14} />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(post.id)}>
              <Trash size={14} />
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{post.category}</Badge>
          <span className={`text-xs px-2 py-1 rounded-full ${
            post.status === 'published' ? 'bg-green-100 text-green-800' :
            post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {post.status}
          </span>
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          <Link to={`/blog/${post.id}`} className="hover:text-gray-700">
            {post.title}
          </Link>
        </h2>
        
        <div className="text-gray-600 text-sm mb-4 line-clamp-3">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.excerpt || ""}</ReactMarkdown>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>
                {post.is_anonymous 
                  ? "Anonymous" 
                  : (post.author?.full_name || post.author?.username || "Unknown")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{post.view_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={12} />
              <span>{post.comments_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
