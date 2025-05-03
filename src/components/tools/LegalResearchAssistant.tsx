
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LegalResearchAssistant = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a research query");
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call since we don't have an actual research API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data generation
      const mockResult = `# Research Results: ${query}

## Key Findings

### Relevant Statutes
- The Legal Framework Act (2018) provides the primary legislative basis for this area
- Section 23(a) specifically addresses the issue of ${query.toLowerCase()}

### Case Law
- In *Johnson v. Smith* (2020), the Supreme Court held that "${query}" requires careful consideration of both procedural and substantive factors
- *Davidson Corp. v. State* (2019) established a three-part test for determining applicability

### Legal Commentary
- Professor Maria Rodriguez argues in "Modern Legal Theory" (2021) that the conventional approach to ${query.toLowerCase()} is outdated
- The Harvard Law Review (Vol. 134) published a comprehensive analysis suggesting reform

## Analysis
The current legal framework surrounding ${query.toLowerCase()} reveals tensions between competing principles of justice and efficiency. Courts have generally favored a contextual analysis rather than applying rigid rules.

## Recommendations
1. Consider the three-part test from *Davidson*
2. Review the specific factual circumstances against Section 23(a) criteria
3. Prepare arguments addressing both procedural and substantive aspects`;

      const mockSources = [
        "The Legal Framework Act (2018)",
        "Johnson v. Smith, 567 U.S. 345 (2020)",
        "Davidson Corp. v. State, 789 F.3d 123 (2019)",
        "Rodriguez, M., 'Modern Legal Theory' (2021)",
        "Harvard Law Review, Vol. 134 (2021)"
      ];

      setResults(mockResult);
      setSources(mockSources);
    } catch (error) {
      console.error("Error in legal research:", error);
      toast.error("Failed to complete research");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!results) return;
    
    navigator.clipboard.writeText(results);
    toast.success("Research copied to clipboard");
  };

  const handleDownload = () => {
    if (!results) return;
    
    const element = document.createElement("a");
    const file = new Blob([results], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `legal-research-${query.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Research downloaded as markdown");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your legal research question..."
          className="flex-1"
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isLoading ? "Researching..." : "Research"}
        </Button>
      </div>

      {results && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2" size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2" size={16} />
              Download
            </Button>
          </div>

          <Card className="mt-4 border-2 border-teal-200 shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-teal-50 border-b border-teal-200">
              <div className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-teal-600" />
                <h3 className="font-bold text-teal-800">Research Results</h3>
              </div>
            </div>
            
            <CardContent className="p-6 max-h-[400px] overflow-y-auto bg-white">
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {results}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {sources.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">Sources</h4>
              <ul className="list-disc pl-5 space-y-1">
                {sources.map((source, index) => (
                  <li key={index} className="text-sm text-gray-600">{source}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LegalResearchAssistant;
