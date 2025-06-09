
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Download, List, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const LegalOutlineGenerator = () => {
  const [subject, setSubject] = useState("");
  const [outlineType, setOutlineType] = useState("");
  const [detail, setDetail] = useState("");
  const [specificTopics, setSpecificTopics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState("");
  const isMobile = useIsMobile();

  const outlineTypes = [
    "Course Outline",
    "Bar Exam Outline",
    "Case Law Outline",
    "Statutory Analysis Outline",
    "Topic Summary Outline"
  ];

  const detailLevels = [
    "Brief Overview",
    "Detailed Analysis",
    "Comprehensive Study Guide"
  ];

  const handleGenerate = async () => {
    if (!subject.trim() || !outlineType || !detail) {
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
              text: `Create a ${detail.toLowerCase()} ${outlineType.toLowerCase()} for: "${subject}".

              ${specificTopics ? `Focus on these specific topics: ${specificTopics}` : ''}

              Format as a well-structured outline with the following elements:

              # ${subject} - ${outlineType}

              **Detail Level:** ${detail}  
              **Date:** ${new Date().toLocaleDateString()}

              ## I. Introduction and Overview
              - [Brief introduction to the subject]
              - [Scope and importance]
              - [Key themes and concepts]

              ## II. Fundamental Principles
              - [Core legal principles]
              - [Foundational concepts]
              - [Historical development]

              ## III. Major Topics and Subtopics
              ### A. [First Major Topic]
              1. [Subtopic 1]
                 a. [Key points]
                 b. [Important cases/statutes]
                 c. [Applications]
              2. [Subtopic 2]
                 a. [Key points]
                 b. [Important cases/statutes]
                 c. [Applications]

              ### B. [Second Major Topic]
              [Continue similar structure]

              ## IV. Case Law Analysis
              - [Key landmark cases]
              - [Recent developments]
              - [Trend analysis]

              ## V. Statutory Framework
              - [Relevant statutes]
              - [Regulatory provisions]
              - [Enforcement mechanisms]

              ## VI. Practical Applications
              - [Real-world scenarios]
              - [Professional practice considerations]
              - [Ethical considerations]

              ## VII. Current Issues and Trends
              - [Recent developments]
              - [Emerging issues]
              - [Future outlook]

              ## VIII. Study Tips and Exam Strategy
              - [Key points to remember]
              - [Common exam topics]
              - [Study strategies]

              ## IX. Additional Resources
              - [Recommended readings]
              - [Useful websites/databases]
              - [Practice materials]

              Make it comprehensive, well-organized, and suitable for ${detail.toLowerCase()} study. Include specific legal authorities, cases, and practical applications where relevant.`
            }]
          }]
        }),
      });

      const data = await response.json();
      const outlineText = data.candidates[0].content.parts[0].text;
      
      setGeneratedOutline(outlineText);
      toast.success("Legal outline generated successfully");
    } catch (error) {
      console.error("Error generating outline:", error);
      toast.error("Failed to generate legal outline");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedOutline) return;
    navigator.clipboard.writeText(generatedOutline);
    toast.success("Legal outline copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedOutline) return;
    const fileName = `${subject.toLowerCase().replace(/\s+/g, "-")}-outline`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, generatedOutline);
        break;
      case 'pdf':
        downloadAsPDF(fileName, generatedOutline);
        break;
      case 'docx':
        downloadAsDocx(fileName, generatedOutline);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Legal Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Constitutional Law, Criminal Procedure, Evidence Law"
            className="border-2 border-slate-200 focus:border-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="outline-type">Outline Type</Label>
            <Select value={outlineType} onValueChange={setOutlineType}>
              <SelectTrigger className="border-2 border-slate-200 focus:border-slate-400">
                <SelectValue placeholder="Select outline type" />
              </SelectTrigger>
              <SelectContent>
                {outlineTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="detail">Detail Level</Label>
            <Select value={detail} onValueChange={setDetail}>
              <SelectTrigger className="border-2 border-slate-200 focus:border-slate-400">
                <SelectValue placeholder="Select detail level" />
              </SelectTrigger>
              <SelectContent>
                {detailLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specific-topics">Specific Topics to Include (Optional)</Label>
          <Textarea
            id="specific-topics"
            value={specificTopics}
            onChange={(e) => setSpecificTopics(e.target.value)}
            placeholder="List any specific topics, cases, or areas you want emphasized"
            className="min-h-[80px] border-2 border-slate-200 focus:border-slate-400"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Outline"}
        </Button>
      </div>

      {generatedOutline && (
        <Card className="mt-4 border-2 border-slate-300 shadow-lg overflow-hidden">
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center p-3 bg-slate-50 border-b border-slate-200`}>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <List className="h-5 w-5 text-slate-600" />
              <h3 className="font-bold text-slate-800">Legal Outline</h3>
            </div>
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-slate-300 hover:bg-slate-50 w-full md:w-auto">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 w-full md:w-auto">
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
                {generatedOutline}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalOutlineGenerator;
