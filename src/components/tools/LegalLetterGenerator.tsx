
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Download, Mail, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const LegalLetterGenerator = () => {
  const [letterType, setLetterType] = useState("");
  const [recipient, setRecipient] = useState("");
  const [senderName, setSenderName] = useState("");
  const [situation, setSituation] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const isMobile = useIsMobile();

  const letterTypes = [
    "Demand Letter",
    "Cease and Desist",
    "Breach of Contract Notice",
    "Termination Notice",
    "Settlement Offer",
    "Legal Notice",
    "Collection Letter",
    "Formal Complaint",
    "Request for Information",
    "Notice of Intent to Sue"
  ];

  const handleGenerate = async () => {
    if (!letterType || !recipient.trim() || !situation.trim()) {
      toast.error("Please fill in letter type, recipient, and situation");
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
              text: `Generate a professional ${letterType} with the following details:

              Sender: ${senderName || "[Your Name/Law Firm]"}
              Recipient: ${recipient}
              Situation: ${situation}
              ${desiredOutcome ? `Desired Outcome: ${desiredOutcome}` : ''}

              Format as a professional legal letter:

              [Your/Law Firm Letterhead]
              [Address]
              [City, State, ZIP Code]
              [Phone Number]
              [Email Address]

              ${new Date().toLocaleDateString()}

              ${recipient}
              [Recipient Address]

              **Re: ${letterType} - [Matter Description]**

              Dear [Title] [Last Name]:

              [Opening paragraph establishing the purpose and context]

              [Body paragraphs detailing:
              - The relevant facts and circumstances
              - Legal basis for the letter
              - Specific demands or requests
              - Consequences of non-compliance (if applicable)
              - Timeline for response/action]

              [Closing paragraph with call to action and next steps]

              I look forward to your prompt response to this matter.

              Sincerely,

              [Signature Line]
              ${senderName || "[Your Name]"}
              [Title]
              [Contact Information]

              **NOTICE: This letter is for educational purposes. Please consult with a qualified attorney for actual legal matters.**

              Make it professional, firm but respectful, and legally appropriate.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const letterText = data.candidates[0].content.parts[0].text;
      
      setGeneratedLetter(letterText);
      toast.success("Legal letter generated successfully");
    } catch (error) {
      console.error("Error generating letter:", error);
      toast.error("Failed to generate legal letter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    toast.success("Legal letter copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedLetter) return;
    const fileName = `${letterType.toLowerCase().replace(/\s+/g, "-")}-letter`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedLetter);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedLetter);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedLetter);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="letter-type">Letter Type</Label>
          <Select value={letterType} onValueChange={setLetterType}>
            <SelectTrigger className="border-2 border-red-200 focus:border-red-400">
              <SelectValue placeholder="Select letter type" />
            </SelectTrigger>
            <SelectContent>
              {letterTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sender-name">Sender Name (Optional)</Label>
            <Input
              id="sender-name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your name or law firm"
              className="border-2 border-red-200 focus:border-red-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Name of person/company receiving letter"
              className="border-2 border-red-200 focus:border-red-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="situation">Situation Description</Label>
          <Textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the situation that requires this legal letter"
            className="min-h-[120px] border-2 border-red-200 focus:border-red-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desired-outcome">Desired Outcome (Optional)</Label>
          <Textarea
            id="desired-outcome"
            value={desiredOutcome}
            onChange={(e) => setDesiredOutcome(e.target.value)}
            placeholder="What do you want the recipient to do? (pay money, stop behavior, etc.)"
            className="min-h-[80px] border-2 border-red-200 focus:border-red-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Legal Letter"}
        </Button>
      </div>

      {generatedLetter && (
        <Card className="mt-4 border-2 border-red-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-red-50 border-b border-red-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Mail className="h-5 w-5 text-red-600" />
              <h3 className="font-bold text-red-800">Legal Letter</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-red-300 hover:bg-red-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-red-300 hover:bg-red-50 w-full md:w-auto">
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
                {generatedLetter}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalLetterGenerator;
