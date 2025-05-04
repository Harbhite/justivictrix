
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGenerator from "@/components/easter-eggs/ImageGenerator";
import AIMotivator from "@/components/easter-eggs/AIMotivator";
import FortuneCookie from "@/components/easter-eggs/FortuneCookie";
import ColorPalette from "@/components/easter-eggs/ColorPalette";
import MemeGenerator from "@/components/easter-eggs/MemeGenerator";
import QuoteGenerator from "@/components/easter-eggs/QuoteGenerator";

const EasterEggs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Tools & Fun Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Image Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#9b87f5] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Creative Image Generator</h2>
            <p className="text-gray-600 mb-4">Transform your ideas into stunning visuals with AI</p>
            <ImageGenerator />
          </div>
        </div>

        {/* AI Motivator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#F97316] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Inspiration Boost</h2>
            <p className="text-gray-600 mb-4">Get motivational support when you need it most</p>
            <AIMotivator />
          </div>
        </div>

        {/* Fortune Cookie Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D946EF] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Fortune Insights</h2>
            <p className="text-gray-600 mb-4">Discover pearls of wisdom from virtual fortune cookies</p>
            <FortuneCookie />
          </div>
        </div>

        {/* Color Palette Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#8B5CF6] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Design Color Explorer</h2>
            <p className="text-gray-600 mb-4">Discover perfect color combinations for your projects</p>
            <ColorPalette />
          </div>
        </div>

        {/* Meme Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#1EAEDB] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Meme Studio</h2>
            <p className="text-gray-600 mb-4">Create humorous law-themed visual content</p>
            <MemeGenerator />
          </div>
        </div>

        {/* Quote Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#ea384c] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Wisdom Quote Dispenser</h2>
            <p className="text-gray-600 mb-4">Discover profound quotes about law and justice</p>
            <QuoteGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
