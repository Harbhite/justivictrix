
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AdminUploadForm from "@/components/AdminUploadForm";
import { useAuth } from "@/hooks/useAuth";

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  date: string;
  created_at: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setGalleryImages(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery images:', err);
      setError(err.message);
      toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchGalleryImages();
  }, []);
  
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

  // Function to delete an image
  const handleDeleteImage = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal when clicking delete button
    
    if (!user) {
      toast.error("You must be logged in to delete images");
      return;
    }
    
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        toast.success("Image deleted successfully");
        fetchGalleryImages(); // Refresh the gallery
      } catch (err: any) {
        console.error('Error deleting image:', err);
        toast.error("Failed to delete image");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-1">
            Class Gallery
          </h1>
          
          <AdminUploadForm onUploadSuccess={fetchGalleryImages} />
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
          </div>
        )}
        
        {error && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8">
            <p className="text-red-700">Something went wrong: {error}</p>
            <p className="text-red-600 mt-2">Please try refreshing the page.</p>
          </div>
        )}
        
        {!isLoading && !error && galleryImages.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">No gallery images available yet.</p>
          </div>
        )}
        
        {!isLoading && !error && galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <motion.div
                key={image.id}
                className="cursor-pointer overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group relative"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal(image.image_url)}
              >
                <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
                  <img 
                    src={image.image_url} 
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium">{image.title}</p>
                  </div>
                  
                  {/* Admin delete button */}
                  {user && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 p-1 h-auto"
                      onClick={(e) => handleDeleteImage(image.id, e)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
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
