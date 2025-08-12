
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMetaTags } from "@/hooks/useMetaTags";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { Settings, User, Badge, Key, Shield, Users } from "lucide-react";
import UserBadges from "@/components/forum/UserBadges";
import AnonymousSettings from "@/components/forum/AnonymousSettings";

const ForumSettings = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [reputation, setReputation] = useState<any>(null);

  useMetaTags({
    title: "Forum Settings - LLB28 Hub",
    description: "Manage your forum preferences, profile settings, badges, and anonymous posting options in the LLB28 Hub community forum.",
    image: "/og-image.png",
    type: "website"
  });

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth");
      return;
    }

    const checkAccess = async () => {
      if (!user) return;

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

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        const { data: reputationData } = await supabase
          .from("user_reputation")
          .select("*")
          .eq("user_id", user.id)
          .single();

        setUserProfile(profileData);
        setReputation(reputationData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, isLoading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gradient-soft animate-fade-in-fast">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gradient-soft animate-fade-in-fast">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7" />
          Forum Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your forum preferences and profile settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User size={16} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-1">
            <Badge size={16} />
            <span className="hidden sm:inline">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="anonymous" className="flex items-center gap-1">
            <Shield size={16} />
            <span className="hidden sm:inline">Anonymous</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View your forum profile and reputation status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Username</h3>
                <div className="text-gray-700 p-2 bg-gray-50 rounded-md">
                  {userProfile?.username || user?.email?.split('@')[0]}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Email</h3>
                <div className="text-gray-700 p-2 bg-gray-50 rounded-md">
                  {user?.email}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Reputation</h3>
                <div className="flex items-center gap-2">
                  <div className="text-gray-700 p-2 bg-gray-50 rounded-md flex-1">
                    {reputation?.reputation_points || 0} points
                  </div>
                  <div className="text-gray-700 p-2 bg-gray-50 rounded-md">
                    Level {reputation?.level || 1}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges">
          <UserBadges userId={user?.id} />
        </TabsContent>
        
        <TabsContent value="anonymous">
          <AnonymousSettings userId={user?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumSettings;
