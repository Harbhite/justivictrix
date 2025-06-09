
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Download, FileText, Scroll } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const LegalMemoGenerator = () => {
  const [clientName, setClientName] = useState("");
  const [memoSubject, setMemoSubject] = useState("");
  const [facts, setFacts] = useState("");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState("");
  const isMobile = useIsMobile();

  const handleGenerate = async () => {
    if (!memoSubject.trim() || !question.trim()) {
      toast.error("Please fill in at least the subject and legal question");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional legal memorandum with the following details:

              Client: ${clientName || "Client"}
              Subject: ${memoSubject}
              Legal Question: ${question}
              ${facts ? `Facts: ${facts}` : ''}

              Format as a professional legal memo with clear sections:

              # LEGAL MEMORANDUM

              **TO:** [Partner/Supervising Attorney]
              **FROM:** [Your Name]
              **DATE:** ${new Date().toLocaleDateString()}
              **RE:** ${memoSubject}

              ## QUESTION PRESENTED
              [Restate the legal question clearly]

              ## BRIEF ANSWER
              [Provide a concise answer to the question]

              ## STATEMENT OF FACTS
              [Summarize relevant facts]

              ## DISCUSSION
              [Detailed legal analysis with citations to relevant law]

              ## CONCLUSION
              [Final recommendation and analysis]

              Make it professional, thorough, and properly formatted for legal practice.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const memoText = data.candidates[0].content.parts[0].text;
      
      setGeneratedMemo(memoText);
      toast.success("Legal memo generated successfully");
    } catch (error) {
      console.error("Error generating memo:", error);
      toast.error("Failed to generate legal memo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedMemo) return;
    navigator.clipboard.writeText(generatedMemo);
    toast.success("Legal memo copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedMemo) return;
    const fileName = `legal-memo-${memoSubject.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedMemo);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedMemo);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedMemo);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name (Optional)</Label>
            <Input
              id="client-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client or matter name"
              className="border-2 border-purple-200 focus:border-purple-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memo-subject">Memo Subject</Label>
            <Input
              id="memo-subject"
              value={memoSubject}
              onChange={(e) => setMemoSubject(e.target.value)}
              placeholder="e.g., Contract Validity Analysis"
              className="border-2 border-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="legal-question">Legal Question</Label>
          <Textarea
            id="legal-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is the specific legal question you need answered?"
            className="min-h-[80px] border-2 border-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facts">Relevant Facts (Optional)</Label>
          <Textarea
            id="facts"
            value={facts}
            onChange={(e) => setFacts(e.target.value)}
            placeholder="Provide the key facts relevant to your legal question"
            className="min-h-[100px] border-2 border-purple-200 focus:border-purple-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Legal Memo"}
        </Button>
      </div>

      {generatedMemo && (
        <Card className="mt-4 border-2 border-purple-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-purple-50 border-b border-purple-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Scroll className="h-5 w-5 text-purple-600" />
              <h3 className="font-bold text-purple-800">Legal Memorandum</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-purple-300 hover:bg-purple-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-purple-300 hover:bg-purple-50 w-full md:w-auto">
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
                    <FileText className="mr-2" size={16} />
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
                {generatedMemo}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalMemoGenerator;
