
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, BookTemplate, FileText, Gavel, Scale, Clock, BookOpen, MessageSquare } from "lucide-react";

const Tools = () => {
  const [courses, setCourses] = useState([{ grade: "", units: "" }]);
  const [iracOpen, setIracOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  
  // New state for new tools
  const [wordCount, setWordCount] = useState("");
  const [wordCountResult, setWordCountResult] = useState<{words: number, characters: number, sentences: number} | null>(null);
  
  const [caseParties, setCaseParties] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [caseReporter, setCaseReporter] = useState("");
  const [caseCitation, setCaseCitation] = useState("");
  
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroStatus, setPomodoroStatus] = useState("work"); // "work" or "break"

  const addCourse = () => {
    setCourses([...courses, { grade: "", units: "" }]);
  };

  const removeCourse = (index: number) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const updateCourse = (index: number, field: "grade" | "units", value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const calculateCGPA = () => {
    const totalPoints = courses.reduce((acc, course) => {
      const gradePoints = getGradePoints(course.grade);
      const units = parseInt(course.units) || 0;
      return acc + (gradePoints * units);
    }, 0);

    const totalUnits = courses.reduce((acc, course) => {
      return acc + (parseInt(course.units) || 0);
    }, 0);

    return totalUnits === 0 ? 0 : (totalPoints / totalUnits).toFixed(2);
  };

  const getGradePoints = (grade: string) => {
    const gradePoints: { [key: string]: number } = {
      "A": 4.0, "B": 3.0, "C": 2.0, "D": 1.0, "F": 0.0
    };
    return gradePoints[grade.toUpperCase()] || 0;
  };
  
  // Word Counter Tool
  const countWords = () => {
    if (!wordCount.trim()) return;
    
    const words = wordCount.trim().split(/\s+/).length;
    const characters = wordCount.length;
    const sentences = wordCount.split(/[.!?]+/).filter(Boolean).length;
    
    setWordCountResult({ words, characters, sentences });
  };
  
  // Case Citation Generator Tool
  const generateCaseCitation = () => {
    if (!caseParties.trim() || !caseYear.trim() || !caseReporter.trim()) return;
    
    const formattedParties = caseParties.trim().replace(/\s+/g, ' ');
    const formattedCitation = `${formattedParties} [${caseYear}] ${caseReporter}`;
    
    setCaseCitation(formattedCitation);
  };
  
  // Pomodoro Timer Tool
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (pomodoroRunning) {
      interval = setInterval(() => {
        if (pomodoroSeconds === 0) {
          if (pomodoroMinutes === 0) {
            // Time's up - switch modes
            if (pomodoroStatus === "work") {
              // Switch to break
              setPomodoroStatus("break");
              setPomodoroMinutes(5);
              setPomodoroSeconds(0);
              // Play notification sound
              const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
              audio.play();
            } else {
              // Switch to work
              setPomodoroStatus("work");
              setPomodoroMinutes(25);
              setPomodoroSeconds(0);
              // Play notification sound
              const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
              audio.play();
            }
          } else {
            setPomodoroMinutes(pomodoroMinutes - 1);
            setPomodoroSeconds(59);
          }
        } else {
          setPomodoroSeconds(pomodoroSeconds - 1);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroRunning, pomodoroMinutes, pomodoroSeconds, pomodoroStatus]);
  
  const startPomodoro = () => {
    setPomodoroRunning(true);
  };
  
  const pausePomodoro = () => {
    setPomodoroRunning(false);
  };
  
  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setPomodoroStatus("work");
    setPomodoroMinutes(25);
    setPomodoroSeconds(0);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Legal Tools
        </h1>

        {/* CGPA Calculator */}
        <div className="p-8 bg-yellow-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Scale size={28} />
            CGPA Calculator (4.0 Scale)
          </h2>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(index, "grade", e.target.value)}
                  className="p-2 border-2 border-black"
                >
                  <option value="">Grade</option>
                  <option value="A">A (4.0)</option>
                  <option value="B">B (3.0)</option>
                  <option value="C">C (2.0)</option>
                  <option value="D">D (1.0)</option>
                  <option value="F">F (0.0)</option>
                </select>
                <input
                  type="number"
                  value={course.units}
                  onChange={(e) => updateCourse(index, "units", e.target.value)}
                  placeholder="Units"
                  className="p-2 border-2 border-black"
                />
                <button
                  onClick={() => removeCourse(index)}
                  className="p-2 bg-red-500 text-white border-2 border-black hover:bg-red-600"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 space-x-4">
            <button
              onClick={addCourse}
              className="px-4 py-2 bg-green-500 text-white border-2 border-black hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={20} /> Add Course
            </button>
            <div className="mt-6 text-2xl font-bold">
              CGPA: {calculateCGPA()}
            </div>
          </div>
        </div>

        {/* NEW TOOL: Word Counter */}
        <div className="p-8 bg-green-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FileText size={28} />
            Legal Writing Analyzer
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">Perfect for counting words in your assignments, essays, and legal briefs</p>
            
            <textarea
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              placeholder="Paste your legal text here..."
              className="w-full h-40 p-4 border-2 border-black rounded"
            />
            
            <button
              onClick={countWords}
              className="px-4 py-2 bg-green-500 text-white border-2 border-black hover:bg-green-600"
            >
              Analyze Text
            </button>
            
            {wordCountResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-white border-2 border-black grid grid-cols-3 gap-4"
              >
                <div className="text-center">
                  <p className="text-xl font-bold">{wordCountResult.words}</p>
                  <p className="text-sm text-gray-500">Words</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{wordCountResult.characters}</p>
                  <p className="text-sm text-gray-500">Characters</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{wordCountResult.sentences}</p>
                  <p className="text-sm text-gray-500">Sentences</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* NEW TOOL: Case Citation Generator */}
        <div className="p-8 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Gavel size={28} />
            Case Citation Generator
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">Quickly format case citations for your legal assignments</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Case Parties</label>
                <input
                  type="text"
                  value={caseParties}
                  onChange={(e) => setCaseParties(e.target.value)}
                  placeholder="e.g., Amadi v. State"
                  className="w-full p-2 border-2 border-black rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="text"
                  value={caseYear}
                  onChange={(e) => setCaseYear(e.target.value)}
                  placeholder="e.g., 2010"
                  className="w-full p-2 border-2 border-black rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Law Report</label>
                <input
                  type="text"
                  value={caseReporter}
                  onChange={(e) => setCaseReporter(e.target.value)}
                  placeholder="e.g., 2 NWLR (Pt. 1120) 12"
                  className="w-full p-2 border-2 border-black rounded"
                />
              </div>
            </div>
            
            <button
              onClick={generateCaseCitation}
              className="px-4 py-2 bg-purple-500 text-white border-2 border-black hover:bg-purple-600"
            >
              Generate Citation
            </button>
            
            {caseCitation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-white border-2 border-black"
              >
                <p className="font-medium">Generated Citation:</p>
                <p className="font-bold text-xl mt-2">{caseCitation}</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(caseCitation);
                    alert("Citation copied to clipboard!");
                  }}
                  className="mt-2 text-sm text-purple-700 hover:text-purple-900 underline"
                >
                  Copy to clipboard
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* NEW TOOL: Pomodoro Study Timer */}
        <div className="p-8 bg-blue-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Clock size={28} />
            Pomodoro Study Timer
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Boost your study productivity with the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break
            </p>
            
            <div className="flex flex-col items-center">
              <div className={`text-5xl font-bold mb-6 p-8 rounded-full ${
                pomodoroStatus === "work" ? "bg-red-200" : "bg-green-200"
              }`}>
                {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
              </div>
              
              <p className="text-lg font-medium mb-4">
                {pomodoroStatus === "work" ? "💼 Work Session" : "☕ Break Time"}
              </p>
              
              <div className="flex gap-4">
                {!pomodoroRunning ? (
                  <button
                    onClick={startPomodoro}
                    className="px-6 py-2 bg-blue-500 text-white border-2 border-black hover:bg-blue-600 rounded"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pausePomodoro}
                    className="px-6 py-2 bg-yellow-500 text-white border-2 border-black hover:bg-yellow-600 rounded"
                  >
                    Pause
                  </button>
                )}
                
                <button
                  onClick={resetPomodoro}
                  className="px-6 py-2 bg-gray-500 text-white border-2 border-black hover:bg-gray-600 rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* IRAC Method Guide */}
        <div className="p-8 bg-red-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare size={28} />
              IRAC Method Guide
            </span>
            <button
              onClick={() => setIracOpen(!iracOpen)}
              className="text-xl border-2 border-black px-4 py-2 hover:bg-red-200"
            >
              {iracOpen ? "Close" : "Open"} Guide
            </button>
          </h2>

          {iracOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              <div className="p-6 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-3">Issue (What's the legal question?)</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Identify the specific legal problem or question that needs to be resolved</li>
                  <li>Focus on the key legal issues, not just factual disputes</li>
                  <li>Frame the issue as a question that can be answered with legal analysis</li>
                </ul>
              </div>

              <div className="p-6 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-3">Rule (What law applies?)</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>State the relevant legal rules from statutes, cases, or regulations</li>
                  <li>Include any tests or elements that courts use to apply the rule</li>
                  <li>Cite specific legal authorities that establish the rule</li>
                </ul>
              </div>

              <div className="p-6 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-3">Analysis (How does the law apply?)</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Apply the rule to the specific facts of your case</li>
                  <li>Explain why the facts satisfy or fail to satisfy each element of the rule</li>
                  <li>Compare and contrast with precedent cases</li>
                  <li>Consider counter-arguments and address them</li>
                </ul>
              </div>

              <div className="p-6 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-3">Conclusion (What's the outcome?)</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>State your final conclusion based on the analysis</li>
                  <li>Briefly summarize the key reasons supporting your conclusion</li>
                  <li>Address any practical implications or next steps</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* Citation Reference Guide */}
        <div className="p-8 bg-amber-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookTemplate className="w-8 h-8" />
              Citation Reference Guide
            </span>
            <button
              onClick={() => setReferenceOpen(!referenceOpen)}
              className="text-xl border-2 border-black px-4 py-2 hover:bg-amber-200"
            >
              {referenceOpen ? "Close" : "Open"} Guide
            </button>
          </h2>

          {referenceOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 bg-white border-2 border-black">
                  <h3 className="text-lg font-bold mb-2">Case Citation</h3>
                  <p className="mb-2">Format: [Year] Volume Law Report Page</p>
                  <p className="text-sm text-gray-600">Example: [2015] 2 NWLR (Pt. 1443) 1</p>
                </div>
                
                <div className="p-4 bg-white border-2 border-black">
                  <h3 className="text-lg font-bold mb-2">Statute Citation</h3>
                  <p className="mb-2">Format: Name of Act, Year, Section</p>
                  <p className="text-sm text-gray-600">Example: Constitution of the Federal Republic of Nigeria, 1999, s.1</p>
                </div>
                
                <div className="p-4 bg-white border-2 border-black">
                  <h3 className="text-lg font-bold mb-2">Journal Articles</h3>
                  <p className="mb-2">Format: Author, "Title" (Year) Volume Journal Page</p>
                  <p className="text-sm text-gray-600">Example: Smith J, "Legal Theory" (2020) 15 LLR 45</p>
                </div>
                
                <div className="p-4 bg-white border-2 border-black">
                  <h3 className="text-lg font-bold mb-2">Books</h3>
                  <p className="mb-2">Format: Author, Title (Edition, Publisher Year) Page</p>
                  <p className="text-sm text-gray-600">Example: John Doe, Law of Contract (3rd edn, Sweet & Maxwell 2019) 156</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Tools;
