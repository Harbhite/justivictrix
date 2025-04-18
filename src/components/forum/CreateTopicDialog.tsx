
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateTopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
}

const CreateTopicDialog: React.FC<CreateTopicDialogProps> = ({ 
  open, 
  onOpenChange, 
  categoryId 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [useAnonymous, setUseAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a topic");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user has anonymous token
      let anonymousUserId = null;
      
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

      // Create the topic
      const { data: topicData, error: topicError } = await supabase
        .from("forum_topics")
        .insert({
          title,
          category_id: categoryId,
          user_id: useAnonymous ? null : user.id
        })
        .select()
        .single();

      if (topicError) {
        throw topicError;
      }

      // Create the first post (initial content)
      const { error: postError } = await supabase
        .from("forum_posts")
        .insert({
          content,
          topic_id: topicData.id,
          user_id: useAnonymous ? null : user.id
        });

      if (postError) {
        throw postError;
      }

      // Clear form
      setTitle("");
      setContent("");
      setUseAnonymous(false);
      
      // Close dialog
      onOpenChange(false);
      
      // Navigate to the new topic
      navigate(`/forum/topic/${topicData.id}`);
      
      toast.success("Topic created successfully");
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error("Failed to create topic");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            Start a new discussion in this category.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Initial Post</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={6}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={useAnonymous} 
                onCheckedChange={handleCheckAnonymous}
              />
              <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                Post anonymously
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Topic"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
