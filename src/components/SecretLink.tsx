
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const SecretLink = () => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(true); // Default to true to make forum accessible

  useEffect(() => {
    if (!user) return;

    const checkAccess = async () => {
      try {
        const { data, error } = await supabase
          .from("forum_user_access")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking forum access:", error);
        }

        setHasAccess(true); // Always set to true to make forum accessible
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAccess();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Button variant="ghost" asChild className="gap-2">
      <Link to="/secret-forum">
        <Lock size={16} />
        Forum
      </Link>
    </Button>
  );
};

export default SecretLink;
