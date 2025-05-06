
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AIMotivator from "@/components/easter-eggs/AIMotivator";
import FortuneCookie from "@/components/easter-eggs/FortuneCookie";
import QuoteGenerator from "@/components/easter-eggs/QuoteGenerator";
import WordScramble from "@/components/easter-eggs/WordScramble";
import LegalChatbot from "@/components/easter-eggs/LegalChatbot";

const EasterEggs = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Interactive Tools & Fun Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {/* AI Motivator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#F97316] hover:shadow-xl transition-all">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Motivational Boost</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Get inspirational support when you need it most</p>
            <AIMotivator />
          </div>
        </div>

        {/* Fortune Cookie Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D946EF] hover:shadow-xl transition-all">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Fortune Cookie</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Discover pearls of wisdom from virtual fortune cookies</p>
            <FortuneCookie />
          </div>
        </div>

        {/* Word Scramble Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#8B5CF6] hover:shadow-xl transition-all">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Word Scramble</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Test your knowledge with scrambled legal terms</p>
            <WordScramble />
          </div>
        </div>

        {/* Quote Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#ea384c] hover:shadow-xl transition-all">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Inspiring Quotes</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Discover profound quotes about law and justice</p>
            <QuoteGenerator />
          </div>
        </div>

        {/* Legal Chatbot Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#22c55e] hover:shadow-xl transition-all">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Legal Assistant</h2>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">Chat with an AI to get legal information and guidance</p>
            <LegalChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
