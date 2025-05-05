
import React from "react";
import AIMotivator from "@/components/easter-eggs/AIMotivator";
import FortuneCookie from "@/components/easter-eggs/FortuneCookie";
import QuoteGenerator from "@/components/easter-eggs/QuoteGenerator";
import WordScramble from "@/components/easter-eggs/WordScramble";
import LegalTrivia from "@/components/easter-eggs/LegalTrivia";
import CourtroomSimulator from "@/components/easter-eggs/CourtroomSimulator";
import LegalChatbot from "@/components/easter-eggs/LegalChatbot";
import ColorPalette from "@/components/easter-eggs/ColorPalette";

const EasterEggs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Tools & Fun Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* AI Motivator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#F97316] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Motivational Boost</h2>
            <p className="text-gray-600 mb-4">Get inspirational support when you need it most</p>
            <AIMotivator />
          </div>
        </div>

        {/* Fortune Cookie Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D946EF] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Fortune Cookie</h2>
            <p className="text-gray-600 mb-4">Discover pearls of wisdom from virtual fortune cookies</p>
            <FortuneCookie />
          </div>
        </div>

        {/* Word Scramble Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#8B5CF6] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Word Scramble</h2>
            <p className="text-gray-600 mb-4">Test your knowledge with scrambled legal terms</p>
            <WordScramble />
          </div>
        </div>

        {/* Legal Trivia Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#1EAEDB] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Trivia Challenge</h2>
            <p className="text-gray-600 mb-4">Test your knowledge with AI-generated legal questions</p>
            <LegalTrivia />
          </div>
        </div>

        {/* Quote Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#ea384c] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Inspiring Quotes</h2>
            <p className="text-gray-600 mb-4">Discover profound quotes about law and justice</p>
            <QuoteGenerator />
          </div>
        </div>

        {/* NEW: Courtroom Simulator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#9b87f5] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Courtroom Simulator</h2>
            <p className="text-gray-600 mb-4">Simulate legal cases with prosecution, defense, and judgments</p>
            <CourtroomSimulator />
          </div>
        </div>

        {/* NEW: Color Palette Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#f59e0b] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Color Palette Generator</h2>
            <p className="text-gray-600 mb-4">Generate color schemes for your legal documents and presentations</p>
            <ColorPalette />
          </div>
        </div>

        {/* Legal Chatbot Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#22c55e] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Assistant</h2>
            <p className="text-gray-600 mb-4">Chat with an AI to get legal information and guidance</p>
            <LegalChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
