
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGenerator from "@/components/easter-eggs/ImageGenerator";
import AIMotivator from "@/components/easter-eggs/AIMotivator";
import RandomIconGenerator from "@/components/easter-eggs/RandomIconGenerator";
import FortuneCookie from "@/components/easter-eggs/FortuneCookie";
import ColorPalette from "@/components/easter-eggs/ColorPalette";
import MemeGenerator from "@/components/easter-eggs/MemeGenerator";
import QuoteGenerator from "@/components/easter-eggs/QuoteGenerator";

const EasterEggs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Easter Eggs & Fun Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Image Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#9b87f5] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">AI Image Generator</h2>
            <p className="text-gray-600 mb-4">Create unique images from text prompts using AI</p>
            <ImageGenerator />
          </div>
        </div>

        {/* AI Motivator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#F97316] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">AI Motivator</h2>
            <p className="text-gray-600 mb-4">Get emotional motivation when you need it most</p>
            <AIMotivator />
          </div>
        </div>

        {/* Random Icon Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#0EA5E9] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Random Icon Generator</h2>
            <p className="text-gray-600 mb-4">Generate random icons for your projects</p>
            <RandomIconGenerator />
          </div>
        </div>

        {/* Fortune Cookie Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D946EF] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Digital Fortune Cookie</h2>
            <p className="text-gray-600 mb-4">Crack open a virtual fortune cookie for wisdom</p>
            <FortuneCookie />
          </div>
        </div>

        {/* Color Palette Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#8B5CF6] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Color Palette Generator</h2>
            <p className="text-gray-600 mb-4">Create beautiful color schemes instantly</p>
            <ColorPalette />
          </div>
        </div>

        {/* Meme Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#1EAEDB] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Law Meme Generator</h2>
            <p className="text-gray-600 mb-4">Create funny law-related memes</p>
            <MemeGenerator />
          </div>
        </div>

        {/* Quote Generator Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#ea384c] hover:shadow-xl transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Legal Quote Generator</h2>
            <p className="text-gray-600 mb-4">Generate inspirational quotes about law and justice</p>
            <QuoteGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
