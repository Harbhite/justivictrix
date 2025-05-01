
import { useState } from "react";
import { generateArguments } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleDownload = () => {
    if (!generatedArguments) return;
    
    let textToDownload = `Arguments for "${topic}"\n\n`;
    textToDownload += "ARGUMENTS IN FAVOR:\n\n";
    generatedArguments.pro.forEach((arg, i) => {
      textToDownload += `${i + 1}. ${arg}\n\n`;
    });
    
    textToDownload += "\nARGUMENTS AGAINST:\n\n";
    generatedArguments.contra.forEach((arg, i) => {
      textToDownload += `${i + 1}. ${arg}\n\n`;
    });
    
    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `arguments-${topic.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Arguments downloaded as text file");
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
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2" size={16} />
              Download
            </Button>
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
