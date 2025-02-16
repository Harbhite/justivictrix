
import { motion } from "framer-motion";
import { Image, Upload, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  date: string;
  created_at: string;
}

const Gallery = () => {
  const [isUploading, setIsUploading] = useState(false);

  // Fetch gallery images
  const { data: images, isLoading } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load gallery images');
        throw error;
      }
      return data as GalleryImage[];
    }
  });

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only image files (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          contentType: file.type,
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // Insert record into gallery table
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([
          {
            title: file.name.split('.')[0],
            image_url: publicUrl,
            date: new Date().toISOString().split('T')[0]
          }
        ]);

      if (insertError) throw insertError;
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
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
          LLB28 Gallery
        </h1>
        
        <div className="mb-8 p-6 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg mb-4">
            Welcome to the gallery of LLB28 class, University of Ibadan Faculty of Law. 
            Here we showcase our memorable moments and class activities.
          </p>
          
          <label className="flex items-center justify-center p-4 bg-white border-4 border-black cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 mr-2" />
                Upload New Image
              </>
            )}
          </label>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(images || []).map((image) => (
              <motion.div
                key={image.id}
                className="group relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {image.image_url ? (
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  <p className="text-law-neutral">{image.date}</p>
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
