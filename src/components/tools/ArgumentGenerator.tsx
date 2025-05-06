
import { useState } from "react";
import { generateArguments } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, FileText, FileCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadAsPDF, downloadAsTxt, downloadAsDocx } from "@/utils/downloadUtils";

interface Argument {
  pro: string[];
  contra: string[];
}

const ArgumentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedArguments, setGeneratedArguments] = useState<Argument | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a legal issue or topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateArguments(topic);
      setGeneratedArguments(result);
    } catch (error) {
      console.error("Error generating arguments:", error);
      toast.error("Failed to generate arguments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (type: 'pro' | 'contra' | 'all') => {
    if (!generatedArguments) return;
    
    let textToCopy = '';
    
    if (type === 'pro' || type === 'all') {
      textToCopy += "Arguments in Favor:\n\n";
      generatedArguments.pro.forEach((arg, i) => {
        textToCopy += `${i + 1}. ${arg}\n`;
      });
    }
    
    if (type === 'contra' || type === 'all') {
      if (type === 'all') textToCopy += "\n\n";
      textToCopy += "Arguments Against:\n\n";
      generatedArguments.contra.forEach((arg, i) => {
        textToCopy += `${i + 1}. ${arg}\n`;
      });
    }
    
    navigator.clipboard.writeText(textToCopy);
    toast.success(`${type === 'all' ? 'All arguments' : (type === 'pro' ? 'Arguments in favor' : 'Arguments against')} copied to clipboard`);
  };

  const prepareContent = () => {
    if (!generatedArguments) return "";
    
    let content = `Arguments for "${topic}"\n\n`;
    content += "ARGUMENTS IN FAVOR:\n\n";
    generatedArguments.pro.forEach((arg, i) => {
      content += `${i + 1}. ${arg}\n\n`;
    });
    
    content += "\nARGUMENTS AGAINST:\n\n";
    generatedArguments.contra.forEach((arg, i) => {
      content += `${i + 1}. ${arg}\n\n`;
    });
    
    return content;
  };

  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    if (!generatedArguments) return;
    
    const content = prepareContent();
    const fileName = `arguments-${topic.toLowerCase().replace(/\s+/g, "-")}`;
    
    switch (format) {
      case 'txt':
        downloadAsTxt(fileName, content);
        break;
      case 'pdf':
        downloadAsPDF(fileName, content);
        break;
      case 'docx':
        downloadAsDocx(fileName, content);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal issue or topic..."
          className="flex-1"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          {isLoading ? "Generating..." : "Generate Arguments"}
        </Button>
      </div>

      {generatedArguments && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => handleCopy('all')}>
              <Copy className="mr-2" size={16} />
              Copy All
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2" size={16} />
                  Download
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

          <div className="bg-white rounded-lg border-2 border-black shadow-lg overflow-hidden">
            <Tabs defaultValue="pro">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="pro">Arguments in Favor</TabsTrigger>
                <TabsTrigger value="contra">Arguments Against</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pro" className="p-6">
                <div className="flex justify-end mb-4">
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('pro')}>
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                
                <ul className="space-y-4">
                  {generatedArguments.pro.map((arg, index) => (
                    <li key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="whitespace-pre-wrap">{arg}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="contra" className="p-6">
                <div className="flex justify-end mb-4">
                  <Button variant="ghost" size="sm" onClick={() => handleCopy('contra')}>
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                </div>
                
                <ul className="space-y-4">
                  {generatedArguments.contra.map((arg, index) => (
                    <li key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <p className="whitespace-pre-wrap">{arg}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArgumentGenerator;
