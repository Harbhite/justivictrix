
import { useState } from "react";
import { generateLegalCase } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, FileText, FileCode } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedCase) return;
    
    const fileName = `case-study-${topic.toLowerCase().replace(/\s+/g, "-")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedCase);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedCase);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedCase);
        break;
    }
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2" size={16} />
                  Download
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload('txt')}>
                  <FileText className="mr-2" size={16} />
                  <span>Text (.txt)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                  <FileCode className="mr-2" size={16} />
                  <span>PDF (.pdf)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('docx')}>
                  <FileText className="mr-2" size={16} />
                  <span>Word (.docx)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
