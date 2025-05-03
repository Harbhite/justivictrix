
import { useState } from "react";
import { toast } from "sonner";
import ForumHub from "@/components/forum/ForumHub";

const PublicForum = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return <ForumHub />;
};

export default PublicForum;
