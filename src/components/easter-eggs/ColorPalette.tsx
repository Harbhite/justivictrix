
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

const ColorPalette = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generatePalette = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newColors = [];
      for (let i = 0; i < 5; i++) {
        newColors.push(generateRandomColor());
      }
      
      setColors(newColors);
      
    } catch (error) {
      console.error("Error generating color palette:", error);
      toast.error("Failed to generate color palette");
    } finally {
      setIsLoading(false);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard!`);
  };

  // Generate a palette on first load
  React.useEffect(() => {
    generatePalette();
  }, []);

  return (
    <div className="space-y-4">
      <Button 
        onClick={generatePalette} 
        disabled={isLoading}
        className="w-full bg-[#f59e0b] hover:bg-amber-600"
      >
        <RefreshCw className="mr-2" size={16} />
        {isLoading ? "Generating..." : "Generate New Palette"}
      </Button>
      
      {colors.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 rounded cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color)}
            >
              <span className={`font-mono text-sm px-2 py-1 rounded ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? 'text-black' : 'text-white'}`}>
                {color}
              </span>
              <Copy 
                size={16} 
                className={parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? 'text-black' : 'text-white'} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
