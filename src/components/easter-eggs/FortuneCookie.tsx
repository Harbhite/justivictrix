
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Cookie } from "lucide-react";

const FortuneCookie = () => {
  const [fortune, setFortune] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCracked, setIsCracked] = useState(false);

  const fortunes = [
    "A jury consists of twelve persons chosen to decide who has the better lawyer.",
    "Justice is blind, but she has very sophisticated listening devices.",
    "The wheels of justice turn slowly, but grind exceedingly fine.",
    "A good lawyer knows the law; a great lawyer knows the judge.",
    "Every case has two sides: your side, their wrong side.",
    "The law is reason, free from passion.",
    "Your legal career will be both prosperous and fulfilling.",
    "When law and morality contradict each other, the citizen has the cruel alternative of either losing his moral sense or losing his respect for the law.",
    "Where there's a will, there's a lawsuit.",
    "A clear conscience is usually the sign of a bad memory or a good lawyer.",
    "Law school is the art of thinking about many things at once, and getting them all slightly wrong.",
    "Success in law school leads to many opportunities, choose wisely.",
    "Your next legal argument will be particularly persuasive.",
    "Good lawyers know the law; great lawyers know the judge.",
    "Tomorrow's test will be easier than you think.",
    "A little knowledge of the law is a dangerous thing, but so is a lot."
  ];

  const crackCookie = async () => {
    setIsLoading(true);
    setIsCracked(false);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get random fortune
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setIsCracked(true);
      
    } catch (error) {
      console.error("Error cracking fortune cookie:", error);
      toast.error("Couldn't crack the fortune cookie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={crackCookie} 
        disabled={isLoading}
        className="w-full bg-[#D946EF] hover:bg-purple-600"
      >
        <Cookie className="mr-2" size={16} />
        {isLoading ? "Cracking..." : "Crack Open a Fortune Cookie"}
      </Button>
      
      {isCracked && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
          <div className="mb-2">
            <span className="text-3xl">🥠</span>
          </div>
          <p className="text-purple-900 italic font-medium">"{fortune}"</p>
        </div>
      )}
    </div>
  );
};

export default FortuneCookie;
