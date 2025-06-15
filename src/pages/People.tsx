
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
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              LLB28 <span className="font-normal">members</span>
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700 mb-2">
            to connect and network
          </h2>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-6 sm:mt-8">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white text-base sm:text-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            // Loading skeleton - responsive grid
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 animate-pulse">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1 w-full">
                    <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-12"></div>
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
                className="bg-white rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 group"
              >
                <div className="flex flex-col space-y-4">
                  {/* Avatar and basic info */}
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                      <AvatarImage 
                        src={member.avatar_url || placeholderAvatars[index % placeholderAvatars.length]} 
                        alt={member.name} 
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-sm sm:text-base">
                        {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 truncate">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm truncate">
                        {member.post_held ? member.post_held : member.matric_number}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/member/${member.id}`)}
                      className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors text-center font-medium"
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => navigate(`/alternative-profile/${member.id}`)}
                      className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors text-center font-medium"
                    >
                      Alternative
                    </button>
                    <button
                      onClick={() => navigate(`/full-profile/${member.id}`)}
                      className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors text-center font-medium"
                    >
                      Full
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {filteredMembers?.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 sm:py-16"
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
