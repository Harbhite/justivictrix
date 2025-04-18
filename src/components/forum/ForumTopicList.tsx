
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { 
  MessageSquare, 
  Eye, 
  Clock, 
  Pin, 
  Lock,
  Search
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Topic {
  id: string;
  title: string;
  user_id: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
  postCount?: number;
  user?: {
    username?: string;
    full_name?: string;
  };
}

interface ForumTopicListProps {
  categoryId: string;
}

const ForumTopicList: React.FC<ForumTopicListProps> = ({ categoryId }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!categoryId) return;

    const fetchTopics = async () => {
      try {
        // Fetch topics for this category
        let query = supabase
          .from("forum_topics")
          .select(`
            *,
            user:user_id (
              username:profiles(username),
              full_name:profiles(full_name)
            )
          `)
          .eq("category_id", categoryId)
          .order("is_pinned", { ascending: false })
          .order("created_at", { ascending: false });

        const { data: topicsData, error: topicsError } = await query;

        if (topicsError) {
          console.error("Error fetching topics:", topicsError);
          return;
        }

        // For each topic, count the number of posts
        const topicsWithCounts = await Promise.all(
          topicsData.map(async (topic) => {
            const { count, error } = await supabase
              .from("forum_posts")
              .select("*", { count: "exact" })
              .eq("topic_id", topic.id);

            return {
              ...topic,
              postCount: count || 0,
              user: {
                username: topic.user?.username?.username,
                full_name: topic.user?.full_name?.full_name
              }
            };
          })
        );

        setTopics(topicsWithCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, [categoryId]);

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <Skeleton className="h-10 w-full" />
        </div>
        {[1, 2, 3].map((n) => (
          <Card key={n} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search topics..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTopics.length === 0 ? (
        <div className="text-center py-10">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <h3 className="text-lg font-medium text-gray-700">No topics found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery ? "Try a different search term" : "Be the first to create a topic in this category"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/forum/topic/${topic.id}`}
              className="block"
            >
              <Card className="p-4 hover:border-gray-400 transition-all hover:shadow-sm">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      {topic.is_pinned && <Pin size={14} className="text-amber-500" />}
                      {topic.is_locked && <Lock size={14} className="text-red-500" />}
                      {topic.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                      Started by{" "}
                      <span className="font-medium">
                        {topic.user?.username || topic.user?.full_name || "Anonymous"}
                      </span>
                      {" • "}
                      <span className="flex items-center gap-1 inline-flex">
                        <Clock size={14} />
                        {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {topic.postCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {topic.views}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumTopicList;
