
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const People = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

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
            {members?.map((member) => (
              <motion.div
                key={member.id}
                className="p-6 bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
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
                <h3 className="text-xl font-bold text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-center text-law-neutral mb-2">
                  {member.matric_number}
                </p>
                <p className="text-center font-medium">{member.concentration}</p>
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
                {members && (
                  <>
                    <h2 className="text-2xl font-bold mb-4">
                      {members.find((m) => m.id === selectedMember)?.name}
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>Matric Number:</strong>{" "}
                        {
                          members.find((m) => m.id === selectedMember)
                            ?.matric_number
                        }
                      </p>
                      <p>
                        <strong>Concentration:</strong>{" "}
                        {
                          members.find((m) => m.id === selectedMember)
                            ?.concentration
                        }
                      </p>
                      {members.find((m) => m.id === selectedMember)?.bio && (
                        <p>
                          <strong>Bio:</strong>{" "}
                          {members.find((m) => m.id === selectedMember)?.bio}
                        </p>
                      )}
                    </div>
                  </>
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
