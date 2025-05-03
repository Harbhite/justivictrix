
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ForumLink = () => {
  return (
    <Button variant="ghost" asChild className="gap-2">
      <Link to="/secret-forum">
        <MessageSquare size={16} />
        Forum
      </Link>
    </Button>
  );
};

export default ForumLink;
