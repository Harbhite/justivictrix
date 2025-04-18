
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setUsername(data.username || "");
        setFullName(data.full_name || "");
      }
    };

    fetchProfile();
  }, [user, isLoading, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setIsSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated successfully");
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/");
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
