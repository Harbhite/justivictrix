
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMetaTags } from "@/hooks/useMetaTags";
import AIMotivator from "@/components/easter-eggs/AIMotivator";
import FortuneCookie from "@/components/easter-eggs/FortuneCookie";
import QuoteGenerator from "@/components/easter-eggs/QuoteGenerator";
import WordScramble from "@/components/easter-eggs/WordScramble";
import LegalChatbot from "@/components/easter-eggs/LegalChatbot";
import StudyMoodTracker from "@/components/easter-eggs/StudyMoodTracker";
import PomodoroTimer from "@/components/easter-eggs/PomodoroTimer";
import LegalJokeGenerator from "@/components/easter-eggs/LegalJokeGenerator";

const EasterEggs = () => {
  const isMobile = useIsMobile();

  useMetaTags({
    title: "Interactive Tools & Fun Features - LLB28 Hub",
    description: "Discover fun and interactive tools including AI motivator, legal fortune cookies, word games, study timers, and more.",
    image: "/og-image.png",
    type: "website"
  });
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-fade-in-up">Interactive Tools & Fun Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Motivational Boost</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Get inspirational support when you need it most</p>
            <AIMotivator />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Fortune Cookie</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Discover pearls of wisdom from virtual fortune cookies</p>
            <FortuneCookie />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Word Scramble</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Test your knowledge with scrambled legal terms</p>
            <WordScramble />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Inspiring Quotes</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Discover profound quotes about law and justice</p>
            <QuoteGenerator />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Assistant</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Chat with an AI to get legal information and guidance</p>
            <LegalChatbot />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Study Mood Tracker</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Track your study mood and get personalized advice</p>
            <StudyMoodTracker />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Pomodoro Study Timer</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Stay focused with the proven Pomodoro technique</p>
            <PomodoroTimer />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover-animate-jelly">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Joke Generator</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Take a break with some legal humor and jokes</p>
            <LegalJokeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
