import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTRACT_TYPES = [
  { value: "nda", label: "Non-Disclosure Agreement (NDA)" },
  { value: "employment", label: "Employment Contract" },
  { value: "lease", label: "Lease Agreement" },
  { value: "service", label: "Service Agreement" },
  { value: "sale", label: "Sale Contract" }
];

const ContractGenerator = () => {
  const [contractType, setContractType] = useState("");
  const [parties, setParties] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState("");

  const handleGenerate = async () => {
    if (!contractType) {
      toast.error("Please select a contract type");
      return;
    }

    if (!parties.trim()) {
      toast.error("Please enter the parties involved");
      return;
    }

    setIsLoading(true);
    try {
      // Use Gemini API to generate a contract
      const model = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional legal ${getContractTypeLabel(contractType)} between these parties: ${parties}.
              
              Additional details or terms to include: ${details || "Standard terms appropriate for this type of agreement"}
              
              Format the contract professionally with proper legal sections, numbering, and formatting. Include standard clauses appropriate for this type of contract.
              
              The contract should be detailed but concise, written in formal legal language, and include all necessary components of a valid legal agreement.`
            }]
          }]
        }),
      });

      const data = await model.json();
      const contractText = data.candidates[0].content.parts[0].text;
      
      setGeneratedContract(contractText);
      toast.success("Contract generated successfully");
    } catch (error) {
      console.error("Error generating contract:", error);
      toast.error("Failed to generate contract");
    } finally {
      setIsLoading(false);
    }
  };

  const getContractTypeLabel = (value: string): string => {
    const contract = CONTRACT_TYPES.find(c => c.value === value);
    return contract ? contract.label : value;
  };

  const handleCopy = () => {
    if (!generatedContract) return;
    
    navigator.clipboard.writeText(generatedContract);
    toast.success("Contract copied to clipboard");
  };

  const handleDownload = () => {
    if (!generatedContract) return;
    
    const element = document.createElement("a");
    const file = new Blob([generatedContract], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${contractType}-contract.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Contract downloaded as text file");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contract-type">Contract Type</Label>
          <Select
            value={contractType}
            onValueChange={setContractType}
          >
            <SelectTrigger id="contract-type">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              {CONTRACT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parties">Parties Involved</Label>
          <Input
            id="parties"
            value={parties}
            onChange={(e) => setParties(e.target.value)}
            placeholder="e.g., John Smith (Employer) and Jane Doe (Employee)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="details">Additional Details or Terms (Optional)</Label>
          <Textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Specify any specific terms, conditions, or details you want included in the contract"
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Contract"}
        </Button>
      </div>

      {generatedContract && (
        <Card className="mt-6 border-2 border-black">
          <CardContent className="p-0">
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
              <h3 className="font-bold text-lg">Generated Contract</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="p-6 bg-white max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans">{generatedContract}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractGenerator;
