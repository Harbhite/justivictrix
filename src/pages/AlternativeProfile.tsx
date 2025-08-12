
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Heart, ThumbsUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AlternativeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: member, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      
      const numberId = parseInt(id);
      if (isNaN(numberId)) throw new Error("Invalid ID format");

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", numberId)
        .single();

      if (error) {
        toast.error("Failed to load member profile");
        throw error;
      }

      return data;
    },
  });

  useMetaTags({
    title: `${member?.name || "Member"} Profile - LLB28 Hub`,
    description: `View the detailed profile of ${member?.name || "law student"} including their position, bio, and academic information at LLB28 Hub.`,
    image: member?.avatar_url || "/og-image.png",
    type: "website"
  });

  // Mock data for connections (in a real app, this would come from the database)
  const connections = [
    { name: "Marcella Bauch", username: "@p.marcella", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { name: "Gerardo McClure", username: "@mc.gerardo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-800 p-4">
        <div className="max-w-sm mx-auto animate-pulse">
          <div className="h-8 bg-green-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-40 bg-green-700 rounded-3xl"></div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-green-700 rounded-2xl"></div>
              <div className="h-20 bg-green-700 rounded-2xl"></div>
              <div className="h-20 bg-green-700 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Member not found</h2>
          <button
            onClick={() => navigate('/people')}
            className="flex items-center gap-2 mx-auto text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft size={20} />
            Back to People
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-800 animate-fade-in-fast">
      <div className="max-w-sm mx-auto bg-green-800 min-h-screen relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={() => navigate('/people')}
            className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src={member.avatar_url || `https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face`} 
              alt={member.name} 
            />
            <AvatarFallback className="bg-yellow-400 text-green-800 text-sm font-semibold">
              {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="px-4 pb-20">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-wider">
              {member.name.replace(' ', '\n')}
            </h1>
            <p className="text-green-200 text-sm mb-4">
              {member.post_held || "Law Student"} / Legal Scholar
            </p>

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="bg-yellow-400 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                OPENTOWORK
              </span>
              <button className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <Star size={16} className="text-white" />
              </button>
              <button className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </button>
              <button className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <ThumbsUp size={16} className="text-white" />
              </button>
            </div>

            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src={member.avatar_url || `https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&crop=face`}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-white text-xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">242</p>
                <p className="text-gray-600 text-sm">Branding</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">46</p>
                <p className="text-gray-600 text-sm">Criminal Law</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">125</p>
                <p className="text-gray-600 text-sm">Research</p>
              </div>
            </div>
          </motion.div>

          {/* Connections Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">Connections</h2>
              <button className="text-green-300 text-sm hover:text-green-200">
                View all →
              </button>
            </div>
            
            <div className="space-y-3">
              {connections.map((connection, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                      <AvatarFallback className="bg-yellow-400 text-green-800 text-sm">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm">{connection.name}</p>
                      <p className="text-green-300 text-xs">{connection.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 text-xs">TOP</span>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <ArrowLeft size={12} className="text-green-800 rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-4">
            <button className="w-full bg-yellow-400 text-green-800 py-3 px-6 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors">
              Hire me
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-xs uppercase tracking-wider">HIRED</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="w-8 h-8">
                  <AvatarImage src={`https://images.unsplash.com/photo-150700321${i}169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face`} />
                  <AvatarFallback className="bg-green-700 text-white text-xs">U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeProfile;
