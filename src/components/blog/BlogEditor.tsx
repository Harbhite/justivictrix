
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
import { Image, Heading2, List, Bold, Italic, AlignLeft, AlignCenter, AlignRight, Link } from "lucide-react";

// Simple categories for the blog
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

  // Fetch post data if editing existing post
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

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    
    try {
      setIsUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
        
      setImageUrl(data.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
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
      const postData = {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        author_id: user.id,
        is_anonymous: isAnonymous,
        category,
        image_url: imageUrl || "https://images.unsplash.com/photo-1505664063603-28e48c8ad148?q=80&w=1470&fit=crop"
      };

      if (postId) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", postId);

        if (error) throw error;
        toast.success("Blog post updated successfully");
      } else {
        // Create new post
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        toast.success("Blog post published successfully");
      }

      // Redirect to blog page
      navigate("/blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  // Simple rich text editor functions
  const formatText = (format: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && selection.rangeCount > 0) {
      let selectedText = selection.toString();
      let formattedText = "";

      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'heading':
          formattedText = `## ${selectedText}`;
          break;
        case 'list':
          formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
          break;
        default:
          return;
      }

      // Replace selected text with formatted text
      const contentTextArea = document.getElementById('content') as HTMLTextAreaElement;
      const start = contentTextArea.selectionStart;
      const end = contentTextArea.selectionEnd;
      
      const textBefore = content.substring(0, start);
      const textAfter = content.substring(end);
      
      setContent(textBefore + formattedText + textAfter);
    }
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
            />
          </div>
          <div>
            <Label 
              htmlFor="image-upload" 
              className="flex items-center gap-2 px-4 py-2 border bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <Image size={16} />
              <span>Upload</span>
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
          <div className="flex gap-1 border rounded p-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('bold')}
              className="h-8 w-8 p-0"
            >
              <Bold size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('italic')}
              className="h-8 w-8 p-0"
            >
              <Italic size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('heading')}
              className="h-8 w-8 p-0"
            >
              <Heading2 size={16} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => formatText('list')}
              className="h-8 w-8 p-0"
            >
              <List size={16} />
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
