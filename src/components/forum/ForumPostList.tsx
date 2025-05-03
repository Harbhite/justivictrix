import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { User, ThumbsUp, Award, Flag, MoreVertical } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Post {
  id: string;
  content: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  is_solution: boolean;
  topic_id: string;
  user?: {
    username?: string;
    full_name?: string;
  };
  isAnonymous?: boolean;
  isGuest?: boolean;
  guestName?: string;
}

interface ForumPostListProps {
  topicId: string;
}

const ForumPostList: React.FC<ForumPostListProps> = ({ topicId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!topicId) return;

    const fetchPosts = async () => {
      try {
        // Fetch posts for this topic
        const { data: postsData, error: postsError } = await supabase
          .from("forum_posts")
          .select("*")
          .eq("topic_id", topicId)
          .order("created_at", { ascending: true });

        if (postsError) {
          console.error("Error fetching posts:", postsError);
          return;
        }

        // Process the posts to identify guest posts
        const processedPosts = postsData.map(post => {
          // Check if this is a guest post
          const guestMatch = post.content.match(/^\[Guest: (.+?)\] (.+)$/);
          
          if (!post.user_id && guestMatch) {
            return {
              ...post,
              isGuest: true,
              guestName: guestMatch[1],
              content: guestMatch[2],
            };
          }
          
          return {
            ...post,
            isGuest: false,
            guestName: "",
          };
        });
        
        // Fetch user profiles separately for authenticated users
        
        const postsWithUserDetails = await Promise.all(
          processedPosts.map(async (post) => {
            // Skip profile fetching for guest posts
            if (post.isGuest) return post;
            
            let username = "";
            let fullName = "";
            let isAnonymous = false;
            
            if (post.user_id) {
              // Check for anonymous token
              const { data: anonData } = await supabase
                .from("forum_anonymous_tokens")
                .select("*")
                .eq("user_id", post.user_id)
                .single();
                
              isAnonymous = !!anonData;
              
              // If not anonymous, fetch profile
              if (!isAnonymous) {
                const { data: profileData } = await supabase
                  .from("profiles")
                  .select("username, full_name")
                  .eq("id", post.user_id)
                  .single();
                
                if (profileData) {
                  username = profileData.username || "";
                  fullName = profileData.full_name || "";
                }
              }
            }
              
            return { 
              ...post,
              isAnonymous,
              user: {
                username,
                full_name: fullName
              }
            };
          })
        );

        setPosts(postsWithUserDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [topicId]);

  const markAsSolution = async (postId: string) => {
    if (!user) {
      toast.error("You must be logged in to mark a solution");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from("forum_posts")
        .update({ is_solution: true })
        .eq("id", postId)
        .select();

      if (error) {
        throw error;
      }

      // Update the local state
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, is_solution: true } : post
      ));

      toast.success("Post marked as solution");
    } catch (error) {
      console.error("Error marking as solution:", error);
      toast.error("Failed to mark post as solution");
    }
  };

  const reportPost = (postId: string) => {
    toast.info("Report submitted for review", {
      description: "Thank you for helping keep our community safe"
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((n) => (
          <Card key={n} className="overflow-hidden">
            <div className="border-b p-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
            <CardContent className="py-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-700">No replies yet</h3>
        <p className="text-gray-500 mt-1">Be the first to reply to this topic</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Card key={post.id} className={`overflow-hidden ${post.is_solution ? "border-green-400" : ""}`}>
          <div className="border-b p-4 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {post.isGuest 
                    ? `Guest: ${post.guestName}`
                    : (post.isAnonymous 
                        ? "Anonymous User" 
                        : post.user?.username || post.user?.full_name || "Unknown User")}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {post.is_solution && (
                <div className="bg-green-100 text-green-800 flex items-center gap-1 px-2 py-1 rounded text-xs font-medium">
                  <Award size={14} />
                  Solution
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!post.is_solution && index > 0 && user && (
                    <DropdownMenuItem onClick={() => markAsSolution(post.id)}>
                      <Award className="h-4 w-4 mr-2" />
                      Mark as Solution
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => reportPost(post.id)}>
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <CardContent className="py-4 whitespace-pre-wrap">
            {post.content}
          </CardContent>
          
          <CardFooter className="border-t bg-gray-50 py-2 px-4">
            <div className="ml-auto">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Upvote
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ForumPostList;
