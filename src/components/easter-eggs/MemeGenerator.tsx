
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { toast } from "sonner";

const MemeGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const memeTemplates = [
    "/placeholder.svg",
    "https://picsum.photos/id/237/500/300",
    "https://picsum.photos/id/1025/500/300",
    "https://picsum.photos/id/1084/500/300"
  ];

  const generateMeme = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would generate the meme image here
      toast.success("Meme generated! Download functionality coming soon.");
      
    } catch (error) {
      console.error("Error generating meme:", error);
      toast.error("Failed to generate meme");
    } finally {
      setIsLoading(false);
    }
  };

  const nextTemplate = () => {
    setSelectedTemplate((selectedTemplate + 1) % memeTemplates.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Input
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          placeholder="Top text"
        />
        <Input
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          placeholder="Bottom text"
        />
      </div>
      
      <div className="relative border rounded-lg overflow-hidden">
        <img 
          src={memeTemplates[selectedTemplate]} 
          alt="Meme template" 
          className="w-full h-auto"
        />
        
        {topText && (
          <div className="absolute top-2 left-0 right-0 text-center">
            <p className="text-white text-xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{topText}</p>
          </div>
        )}
        
        {bottomText && (
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p className="text-white text-xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{bottomText}</p>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={nextTemplate}
          variant="outline"
          className="flex-1"
        >
          Next Template
        </Button>
        
        <Button 
          onClick={generateMeme} 
          disabled={isLoading}
          className="flex-1 bg-[#1EAEDB] hover:bg-blue-500"
        >
          <Download className="mr-2" size={16} />
          {isLoading ? "Generating..." : "Download Meme"}
        </Button>
      </div>
    </div>
  );
};

export default MemeGenerator;
