
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, AlertTriangle, Copy, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContractAnalyzer = () => {
  const [contractText, setContractText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    risks: string[];
    recommendations: string[];
    keyTerms: Array<{term: string, explanation: string}>;
    score: number;
  } | null>(null);

  const handleAnalyze = async () => {
    if (contractText.trim().length < 50) {
      toast.error("Please enter a valid contract text (at least 50 characters)");
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call since we don't have an actual contract analysis API
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock analysis data
      const mockAnalysis = {
        risks: [
          "Section 8.2 contains vague indemnification language that may create excessive liability",
          "The termination clause lacks specific conditions for 'material breach'",
          "Non-compete provisions may be overly restrictive and unenforceable in certain jurisdictions"
        ],
        recommendations: [
          "Clarify indemnification scope in Section 8.2 with specific monetary limits",
          "Define 'material breach' with specific examples or thresholds",
          "Review non-compete clause against jurisdictional limitations",
          "Add force majeure clause to address unforeseen circumstances"
        ],
        keyTerms: [
          {term: "Indemnification", explanation: "The obligation to compensate for losses or damages incurred"},
          {term: "Material Breach", explanation: "A significant or substantial violation of contract terms"},
          {term: "Force Majeure", explanation: "Unforeseeable circumstances preventing contract fulfillment"},
          {term: "Consideration", explanation: "Something of value exchanged between parties"}
        ],
        score: 72
      };

      setAnalysis(mockAnalysis);
      toast.success("Contract analysis complete");
    } catch (error) {
      console.error("Error analyzing contract:", error);
      toast.error("Failed to analyze contract");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Paste your contract text here for analysis..."
          rows={8}
          className="font-mono text-sm border-2 border-gray-300"
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={isLoading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
        >
          {isLoading ? "Analyzing Contract..." : "Analyze Contract"}
        </Button>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 border-red-200">
              <div className="bg-red-50 p-3 border-b border-red-200 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-red-800">Potential Risks</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(analysis.risks.join("\n"))}
                  className="ml-auto"
                >
                  <Copy size={14} />
                </Button>
              </div>
              <CardContent className="p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.risks.map((risk, index) => (
                    <li key={index} className="text-sm">{risk}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <div className="bg-green-50 p-3 border-b border-green-200 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-green-800">Recommendations</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(analysis.recommendations.join("\n"))}
                  className="ml-auto"
                >
                  <Copy size={14} />
                </Button>
              </div>
              <CardContent className="p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-blue-200">
            <div className="bg-blue-50 p-3 border-b border-blue-200 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-blue-800">Key Terms Analysis</h3>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                {analysis.keyTerms.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{item.term}</h4>
                    <p className="text-sm text-gray-600">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Contract Risk Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}/100
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {analysis.score >= 80 ? "Low risk" : 
                 analysis.score >= 60 ? "Medium risk" : "High risk"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAnalyzer;
