
import { useState } from "react";
import { getLegalDefinition } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";

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
        <Button onClick={handleLookup} disabled={isLoading}>
          Look Up Term
        </Button>
      </div>

      {definition && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2" size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2" size={16} />
              Export Text
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black prose max-w-none">
            <div className="whitespace-pre-wrap">{definition}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDictionary;
