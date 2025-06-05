
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProfileEditor from "@/components/profile/ProfileEditor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/");
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-8">
          <TabsTrigger value="profile" className="flex-1">Profile Information</TabsTrigger>
          <TabsTrigger value="account" className="flex-1">Account Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="bg-white p-6 rounded-lg border-4 border-black shadow-lg">
            <ProfileEditor />
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="bg-white p-6 rounded-lg border-4 border-black shadow-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Account Information</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Member since:</span> {new Date(user?.created_at || "").toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Password</h2>
                <Button className="w-full">Change Password</Button>
              </div>
              
              <div className="pt-4 border-t">
                <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
                <Button variant="destructive" className="w-full">Delete Account</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
