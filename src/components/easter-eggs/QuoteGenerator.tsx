
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quote, Copy } from "lucide-react";
import { toast } from "sonner";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const legalQuotes = [
    {
      quote: "Justice denied anywhere diminishes justice everywhere.",
      author: "Martin Luther King Jr."
    },
    {
      quote: "It is better that ten guilty persons escape than that one innocent suffer.",
      author: "William Blackstone"
    },
    {
      quote: "The law is reason, free from passion.",
      author: "Aristotle"
    },
    {
      quote: "The power of the lawyer is in the uncertainty of the law.",
      author: "Jeremy Bentham"
    },
    {
      quote: "Laws are like cobwebs, which may catch small flies, but let wasps and hornets break through.",
      author: "Jonathan Swift"
    },
    {
      quote: "When the law is against you, argue the facts. When the facts are against you, argue the law.",
      author: "Legal adage"
    },
    {
      quote: "The first duty of society is justice.",
      author: "Alexander Hamilton"
    },
    {
      quote: "No man is above the law and no man is below it.",
      author: "Theodore Roosevelt"
    },
    {
      quote: "The safety of the people shall be the highest law.",
      author: "Cicero"
    },
    {
      quote: "It is not wisdom but authority that makes a law.",
      author: "Thomas Hobbes"
    },
    {
      quote: "Law is order, and good law is good order.",
      author: "Aristotle"
    },
    {
      quote: "The best way to get a bad law repealed is to enforce it strictly.",
      author: "Abraham Lincoln"
    }
  ];

  const generateQuote = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const randomQuote = legalQuotes[Math.floor(Math.random() * legalQuotes.length)];
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
      
    } catch (error) {
      console.error("Error generating quote:", error);
      toast.error("Failed to generate quote");
    } finally {
      setIsLoading(false);
    }
  };

  const copyQuote = () => {
    if (quote && author) {
      navigator.clipboard.writeText(`"${quote}" - ${author}`);
      toast.success("Quote copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={generateQuote} 
        disabled={isLoading}
        className="w-full bg-[#ea384c] hover:bg-red-600"
      >
        <Quote className="mr-2" size={16} />
        {isLoading ? "Finding wisdom..." : "Generate Legal Quote"}
      </Button>
      
      {quote && author && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2"
            onClick={copyQuote}
          >
            <Copy size={14} />
          </Button>
          
          <p className="text-gray-800 italic mb-2">"{quote}"</p>
          <p className="text-right text-gray-600">— {author}</p>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
