
import React from "react";
import { Download, FileText, Pin, PinOff, Trash, Info } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceCardProps {
  resource: any;
  isAdmin: boolean;
  onView: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  resource, 
  isAdmin, 
  onView, 
  onTogglePin, 
  onDelete 
}) => {
  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText size={24} />;
      case "ppt":
        return <FileText size={24} />;
      case "video":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        );
      case "ebook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        );
    }
  };

  const getPreviewComponent = () => {
    const fileType = resource.file_type?.toLowerCase();
    
    if (fileType === 'pdf') {
      return (
        <iframe
          src={`${resource.file_url}#toolbar=0`}
          className="w-full h-48 border-2 border-black mb-4"
          title={resource.title}
        />
      );
    }
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return (
        <img
          src={resource.file_url}
          alt={resource.title}
          className="w-full h-48 object-cover border-2 border-black mb-4"
        />
      );
    }

    return null;
  };

  const preview = getPreviewComponent();

  return (
    <motion.div
      className={`p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
        resource.is_pinned ? "ring-4 ring-amber-400" : ""
      }`}
      whileHover={{ scale: 1.02 }}
      onClick={onView}
    >
      <div className="flex items-start justify-between">
        <div className="mt-1">
          {getIconForType(resource.type)}
        </div>
        <div className="flex items-center gap-2">
          {resource.is_pinned && (
            <span className="p-1 bg-amber-200 border-2 border-black">
              <Pin size={16} />
            </span>
          )}
          <span className="px-2 py-1 bg-yellow-200 border-2 border-black text-sm font-bold">
            {resource.type}
          </span>
        </div>
      </div>
      
      {preview}

      <h3 className="text-xl font-bold mt-4 mb-2">
        {resource.title}
      </h3>
      <p className="text-law-neutral mb-4">{resource.category}</p>
      {resource.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {resource.description}
        </p>
      )}
      
      {/* Date added */}
      <p className="text-xs text-gray-500 mb-4">
        Added on {new Date(resource.created_at).toLocaleDateString()}
      </p>
      
      <div className="flex gap-2 flex-wrap">
        {resource.type === 'pdf' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="px-4 py-2 bg-blue-400 border-2 border-black hover:bg-blue-500 transition-colors flex items-center gap-2 inline-block"
          >
            <FileText size={20} />
            View PDF
          </button>
        )}
        <a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors flex items-center gap-2 inline-block"
          download
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={20} />
          Download {resource.file_type ? `.${resource.file_type}` : ''}
        </a>
        
        {isAdmin && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className={`px-4 py-2 border-2 border-black transition-colors flex items-center gap-2 inline-block ${
                resource.is_pinned 
                  ? "bg-amber-400 hover:bg-amber-500" 
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {resource.is_pinned ? <PinOff size={20} /> : <Pin size={20} />}
              {resource.is_pinned ? "Unpin" : "Pin"}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-4 py-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors flex items-center gap-2 inline-block"
            >
              <Trash size={20} />
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ResourceCard;
