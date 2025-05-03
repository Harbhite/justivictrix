
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const AIMotivator = () => {
  const [motivation, setMotivation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const motivationalMessages = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. Remember, even the greatest legal minds faced setbacks.",
    "The law is a marathon, not a sprint. Keep going, one case at a time.",
    "Justice, like a good legal argument, takes time to build. You're laying the foundation for greatness.",
    "Every great lawyer once felt overwhelmed by their coursework too. This feeling is temporary, your knowledge is permanent.",
    "Legal excellence is built one page at a time. You've got this!",
    "The most significant legal changes in history came from people who refused to give up.",
    "Feeling defeated today doesn't mean you won't be victorious tomorrow. Legal studies build resilience.",
    "Your dedication to law will change lives one day. That's worth pushing through the tough moments.",
    "The best advocates know that perseverance is as important as knowledge. Keep going.",
    "You're learning to navigate complexity – a skill that will serve you forever. This difficult moment is sharpening your abilities.",
    "Justice needs champions who persevere. The world needs your voice.",
    "Your commitment today builds your competence tomorrow. Every page you read matters.",
    "Legal giants weren't born knowing everything. They were made through persistence."
  ];

  const getMotivation = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const randomMotivation = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMotivation(randomMotivation);
      
      toast.success("Motivation delivered!");
    } catch (error) {
      console.error("Error getting motivation:", error);
      toast.error("Couldn't retrieve motivation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={getMotivation} 
        disabled={isLoading}
        className="w-full bg-[#F97316] hover:bg-orange-600"
      >
        <Heart className="mr-2" size={16} />
        {isLoading ? "Finding inspiration..." : "I Need Motivation"}
      </Button>
      
      {motivation && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mt-4">
          <p className="text-gray-800 italic">"{motivation}"</p>
        </div>
      )}
    </div>
  );
};

export default AIMotivator;
