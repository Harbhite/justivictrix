
import { useState } from "react";
import { generateCitation } from "@/utils/gemini";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CitationRequest {
  type: string;
  title: string;
  author?: string;
  year?: string;
  court?: string;
  publisher?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  url?: string;
}

const CitationGenerator = () => {
  const [citationRequest, setCitationRequest] = useState<CitationRequest>({
    type: "case",
    title: "",
    author: "",
    year: "",
    court: "",
    publisher: "",
    journal: "",
    volume: "",
    issue: "",
    pages: "",
    url: "",
  });
  
  const [citationStyle, setCitationStyle] = useState("oscola");
  const [isLoading, setIsLoading] = useState(false);
  const [citation, setCitation] = useState<string | null>(null);

  const handleInputChange = (field: keyof CitationRequest, value: string) => {
    setCitationRequest({
      ...citationRequest,
      [field]: value,
    });
  };

  const handleGenerate = async () => {
    if (!citationRequest.title) {
      toast.error("Please enter at least the title");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateCitation(citationRequest, citationStyle);
      setCitation(result);
    } catch (error) {
      console.error("Error generating citation:", error);
      toast.error("Failed to generate citation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!citation) return;
    
    navigator.clipboard.writeText(citation);
    toast.success("Citation copied to clipboard");
  };

  const renderInputFields = () => {
    const commonFields = (
      <>
        <div className="space-y-1">
          <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
          <Input
            id="title"
            value={citationRequest.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Title of the source"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={citationRequest.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
            placeholder="Publication year"
          />
        </div>
      </>
    );

    switch (citationRequest.type) {
      case "case":
        return (
          <div className="space-y-4">
            {commonFields}
            
            <div className="space-y-1">
              <Label htmlFor="court">Court</Label>
              <Input
                id="court"
                value={citationRequest.court}
                onChange={(e) => handleInputChange("court", e.target.value)}
                placeholder="Court name"
              />
            </div>
          </div>
        );
        
      case "book":
        return (
          <div className="space-y-4">
            {commonFields}
            
            <div className="space-y-1">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={citationRequest.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={citationRequest.publisher}
                onChange={(e) => handleInputChange("publisher", e.target.value)}
                placeholder="Publisher"
              />
            </div>
          </div>
        );
        
      case "journal":
        return (
          <div className="space-y-4">
            {commonFields}
            
            <div className="space-y-1">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={citationRequest.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="journal">Journal</Label>
              <Input
                id="journal"
                value={citationRequest.journal}
                onChange={(e) => handleInputChange("journal", e.target.value)}
                placeholder="Journal name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="volume">Volume</Label>
                <Input
                  id="volume"
                  value={citationRequest.volume}
                  onChange={(e) => handleInputChange("volume", e.target.value)}
                  placeholder="Volume"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="issue">Issue</Label>
                <Input
                  id="issue"
                  value={citationRequest.issue}
                  onChange={(e) => handleInputChange("issue", e.target.value)}
                  placeholder="Issue"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="pages">Pages</Label>
              <Input
                id="pages"
                value={citationRequest.pages}
                onChange={(e) => handleInputChange("pages", e.target.value)}
                placeholder="Page range (e.g., 123-145)"
              />
            </div>
          </div>
        );
        
      case "website":
        return (
          <div className="space-y-4">
            {commonFields}
            
            <div className="space-y-1">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={citationRequest.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={citationRequest.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="Website URL"
              />
            </div>
          </div>
        );
        
      default:
        return commonFields;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="type">Source Type</Label>
              <Select
                value={citationRequest.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="case">Case Law</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="journal">Journal Article</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="style">Citation Style</Label>
              <Select
                value={citationStyle}
                onValueChange={setCitationStyle}
              >
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oscola">OSCOLA</SelectItem>
                  <SelectItem value="bluebook">Bluebook</SelectItem>
                  <SelectItem value="apa">APA</SelectItem>
                  <SelectItem value="mla">MLA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {renderInputFields()}
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
          >
            {isLoading ? "Generating..." : "Generate Citation"}
          </Button>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Generated Citation</span>
                {citation && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2" size={16} />
                    Copy
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {citation ? (
                <div className="p-4 border rounded-md bg-gray-50 font-mono text-sm whitespace-pre-wrap">
                  {citation}
                </div>
              ) : (
                <div className="text-center text-gray-500 p-8">
                  Fill in the form and click "Generate Citation" to see the result
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Citation Style Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="mb-2"><strong>Current Style:</strong> {
                citationStyle === "oscola" ? "OSCOLA (Oxford Standard for Citation of Legal Authorities)" :
                citationStyle === "bluebook" ? "Bluebook" :
                citationStyle === "apa" ? "APA (American Psychological Association)" :
                "MLA (Modern Language Association)"
              }</p>
              
              <p>Enter as much information as possible for the most accurate citation. Required fields are marked with <span className="text-red-500">*</span>.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CitationGenerator;
