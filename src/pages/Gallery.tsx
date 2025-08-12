import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, Loader2, Trash2, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Button } from "@/components/ui/button";
import AdminUploadForm from "@/components/AdminUploadForm";
import { useAuth } from "@/hooks/useAuth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BentoGrid from "@/components/BentoGrid";

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { user } = useAuth();
  const carouselRef = useRef<HTMLDivElement>(null);

  useMetaTags({
    title: "Law School Photo Gallery - Campus Life, Events & Academic Moments | LLB28 Hub",
    description: "Explore our vibrant photo collection featuring law school events, graduation ceremonies, moot court competitions, academic conferences, and memorable campus moments.",
    image: "/og-image.png",
    type: "website"
  });
  
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
  
  const openModal = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleDeleteImage = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
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
        fetchGalleryImages();
      } catch (err: any) {
        console.error('Error deleting image:', err);
        toast.error("Failed to delete image");
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'Escape') closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, galleryImages.length]);

  return (
    <div className="min-h-screen bg-gradient-soft py-6 sm:py-8 lg:py-16 animate-fade-in-fast">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8 lg:space-y-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Class Gallery
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Capturing memories and moments from our law school journey
              </p>
            </div>
            
            <div className="w-full sm:w-auto">
              <AdminUploadForm onUploadSuccess={fetchGalleryImages} />
            </div>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
              <div className="text-center">
                <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-purple-500 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-600">Loading gallery...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
              <p className="text-sm sm:text-base text-red-600 mb-4">{error}</p>
              <Button 
                onClick={fetchGalleryImages}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && galleryImages.length === 0 && (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No images yet</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Be the first to share a memory from our class!
              </p>
              <AdminUploadForm onUploadSuccess={fetchGalleryImages} />
            </div>
          )}
          
          {/* Gallery Content */}
          {!isLoading && !error && galleryImages.length > 0 && (
            <div className="space-y-8 sm:space-y-12">
              {/* Featured Carousel */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border">
                <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    Featured Photos
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Swipe through our latest memories
                  </p>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {galleryImages.slice(0, 6).map((image, index) => (
                        <CarouselItem key={image.id} className="basis-full">
                          <div className="relative group cursor-pointer" onClick={() => openModal(image.image_url, index)}>
                            <div className="aspect-video sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden rounded-lg bg-gray-100">
                              <img 
                                src={image.image_url} 
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            {/* Title overlay, no gradient */}
                            <div className="absolute bottom-4 left-4 right-4 text-white bg-black/40 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="font-semibold text-sm sm:text-base lg:text-lg">{image.title}</h3>
                              <p className="text-xs sm:text-sm">{new Date(image.date).toLocaleDateString()}</p>
                            </div>
                            {user && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 h-auto"
                                onClick={(e) => handleDeleteImage(image.id, e)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex items-center justify-center mt-6 gap-3">
                      <CarouselPrevious className="relative static" />
                      <CarouselNext className="relative static" />
                    </div>
                  </Carousel>
                </div>
              </div>
              
              {/* All Photos Bento Grid */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">
                  All Photos
                </h2>
                <div>
                  {/* Use BentoGrid */}
                  <BentoGrid
                    images={galleryImages}
                    onImageClick={(img, i) => openModal(img.image_url, i)}
                    user={user}
                    onDelete={handleDeleteImage}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleModalClick}
              >
                {/* Navigation Buttons */}
                <Button 
                  variant="ghost"
                  size="lg"
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 sm:p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    previousImage();
                  }}
                >
                  <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
                </Button>

                <Button 
                  variant="ghost"
                  size="lg"
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 sm:p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight size={24} className="sm:w-8 sm:h-8" />
                </Button>

                {/* Close Button */}
                <button 
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors p-2"
                  onClick={closeModal}
                >
                  <X size={24} className="sm:w-8 sm:h-8" />
                </button>

                {/* Image Container */}
                <motion.div
                  className="relative max-w-[95vw] max-h-[90vh] w-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <img 
                    src={galleryImages[currentImageIndex]?.image_url} 
                    alt={galleryImages[currentImageIndex]?.title} 
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">{galleryImages[currentImageIndex]?.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1">
                      {new Date(galleryImages[currentImageIndex]?.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
