
import { useState } from "react";
import { generateFlashcards } from "@/utils/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Flashcard {
  question: string;
  answer: string;
}

const LegalFlashcardGenerator = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a legal topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateFlashcards(topic);
      setFlashcards(result);
      setCurrentCardIndex(0);
      setShowingAnswer(false);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error("Failed to generate flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!flashcards.length) return;
    
    const formattedText = flashcards.map((card, index) => 
      `Card ${index + 1}:\nQ: ${card.question}\nA: ${card.answer}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(formattedText);
    toast.success("Flashcards copied to clipboard");
  };

  const handleDownload = () => {
    if (!flashcards.length) return;
    
    const formattedText = flashcards.map((card, index) => 
      `Card ${index + 1}:\nQ: ${card.question}\nA: ${card.answer}`
    ).join('\n\n');
    
    const element = document.createElement("a");
    const file = new Blob([formattedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `flashcards-${topic.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Flashcards downloaded as text file");
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowingAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowingAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowingAnswer(!showingAnswer);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a legal topic for flashcards..."
          className="flex-1"
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          {isLoading ? "Generating..." : "Generate Flashcards"}
        </Button>
      </div>

      {flashcards.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Card {currentCardIndex + 1} of {flashcards.length}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2" size={16} />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2" size={16} />
                Download
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-black shadow-lg p-0">
            <div 
              className="min-h-[300px] p-8 flex flex-col justify-center items-center cursor-pointer"
              onClick={toggleAnswer}
            >
              <div className="text-center">
                {showingAnswer ? (
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Answer:</h3>
                    <p className="whitespace-pre-wrap">{flashcards[currentCardIndex].answer}</p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Question:</h3>
                    <p className="whitespace-pre-wrap">{flashcards[currentCardIndex].question}</p>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-8">(Click to flip card)</p>
            </div>
            
            <div className="flex justify-between p-4 bg-gray-50 border-t">
              <Button 
                variant="outline" 
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className="w-24"
              >
                <ChevronLeft className="mr-2" size={16} />
                Prev
              </Button>
              
              <Button
                onClick={toggleAnswer}
                variant="ghost"
              >
                {showingAnswer ? "Show Question" : "Show Answer"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={nextCard}
                disabled={currentCardIndex === flashcards.length - 1}
                className="w-24"
              >
                Next
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalFlashcardGenerator;
