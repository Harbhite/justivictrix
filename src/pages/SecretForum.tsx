
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquareText, Lock, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ForumCategoryList from "@/components/forum/ForumCategoryList";
import AccessCodeEntry from "@/components/forum/AccessCodeEntry";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SecretForum = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth");
      return;
    }

    const checkAccess = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("forum_user_access")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking forum access:", error);
        }

        setHasAccess(!!data);
        setLoading(false);
      } catch (error) {
        console.error("Error checking forum access:", error);
        setLoading(false);
      }
    };

    checkAccess();
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

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquareText className="h-8 w-8" />
          Secret Forum
        </h1>
        <p className="text-gray-600 mt-2">
          A private space for LLB28 members to discuss topics and share knowledge.
        </p>
      </div>

      {!hasAccess ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={20} />
              Access Required
            </CardTitle>
            <CardDescription>
              This forum requires a special access code to enter. 
              Please enter your access code below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccessCodeEntry onAccessGranted={() => setHasAccess(true)} />
          </CardContent>
        </Card>
      ) : (
        <ForumCategoryList />
      )}
    </div>
  );
};

export default SecretForum;
