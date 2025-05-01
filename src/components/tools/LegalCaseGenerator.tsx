
import { useState } from "react";
import { generateLegalCase } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const LegalCaseGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a legal topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLegalCase(topic);
      setGeneratedCase(result);
    } catch (error) {
      console.error("Error generating case study:", error);
      toast.error("Failed to generate case study");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedCase) return;
    
    navigator.clipboard.writeText(generatedCase);
    toast.success("Case study copied to clipboard");
  };

  const handleDownload = () => {
    if (!generatedCase) return;
    
    const element = document.createElement("a");
    const file = new Blob([generatedCase], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `case-study-${topic.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Case study downloaded as markdown");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal topic or scenario..."
          className="flex-1"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? "Generating..." : "Generate Case Study"}
        </Button>
      </div>

      {generatedCase && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2" size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2" size={16} />
              Download
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
            <div className="prose max-w-none">
              <Textarea 
                value={generatedCase} 
                readOnly 
                className="min-h-[400px] font-mono text-sm border-none focus-visible:ring-0 p-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseGenerator;
