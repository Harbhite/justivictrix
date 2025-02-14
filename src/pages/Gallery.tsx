
import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-law-dark mb-8">Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll populate this with actual images later */}
          <div className="aspect-square bg-law-primary/10 rounded-lg flex items-center justify-center">
            <p className="text-law-primary">Gallery Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
