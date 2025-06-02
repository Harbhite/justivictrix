import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Loader2, FileText, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ResourceManagement() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("lecture_note");
  const [type, setType] = useState("document");
  const [file, setFile] = useState<File | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to manage resources");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-detect file type based on extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension) {
        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
          setType('document');
        } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
          setType('image');
        } else if (['mp4', 'webm', 'mov', 'avi'].includes(extension)) {
          setType('video');
        } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
          setType('audio');
        } else if (['ppt', 'pptx'].includes(extension)) {
          setType('presentation');
        } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
          setType('spreadsheet');
        }
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("lecture_note");
    setType("document");
    setFile(null);
    setFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to upload resources");
      navigate("/auth");
      return;
    }

    if (!file || !title || !category || !type) {
      toast.error("Please fill all required fields and select a file");
      return;
    }

    try {
      setIsUploading(true);
      
      console.log("Starting resource upload process...");
      
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log(`Uploading to bucket: resources, file path: ${filePath}`);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }
      
      console.log("File upload successful:", uploadData);
      
      // 2. Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);
      
      console.log("Public URL:", publicUrl);
      
      // 3. Insert record into resources table
      const { error: insertError } = await supabase
        .from('resources')
        .insert({
          title,
          description,
          category,
          type,
          file_url: publicUrl,
          file_type: fileExt
        });
        
      if (insertError) {
        console.error("Database insert error:", insertError);
        throw insertError;
      }
      
      toast.success("Resource uploaded successfully!");
      resetForm();
      
    } catch (error: any) {
      console.error("Error uploading resource:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-8">
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-4 border-black p-4 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Upload size={20} />
            <span>Upload New Resource</span>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the resource"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture_note">Lecture Note</SelectItem>
                  <SelectItem value="past_question">Past Question</SelectItem>
                  <SelectItem value="textbook">Textbook</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="handout">Handout</SelectItem>
                  <SelectItem value="reference">Reference Material</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
                required
              />
              {file && (
                <p className="text-xs text-gray-500">
                  Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">File Type</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
    </div>
  );
}
