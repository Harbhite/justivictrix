
import { useState } from "react";
import { generateMindMap } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface MindMapNode {
  topic: string;
  children: string[];
}

interface MindMapData {
  center: string;
  branches: MindMapNode[];
}

const MindMapGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mindMap, setMindMap] = useState<MindMapData | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateMindMap(topic);
      setMindMap(result);
    } catch (error) {
      console.error("Error generating mind map:", error);
      toast.error("Failed to generate mind map");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!mindMap) return;
    
    const formattedText = `
# ${mindMap.center}

${mindMap.branches.map(branch => `
## ${branch.topic}
${branch.children.map(child => `- ${child}`).join('\n')}
`).join('\n')}
    `;
    
    navigator.clipboard.writeText(formattedText.trim());
    toast.success("Mind map copied to clipboard");
  };

  const handleExport = async () => {
    if (!mindMap) return;
    
    const mindMapElement = document.getElementById('mind-map');
    if (!mindMapElement) return;
    
    try {
      const canvas = await html2canvas(mindMapElement);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.text(`Mind Map: ${mindMap.center}`, 10, 10);
      pdf.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
      pdf.save(`mind-map-${mindMap.center.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      toast.success("Mind map exported as PDF");
    } catch (error) {
      console.error("Error exporting mind map:", error);
      toast.error("Failed to export mind map");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal topic..."
          className="flex-1"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          {isLoading ? "Generating..." : "Generate Mind Map"}
        </Button>
      </div>

      {mindMap && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2" size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2" size={16} />
              Export PDF
            </Button>
          </div>

          <div id="mind-map" className="bg-white p-6 rounded-lg border-2 border-black shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-law-dark border-b-2 pb-2">
              {mindMap.center}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mindMap.branches.map((branch, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-lg mb-3 text-law-dark">{branch.topic}</h4>
                  <ul className="space-y-2">
                    {branch.children.map((child, childIndex) => (
                      <li 
                        key={childIndex} 
                        className="text-sm flex items-start"
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        <span className="text-gray-700">{child}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapGenerator;
