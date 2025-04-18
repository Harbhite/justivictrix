
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

const SecretLink = () => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

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

        setHasAccess(!!data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAccess();
  }, [user]);

  const handleClick = (e: React.MouseEvent) => {
    if (showSecret) return;
    
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setShowSecret(true);
    }
  };

  if (!user || (showSecret && !hasAccess)) {
    return null;
  }

  if (hasAccess) {
    return (
      <Link 
        to="/secret-forum" 
        className="flex items-center gap-1 text-sm font-medium hover:text-gray-900 transition-colors"
      >
        <Lock size={16} />
        Secret Forum
      </Link>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="p-1 cursor-pointer opacity-10 hover:opacity-20 transition-opacity"
      title={showSecret ? "Secret Forum" : undefined}
    >
      {showSecret ? (
        <Link 
          to="/secret-forum" 
          className="flex items-center gap-1 text-sm font-medium"
        >
          <Lock size={16} />
          Secret Forum
        </Link>
      ) : (
        <Lock size={16} />
      )}
    </div>
  );
};

export default SecretLink;
