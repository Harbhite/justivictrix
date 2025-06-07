
import { motion } from "framer-motion";
import StudyGroupManager from "@/components/study-groups/StudyGroupManager";

const StudyGroups = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Study Groups
        </h1>
        
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Join or create study groups to collaborate with fellow students. Connect with peers who share your academic interests and study schedules.
          </p>
        </div>

        <StudyGroupManager />
      </motion.div>
    </div>
  );
};

export default StudyGroups;
