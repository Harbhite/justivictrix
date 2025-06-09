
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Download, HelpCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const LegalQAGenerator = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [focus, setFocus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQA, setGeneratedQA] = useState("");
  const isMobile = useIsMobile();

  const difficultyLevels = [
    "Beginner",
    "Intermediate", 
    "Advanced",
    "Expert"
  ];

  const questionCounts = [
    "5",
    "10",
    "15",
    "20",
    "25"
  ];

  const handleGenerate = async () => {
    if (!topic.trim() || !difficulty || !questionCount) {
      toast.error("Please fill in all required fields");
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
              text: `Generate ${questionCount} ${difficulty.toLowerCase()}-level legal exam questions and answers for the topic: "${topic}".

              ${focus ? `Focus Area: ${focus}` : ''}

              Format the response as follows:

              # Legal Q&A: ${topic}
              **Level:** ${difficulty}  
              **Questions:** ${questionCount}

              ${focus ? `**Focus:** ${focus}` : ''}

              ---

              ## Question 1
              [Write a clear, well-structured legal question]

              ### Answer
              [Provide a comprehensive answer with legal reasoning, relevant cases/statutes if applicable]

              ---

              ## Question 2
              [Next question]

              ### Answer
              [Comprehensive answer]

              [Continue for all ${questionCount} questions]

              ---

              ## Study Tips
              - [3-4 key study tips for this topic]

              ## Key Cases to Remember
              - [List 3-5 important cases related to this topic]

              ## Important Statutes/Rules
              - [List relevant legal authorities]

              Make sure questions test understanding, application, and analysis rather than just memorization. Include both theoretical knowledge and practical application. For advanced levels, include complex scenarios and cross-topic connections.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const qaText = data.candidates[0].content.parts[0].text;
      
      setGeneratedQA(qaText);
      toast.success("Legal Q&A generated successfully");
    } catch (error) {
      console.error("Error generating Q&A:", error);
      toast.error("Failed to generate legal Q&A");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedQA) return;
    navigator.clipboard.writeText(generatedQA);
    toast.success("Legal Q&A copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedQA) return;
    const fileName = `legal-qa-${topic.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedQA);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedQA);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedQA);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Legal Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Contract Law, Constitutional Law, Torts"
            className="border-2 border-yellow-200 focus:border-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="border-2 border-yellow-200 focus:border-yellow-400">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question-count">Number of Questions</Label>
            <Select value={questionCount} onValueChange={setQuestionCount}>
              <SelectTrigger className="border-2 border-yellow-200 focus:border-yellow-400">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>
              <SelectContent>
                {questionCounts.map((count) => (
                  <SelectItem key={count} value={count}>{count} Questions</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="focus">Specific Focus (Optional)</Label>
          <Textarea
            id="focus"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Any specific aspects you want to focus on (e.g., case analysis, statutory interpretation)"
            className="min-h-[80px] border-2 border-yellow-200 focus:border-yellow-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Q&A"}
        </Button>
      </div>

      {generatedQA && (
        <Card className="mt-4 border-2 border-yellow-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-yellow-50 border-b border-yellow-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <HelpCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-bold text-yellow-800">Legal Q&A</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-yellow-300 hover:bg-yellow-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-yellow-300 hover:bg-yellow-50 w-full md:w-auto">
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
                {generatedQA}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalQAGenerator;
