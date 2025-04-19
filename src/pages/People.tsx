import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Download, FileType, ExternalLink, Search, Users, Filter, Mail, MapPin, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl font-black text-law-dark mb-3 inline-block transform -rotate-1 border-b-4 border-law-primary pb-2">
              Our People
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Meet our talented members who make up the LLB28 community. Browse through profiles or search for specific individuals.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 md:mt-0 w-full md:w-auto"
          >
            <div className="relative flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name, matric or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-law-primary focus:outline-none focus:ring-2 focus:ring-law-primary/20 transition-all bg-white/80 backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Button variant="outline" className="ml-2 px-3 py-3 h-auto">
                <Filter size={18} />
              </Button>
            </div>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Card key={index} className="p-6 animate-pulse bg-white/60 backdrop-blur border-0 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card 
                  className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
                  onClick={() => setSelectedMember(member.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                            {member.avatar_url ? (
                              <AvatarImage src={member.avatar_url} alt={member.name} />
                            ) : (
                              <AvatarFallback className="bg-purple-100 text-purple-700">
                                <User size={24} />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.matric_number}</p>
                            {member.post_held && (
                              <div className="flex items-center gap-1 mt-1 text-sm text-purple-600">
                                <Briefcase size={14} />
                                <span>{member.post_held}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-600 hover:text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/people/${member.id}`);
                          }}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View Profile
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/member-bio/${member.id}`);
                          }}
                        >
                          <User size={16} className="mr-2" />
                          View Bio
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredMembers?.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users size={60} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No members found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedMember !== null && members && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                ref={bioCardRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full relative p-0 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors z-10"
                >
                  <X size={20} />
                </button>

                {members && (
                  <div className="relative px-6 pb-6 pt-20">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-32 h-32 border-4 border-white bg-white mb-4">
                        {members.find((m) => m.id === selectedMember)?.avatar_url ? (
                          <AvatarImage 
                            src={members.find((m) => m.id === selectedMember)?.avatar_url || ''} 
                            alt={members.find((m) => m.id === selectedMember)?.name} 
                          />
                        ) : (
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            <User size={48} />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <h2 className="text-2xl font-bold mb-1 text-center">
                        {members.find((m) => m.id === selectedMember)?.name}
                      </h2>
                      
                      <p className="text-gray-500 mb-1 text-center">
                        {members.find((m) => m.id === selectedMember)?.matric_number}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                          {members.find((m) => m.id === selectedMember)?.gender}
                        </span>
                        
                        {members.find((m) => m.id === selectedMember)?.post_held && (
                          <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                            {members.find((m) => m.id === selectedMember)?.post_held}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 w-full mt-2">
                        <Button
                          onClick={() => {
                            setSelectedMember(null);
                            navigate(`/people/${selectedMember}`);
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Full Profile
                        </Button>
                        
                        <Button
                          onClick={() => {
                            setSelectedMember(null);
                            navigate(`/member-bio/${selectedMember}`);
                          }}
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Modern Bio
                        </Button>
                        
                        <Button
                          onClick={downloadBioCard}
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                        >
                          <Download className="w-4 h-4" />
                          Download Bio Card
                        </Button>
                      </div>
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
