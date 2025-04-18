
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CreatePostFormProps {
  topicId: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ topicId }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [useAnonymous, setUseAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Please enter your reply");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to reply");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user has anonymous token if posting anonymously
      if (useAnonymous) {
        const { data: anonData } = await supabase
          .from("forum_anonymous_tokens")
          .select("*")
          .eq("user_id", user.id)
          .single();
          
        if (!anonData) {
          toast.error("You don't have an anonymous token");
          setIsSubmitting(false);
          return;
        }
      }

      // Create the post
      const { error } = await supabase
        .from("forum_posts")
        .insert({
          content,
          topic_id: topicId,
          user_id: useAnonymous ? null : user.id
        });

      if (error) {
        throw error;
      }

      // Give user reputation points if not anonymous
      if (!useAnonymous) {
        // First check if user has a reputation record
        const { data: repData } = await supabase
          .from("user_reputation")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (repData) {
          // Update existing reputation
          await supabase
            .from("user_reputation")
            .update({ reputation_points: repData.reputation_points + 5 })
            .eq("user_id", user.id);
        } else {
          // Create new reputation record
          await supabase
            .from("user_reputation")
            .insert({ user_id: user.id, reputation_points: 5 });
        }
      }

      // Clear form
      setContent("");
      setUseAnonymous(false);
      
      toast.success("Reply posted successfully");
      
      // Refresh to show the new post
      window.location.reload();
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckAnonymous = async () => {
    if (!user) return;
    
    // Check if user has anonymous token before allowing toggling
    if (!useAnonymous) {
      const { data, error } = await supabase
        .from("forum_anonymous_tokens")
        .select("*")
        .eq("user_id", user.id)
        .single();
        
      if (!data) {
        toast.error(
          "You need to enable anonymous posting in your forum settings first", 
          { description: "Go to Forum Settings > Anonymous tab to set up" }
        );
        return;
      }
    }
    
    setUseAnonymous(!useAnonymous);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply here..."
        rows={5}
      />
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="reply-anonymous" 
          checked={useAnonymous} 
          onCheckedChange={handleCheckAnonymous}
        />
        <Label htmlFor="reply-anonymous" className="font-normal cursor-pointer">
          Post anonymously
        </Label>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Reply"}
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
