
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const WordScramble = () => {
  const legalWords = [
    "JUSTICE", "VERDICT", "STATUTE", "COUNSEL", "EVIDENCE",
    "TESTIMONY", "CONTRACT", "ATTORNEY", "PLAINTIFF", "DEFENDANT"
  ];
  
  const [scrambledWord, setScrambledWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Function to scramble a word
  const scrambleWord = (word: string) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };
  
  // Generate a new scrambled word
  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * legalWords.length);
    const selectedWord = legalWords[randomIndex];
    const scrambled = scrambleWord(selectedWord);
    
    setOriginalWord(selectedWord);
    setScrambledWord(scrambled);
    setUserGuess("");
    setIsCorrect(null);
  };
  
  // Check user's guess
  const checkAnswer = () => {
    if (userGuess.toUpperCase() === originalWord) {
      setScore(score + 1);
      setIsCorrect(true);
      toast.success("Correct! Well done!");
      setTimeout(generateNewWord, 1500);
    } else {
      setIsCorrect(false);
      toast.error("Incorrect. Try again!");
    }
  };
  
  // Initialize game
  useEffect(() => {
    generateNewWord();
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Score: {score}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateNewWord}
        >
          New Word
        </Button>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold tracking-wider text-purple-800">
          {scrambledWord}
        </p>
        <p className="text-xs text-gray-500 mt-1">Unscramble this legal term</p>
      </div>
      
      <div className="flex gap-2">
        <Input
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
          placeholder="Enter your answer..."
          className={`flex-1 ${
            isCorrect === true ? "border-green-500" : 
            isCorrect === false ? "border-red-500" : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkAnswer();
          }}
        />
        <Button 
          onClick={checkAnswer}
          className="bg-[#D946EF] hover:bg-purple-700"
        >
          <Sparkles className="mr-2" size={16} />
          Check
        </Button>
      </div>
    </div>
  );
};

export default WordScramble;
