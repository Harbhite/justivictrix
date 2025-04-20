
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Image as ImageIcon, 
  Heading2, 
  List, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link 
} from "lucide-react";

const BLOG_CATEGORIES = [
  "Law Updates",
  "Student Life",
  "Case Studies",
  "Academic Tips",
  "Faculty News",
  "General"
];

const BlogEditor = ({ postId }: { postId?: number }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;

      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt);
        setCategory(data.category);
        setIsAnonymous(data.is_anonymous);
        setImageUrl(data.image_url || "");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load blog post");
    }
  };

  // Create blog-images bucket if it doesn't exist
  const ensureBucketExists = async () => {
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const blogBucket = buckets?.find(b => b.name === 'blog-images');
      
      if (!blogBucket) {
        const { data, error } = await supabase.storage.createBucket('blog-images', {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (error) {
          console.error("Error creating bucket:", error);
          return false;
        }
        
        // Add public policy to the bucket
        await supabase.storage.from('blog-images').createSignedUrl('dummy.txt', 1);
      }
      
      return true;
    } catch (error) {
      console.error("Error ensuring bucket exists:", error);
      return false;
    }
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      setImageFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      
      toast.success("Image selected for upload");
    } catch (error) {
      console.error("Error selecting image:", error);
      toast.error("Failed to select image");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImageToStorage = async () => {
    if (!imageFile || !user) return null;
    
    try {
      // Ensure bucket exists before uploading
      const bucketExists = await ensureBucketExists();
      if (!bucketExists) {
        toast.error("Failed to create storage bucket");
        return null;
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile);
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }
      
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const createBlogPostsTable = async () => {
    try {
      // Check if blog_posts table exists
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id')
        .limit(1);
      
      // If error code suggests the table doesn't exist, return false
      if (error && (error.code === '42P01' || error.message.includes('relation "blog_posts" does not exist'))) {
        return false;
      }
      
      // Table exists
      return true;
    } catch (error) {
      console.error("Error checking blog_posts table:", error);
      return false;
    }
  };

  const saveBlogPost = async () => {
    if (!user) {
      toast.error("You must be logged in to publish a blog post");
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsSaving(true);

    try {
      // Check if table exists
      const tableExists = await createBlogPostsTable();
      
      if (!tableExists) {
        toast.error("Blog system is not properly set up. Please contact administrator.");
        setIsSaving(false);
        return;
      }
      
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        const uploadedUrl = await uploadImageToStorage();
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }
      
      const postData = {
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || content.substring(0, 150) + "...",
        author_id: user.id,
        is_anonymous: isAnonymous,
        category,
        image_url: finalImageUrl || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (postId) {
        const { error } = await supabase
          .from("blog_posts")
          .update({...postData, updated_at: new Date().toISOString()})
          .eq("id", postId);

        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        toast.success("Blog post updated successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) {
          console.error("Insert error:", error);
          throw error;
        }
        toast.success("Blog post published successfully");
      }

      navigate("/blog");
    } catch (error: any) {
      console.error("Error saving blog post:", error);
      toast.error(error.message || "Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  const formatText = (format: string) => {
    const textArea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textArea) return;
    
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    
    let formattedText = "";
    let cursorPosition = 0;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = start + 1;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        cursorPosition = start + 3;
        break;
      case 'list':
        formattedText = selectedText.split('\n')
          .map(line => `- ${line}`)
          .join('\n');
        cursorPosition = start + 2;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        cursorPosition = end + 3;
        break;
      case 'align-left':
        formattedText = `<div style="text-align: left">${selectedText}</div>`;
        cursorPosition = start + 30;
        break;
      case 'align-center':
        formattedText = `<div style="text-align: center">${selectedText}</div>`;
        cursorPosition = start + 32;
        break;
      case 'align-right':
        formattedText = `<div style="text-align: right">${selectedText}</div>`;
        cursorPosition = start + 31;
        break;
      default:
        return;
    }
    
    const textBefore = content.substring(0, start);
    const textAfter = content.substring(end);
    
    setContent(textBefore + formattedText + textAfter);
    
    setTimeout(() => {
      textArea.focus();
      if (selectedText.length > 0) {
        textArea.selectionStart = start;
        textArea.selectionEnd = start + formattedText.length;
      } else {
        textArea.selectionStart = cursorPosition;
        textArea.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Blog Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a compelling title"
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {BLOG_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured-image">Featured Image</Label>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL or upload an image"
              disabled={!!imageFile}
            />
          </div>
          <div>
            <Label 
              htmlFor="image-upload" 
              className="flex items-center gap-2 px-4 py-2 border bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <ImageIcon size={16} />
              <span>{isUploading ? "Uploading..." : "Upload"}</span>
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={isUploading}
              className="hidden"
            />
          </div>
        </div>
        {imageUrl && (
          <div className="mt-2 border rounded-md overflow-hidden h-40">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (optional)</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of your post (will be auto-generated if left empty)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="content">Content</Label>
          <div className="flex gap-1 border rounded p-1 flex-wrap">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('bold')}
              className="h-8 w-8 p-0"
              title="Bold"
            >
              <Bold size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('italic')}
              className="h-8 w-8 p-0"
              title="Italic"
            >
              <Italic size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('heading')}
              className="h-8 w-8 p-0"
              title="Heading"
            >
              <Heading2 size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('list')}
              className="h-8 w-8 p-0"
              title="Bullet List"
            >
              <List size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('link')}
              className="h-8 w-8 p-0"
              title="Insert Link"
            >
              <Link size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('align-left')}
              className="h-8 w-8 p-0"
              title="Align Left"
            >
              <AlignLeft size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('align-center')}
              className="h-8 w-8 p-0"
              title="Align Center"
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('align-right')}
              className="h-8 w-8 p-0"
              title="Align Right"
            >
              <AlignRight size={16} />
            </Button>
          </div>
        </div>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here (supports markdown formatting)"
          rows={15}
          className="font-mono"
        />
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={(checked) => setIsAnonymous(checked === true)}
        />
        <Label htmlFor="anonymous" className="cursor-pointer">
          Publish anonymously
        </Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={saveBlogPost}
          disabled={isSaving}
          className="flex-1 bg-purple-500 hover:bg-purple-600"
        >
          {isSaving ? "Saving..." : (postId ? "Update Post" : "Publish Post")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/blog")}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
