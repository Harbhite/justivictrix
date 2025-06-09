
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Download, GanttChart, FileText, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const IracGenerator = () => {
  const [legalIssue, setLegalIssue] = useState("");
  const [factualBackground, setFactualBackground] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedIrac, setGeneratedIrac] = useState("");
  const isMobile = useIsMobile();

  const handleGenerate = async () => {
    if (!legalIssue.trim()) {
      toast.error("Please enter a legal issue");
      return;
    }

    setIsLoading(true);
    try {
      // Use Gemini API to generate IRAC analysis
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a comprehensive IRAC analysis for the following legal issue:

              Legal Issue: ${legalIssue}
              ${factualBackground ? `Factual Background: ${factualBackground}` : ''}

              Please structure your response using the IRAC format with clear Markdown headings:

              # IRAC Analysis: ${legalIssue}

              ## Issue
              [Clearly state the legal question(s) presented]

              ## Rule
              [Identify and explain the applicable legal rules, statutes, and precedents]

              ## Application/Analysis
              [Apply the legal rules to the specific facts, discussing both sides of the argument]

              ## Conclusion
              [Provide a reasoned conclusion based on your analysis]

              Make the analysis thorough, well-reasoned, and properly formatted for legal study purposes.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const iracText = data.candidates[0].content.parts[0].text;
      
      setGeneratedIrac(iracText);
      toast.success("IRAC analysis generated successfully");
    } catch (error) {
      console.error("Error generating IRAC:", error);
      toast.error("Failed to generate IRAC analysis");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedIrac) return;
    
    navigator.clipboard.writeText(generatedIrac);
    toast.success("IRAC analysis copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedIrac) return;
    
    const fileName = `irac-analysis-${legalIssue.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedIrac);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedIrac);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedIrac);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="legal-issue">Legal Issue</Label>
          <Input
            id="legal-issue"
            value={legalIssue}
            onChange={(e) => setLegalIssue(e.target.value)}
            placeholder="e.g., Whether a contract is valid under duress"
            className="border-2 border-blue-200 focus:border-blue-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="factual-background">Factual Background (Optional)</Label>
          <Textarea
            id="factual-background"
            value={factualBackground}
            onChange={(e) => setFactualBackground(e.target.value)}
            placeholder="Provide relevant facts and context for the legal issue"
            className="min-h-[100px] md:min-h-[120px] border-2 border-blue-200 focus:border-blue-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate IRAC Analysis"}
        </Button>
      </div>

      {generatedIrac && (
        <Card className="mt-4 border-2 border-blue-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-blue-50 border-b border-blue-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <GanttChart className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-blue-800">IRAC Analysis</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-blue-300 hover:bg-blue-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-blue-300 hover:bg-blue-50 w-full md:w-auto">
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
          
          <CardContent className="p-4 md:p-6 max-h-[400px] md:max-h-[500px] overflow-y-auto bg-white">
            <div className="prose max-w-none text-sm md:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {generatedIrac}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IracGenerator;
