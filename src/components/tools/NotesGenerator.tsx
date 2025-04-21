
import { useState } from "react";
import { generateNotes } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
        <Textarea
          value={notes}
          readOnly
          className="min-h-[300px] font-mono text-sm"
        />
      )}
    </div>
  );
};

export default NotesGenerator;
