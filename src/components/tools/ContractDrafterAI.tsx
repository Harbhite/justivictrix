import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const ContractDrafterAI = () => {
  const [contractType, setContractType] = useState("");
  const [party1, setParty1] = useState("");
  const [party2, setParty2] = useState("");
  const [keyTerms, setKeyTerms] = useState("");
  const [specialClauses, setSpecialClauses] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState("");
  const isMobile = useIsMobile();

  const contractTypes = [
    "Service Agreement",
    "Employment Contract",
    "Non-Disclosure Agreement (NDA)",
    "Purchase Agreement",
    "Lease Agreement",
    "Partnership Agreement",
    "Consulting Agreement",
    "License Agreement",
    "Freelance Contract",
    "Supply Agreement"
  ];

  const handleGenerate = async () => {
    if (!contractType || !party1.trim() || !party2.trim()) {
      toast.error("Please fill in contract type and both parties");
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
              text: `Draft a comprehensive ${contractType} between the following parties:

              Party 1: ${party1}
              Party 2: ${party2}
              ${keyTerms ? `Key Terms: ${keyTerms}` : ''}
              ${specialClauses ? `Special Clauses Needed: ${specialClauses}` : ''}

              Please create a professional, legally sound contract with the following structure:

              # ${contractType.toUpperCase()}

              **Date:** ${new Date().toLocaleDateString()}

              ## PARTIES
              [Clearly identify both parties with full legal names and addresses]

              ## RECITALS
              [Background information and purpose of the agreement]

              ## TERMS AND CONDITIONS

              ### 1. Scope of Work/Services
              [Define what is being provided or delivered]

              ### 2. Compensation and Payment Terms
              [Payment amounts, schedules, and methods]

              ### 3. Term and Termination
              [Duration of agreement and termination conditions]

              ### 4. Responsibilities and Obligations
              [Duties of each party]

              ### 5. Confidentiality
              [Protection of confidential information]

              ### 6. Intellectual Property
              [Ownership and usage rights]

              ### 7. Limitation of Liability
              [Liability limitations and indemnification]

              ### 8. Governing Law and Dispute Resolution
              [Applicable law and dispute resolution methods]

              ### 9. General Provisions
              [Miscellaneous clauses including severability, entire agreement, amendments]

              ## EXECUTION
              [Signature blocks for both parties]

              **DISCLAIMER: This is a template for educational purposes. Please consult with a qualified attorney before using any contract.**

              Make it comprehensive, professional, and include all standard legal protections.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const contractText = data.candidates[0].content.parts[0].text;
      
      setGeneratedContract(contractText);
      toast.success("Contract draft generated successfully");
    } catch (error) {
      console.error("Error generating contract:", error);
      toast.error("Failed to generate contract");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContract) return;
    navigator.clipboard.writeText(generatedContract);
    toast.success("Contract copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedContract) return;
    const fileName = `${contractType.toLowerCase().replace(/\s+/g, "-")}-contract`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedContract);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedContract);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedContract);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contract-type">Contract Type</Label>
          <Select value={contractType} onValueChange={setContractType}>
            <SelectTrigger className="border-2 border-indigo-200 focus:border-indigo-400">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              {contractTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="party1">First Party</Label>
            <Input
              id="party1"
              value={party1}
              onChange={(e) => setParty1(e.target.value)}
              placeholder="Company/Individual Name"
              className="border-2 border-indigo-200 focus:border-indigo-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="party2">Second Party</Label>
            <Input
              id="party2"
              value={party2}
              onChange={(e) => setParty2(e.target.value)}
              placeholder="Company/Individual Name"
              className="border-2 border-indigo-200 focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="key-terms">Key Terms & Conditions</Label>
          <Textarea
            id="key-terms"
            value={keyTerms}
            onChange={(e) => setKeyTerms(e.target.value)}
            placeholder="Specify payment amounts, deliverables, timelines, etc."
            className="min-h-[100px] border-2 border-indigo-200 focus:border-indigo-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="special-clauses">Special Clauses (Optional)</Label>
          <Textarea
            id="special-clauses"
            value={specialClauses}
            onChange={(e) => setSpecialClauses(e.target.value)}
            placeholder="Any specific clauses or requirements you need included"
            className="min-h-[80px] border-2 border-indigo-200 focus:border-indigo-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isLoading ? "Drafting..." : "Draft Contract"}
        </Button>
      </div>

      {generatedContract && (
        <Card className="mt-4 border-2 border-indigo-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-indigo-50 border-b border-indigo-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-indigo-800">Contract Draft</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-indigo-300 hover:bg-indigo-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-indigo-300 hover:bg-indigo-50 w-full md:w-auto">
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
                {generatedContract}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractDrafterAI;
