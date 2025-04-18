
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, RefreshCw } from "lucide-react";

interface AnonymousSettingsProps {
  userId: string;
}

const AnonymousSettings: React.FC<AnonymousSettingsProps> = ({ userId }) => {
  const [hasAnonymousToken, setHasAnonymousToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generatingToken, setGeneratingToken] = useState(false);

  useEffect(() => {
    const checkAnonymousToken = async () => {
      try {
        const { data, error } = await supabase
          .from("forum_anonymous_tokens")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking anonymous token:", error);
        }

        setHasAnonymousToken(!!data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    checkAnonymousToken();
  }, [userId]);

  const generateAnonymousToken = async () => {
    if (generatingToken) return;
    setGeneratingToken(true);

    try {
      // Delete any existing token
      if (hasAnonymousToken) {
        await supabase
          .from("forum_anonymous_tokens")
          .delete()
          .eq("user_id", userId);
      }

      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
                    
      // Set expiry to 30 days from now
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      // Insert the new token
      const { error } = await supabase
        .from("forum_anonymous_tokens")
        .insert({
          user_id: userId,
          token,
          expires_at: expiryDate.toISOString()
        });

      if (error) throw error;

      setHasAnonymousToken(true);
      toast.success("Anonymous posting enabled", {
        description: "You can now post anonymously in topics and replies"
      });
    } catch (error) {
      console.error("Error generating anonymous token:", error);
      toast.error("Failed to enable anonymous posting");
    } finally {
      setGeneratingToken(false);
    }
  };

  const disableAnonymousToken = async () => {
    if (generatingToken) return;
    setGeneratingToken(true);

    try {
      // Delete the token
      const { error } = await supabase
        .from("forum_anonymous_tokens")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      setHasAnonymousToken(false);
      toast.success("Anonymous posting disabled");
    } catch (error) {
      console.error("Error disabling anonymous token:", error);
      toast.error("Failed to disable anonymous posting");
    } finally {
      setGeneratingToken(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Anonymous Posting</CardTitle>
          <CardDescription>
            Enable or disable anonymous posting in the forum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Anonymous Posting
        </CardTitle>
        <CardDescription>
          Hide your identity when posting in the forum
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="anonymous-posting">Enable anonymous posting</Label>
            <div className="text-sm text-gray-500">
              Your identity will be hidden when you choose to post anonymously
            </div>
          </div>
          <Switch
            id="anonymous-posting"
            checked={hasAnonymousToken}
            onCheckedChange={hasAnonymousToken ? disableAnonymousToken : generateAnonymousToken}
            disabled={generatingToken}
          />
        </div>

        {hasAnonymousToken && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm">
              <p className="text-yellow-800">
                When anonymous posting is enabled, you'll have the option to post anonymously
                when creating topics or replies. Your identity will be completely hidden from
                other users.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={generateAnonymousToken}
              disabled={generatingToken}
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate Anonymous Token
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnonymousSettings;
