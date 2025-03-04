
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminUploadForm({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title) {
      toast.error("Please provide both a title and an image");
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log("Uploading to bucket: gallery, file path:", filePath);
      
      const { data, error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }
      
      console.log("Upload successful:", data);
      
      // 2. Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);
      
      console.log("Public URL:", publicUrl);
      
      // 3. Insert record into gallery table
      const { error: insertError } = await supabase
        .from('gallery')
        .insert({
          title,
          image_url: publicUrl,
          date: new Date().toISOString().split('T')[0]
        });
        
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
      
      toast.success("Image uploaded successfully!");
      setTitle("");
      setFile(null);
      setOpen(false);
      onUploadSuccess();
      
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-4 border-black p-4 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          <Upload size={20} />
          <span>Upload Photos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Gallery Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Image Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Select Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="cursor-pointer"
            />
            {file && (
              <p className="text-xs text-gray-500">
                Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={isUploading}
            className="w-full mt-4"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
