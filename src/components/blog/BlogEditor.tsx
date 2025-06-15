
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Save, Eye, X } from "lucide-react";
import type { BlogPost } from "@/types/blog";

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

  // Post data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isFeatured, setIsFeatured] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  
  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  // State
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

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
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setTitle(data.title || "");
        setContent(data.content || "");
        setExcerpt(data.excerpt || "");
        setCategory(data.category || BLOG_CATEGORIES[0]);
        setIsAnonymous(data.is_anonymous || false);
        setImageUrl(data.image_url || "");
        setStatus((data.status as 'draft' | 'published') || 'draft');
        setIsFeatured(data.is_featured || false);
        setTags(data.tags || []);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load blog post");
    }
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      setError(null);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
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

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const saveBlogPost = async (publishStatus: 'draft' | 'published' = status) => {
    if (!user) {
      toast.error("You must be logged in to save a blog post");
      return;
    }

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      let finalImageUrl = imageUrl;
      
      // Upload image if a file is selected
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(fileName, imageFile);
            
          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw uploadError;
          }
          
          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName);
            
          finalImageUrl = urlData.publicUrl;
        } catch (uploadError: any) {
          console.error("Image upload failed:", uploadError);
          toast.error("Image upload failed, using fallback");
          finalImageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
        }
      }
      
      if (!finalImageUrl) {
        finalImageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
      }
      
      const slug = generateSlug(title);
      const now = new Date().toISOString();

      // Compose blog post data to match BlogPost type
      const postData: Partial<BlogPost> = {
        title: title.trim(),
        slug,
        content,
        excerpt: excerpt.trim() || content.substring(0, 150) + "...",
        author_id: user.id,
        is_anonymous: isAnonymous,
        category,
        image_url: finalImageUrl,
        tags,
        status: publishStatus,
        is_featured: isFeatured,
        published_at: publishStatus === 'published' ? now : null,
        view_count: postId ? undefined : 0,
      };

      if (postId) {
        const { error } = await supabase
          .from("blog_posts")
          .update({ ...postData, updated_at: now })
          .eq("id", postId);

        if (error) throw error;
        toast.success(`Blog post ${publishStatus === 'published' ? 'published' : 'saved'} successfully`);
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        toast.success(`Blog post ${publishStatus === 'published' ? 'published' : 'saved'} successfully`);
      }

      navigate("/blog");
    } catch (error: any) {
      console.error("Error saving blog post:", error);
      setError(error.message);
      toast.error(error.message || "Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye size={16} className="mr-1" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <span className={`text-xs px-2 py-1 rounded-full ${
            status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => saveBlogPost('draft')}
            disabled={isSaving}
          >
            <Save size={16} className="mr-1" />
            Save Draft
          </Button>
          <Button
            onClick={() => saveBlogPost('published')}
            disabled={isSaving || !title.trim() || !content.trim()}
            className="bg-gray-900 hover:bg-gray-800"
          >
            {isSaving ? "Saving..." : (postId ? "Update Post" : "Publish Post")}
          </Button>
        </div>
      </div>

      {!previewMode ? (
        <>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title"
              className="text-lg font-medium"
              required
            />
          </div>

          {/* Meta Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: 'draft' | 'published') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled-date">Schedule (optional)</Label>
              <Input
                id="scheduled-date"
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label htmlFor="image-url">Featured Image</Label>
            <div className="flex gap-4 items-center">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL or upload an image"
                disabled={!!imageFile}
                className="flex-1"
              />
              <Label className="flex items-center gap-2 px-4 py-2 border bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
                <span>{isUploading ? "Uploading..." : "Upload"}</span>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  disabled={isUploading}
                  className="hidden"
                />
              </Label>
            </div>
            {imageUrl && (
              <div className="mt-2 border rounded-md overflow-hidden h-40">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
                  }}
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary (auto-generated if empty)"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    size={12} 
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here (supports markdown)"
              rows={20}
              className="font-mono"
              required
            />
          </div>

          {/* Settings */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <Label htmlFor="anonymous" className="cursor-pointer">
                Publish anonymously
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(checked === true)}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as featured
              </Label>
            </div>
          </div>
        </>
      ) : (
        /* Preview Mode */
        <div className="bg-white p-8 rounded-lg border">
          <div className="mb-6">
            <Badge className="mb-2">{category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{title || "Your Title Here"}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <span>By {isAnonymous ? "Anonymous" : (user?.user_metadata?.full_name || user?.email)}</span>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline">#{tag}</Badge>
                ))}
              </div>
            )}
          </div>
          
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="prose max-w-none">
            {content ? content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            )) : (
              <p className="text-gray-500 italic">Your content will appear here...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
