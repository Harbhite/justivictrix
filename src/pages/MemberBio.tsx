
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Settings, ExternalLink, Activity, BarChart3, Route, Clock, Dumbbell, Book, Home, Users, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-sm mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-24 bg-gray-200 rounded-3xl"></div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-200 rounded-2xl"></div>
              <div className="h-16 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Member not found</h2>
          <button
            onClick={() => navigate('/people')}
            className="flex items-center gap-2 mx-auto text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft size={20} />
            Back to People
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={() => navigate('/people')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Member Bio</h1>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="px-4 pb-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage 
                  src={member.avatar_url || `https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face`} 
                  alt={member.name} 
                />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                <p className="text-gray-500 text-sm">Students' Bar Association, University of Ibadan</p>
                <p className="text-gray-500 text-xs">Member, Law Students' Society</p>
              </div>
            </div>
            
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Projects</p>
                <p className="text-lg font-bold text-gray-900">24</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-lg font-bold text-gray-900">10 Yrs</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-lg font-bold text-gray-900">45.8k</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                Hire
              </button>
              <button 
                onClick={() => navigate(`/people/${id}`)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ExternalLink size={20} className="text-gray-700" />
              </button>
            </div>
          </motion.div>

          {/* Law Courses Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Law Courses Majoring in</h3>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Book size={24} className="text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Criminal Law</h4>
                <p className="text-sm text-gray-500 mb-1">Criminal law and procedure | 2023 - Present</p>
                <p className="text-xs text-gray-400">www.lawstudents.org</p>
              </div>
              
              <button 
                onClick={() => navigate('/courses')}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Explore
              </button>
            </div>
          </motion.div>

          {/* Bio Section */}
          {member.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
            </motion.div>
          )}

          {/* Additional Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Route size={20} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Courses</p>
                  <p className="text-sm text-gray-500">Current semester</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>

            <button 
              onClick={() => navigate('/timetable')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Study Time</p>
                  <p className="text-sm text-gray-500">Show all</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>

            <button 
              onClick={() => navigate('/resources')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Dumbbell size={20} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Resources</p>
                  <p className="text-sm text-gray-500">Notes, PDFs: 3000+ files</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Activity size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Academic Records</p>
                  <p className="text-sm text-gray-500">Matric: {member.matric_number}</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <BarChart3 size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gender</p>
                  <p className="text-sm text-gray-500">{member.gender}</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="bg-black mx-4 mb-4 rounded-3xl p-3">
            <div className="flex justify-around items-center">
              <button 
                onClick={() => navigate('/')}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              >
                <Home size={20} className="text-black" />
              </button>
              <button 
                onClick={() => navigate('/people')}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Users size={16} className="text-white" />
              </button>
              <button 
                onClick={() => navigate('/events')}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Calendar size={16} className="text-white" />
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <User size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberBio;
