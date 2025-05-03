
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!apiKey) {
      setShowApiKeyInput(true);
      toast.error("Please enter your Google AI API key");
      return;
    }

    setIsLoading(true);
    
    try {
      // Initialize the Google Generative AI with the API key
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Access the image generation model - Imagen 3
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      
      // Generate the image
      const result = await model.generateContent([prompt]);
      const response = await result.response;
      const imageData = response.candidates?.[0]?.content?.parts?.find(
        part => part.mime_type?.startsWith("image/")
      )?.inlineData?.data;
      
      if (imageData) {
        setImage(`data:image/png;base64,${imageData}`);
        toast.success("Image generated successfully!");
      } else {
        toast.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {showApiKeyInput ? (
        <div className="space-y-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google AI API key..."
            className="flex-1"
          />
          <Button 
            onClick={() => setShowApiKeyInput(false)}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Save API Key
          </Button>
          <p className="text-xs text-gray-500">
            You can get your API key from the{" "}
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#9b87f5] hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>
      ) : (
        <>
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
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Generating...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2" size={16} />
                  Generate
                </>
              )}
            </Button>
          </div>
          
          <Button
            onClick={() => setShowApiKeyInput(true)}
            variant="outline"
            className="text-xs w-full"
          >
            Change API Key
          </Button>
        </>
      )}
      
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
