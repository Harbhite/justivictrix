
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquareText, ChevronLeft, Eye, Clock, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ForumPostList from "@/components/forum/ForumPostList";
import CreatePostForm from "@/components/forum/CreatePostForm";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const ForumTopic = () => {
  const { topicId } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth");
      return;
    }

    const checkAccess = async () => {
      if (!user || !topicId) return;

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

        // Fetch the topic first
        const { data: fetchedTopicData, error: topicError } = await supabase
          .from("forum_topics")
          .select("*")
          .eq("id", topicId)
          .single();

        if (topicError) {
          console.error("Error fetching topic:", topicError);
          navigate("/secret-forum");
          return;
        }

        // Increment view count
        await supabase
          .from("forum_topics")
          .update({ views: (fetchedTopicData.views || 0) + 1 })
          .eq("id", topicId);

        // Fetch the category
        const { data: categoryData, error: categoryError } = await supabase
          .from("forum_categories")
          .select("*")
          .eq("id", fetchedTopicData.category_id)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
        }

        setTopic(fetchedTopicData);
        setCategory(categoryData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    checkAccess();
  }, [topicId, user, isLoading, navigate]);

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
      <div className="mb-6">
        <Link 
          to={`/forum/category/${category?.slug}`} 
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {category?.name}
        </Link>
        
        <div className="bg-white shadow rounded-lg p-6 mb-4">
          <h1 className="text-2xl font-bold">{topic?.title}</h1>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {topic?.views} views
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {topic?.created_at && formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <ForumPostList topicId={topic?.id} />
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Reply size={18} />
            Reply to this Topic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePostForm topicId={topic?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumTopic;
