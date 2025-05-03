
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import { toast } from "sonner";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    
    try {
      // For now, we'll use a placeholder image generation
      // In a real app, you would call an AI API like DALL-E or Stable Diffusion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use a placeholder image to simulate generation
      const placeholderImages = [
        "https://picsum.photos/800/600?random=1",
        "https://picsum.photos/800/600?random=2",
        "https://picsum.photos/800/600?random=3",
      ];
      
      setImage(placeholderImages[Math.floor(Math.random() * placeholderImages.length)]);
      
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="flex-1"
        />
        <Button 
          onClick={generateImage} 
          disabled={isLoading}
          className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
        >
          <Image className="mr-2" size={16} />
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </div>
      
      {image && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt="Generated" 
            className="w-full h-auto object-cover" 
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
