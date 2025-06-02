
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const People = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const placeholderAvatars = [
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    "https://images.unsplash.com/photo-1441057206919-63d19fac2369"
  ];

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
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              LLB28 <span className="font-normal">members</span>
            </h1>
          </div>
          <h2 className="text-2xl font-light text-gray-700 mb-2">
            to connect and network
          </h2>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-8">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </motion.div>

        {/* Members List */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredMembers?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white rounded-lg p-6 hover:shadow-md transition-all cursor-pointer border border-gray-100"
                onClick={() => navigate(`/people/${member.id}`)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage 
                      src={member.avatar_url || placeholderAvatars[index % placeholderAvatars.length]} 
                      alt={member.name} 
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {member.post_held ? member.post_held : member.matric_number}
                    </p>
                  </div>
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
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No members found</h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
