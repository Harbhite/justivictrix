
import React from "react";
import { FileText, Image, Video, Folder } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceStatisticsProps {
  stats: {
    totalResources: number;
    totalDocuments: number;
    totalImages: number;
    totalVideos: number;
  };
}

const ResourceStatistics: React.FC<ResourceStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div 
        className="bg-blue-100 border-4 border-black p-4 shadow-lg flex items-center"
        whileHover={{ scale: 1.03 }}
      >
        <div className="bg-blue-200 p-3 rounded-full mr-4">
          <Folder size={24} className="text-blue-700" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-800">Total Resources</h3>
          <p className="text-2xl font-bold">{stats.totalResources}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-green-100 border-4 border-black p-4 shadow-lg flex items-center"
        whileHover={{ scale: 1.03 }}
      >
        <div className="bg-green-200 p-3 rounded-full mr-4">
          <FileText size={24} className="text-green-700" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-green-800">Documents</h3>
          <p className="text-2xl font-bold">{stats.totalDocuments}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-amber-100 border-4 border-black p-4 shadow-lg flex items-center"
        whileHover={{ scale: 1.03 }}
      >
        <div className="bg-amber-200 p-3 rounded-full mr-4">
          <Image size={24} className="text-amber-700" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-800">Images</h3>
          <p className="text-2xl font-bold">{stats.totalImages}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-purple-100 border-4 border-black p-4 shadow-lg flex items-center"
        whileHover={{ scale: 1.03 }}
      >
        <div className="bg-purple-200 p-3 rounded-full mr-4">
          <Video size={24} className="text-purple-700" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-800">Videos</h3>
          <p className="text-2xl font-bold">{stats.totalVideos}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceStatistics;
