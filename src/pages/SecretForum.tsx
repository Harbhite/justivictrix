
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ForumHub from "@/components/forum/ForumHub";
import { toast } from "sonner";

const SecretForum = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth");
      return;
    }
    
    // Check if we need to redirect from access code
    const checkRedirectFromAccess = async () => {
      if (!user) return;
      
      // Create access for the user if they don't have it yet
      try {
        const { data, error } = await supabase
          .from("forum_user_access")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (error && error.code !== "PGRST116") {
          console.error("Error checking forum access:", error);
        }
        
        // If user doesn't have access yet, create it
        if (!data) {
          await supabase
            .from("forum_user_access")
            .insert([{ user_id: user.id }]);
        }
      } catch (error) {
        console.error("Error granting forum access:", error);
      }
    };
    
    checkRedirectFromAccess();
  }, [user, isLoading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <ForumHub />;
};

export default SecretForum;
