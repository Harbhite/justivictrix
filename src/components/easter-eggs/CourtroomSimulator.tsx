
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Gavel, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Scenario {
  title: string;
  situation: string;
  prosecution: string;
  defense: string;
  judgment: string;
}

const CourtroomSimulator = () => {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [customScenario, setCustomScenario] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showJudgment, setShowJudgment] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const scenarios = [
    "Landlord-tenant dispute over property repairs",
    "Intellectual property infringement case",
    "Contract breach between business partners",
    "Workplace discrimination allegation",
    "Environmental pollution violation by a corporation"
  ];

  const generateCourtroom = async (prompt: string) => {
    setIsLoading(true);
    setShowJudgment(false);
    setScenario(null);
    
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const promptText = `Create a simulated courtroom scenario based on: "${prompt}"
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Creative case title",
        "situation": "Brief description of the legal situation and facts of the case (2-3 sentences)",
        "prosecution": "Persuasive prosecution or plaintiff argument with some legal reasoning (2-3 paragraphs)",
        "defense": "Persuasive defense argument with some legal reasoning (2-3 paragraphs)",
        "judgment": "The court's ruling and reasoning (2-3 paragraphs)"
      }
      
      The scenario should be creative but legally plausible. Please use realistic legal arguments and reference relevant legal concepts. If possible, incorporate some Nigerian legal principles.`;
      
      const result = await model.generateContent(promptText);
      const text = result.response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : text;
      
      try {
        const newScenario = JSON.parse(jsonText);
        setScenario(newScenario);
        toast.success("Courtroom scenario generated!");
      } catch (e) {
        console.error("Error parsing JSON:", e);
        toast.error("Failed to generate courtroom scenario");
      }
    } catch (error) {
      console.error("Error generating courtroom scenario:", error);
      toast.error("Failed to generate courtroom scenario");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="scenario-select">Choose a scenario or enter your own:</Label>
        <div className="grid grid-cols-1 gap-2">
          {scenarios.map((s, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left"
              onClick={() => {
                setCustomScenario(s);
                generateCourtroom(s);
              }}
            >
              {s}
            </Button>
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          <Label htmlFor="custom-scenario">Or enter your own scenario:</Label>
          <Textarea
            id="custom-scenario"
            placeholder="Describe a legal scenario or case..."
            value={customScenario}
            onChange={(e) => setCustomScenario(e.target.value)}
            className="min-h-[80px]"
          />
          <Button
            onClick={() => generateCourtroom(customScenario)}
            disabled={isLoading || !customScenario.trim()}
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Gavel className="mr-2 h-4 w-4" />
                Simulate Courtroom
              </>
            )}
          </Button>
        </div>
      </div>

      {scenario && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="bg-[#9b87f5] p-4 text-white">
            <h3 className="text-lg font-bold">{scenario.title}</h3>
          </div>
          
          <div className="p-4 border-b">
            <p className="text-gray-700">{scenario.situation}</p>
          </div>
          
          <div className="border-b">
            <button
              className="flex justify-between items-center w-full p-4 hover:bg-gray-50"
              onClick={() => toggleSection('prosecution')}
            >
              <h4 className="font-semibold">Prosecution's Argument</h4>
              {expandedSection === 'prosecution' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSection === 'prosecution' && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700 whitespace-pre-line">{scenario.prosecution}</p>
              </div>
            )}
          </div>
          
          <div className="border-b">
            <button
              className="flex justify-between items-center w-full p-4 hover:bg-gray-50"
              onClick={() => toggleSection('defense')}
            >
              <h4 className="font-semibold">Defense's Argument</h4>
              {expandedSection === 'defense' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSection === 'defense' && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700 whitespace-pre-line">{scenario.defense}</p>
              </div>
            )}
          </div>
          
          {!showJudgment ? (
            <div className="p-4">
              <Button
                onClick={() => setShowJudgment(true)}
                className="w-full"
                variant="outline"
              >
                <Gavel className="mr-2 h-4 w-4" />
                Reveal Court's Judgment
              </Button>
            </div>
          ) : (
            <div className="border-b">
              <button
                className="flex justify-between items-center w-full p-4 hover:bg-gray-50"
                onClick={() => toggleSection('judgment')}
              >
                <h4 className="font-semibold">Court's Judgment</h4>
                {expandedSection === 'judgment' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === 'judgment' && (
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-700 whitespace-pre-line">{scenario.judgment}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourtroomSimulator;
