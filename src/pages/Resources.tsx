
import { motion } from "framer-motion";
import { FileText, Download, Book, Video } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "Constitutional Law Notes",
      type: "PDF",
      icon: FileText,
      category: "Notes",
    },
    {
      title: "Criminal Law Presentations",
      type: "PPT",
      icon: FileText,
      category: "Presentations",
    },
    {
      title: "Contract Law Case Studies",
      type: "PDF",
      icon: Book,
      category: "Case Studies",
    },
    {
      title: "Legal Research Methods",
      type: "Video",
      icon: Video,
      category: "Multimedia",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Resources
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <resource.icon size={24} className="mt-1" />
                <span className="px-2 py-1 bg-yellow-200 border-2 border-black text-sm font-bold">
                  {resource.type}
                </span>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">{resource.title}</h3>
              <p className="text-law-neutral mb-4">{resource.category}</p>
              <button className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors flex items-center gap-2">
                <Download size={20} />
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
