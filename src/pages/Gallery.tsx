
import { motion } from "framer-motion";
import { Image } from "lucide-react";

const Gallery = () => {
  // This would be replaced with actual image data
  const images = Array(6).fill({
    url: "https://placehold.co/600x400",
    title: "LLB28 Class Event",
    date: "2024",
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          LLB28 Gallery
        </h1>
        
        <div className="mb-8 p-6 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg">
            Welcome to the gallery of LLB28 class, University of Ibadan Faculty of Law. 
            Here we showcase our memorable moments and class activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <Image className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4">
                <h3 className="font-bold text-lg">{image.title}</h3>
                <p className="text-law-neutral">{image.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
