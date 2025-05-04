
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Scale, FileText } from "lucide-react";

interface Case {
  title: string;
  year: string;
  court: string;
  summary: string;
  impact: string;
}

const CourtcaseSummarizer = () => {
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const famousCases: Record<string, Case> = {
    "brown-v-board": {
      title: "Brown v. Board of Education",
      year: "1954",
      court: "U.S. Supreme Court",
      summary: "This landmark case overturned the 'separate but equal' doctrine established in Plessy v. Ferguson by declaring that racial segregation in public schools violated the Equal Protection Clause of the Fourteenth Amendment.",
      impact: "The ruling paved the way for integration and the civil rights movement, becoming a major catalyst for social change in the United States."
    },
    "roe-v-wade": {
      title: "Roe v. Wade",
      year: "1973",
      court: "U.S. Supreme Court",
      summary: "The Court ruled that the Due Process Clause of the Fourteenth Amendment provided a fundamental 'right to privacy' that protected a woman's right to an abortion.",
      impact: "Struck down many state and federal abortion laws, and sparked an ongoing national debate about whether and to what extent abortion should be legal."
    },
    "miranda-v-arizona": {
      title: "Miranda v. Arizona",
      year: "1966",
      court: "U.S. Supreme Court",
      summary: "The Court held that prior to any custodial interrogation, suspects must be informed of their rights to remain silent and to have an attorney present during questioning.",
      impact: "Led to the creation of the 'Miranda warning' and established important protections for individuals in police custody."
    },
    "gideon-v-wainwright": {
      title: "Gideon v. Wainwright",
      year: "1963",
      court: "U.S. Supreme Court",
      summary: "The Court unanimously ruled that state courts are required to provide counsel in criminal cases for defendants who cannot afford to pay for their own attorneys.",
      impact: "Established the right to counsel as fundamental to fair trials and significantly expanded access to legal representation."
    },
    "baker-v-carr": {
      title: "Baker v. Carr",
      year: "1962",
      court: "U.S. Supreme Court",
      summary: "This case established that federal courts could review the apportionment of state legislative districts, which had previously been considered a 'political question'.",
      impact: "Established the 'one person, one vote' principle and led to significant redistricting across the United States."
    },
    "marbury-v-madison": {
      title: "Marbury v. Madison",
      year: "1803",
      court: "U.S. Supreme Court",
      summary: "Chief Justice John Marshall established the principle of judicial review, which gave the Supreme Court the power to strike down laws that violate the Constitution.",
      impact: "Fundamentally shaped the American legal system by establishing the Supreme Court's authority to interpret the Constitution."
    }
  };

  const getSummary = async () => {
    if (!selectedCase) {
      toast.error("Please select a case to summarize");
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const details = famousCases[selectedCase];
      if (details) {
        setCaseDetails(details);
        toast.success("Case summary generated!");
      } else {
        toast.error("Failed to retrieve case information");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Select value={selectedCase} onValueChange={setSelectedCase}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a famous case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brown-v-board">Brown v. Board of Education (1954)</SelectItem>
            <SelectItem value="roe-v-wade">Roe v. Wade (1973)</SelectItem>
            <SelectItem value="miranda-v-arizona">Miranda v. Arizona (1966)</SelectItem>
            <SelectItem value="gideon-v-wainwright">Gideon v. Wainwright (1963)</SelectItem>
            <SelectItem value="baker-v-carr">Baker v. Carr (1962)</SelectItem>
            <SelectItem value="marbury-v-madison">Marbury v. Madison (1803)</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={getSummary} 
          disabled={isLoading}
          className="w-full bg-[#8B5CF6] hover:bg-purple-600"
        >
          <FileText className="mr-2" size={16} />
          {isLoading ? "Summarizing..." : "Get Case Summary"}
        </Button>
      </div>
      
      {caseDetails && (
        <Card className="mt-4 border border-purple-200 bg-purple-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Scale size={20} className="text-purple-700" />
              <h3 className="font-bold text-purple-900">{caseDetails.title}</h3>
            </div>
            <div className="text-sm text-gray-700 mb-4">
              <span className="font-medium">Year:</span> {caseDetails.year} | <span className="font-medium">Court:</span> {caseDetails.court}
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-purple-800">Summary:</h4>
                <p className="text-gray-700">{caseDetails.summary}</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-800">Impact:</h4>
                <p className="text-gray-700">{caseDetails.impact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourtcaseSummarizer;
