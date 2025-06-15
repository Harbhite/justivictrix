
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User } from "lucide-react";

interface Microblog {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export default function ForumMicroblogFeed() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [feed, setFeed] = useState<Microblog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch microblog posts
  useEffect(() => {
    fetchFeed();
    // Optionally poll for updates, or use Supabase Realtime
    // For now, just manual reload on post
  }, []);

  const fetchFeed = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("forum_microblogs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(40);
    if (error) {
      toast.error("Failed to load microblog feed");
      setFeed([]);
    } else {
      setFeed(data || []);
    }
    setLoading(false);
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("You can't post an empty message!");
      return;
    }
    setIsPosting(true);
    const { error } = await supabase.from("forum_microblogs").insert({
      user_id: user?.id,
      content: content.trim()
    });
    if (error) {
      toast.error("Failed to post");
    } else {
      setContent("");
      toast.success("Posted!");
      await fetchFeed();
    }
    setIsPosting(false);
  };

  // Optionally: Show user info with each post (just id, or resolve username if you want)
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
        <h3 className="font-bold mb-2 text-lg">Share something with the community!</h3>
        <form onSubmit={handlePost} className="flex gap-2 items-start">
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1"
            value={content}
            disabled={isPosting}
            onChange={e => setContent(e.target.value)}
            maxLength={240}
          />
          <Button type="submit" disabled={!user || isPosting || !content.trim()} className="shrink-0">
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </form>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2 tracking-wide">Recent Posts</h4>
        {loading ? (
          <div className="text-center text-gray-400 py-4">Loading...</div>
        ) : feed.length === 0 ? (
          <div className="text-center text-gray-400 py-6">No posts yet. Be the first!</div>
        ) : (
          <ul className="space-y-3">
            {feed.map(post => (
              <li key={post.id} className="border rounded-lg p-3 bg-gray-50 flex gap-3 items-start">
                <div className="pt-1">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-700 break-words">{post.content}</div>
                  <div className="text-xs text-gray-500 pt-1">{new Date(post.created_at).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
