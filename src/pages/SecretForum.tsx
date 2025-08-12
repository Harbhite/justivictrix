
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMetaTags } from "@/hooks/useMetaTags";
import ForumHub from "@/components/forum/ForumHub";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AccessCodeEntry from "@/components/forum/AccessCodeEntry";

const SecretForum = () => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const { user, isLoading } = useAuth();

  useMetaTags({
    title: "Secret Forum - LLB28 Hub",
    description: "Access the exclusive LLB28 Hub community forum. Connect with fellow law students in private discussions and academic collaboration.",
    image: "/og-image.png",
    type: "website"
  });

  useEffect(() => {
    // Don't check access until auth is loaded
    if (isLoading) return;

    if (!user) {
      setLoading(false);
      setHasAccess(false);
      setCheckingAccess(false);
      return;
    }

    const checkAccess = async () => {
      setCheckingAccess(true);
      const { data } = await supabase
        .from("forum_user_access")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setHasAccess(!!data);
      setLoading(false);
      setCheckingAccess(false);
    };

    checkAccess();
  }, [user, isLoading]);

  if (loading || checkingAccess) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gradient-soft animate-fade-in-fast">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  // If not logged in, tell user to sign in (Forum is private)
  if (!user) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 flex flex-col items-center min-h-screen bg-gradient-soft animate-fade-in-fast">
        <h2 className="text-2xl font-bold mb-4">Forum Private</h2>
        <p className="mb-6 text-gray-600 text-center">
          You must be signed in to access the secret Community Forum.
        </p>
        <a
          href="/auth"
          className="bg-law-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-black transition"
        >
          Sign in
        </a>
      </div>
    );
  }

  // If no access, show access code entry
  if (!hasAccess) {
    return (
      <div className="container max-w-md mx-auto px-4 py-16 flex flex-col items-center min-h-screen bg-gradient-soft animate-fade-in-fast">
        <h2 className="text-2xl font-bold mb-4">Get Forum Access</h2>
        <p className="mb-6 text-gray-600 text-center">
          The Community Forum is reserved for members only. Click below to get instant access.
        </p>
        <AccessCodeEntry onAccessGranted={() => setHasAccess(true)} />
      </div>
    );
  }

  // If access exists, show the forum hub
  return <ForumHub />;
};

export default SecretForum;

