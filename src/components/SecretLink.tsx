
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const SecretLink = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button variant="ghost" asChild className="gap-2">
      <a href="/secret-forum" target="_blank" rel="noopener noreferrer">
        <Lock size={16} />
        Forum
      </a>
    </Button>
  );
};

export default SecretLink;
