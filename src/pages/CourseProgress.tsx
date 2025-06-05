
import { motion } from "framer-motion";
import CourseProgressTracker from "@/components/course-progress/CourseProgressTracker";

const CourseProgress = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Course Progress
        </h1>
        
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Track your learning progress across all courses. Set goals, take notes, and monitor your academic journey.
          </p>
        </div>

        <CourseProgressTracker />
      </motion.div>
    </div>
  );
};

export default CourseProgress;
