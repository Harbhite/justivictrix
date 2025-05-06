
import { useState } from "react";
import { generateNotes } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, BookOpen, FileText, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NotesGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateNotes(topic);
      setNotes(result);
      toast.success("Notes generated successfully");
    } catch (error) {
      console.error("Error generating notes:", error);
      toast.error("Failed to generate notes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!notes) {
      toast.error("No notes to copy");
      return;
    }
    
    navigator.clipboard.writeText(notes);
    toast.success("Notes copied to clipboard");
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!notes) {
      toast.error("No notes to export");
      return;
    }
    
    const fileName = `legal-notes-${topic.toLowerCase().replace(/\s+/g, '-')}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, notes);
        break;
      case 'pdf':
        downloadAsPDF(fileName, notes);
        break;
      case 'docx':
        downloadAsDocx(fileName, notes);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal topic for notes..."
          className="flex-1"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Generating..." : "Generate Notes"}
        </Button>
      </div>

      {notes && (
        <Card className="mt-4 border-2 border-gray-300 shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-blue-50 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-blue-800">Generated Notes: {topic}</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="border-blue-300 hover:bg-blue-50">
                <Copy className="mr-2" size={16} />
                Copy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-blue-300 hover:bg-blue-50">
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
                    <FileCode className="mr-2" size={16} />
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
          
          <CardContent className="p-6 max-h-[400px] overflow-y-auto bg-white">
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {notes}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotesGenerator;
