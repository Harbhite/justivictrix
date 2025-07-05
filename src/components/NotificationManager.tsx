import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, BellOff, Settings } from "lucide-react";

interface NotificationPreferences {
  push_notifications: boolean;
  email_notifications: boolean;
  study_group_updates: boolean;
  forum_mentions: boolean;
  blog_updates: boolean;
}

const NotificationManager = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    push_notifications: true,
    email_notifications: true,
    study_group_updates: true,
    forum_mentions: true,
    blog_updates: false,
  });
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }

    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading preferences:", error);
        return;
      }

      if (data) {
        setPreferences({
          push_notifications: data.push_notifications,
          email_notifications: data.email_notifications,
          study_group_updates: data.study_group_updates,
          forum_mentions: data.forum_mentions,
          blog_updates: data.blog_updates,
        });
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (newPreferences: NotificationPreferences) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("notification_preferences")
        .upsert({
          user_id: user.id,
          ...newPreferences,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setPreferences(newPreferences);
      toast.success("Notification preferences updated");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error("Push notifications are not supported in this browser");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        toast.success("Push notifications enabled!");
        // Register service worker and get push subscription
        await registerServiceWorker();
      } else {
        toast.error("Push notifications denied");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast.error("Failed to enable push notifications");
    }
  };

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
      
      // You would typically send the registration to your backend here
      // to store the push subscription for sending notifications later
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  };

  const updatePreference = (key: keyof NotificationPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    savePreferences(newPreferences);
  };

  const sendTestNotification = () => {
    if (permission !== "granted") {
      toast.error("Push notifications not enabled");
      return;
    }

    new Notification("LLB28 Hub Test", {
      body: "Your notifications are working perfectly!",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
    });

    toast.success("Test notification sent!");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Manage how you receive notifications from LLB28 Hub
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive instant notifications in your browser
              </p>
            </div>
            {permission === "granted" ? (
              <Switch
                checked={preferences.push_notifications}
                onCheckedChange={(checked) => updatePreference("push_notifications", checked)}
              />
            ) : (
              <Button onClick={requestPermission} size="sm">
                Enable
              </Button>
            )}
          </div>

          {permission === "granted" && preferences.push_notifications && (
            <Button onClick={sendTestNotification} variant="outline" size="sm">
              Send Test Notification
            </Button>
          )}
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={preferences.email_notifications}
            onCheckedChange={(checked) => updatePreference("email_notifications", checked)}
          />
        </div>

        {/* Study Group Updates */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Study Group Updates</Label>
            <p className="text-sm text-muted-foreground">
              New messages and meetings in your study groups
            </p>
          </div>
          <Switch
            checked={preferences.study_group_updates}
            onCheckedChange={(checked) => updatePreference("study_group_updates", checked)}
          />
        </div>

        {/* Forum Mentions */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Forum Mentions</Label>
            <p className="text-sm text-muted-foreground">
              When someone mentions you in forum discussions
            </p>
          </div>
          <Switch
            checked={preferences.forum_mentions}
            onCheckedChange={(checked) => updatePreference("forum_mentions", checked)}
          />
        </div>

        {/* Blog Updates */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Blog Updates</Label>
            <p className="text-sm text-muted-foreground">
              New blog posts and featured articles
            </p>
          </div>
          <Switch
            checked={preferences.blog_updates}
            onCheckedChange={(checked) => updatePreference("blog_updates", checked)}
          />
        </div>

        {!isSupported && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <BellOff className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Push notifications are not supported in this browser
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationManager;