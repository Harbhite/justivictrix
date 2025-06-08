
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Coffee, Moon, Zap, Target } from "lucide-react";

const StudyMoodTracker = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<{ mood: string; time: string }[]>([]);

  const moods = [
    { name: "Motivated", icon: Target, color: "bg-green-500", advice: "Perfect! Channel this energy into your most challenging subjects." },
    { name: "Focused", icon: Brain, color: "bg-blue-500", advice: "Great focus! This is ideal for complex legal reading and case analysis." },
    { name: "Energetic", icon: Zap, color: "bg-yellow-500", advice: "High energy detected! Perfect time for active learning and note-taking." },
    { name: "Relaxed", icon: Heart, color: "bg-pink-500", advice: "Calm mind is perfect for reviewing and light reading." },
    { name: "Need Coffee", icon: Coffee, color: "bg-orange-500", advice: "Take a coffee break first, then tackle easier review materials." },
    { name: "Tired", icon: Moon, color: "bg-purple-500", advice: "Consider a short break or lighter study activities like flashcards." }
  ];

  const trackMood = (mood: string) => {
    setCurrentMood(mood);
    const newEntry = {
      mood,
      time: new Date().toLocaleTimeString()
    };
    setMoodHistory(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  const selectedMood = moods.find(m => m.name === currentMood);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">How are you feeling about studying right now?</h3>
        <div className="grid grid-cols-3 gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <Button
                key={mood.name}
                variant="outline"
                size="sm"
                onClick={() => trackMood(mood.name)}
                className={`flex flex-col items-center gap-1 h-auto py-2 ${
                  currentMood === mood.name ? mood.color + " text-white" : ""
                }`}
              >
                <Icon size={16} />
                <span className="text-xs">{mood.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <h4 className="font-semibold text-green-700 mb-2">Study Advice:</h4>
          <p className="text-sm text-gray-700">{selectedMood.advice}</p>
        </motion.div>
      )}

      {moodHistory.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-sm">Recent Mood History:</h4>
          <div className="space-y-1">
            {moodHistory.map((entry, index) => (
              <div key={index} className="text-xs text-gray-600 flex justify-between">
                <span>{entry.mood}</span>
                <span>{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMoodTracker;
