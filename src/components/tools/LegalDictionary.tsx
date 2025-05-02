
import { useState } from "react";
import { getLegalDefinition } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LegalDictionary = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState("");

  const handleLookup = async () => {
    if (!term.trim()) {
      toast.error("Please enter a legal term");
      return;
    }

    setIsLoading(true);
    try {
      const result = await getLegalDefinition(term);
      setDefinition(result);
    } catch (error) {
      console.error("Error looking up term:", error);
      toast.error("Failed to look up term");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!definition) return;
    
    navigator.clipboard.writeText(definition);
    toast.success("Definition copied to clipboard");
  };

  const handleExport = () => {
    if (!definition) return;
    
    const blob = new Blob([definition], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-definition-${term.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Definition exported as text file");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a legal term..."
          className="flex-1"
        />
        <Button 
          onClick={handleLookup} 
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {isLoading ? "Looking up..." : "Look Up Term"}
        </Button>
      </div>

      {definition && (
        <Card className="mt-4 border-2 border-amber-200 shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-amber-50 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Definition: {term}</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-amber-300 hover:bg-amber-50">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="border-amber-300 hover:bg-amber-50">
                <Download className="mr-2" size={16} />
                Export
              </Button>
            </div>
          </div>
          
          <CardContent className="p-6 max-h-[400px] overflow-y-auto bg-white">
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {definition}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalDictionary;
