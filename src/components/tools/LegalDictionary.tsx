
import { useState } from "react";
import { getLegalDefinition } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, Book, FileText, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const LegalDictionary = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState("");
  const isMobile = useIsMobile();

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

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!definition) return;
    
    const fileName = `legal-definition-${term.toLowerCase().replace(/\s+/g, '-')}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, definition);
        break;
      case 'pdf':
        downloadAsPDF(fileName, definition);
        break;
      case 'docx':
        downloadAsDocx(fileName, definition);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
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
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-amber-50 border-b border-amber-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Book className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Definition: {term}</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-amber-300 hover:bg-amber-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-amber-300 hover:bg-amber-50 w-full md:w-auto">
                    <Download className="mr-2" size={16} />
                    Export
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
          </div>
          
          <CardContent className="p-4 md:p-6 max-h-[300px] md:max-h-[400px] overflow-y-auto bg-white">
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
