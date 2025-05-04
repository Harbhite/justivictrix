
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Dice6 } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const LegalTrivia = () => {
  const [questions] = useState<Question[]>([
    {
      question: "Which constitutional amendment protects against unreasonable searches and seizures?",
      options: ["First Amendment", "Fourth Amendment", "Fifth Amendment", "Eighth Amendment"],
      correctAnswer: 1,
      explanation: "The Fourth Amendment protects citizens from unreasonable searches and seizures by the government."
    },
    {
      question: "In legal terms, what does 'stare decisis' mean?",
      options: ["To stand by things decided", "To question precedent", "To judge fairly", "To establish new law"],
      correctAnswer: 0,
      explanation: "Stare decisis is a legal principle that obligates courts to follow historical cases when making a ruling on a similar case."
    },
    {
      question: "What is the term for a formal written statement by a defendant in a civil case?",
      options: ["Indictment", "Answer", "Testimony", "Affidavit"],
      correctAnswer: 1,
      explanation: "An answer is a defendant's written response to a plaintiff's initial complaint in a civil case."
    },
    {
      question: "Who has the power to nominate Supreme Court justices?",
      options: ["Congress", "The President", "The Senate", "The Chief Justice"],
      correctAnswer: 1,
      explanation: "The President nominates Supreme Court justices, who must then be confirmed by the Senate."
    },
    {
      question: "What is 'habeas corpus'?",
      options: ["Right to remain silent", "Right to a fair trial", "Right to challenge unlawful detention", "Right to an attorney"],
      correctAnswer: 2,
      explanation: "Habeas corpus is a legal recourse that allows a person to report an unlawful detention or imprisonment to a court."
    }
  ]);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  
  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Incorrect!");
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };
  
  const nextQuestion = () => {
    const nextIndex = (currentQuestion + 1) % questions.length;
    setCurrentQuestion(nextIndex);
    setSelectedOption(null);
    setShowExplanation(false);
  };
  
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
          {questions[currentQuestion].question}
        </p>
        
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
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
