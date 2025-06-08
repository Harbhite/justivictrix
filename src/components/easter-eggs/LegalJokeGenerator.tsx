
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Smile, RefreshCw } from "lucide-react";

const LegalJokeGenerator = () => {
  const [currentJoke, setCurrentJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const legalJokes = [
    {
      setup: "Why don't lawyers go to the beach?",
      punchline: "Because cats keep trying to bury them in the sand!"
    },
    {
      setup: "What's the difference between a lawyer and a herd of buffalo?",
      punchline: "The lawyer charges more!"
    },
    {
      setup: "Why did the law student bring a ladder to class?",
      punchline: "Because they heard the course was about higher courts!"
    },
    {
      setup: "What do you call a lawyer with an IQ of 100?",
      punchline: "Your Honor!"
    },
    {
      setup: "Why do lawyers wear neckties?",
      punchline: "To keep the foreskin from covering their face!"
    },
    {
      setup: "What's the difference between a good lawyer and a bad lawyer?",
      punchline: "A bad lawyer makes your case drag on for years. A good lawyer makes it drag on even longer!"
    },
    {
      setup: "Why don't sharks attack lawyers?",
      punchline: "Professional courtesy!"
    },
    {
      setup: "What do you call 25 lawyers buried up to their necks in sand?",
      punchline: "Not enough sand!"
    },
    {
      setup: "How do you know when a lawyer is lying?",
      punchline: "Their lips are moving!"
    },
    {
      setup: "What's the difference between a lawyer and a vulture?",
      punchline: "The vulture doesn't get frequent flyer miles!"
    },
    {
      setup: "Why did the law book go to therapy?",
      punchline: "It had too many issues!"
    },
    {
      setup: "What do you call a lawyer who doesn't chase ambulances?",
      punchline: "Retired!"
    },
    {
      setup: "Why do they bury lawyers 20 feet underground?",
      punchline: "Because deep down, they're really good people!"
    },
    {
      setup: "What's a lawyer's favorite drink?",
      punchline: "Subpoena colada!"
    },
    {
      setup: "Why did the judge wear a wig?",
      punchline: "Because he was having a bad hair day in court!"
    }
  ];

  const generateJoke = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomJoke = legalJokes[Math.floor(Math.random() * legalJokes.length)];
      setCurrentJoke(randomJoke);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button
          onClick={generateJoke}
          disabled={isLoading}
          className="flex items-center gap-2 mx-auto"
          variant="outline"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Smile className="h-4 w-4" />
          )}
          {isLoading ? "Getting a good one..." : "Tell me a legal joke!"}
        </Button>
      </div>

      {currentJoke && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200"
        >
          <div className="text-center space-y-3">
            <p className="text-gray-800 font-medium">
              {currentJoke.setup}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-blue-700 font-bold text-lg"
            >
              {currentJoke.punchline}
            </motion.p>
          </div>
        </motion.div>
      )}

      <div className="text-center">
        <p className="text-xs text-gray-500 mt-4">
          😄 Taking a break with humor can boost your study motivation!
        </p>
      </div>
    </div>
  );
};

export default LegalJokeGenerator;
