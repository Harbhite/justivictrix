
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";

const People = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // This would be replaced with actual member data
  const members = [
    {
      name: "John Doe",
      matricNumber: "LAW/2024/001",
      concentration: "Constitutional Law",
      bio: "Specializing in constitutional law with a focus on human rights.",
    },
    {
      name: "Jane Smith",
      matricNumber: "LAW/2024/002",
      concentration: "Criminal Law",
      bio: "Passionate about criminal justice reform and advocacy.",
    },
    // Add more members as needed
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="p-6 bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              onClick={() => setSelectedMember(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-24 h-24 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-4">
                <User size={40} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
              <p className="text-center text-law-neutral mb-2">{member.matricNumber}</p>
              <p className="text-center font-medium">{member.concentration}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMember !== null && (
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
                <h2 className="text-2xl font-bold mb-4">
                  {members[selectedMember].name}
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>Matric Number:</strong>{" "}
                    {members[selectedMember].matricNumber}
                  </p>
                  <p>
                    <strong>Concentration:</strong>{" "}
                    {members[selectedMember].concentration}
                  </p>
                  <p>
                    <strong>Bio:</strong> {members[selectedMember].bio}
                  </p>
                  <button
                    className="w-full px-4 py-2 bg-blue-400 border-2 border-black hover:bg-blue-500 transition-colors mt-4"
                    onClick={() => {
                      // Implement download functionality
                      console.log("Downloading bio...");
                    }}
                  >
                    Download Bio
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default People;
