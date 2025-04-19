
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";

interface AccessCodeEntryProps {
  onAccessGranted: () => void;
}

const AccessCodeEntry: React.FC<AccessCodeEntryProps> = ({ onAccessGranted }) => {
  const { user } = useAuth();
  const [accessCode, setAccessCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to access the forum");
      return;
    }

    setIsSubmitting(true);

    try {
      // Grant access to the forum for all authenticated users
      const { error: accessError } = await supabase
        .from("forum_user_access")
        .insert({
          user_id: user.id,
          access_code_id: '00000000-0000-0000-0000-000000000000' // Default access code ID
        });

      if (accessError) {
        if (accessError.code === "23505") { // Unique violation
          toast.error("You already have access to the forum");
        } else {
          throw accessError;
        }
      } else {
        // Initialize user reputation
        const { data: existingRep } = await supabase
          .from("user_reputation")
          .select("*")
          .eq("user_id", user.id);
          
        if (!existingRep || existingRep.length === 0) {
          await supabase
            .from("user_reputation")
            .insert({
              user_id: user.id,
              reputation_points: 0,
              level: 1
            });
        }
          
        toast.success("Access granted to the forum");
        onAccessGranted();
      }
    } catch (error) {
      console.error("Error granting access:", error);
      toast.error("Failed to grant forum access");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Granting access..." : "Access Forum"}
        </Button>
      </div>
    </form>
  );
};

export default AccessCodeEntry;
