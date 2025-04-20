
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import BlogEditorComponent from "@/components/blog/BlogEditor";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, requireAuth } = useAuth();
  
  // Check if the user is authenticated
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  // If not authenticated, don't render the editor
  if (!user) {
    toast.error("You must be logged in to create or edit blog posts");
    return null;
  }

  const postId = id ? parseInt(id) : undefined;
  const isEditing = !!postId;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Blog
      </button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      
      <div className="bg-white p-6 rounded-lg border-4 border-black shadow-lg">
        <BlogEditorComponent postId={postId} />
      </div>
    </div>
  );
};

export default BlogEditorPage;
