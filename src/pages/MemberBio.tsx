
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, User, Star, Briefcase, Users, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const MemberBio = () => {
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

  // Placeholder data for the stats
  const [stats] = useState({
    projects: 24,
    experience: "10 Years Exp",
    followers: "45.8k"
  });

  // Placeholder data for work experience
  const [workExperience] = useState({
    company: "Law Students Association",
    role: member?.post_held || "Member",
    period: "2023 - Present",
    website: "www.lawstudents.org"
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-2xl font-bold text-center">Member not found</p>
        <button
          onClick={() => navigate('/people')}
          className="mt-4 flex items-center gap-2 mx-auto text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft size={16} />
          Back to People
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => navigate('/people')}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8"
      >
        <ArrowLeft size={16} />
        Back to People
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture & Hire Button */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  {member.avatar_url ? (
                    <img 
                      src={member.avatar_url} 
                      alt={member.name}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User size={40} className="text-gray-400" />
                  )}
                </div>
                <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors">
                  Hire
                </button>
              </div>

              {/* Bio Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">{member.name}</h1>
                <p className="text-gray-600 mb-4">{member.post_held || "Law Student"}</p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-500" />
                    <span className="text-sm">{stats.projects} Projects</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2">
                    <Star size={16} className="text-gray-500" />
                    <span className="text-sm">{stats.experience}</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm">{stats.followers} Followers</span>
                  </div>
                </div>
                
                {/* Contact Button */}
                <button 
                  onClick={() => navigate(`/people/${id}`)}
                  className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={24} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Work Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Work Experience</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Briefcase size={28} className="text-gray-500" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold">{workExperience.company}</h3>
                <p className="text-gray-600 mb-1">{workExperience.role} | {workExperience.period}</p>
                <p className="text-gray-500">{workExperience.website}</p>
              </div>
              
              <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
                Explore
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bio Card */}
        {member.bio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberBio;
