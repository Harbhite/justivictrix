
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const People = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useMetaTags({
    title: "LLB28 Members - Law Student Community",
    description: "Connect and network with fellow LLB28 law students. Browse member profiles and build professional relationships.",
    image: "/og-image.png",
    type: "website"
  });

  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        toast.error("Failed to load members");
        throw error;
      }

      return data || [];
    },
  });

  const filteredMembers = members?.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.matric_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.post_held && member.post_held.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Blue circle icon */}
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            LLB28 members
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            to connect and network
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </motion.div>

        {/* Members List */}
        <div className="max-w-md mx-auto space-y-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-4 animate-pulse border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded-full flex-1"></div>
                  <div className="h-8 bg-muted rounded-full flex-1"></div>
                  <div className="h-8 bg-muted rounded-full flex-1"></div>
                </div>
              </div>
            ))
          ) : (
            filteredMembers?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow"
              >
                {/* Member Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar_url} alt={member.name} />
                    <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.matric_number}
                    </p>
                  </div>
                </div>

                {/* Profile View Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/member/${member.id}`)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors font-medium"
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => navigate(`/alternative-profile/${member.id}`)}
                    className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors font-medium"
                  >
                    Alternative
                  </button>
                  <button
                    onClick={() => navigate(`/full-profile/${member.id}`)}
                    className="flex-1 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors font-medium"
                  >
                    Full
                  </button>
                </div>
              </motion.div>
            ))
          )}

          {filteredMembers?.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
