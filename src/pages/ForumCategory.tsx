
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquareText, Plus, ChevronLeft } from "lucide-react";
import ForumTopicList from "@/components/forum/ForumTopicList";
import CreateTopicDialog from "@/components/forum/CreateTopicDialog";

const ForumCategory = () => {
  const { categorySlug } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth");
      return;
    }

    const checkAccess = async () => {
      if (!user) return;

      try {
        const { data: accessData, error: accessError } = await supabase
          .from("forum_user_access")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (!accessData || accessError) {
          toast.error("You don't have access to the forum");
          navigate("/secret-forum");
          return;
        }

        const { data, error } = await supabase
          .from("forum_categories")
          .select("*")
          .eq("slug", categorySlug)
          .single();

        if (error) {
          console.error("Error fetching category:", error);
          navigate("/secret-forum");
          return;
        }

        setCategory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    checkAccess();
  }, [categorySlug, user, isLoading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Link 
        to="/secret-forum" 
        className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Categories
      </Link>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquareText className="h-7 w-7" />
            {category?.name}
          </h1>
          {category?.description && (
            <p className="text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
        
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Topic
        </Button>
      </div>

      <ForumTopicList categoryId={category?.id} />
      
      <CreateTopicDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
        categoryId={category?.id} 
      />
    </div>
  );
};

export default ForumCategory;
