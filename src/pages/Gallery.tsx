
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1668906093328-9c6c9f9a5ada?q=80&w=1287&auto=format&fit=crop",
      alt: "Matriculation Ceremony",
      caption: "Class of 2028 Matriculation Ceremony"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1170&auto=format&fit=crop",
      alt: "Moot Court Competition",
      caption: "First Year Moot Court Competition"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1567631810726-fca1abf87252?q=80&w=1287&auto=format&fit=crop",
      alt: "Law Week",
      caption: "Faculty Law Week Celebrations"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=1170&auto=format&fit=crop",
      alt: "Class Social",
      caption: "End of Semester Social Gathering"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1555967522-37949fc21dcb?q=80&w=1170&auto=format&fit=crop",
      alt: "Study Group",
      caption: "Constitutional Law Study Group"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1169&auto=format&fit=crop",
      alt: "Guest Lecture",
      caption: "Special Guest Lecture on Human Rights Law"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1170&auto=format&fit=crop",
      alt: "Community Service",
      caption: "Class Community Legal Aid Project"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1170&auto=format&fit=crop",
      alt: "Faculty Building",
      caption: "New Faculty of Law Complex"
    }
  ];
  
  const openModal = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };
  
  // Handle click outside the image to close modal
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Class Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="cursor-pointer overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(image.src)}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Image Modal */}
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleModalClick}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button 
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                onClick={closeModal}
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Gallery;
