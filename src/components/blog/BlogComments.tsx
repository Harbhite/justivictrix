
import { useState, useEffect } from "react";
import { MessageCircle, Reply, ThumbsUp, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogComment } from "@/types/blog";
import { useAuth } from "@/hooks/useAuth";

interface BlogCommentsProps {
  postId: number;
  comments: BlogComment[];
  onAddComment: (comment: Omit<BlogComment, 'id' | 'created_at'>) => void;
}

const BlogComments = ({ postId, comments, onAddComment }: BlogCommentsProps) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    if (user) {
      setAuthorName(user.user_metadata?.full_name || user.email?.split('@')[0] || '');
      setAuthorEmail(user.email || '');
    }
  }, [user]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) return;
    
    onAddComment({
      post_id: postId,
      author_name: authorName,
      author_email: authorEmail,
      content: newComment,
      status: 'approved',
      parent_id: undefined
    });
    
    setNewComment("");
    if (!user) {
      setAuthorName("");
      setAuthorEmail("");
    }
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim() || !authorName.trim() || !authorEmail.trim()) return;
    
    onAddComment({
      post_id: postId,
      author_name: authorName,
      author_email: authorEmail,
      content: replyContent,
      status: 'approved',
      parent_id: parentId
    });
    
    setReplyContent("");
    setReplyTo(null);
  };

  const renderComment = (comment: BlogComment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">
                {comment.author_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-sm">{comment.author_name}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ThumbsUp size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <Flag size={14} />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
        
        {!isReply && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            className="text-xs"
          >
            <Reply size={12} className="mr-1" />
            Reply
          </Button>
        )}
        
        {replyTo === comment.id && (
          <div className="mt-3 p-3 bg-white rounded border">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                Post Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyTo(null);
                  setReplyContent("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
    </div>
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle size={20} />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="author-name">Name *</Label>
              <Input
                id="author-name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name"
                required
                disabled={!!user}
              />
            </div>
            <div>
              <Label htmlFor="author-email">Email *</Label>
              <Input
                id="author-email"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="Your email"
                required
                disabled={!!user}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="comment-content">Comment *</Label>
            <Textarea
              id="comment-content"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" disabled={!newComment.trim() || !authorName.trim() || !authorEmail.trim()}>
            Post Comment
          </Button>
        </form>
        
        {/* Comments List */}
        <div>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div>
              {comments
                .filter(comment => !comment.parent_id)
                .map(comment => renderComment(comment))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogComments;
