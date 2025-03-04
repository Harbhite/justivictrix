
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function ResourceUploadForm({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Course Materials");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const determineResourceType = (fileExt: string): string => {
    if (['pdf'].includes(fileExt.toLowerCase())) return 'pdf';
    if (['ppt', 'pptx'].includes(fileExt.toLowerCase())) return 'ppt';
    if (['mp4', 'mov', 'avi'].includes(fileExt.toLowerCase())) return 'video';
    if (['doc', 'docx'].includes(fileExt.toLowerCase())) return 'document';
    if (['epub'].includes(fileExt.toLowerCase())) return 'ebook';
    return 'document';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title) {
      toast.error("Please provide both a title and a file");
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop() || '';
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log("Uploading to bucket: resources, file path:", filePath);
      
      const { data, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }
      
      console.log("Upload successful:", data);
      
      // 2. Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);
      
      console.log("Public URL:", publicUrl);

      // 3. Determine resource type based on file extension
      const resourceType = determineResourceType(fileExt);
      
      // 4. Insert record into resources table
      const { error: insertError } = await supabase
        .from('resources')
        .insert({
          title,
          file_url: publicUrl,
          type: resourceType,
          category,
          description,
          file_type: fileExt
        });
        
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
      
      toast.success("Resource uploaded successfully!");
      setTitle("");
      setCategory("Course Materials");
      setDescription("");
      setFile(null);
      setOpen(false);
      onUploadSuccess();
      
    } catch (error: any) {
      console.error("Error uploading resource:", error);
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
          <span>Upload Resource</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Resource Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resource title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required
            >
              <option value="Course Materials">Course Materials</option>
              <option value="Past Questions">Past Questions</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="Reference Books">Reference Books</option>
              <option value="Study Guides">Study Guides</option>
              <option value="Supplementary Materials">Supplementary Materials</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter resource description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.epub,video/*"
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
              "Upload Resource"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
