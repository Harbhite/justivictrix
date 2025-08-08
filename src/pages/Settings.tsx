import { useEffect, useState } from "react";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Smartphone, Shield, Palette } from "lucide-react";
import NotificationManager from "@/components/NotificationManager";
import ProfileEditor from "@/components/profile/ProfileEditor";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Settings = () => {
  const { user } = useAuth();
  const [pwaBannerEnabled, setPwaBannerEnabled] = useState(true);
  useEffect(() => {
    const pref = localStorage.getItem('pwaBannerEnabled');
    if (pref === 'false') setPwaBannerEnabled(false);
  }, []);

  useMetaTags({
    title: "Settings - LLB28 Hub",
    description: "Manage your account settings, notifications, and preferences for LLB28 Hub.",
    image: "/og-image.png",
    type: "website"
  });

  const clearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Cache cleared successfully");
  };

  const exportData = async () => {
    if (!user) return;

    try {
      // Export user's data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: blogPosts } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("author_id", user.id);

      const exportData = {
        profile: profileData,
        blogPosts: blogPosts,
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `llb28-hub-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <ProfileEditor />
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <NotificationManager />
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of LLB28 Hub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mobile Settings */}
          <TabsContent value="mobile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Settings
                </CardTitle>
                <CardDescription>
                  Optimize your mobile experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Progressive Web App (PWA)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Install LLB28 Hub on your mobile device for a native app experience
                    </p>
                    <Button variant="outline" onClick={() => {
                      toast.info("Look for the 'Add to Home Screen' option in your browser menu");
                    }}>
                      Install App
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Show PWA Install Banner</h3>
                      <p className="text-sm text-muted-foreground">Control whether the install prompt appears.</p>
                    </div>
                    <Switch
                      checked={pwaBannerEnabled}
                      onCheckedChange={(checked) => {
                        setPwaBannerEnabled(checked);
                        localStorage.setItem('pwaBannerEnabled', checked ? 'true' : 'false');
                        toast.success(`PWA banner ${checked ? 'enabled' : 'disabled'}`);
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Offline Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Some features work offline when you have a poor connection
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Pull to Refresh</h3>
                    <p className="text-sm text-muted-foreground">
                      Pull down on mobile to refresh content
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Data Export</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download a copy of all your data
                    </p>
                    <Button variant="outline" onClick={exportData}>
                      Export My Data
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Clear Cache</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clear stored data to free up space
                    </p>
                    <Button variant="outline" onClick={clearCache}>
                      Clear Cache
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Search Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      We collect anonymous search data to improve our search functionality
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;