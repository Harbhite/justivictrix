
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  date: string;
  created_at: string;
}

const Gallery = () => {
  // Fetch gallery items
  const { data: items, isLoading } = useQuery({
    queryKey: ['gallery-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load gallery items');
        throw error;
      }
      return data as GalleryItem[];
    }
  });

  const renderMedia = (item: GalleryItem) => {
    const isVideo = /\.(mp4|mov|quicktime)$/i.test(item.image_url);
    
    if (isVideo) {
      return (
        <video
          src={item.image_url}
          controls
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <img
        src={item.image_url}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    );
  };

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
          <p className="text-lg mb-4">
            Welcome to the gallery of LLB28 class, University of Ibadan Faculty of Law. 
            Here you can view our memories and class activities through photos and videos.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(items || []).map((item) => (
              <motion.div
                key={item.id}
                className="group relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {renderMedia(item)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-law-neutral">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Gallery;
