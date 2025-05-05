
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Dice6, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const LegalTrivia = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    generateNewQuestion();
  }, []);
  
  const generateNewQuestion = async () => {
    setIsLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Generate a challenging legal trivia question. Format the response as a JSON object with the following structure:
      {
        "question": "The full question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of the correct answer"
      }
      Make sure the question is challenging but fair, and the explanation is educational.`;
      
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : text;
      
      try {
        const newQuestion = JSON.parse(jsonText);
        setQuestions([...questions, newQuestion]);
        setIsLoading(false);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        // Fall back to a default question if parsing fails
        const fallbackQuestion = {
          question: "Which constitutional amendment protects against unreasonable searches and seizures?",
          options: ["First Amendment", "Fourth Amendment", "Fifth Amendment", "Eighth Amendment"],
          correctAnswer: 1,
          explanation: "The Fourth Amendment protects citizens from unreasonable searches and seizures by the government."
        };
        
        setQuestions([...questions, fallbackQuestion]);
        setIsLoading(false);
        toast.error("Error generating question. Using fallback question.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      // Fall back to a default question
      const fallbackQuestion = {
        question: "Which constitutional amendment protects against unreasonable searches and seizures?",
        options: ["First Amendment", "Fourth Amendment", "Fifth Amendment", "Eighth Amendment"],
        correctAnswer: 1,
        explanation: "The Fourth Amendment protects citizens from unreasonable searches and seizures by the government."
      };
      
      setQuestions([...questions, fallbackQuestion]);
      setIsLoading(false);
      toast.error("Error generating question. Using fallback question.");
    }
  };
  
  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (questions.length > 0 && index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Incorrect!");
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };
  
  const nextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentQuestion + 1 < questions.length) {
      // Use existing question if available
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate new question if we've gone through all existing ones
      generateNewQuestion();
      setCurrentQuestion(questions.length); // This will be the index of the newly added question
    }
  };
  
  if (isLoading || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Generating legal trivia question...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Score: {score}/{questionsAnswered}</span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={nextQuestion}
          disabled={selectedOption === null}
        >
          Next Question
        </Button>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-medium text-blue-800 mb-3">
          {questions[currentQuestion]?.question || "Loading question..."}
        </p>
        
        <div className="space-y-2">
          {questions[currentQuestion]?.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start text-left ${
                selectedOption === index && index === questions[currentQuestion].correctAnswer 
                  ? "bg-green-100 border-green-500"
                : selectedOption === index
                  ? "bg-red-100 border-red-500"
                : "bg-white"
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              {option}
            </Button>
          ))}
        </div>
        
        {showExplanation && (
          <div className="mt-4 p-3 bg-blue-100 rounded text-sm">
            <p className="font-medium">Explanation:</p>
            <p>{questions[currentQuestion].explanation}</p>
          </div>
        )}
      </div>
      
      {selectedOption === null && (
        <Button
          className="w-full bg-[#1EAEDB] hover:bg-blue-600"
          onClick={() => toast.info("Select an option to answer the question!")}
        >
          <Dice6 className="mr-2" size={16} />
          Submit Answer
        </Button>
      )}
    </div>
  );
};

export default LegalTrivia;
