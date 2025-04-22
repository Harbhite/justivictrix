
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
        <Button onClick={handleGenerate} disabled={isLoading}>
          Generate Mind Map
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

          <div id="mind-map" className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-xl font-bold text-center mb-4">{mindMap.center}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mindMap.branches.map((branch, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold mb-2">{branch.topic}</h4>
                  <ul className="list-disc list-inside">
                    {branch.children.map((child, childIndex) => (
                      <li key={childIndex} className="text-sm">{child}</li>
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
