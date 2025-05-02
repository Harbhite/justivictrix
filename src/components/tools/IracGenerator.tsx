
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Download, GanttChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface IracAnalysis {
  issue: string;
  rule: string;
  analysis: string;
  conclusion: string;
}

const IracGenerator = () => {
  const [legalIssue, setLegalIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iracAnalysis, setIracAnalysis] = useState<IracAnalysis | null>(null);

  const handleGenerate = async () => {
    if (!legalIssue.trim()) {
      toast.error("Please enter a legal issue to analyze");
      return;
    }

    setIsLoading(true);
    try {
      // Use Gemini API to generate an IRAC analysis
      const model = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a comprehensive IRAC (Issue, Rule, Analysis, Conclusion) analysis for the following legal issue: ${legalIssue}. 
              
              Format the response as a JSON object with the following structure:
              {
                "issue": "Detailed statement of the legal issue",
                "rule": "Explanation of relevant legal rules, statutes, and precedents",
                "analysis": "Thorough application of the rules to the facts",
                "conclusion": "Clear legal conclusion"
              }
              
              Make each section detailed and professionally written as if for a law student or legal professional.`
            }]
          }]
        }),
      });

      const data = await model.json();
      const text = data.candidates[0].content.parts[0].text;
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : text;
      const parsedResult = JSON.parse(jsonText);
      
      setIracAnalysis(parsedResult);
      toast.success("IRAC analysis generated successfully");
    } catch (error) {
      console.error("Error generating IRAC analysis:", error);
      toast.error("Failed to generate IRAC analysis");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (section?: 'issue' | 'rule' | 'analysis' | 'conclusion') => {
    if (!iracAnalysis) return;
    
    let textToCopy = '';
    
    if (!section) {
      // Copy all sections
      textToCopy = `IRAC Analysis for "${legalIssue}"\n\n`;
      textToCopy += "ISSUE:\n" + iracAnalysis.issue + "\n\n";
      textToCopy += "RULE:\n" + iracAnalysis.rule + "\n\n";
      textToCopy += "ANALYSIS:\n" + iracAnalysis.analysis + "\n\n";
      textToCopy += "CONCLUSION:\n" + iracAnalysis.conclusion;
    } else {
      // Copy specific section
      const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
      textToCopy = `${sectionTitle}:\n${iracAnalysis[section]}`;
    }
    
    navigator.clipboard.writeText(textToCopy);
    toast.success(`${section ? `${section.toUpperCase()} section` : 'Complete IRAC analysis'} copied to clipboard`);
  };

  const handleDownload = () => {
    if (!iracAnalysis) return;
    
    let textToDownload = `IRAC Analysis for "${legalIssue}"\n\n`;
    textToDownload += "ISSUE:\n" + iracAnalysis.issue + "\n\n";
    textToDownload += "RULE:\n" + iracAnalysis.rule + "\n\n";
    textToDownload += "ANALYSIS:\n" + iracAnalysis.analysis + "\n\n";
    textToDownload += "CONCLUSION:\n" + iracAnalysis.conclusion;
    
    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `irac-analysis-${legalIssue.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("IRAC analysis downloaded as text file");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <Textarea
          value={legalIssue}
          onChange={(e) => setLegalIssue(e.target.value)}
          placeholder="Enter a legal issue or scenario for IRAC analysis..."
          className="min-h-[100px] border-2 border-purple-200 focus:border-purple-400"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white self-end"
        >
          {isLoading ? "Generating..." : "Generate IRAC Analysis"}
        </Button>
      </div>

      {iracAnalysis && (
        <Card className="mt-4 border-2 border-purple-300 shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-purple-50 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <GanttChart className="h-5 w-5 text-purple-600" />
              <h3 className="font-bold text-purple-800">IRAC Analysis</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy()} className="border-purple-300 hover:bg-purple-50">
                <Copy className="mr-2" size={16} />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="border-purple-300 hover:bg-purple-50">
                <Download className="mr-2" size={16} />
                Download
              </Button>
            </div>
          </div>

          <div className="bg-white">
            <Tabs defaultValue="issue" className="w-full">
              <TabsList className="grid grid-cols-4 w-full bg-purple-100">
                <TabsTrigger value="issue" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Issue</TabsTrigger>
                <TabsTrigger value="rule" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Rule</TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Analysis</TabsTrigger>
                <TabsTrigger value="conclusion" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Conclusion</TabsTrigger>
              </TabsList>
              
              <TabsContent value="issue" className="p-6 border-t border-purple-100">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-700">Issue</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('issue')} className="text-purple-600 hover:bg-purple-50">
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {iracAnalysis.issue}
                  </ReactMarkdown>
                </div>
              </TabsContent>
              
              <TabsContent value="rule" className="p-6 border-t border-purple-100">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-700">Rule</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('rule')} className="text-purple-600 hover:bg-purple-50">
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {iracAnalysis.rule}
                  </ReactMarkdown>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="p-6 border-t border-purple-100">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-700">Analysis</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('analysis')} className="text-purple-600 hover:bg-purple-50">
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {iracAnalysis.analysis}
                  </ReactMarkdown>
                </div>
              </TabsContent>
              
              <TabsContent value="conclusion" className="p-6 border-t border-purple-100">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-700">Conclusion</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('conclusion')} className="text-purple-600 hover:bg-purple-50">
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {iracAnalysis.conclusion}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      )}
    </div>
  );
};

export default IracGenerator;
