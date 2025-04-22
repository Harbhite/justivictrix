
import { useState } from "react";
import { generateNotes } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";

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
    } catch (error) {
      console.error("Error generating notes:", error);
      toast.error("Failed to generate notes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!notes) return;
    
    navigator.clipboard.writeText(notes);
    toast.success("Notes copied to clipboard");
  };

  const handleExport = () => {
    if (!notes) return;
    
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-notes-${topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Notes exported as text file");
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
        <Button onClick={handleGenerate} disabled={isLoading}>
          Generate Notes
        </Button>
      </div>

      {notes && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2" size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2" size={16} />
              Export Text
            </Button>
          </div>

          <Textarea
            value={notes}
            readOnly
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default NotesGenerator;
