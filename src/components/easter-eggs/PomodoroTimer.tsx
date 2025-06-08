
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { toast } from "sonner";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (!isBreak) {
      // Study session completed
      setSessions(prev => prev + 1);
      setIsBreak(true);
      setTimeLeft(5 * 60); // 5-minute break
      toast.success("Study session complete! Time for a break! 🎉");
    } else {
      // Break completed
      setIsBreak(false);
      setTimeLeft(25 * 60); // Back to 25-minute study session
      toast.success("Break over! Ready for another study session? 📚");
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock size={20} />
          <h3 className="text-lg font-semibold">
            {isBreak ? "Break Time" : "Study Session"}
          </h3>
        </div>
        
        <motion.div
          className={`text-4xl font-bold ${
            isBreak ? "text-green-600" : "text-blue-600"
          }`}
          animate={{ scale: isActive && timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: isActive && timeLeft <= 10 ? Infinity : 0, duration: 1 }}
        >
          {formatTime(timeLeft)}
        </motion.div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            className={`h-2 rounded-full ${
              isBreak ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          onClick={toggleTimer}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          {isActive ? "Pause" : "Start"}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>

      {sessions > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Sessions Completed: {sessions} 🏆
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {sessions >= 4 ? "Amazing! You've earned a long break!" : 
             sessions >= 2 ? "Great progress! Keep it up!" : 
             "Good start! You're building momentum!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
