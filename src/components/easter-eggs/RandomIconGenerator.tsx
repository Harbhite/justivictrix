
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Dices } from "lucide-react";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

const RandomIconGenerator = () => {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const [iconName, setIconName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("#000000");

  const generateRandomIcon = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get all Lucide icons (excluding special exports)
      const iconKeys = Object.keys(LucideIcons).filter(
        key => typeof LucideIcons[key as keyof typeof LucideIcons] === 'function' && 
        key !== 'createLucideIcon' && 
        !key.startsWith('__')
      );
      
      // Select a random icon
      const randomIconName = iconKeys[Math.floor(Math.random() * iconKeys.length)];
      const IconComponent = LucideIcons[randomIconName as keyof typeof LucideIcons] as React.FC<any>;
      
      setIconName(randomIconName);
      setIcon(<IconComponent size={size} color={color} />);
      
      toast.success("Icon generated!");
    } catch (error) {
      console.error("Error generating icon:", error);
      toast.error("Failed to generate icon");
    } finally {
      setIsLoading(false);
    }
  };

  const copyIconName = () => {
    if (iconName) {
      navigator.clipboard.writeText(iconName);
      toast.success("Icon name copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={generateRandomIcon} 
          disabled={isLoading}
          className="flex-1 bg-[#0EA5E9] hover:bg-blue-600"
        >
          <Dices className="mr-2" size={16} />
          {isLoading ? "Generating..." : "Generate Random Icon"}
        </Button>
      </div>

      {icon && (
        <div className="mt-4 p-6 flex flex-col items-center justify-center border rounded-lg bg-gray-50">
          <div className="mb-4">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{iconName}</span>
            <Button variant="ghost" size="sm" onClick={copyIconName}>
              <Copy size={14} />
            </Button>
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <div>
              <label className="text-sm block mb-1">Size</label>
              <input
                type="range"
                min="16"
                max="128"
                value={size}
                onChange={e => {
                  const newSize = parseInt(e.target.value);
                  setSize(newSize);
                  if (iconName) {
                    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<any>;
                    setIcon(<IconComponent size={newSize} color={color} />);
                  }
                }}
                className="w-32"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Color</label>
              <input
                type="color"
                value={color}
                onChange={e => {
                  const newColor = e.target.value;
                  setColor(newColor);
                  if (iconName) {
                    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<any>;
                    setIcon(<IconComponent size={size} color={newColor} />);
                  }
                }}
                className="w-8 h-8 p-0 border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomIconGenerator;
