
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Download, Gavel, FileText, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const CaseBriefGenerator = () => {
  const [caseName, setCaseName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState("");
  const isMobile = useIsMobile();

  const handleGenerate = async () => {
    if (!caseName.trim()) {
      toast.error("Please enter a case name");
      return;
    }

    setIsLoading(true);
    try {
      // Use Gemini API to generate a case brief
      const model = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a comprehensive legal case brief for the case: "${caseName}".
              
              Additional information or context: ${additionalInfo || "Standard case brief format with all key elements"}
              
              Format the brief with clear Markdown headings and sections including:
              
              # ${caseName}
              
              ## Citation
              [Provide the proper legal citation if it's a well-known case]
              
              ## Facts
              [Detailed summary of the relevant facts]
              
              ## Procedural History
              [How the case moved through the court system]
              
              ## Issues
              [The legal questions presented]
              
              ## Holding
              [The court's answer to the legal questions]
              
              ## Reasoning
              [The court's analysis and justification]
              
              ## Significance
              [The importance and impact of this case on the law]
              
              ## Dissent (if applicable)
              [Summary of any dissenting opinions]
              
              Make the brief detailed, accurate, and formatted professionally for law students or legal professionals.`
            }]
          }]
        }),
      });

      const data = await model.json();
      const briefText = data.candidates[0].content.parts[0].text;
      
      setGeneratedBrief(briefText);
      toast.success("Case brief generated successfully");
    } catch (error) {
      console.error("Error generating case brief:", error);
      toast.error("Failed to generate case brief");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedBrief) return;
    
    navigator.clipboard.writeText(generatedBrief);
    toast.success("Case brief copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedBrief) return;
    
    const fileName = `case-brief-${caseName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedBrief);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedBrief);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedBrief);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="case-name">Case Name</Label>
          <Input
            id="case-name"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            placeholder="e.g., Marbury v. Madison, Brown v. Board of Education"
            className="border-2 border-green-200 focus:border-green-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional-info">Additional Information (Optional)</Label>
          <Textarea
            id="additional-info"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Specify any particular aspects of the case you want emphasized"
            className="min-h-[80px] md:min-h-[100px] border-2 border-green-200 focus:border-green-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Case Brief"}
        </Button>
      </div>

      {generatedBrief && (
        <Card className="mt-4 border-2 border-green-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-green-50 border-b border-green-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Gavel className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-green-800">Case Brief: {caseName}</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-green-300 hover:bg-green-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-green-300 hover:bg-green-50 w-full md:w-auto">
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
                {generatedBrief}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaseBriefGenerator;
