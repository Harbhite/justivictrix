
import { useState } from "react";
import { generateMindMap } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MindMapNode {
  topic: string;
  children: string[];
}

interface MindMapData {
  center: string;
  branches: MindMapNode[];
}

const MindMapGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mindMap, setMindMap] = useState<MindMapData | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateMindMap(topic);
      setMindMap(result);
    } catch (error) {
      console.error("Error generating mind map:", error);
      toast.error("Failed to generate mind map");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal topic..."
          className="flex-1"
        />
        <Button onClick={handleGenerate} disabled={isLoading}>
          Generate Mind Map
        </Button>
      </div>

      {mindMap && (
        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-xl font-bold text-center mb-4">{mindMap.center}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mindMap.branches.map((branch, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">{branch.topic}</h4>
                <ul className="list-disc list-inside">
                  {branch.children.map((child, childIndex) => (
                    <li key={childIndex} className="text-sm">{child}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapGenerator;
