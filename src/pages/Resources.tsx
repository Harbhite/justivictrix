
import { motion } from "framer-motion";

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-law-dark mb-8">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll populate this with actual resources later */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-law-dark mb-2">
              Course Materials
            </h3>
            <p className="text-law-neutral">
              Access lecture notes, presentations, and reading materials.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
