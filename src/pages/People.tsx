
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Download, FileType, ExternalLink, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const People = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const bioCardRef = useRef<HTMLDivElement>(null);

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

  const downloadBioCard = async () => {
    if (!bioCardRef.current || !selectedMember) return;
    
    try {
      const canvas = await html2canvas(bioCardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      const member = members?.find(m => m.id === selectedMember);
      a.download = `${member?.name.replace(/\s+/g, '_')}_bio_card.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Bio card downloaded as image');
    } catch (error) {
      toast.error('Failed to download bio card');
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Our People
        </h1>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, matric number, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="p-6 bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers?.map((member) => (
              <motion.div
                key={member.id}
                className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                onClick={() => setSelectedMember(member.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-24 h-24 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-4">
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-center text-law-neutral mb-2">{member.matric_number}</p>
                <p className="text-center font-medium">{member.gender}</p>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedMember !== null && members && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                ref={bioCardRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 hover:text-gray-700"
                >
                  <X size={24} />
                </button>

                {members && (
                  <div className="space-y-6">
                    <div className="w-32 h-32 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center">
                      {members.find((m) => m.id === selectedMember)?.avatar_url ? (
                        <img
                          src={members.find((m) => m.id === selectedMember)?.avatar_url || ''}
                          alt={members.find((m) => m.id === selectedMember)?.name}
                          className="w-28 h-28 rounded-full object-cover"
                        />
                      ) : (
                        <User size={48} />
                      )}
                    </div>

                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">
                        {members.find((m) => m.id === selectedMember)?.name}
                      </h2>
                      <p className="text-law-neutral mb-2">
                        {members.find((m) => m.id === selectedMember)?.matric_number}
                      </p>
                      <p className="font-medium">
                        {members.find((m) => m.id === selectedMember)?.gender}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                      <button
                        onClick={() => {
                          setSelectedMember(null);
                          navigate(`/people/${selectedMember}`);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Full Profile
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedMember(null);
                          navigate(`/member-bio/${selectedMember}`);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Modern Bio
                      </button>
                      
                      <button
                        onClick={downloadBioCard}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download Bio Card
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default People;
