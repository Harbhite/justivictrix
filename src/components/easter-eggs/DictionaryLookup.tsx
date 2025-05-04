
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search } from "lucide-react";

const DictionaryLookup = () => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Legal dictionary data
  const legalDictionary: Record<string, string> = {
    "habeas corpus": "A legal action or writ by which detainees can seek relief from unlawful imprisonment.",
    "stare decisis": "A legal principle that obligates courts to follow historical cases when making a ruling on a similar case.",
    "jurisprudence": "The theory and philosophy of law, or the study of legal systems and legal principles.",
    "tort": "A civil wrong that causes someone else to suffer loss or harm, resulting in legal liability for the person who commits the act.",
    "affidavit": "A written statement confirmed by oath or affirmation, for use as evidence in court.",
    "plaintiff": "The party who initiates a lawsuit before a court.",
    "defendant": "An individual, company, or institution sued or accused in a court of law.",
    "deposition": "The testimony of a witness taken under oath outside of court.",
    "discovery": "The pre-trial phase in a lawsuit in which each party can request documents and other evidence from other parties.",
    "subpoena": "A writ ordering a person to attend a court.",
    "injunction": "A judicial order that restrains a person from beginning or continuing an action.",
    "damages": "Money claimed by, or ordered to be paid to, a person as compensation for loss or injury.",
    "negligence": "Failure to use reasonable care, resulting in damage or injury to another.",
    "brief": "A written legal document presented to a court arguing why the party to the case should prevail.",
    "precedent": "A decided case that furnishes a basis for determining later cases involving similar facts or issues.",
    "hearsay": "Evidence based not on personal knowledge but on the reports of others.",
    "voir dire": "Preliminary examination of a witness or juror to determine their competency.",
    "mens rea": "The intention or knowledge of wrongdoing that constitutes part of a crime.",
    "actus reus": "The action or conduct which is a constituent element of a crime.",
    "pro bono": "Work undertaken voluntarily and without payment, for the public good."
  };

  const lookupTerm = () => {
    if (!term.trim()) {
      toast.error("Please enter a legal term to search");
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const normalizedTerm = term.toLowerCase().trim();
      const result = legalDictionary[normalizedTerm] || 
                     Object.entries(legalDictionary).find(
                       ([key]) => key.includes(normalizedTerm) || normalizedTerm.includes(key)
                     )?.[1];
      
      if (result) {
        setDefinition(result);
        toast.success("Definition found!");
      } else {
        setDefinition("No definition found for this term. Try another legal term.");
        toast.error("Term not found");
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a legal term..."
          onKeyDown={(e) => {
            if (e.key === "Enter") lookupTerm();
          }}
        />
        <Button 
          onClick={lookupTerm} 
          disabled={isLoading}
          className="bg-[#0EA5E9] hover:bg-blue-600"
        >
          <Search className="mr-2" size={16} />
          {isLoading ? "Looking up..." : "Lookup"}
        </Button>
      </div>
      
      {definition && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium mb-2 text-blue-800">{term}</h3>
          <p className="text-gray-700">{definition}</p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-1">
        Try terms like: tort, habeas corpus, stare decisis, jurisprudence
      </div>
    </div>
  );
};

export default DictionaryLookup;
