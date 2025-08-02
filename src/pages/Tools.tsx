import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, BookOpen, Book, MessageSquare, Plus, Minus, Sparkles, List, BrainCircuit, FileText, GanttChart, Gavel, FileSearch, Scroll, Mail, HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMetaTags } from "@/hooks/useMetaTags";
import MindMapGenerator from "@/components/tools/MindMapGenerator";
import NotesGenerator from "@/components/tools/NotesGenerator";
import LegalDictionary from "@/components/tools/LegalDictionary";
import LegalCaseGenerator from "@/components/tools/LegalCaseGenerator";
import LegalFlashcardGenerator from "@/components/tools/LegalFlashcardGenerator";
import ArgumentGenerator from "@/components/tools/ArgumentGenerator";
import IracGenerator from "@/components/tools/IracGenerator";
import CaseBriefGenerator from "@/components/tools/CaseBriefGenerator";
import LegalResearchAssistant from "@/components/tools/LegalResearchAssistant";
import LegalMemoGenerator from "@/components/tools/LegalMemoGenerator";
import ContractDrafterAI from "@/components/tools/ContractDrafterAI";
import LegalLetterGenerator from "@/components/tools/LegalLetterGenerator";
import LegalQAGenerator from "@/components/tools/LegalQAGenerator";
import LegalOutlineGenerator from "@/components/tools/LegalOutlineGenerator";

const Tools = () => {
  const [courses, setCourses] = useState([{ grade: "", units: "" }]);
  const [gradeScale, setGradeScale] = useState<"4.0" | "5.0">("4.0");
  const isMobile = useIsMobile();

  useMetaTags({
    title: "AI-Powered Legal Tools - Case Brief Generator, Contract Analyzer & Legal Research | LLB28 Hub",
    description: "Supercharge your legal studies with advanced AI tools: automated case brief generation, contract analysis, legal memorandum creation, citation formatting, and intelligent legal research assistance.",
    image: "/og-image.png",
    type: "website"
  });

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
      const gradePoints = getGradePoints(course.grade, gradeScale);
      const units = parseInt(course.units) || 0;
      return acc + (gradePoints * units);
    }, 0);

    const totalUnits = courses.reduce((acc, course) => {
      return acc + (parseInt(course.units) || 0);
    }, 0);

    return totalUnits === 0 ? 0 : (totalPoints / totalUnits).toFixed(2);
  };

  const getGradePoints = (grade: string, scale: "4.0" | "5.0") => {
    if (scale === "4.0") {
      const gradePoints: { [key: string]: number } = {
        "A": 4.0, "B": 3.0, "C": 2.0, "D": 1.0, "F": 0.0
      };
      return gradePoints[grade.toUpperCase()] || 0;
    } else {
      // 5.0 scale
      const gradePoints: { [key: string]: number } = {
        "A": 5.0, "B": 4.0, "C": 3.0, "D": 2.0, "E": 1.0, "F": 0.0
      };
      return gradePoints[grade.toUpperCase()] || 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8 md:space-y-12"
      >
        <h1 className="text-3xl md:text-5xl font-black text-law-dark mb-6 md:mb-12 border-4 border-black p-3 md:p-4 inline-block transform -rotate-1">
          Legal Tools
        </h1>

        {/* CGPA Calculator */}
        <div className="p-4 md:p-8 bg-yellow-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Scale size={isMobile ? 24 : 28} />
            CGPA Calculator
          </h2>
          
          <div className="mb-4">
            <RadioGroup
              defaultValue="4.0"
              value={gradeScale}
              onValueChange={(value) => setGradeScale(value as "4.0" | "5.0")}
              className="flex space-x-4 md:space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4.0" id="scale-4" />
                <Label htmlFor="scale-4">4.0 Scale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5.0" id="scale-5" />
                <Label htmlFor="scale-5">5.0 Scale</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="w-full md:w-auto">
                  <Select
                    value={course.grade}
                    onValueChange={(value) => updateCourse(index, "grade", value)}
                  >
                    <SelectTrigger className="w-full md:w-32 border-2 border-black">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeScale === "4.0" ? (
                        <>
                          <SelectItem value="A">A (4.0)</SelectItem>
                          <SelectItem value="B">B (3.0)</SelectItem>
                          <SelectItem value="C">C (2.0)</SelectItem>
                          <SelectItem value="D">D (1.0)</SelectItem>
                          <SelectItem value="F">F (0.0)</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="A">A (5.0)</SelectItem>
                          <SelectItem value="B">B (4.0)</SelectItem>
                          <SelectItem value="C">C (3.0)</SelectItem>
                          <SelectItem value="D">D (2.0)</SelectItem>
                          <SelectItem value="E">E (1.0)</SelectItem>
                          <SelectItem value="F">F (0.0)</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-auto">
                  <Select
                    value={course.units}
                    onValueChange={(value) => updateCourse(index, "units", value)}
                  >
                    <SelectTrigger className="w-full md:w-32 border-2 border-black">
                      <SelectValue placeholder="Units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Unit</SelectItem>
                      <SelectItem value="2">2 Units</SelectItem>
                      <SelectItem value="3">3 Units</SelectItem>
                      <SelectItem value="4">4 Units</SelectItem>
                      <SelectItem value="5">5 Units</SelectItem>
                      <SelectItem value="6">6 Units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button
                  onClick={() => removeCourse(index)}
                  className="w-full md:w-auto px-2 py-2 bg-red-500 text-white border-2 border-black hover:bg-red-600 flex items-center justify-center md:justify-start gap-2"
                >
                  <Minus size={16} />
                  {!isMobile && "Remove"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row md:items-center">
            <button
              onClick={addCourse}
              className="px-4 py-2 bg-green-500 text-white border-2 border-black hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add Course
            </button>
            <div className="mt-2 md:mt-0 text-xl md:text-2xl font-bold py-2 px-4 bg-white border-2 border-black">
              CGPA: {calculateCGPA()}
            </div>
          </div>
        </div>

        {/* Mind Map Generator */}
        <div className="p-4 md:p-8 bg-blue-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <BrainCircuit size={isMobile ? 24 : 28} />
            Legal Mind Map Generator
          </h2>
          <MindMapGenerator />
        </div>

        {/* Notes Generator */}
        <div className="p-4 md:p-8 bg-green-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <BookOpen size={isMobile ? 24 : 28} />
            Legal Notes Generator
          </h2>
          <NotesGenerator />
        </div>

        {/* Legal Dictionary */}
        <div className="p-4 md:p-8 bg-amber-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Book size={isMobile ? 24 : 28} />
            Legal Dictionary
          </h2>
          <LegalDictionary />
        </div>

        {/* Legal Case Generator */}
        <div className="p-4 md:p-8 bg-purple-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <FileText size={isMobile ? 24 : 28} />
            Legal Case Study Generator
          </h2>
          <LegalCaseGenerator />
        </div>

        {/* Legal Flashcard Generator */}
        <div className="p-4 md:p-8 bg-pink-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <List size={isMobile ? 24 : 28} />
            Legal Flashcards Generator
          </h2>
          <LegalFlashcardGenerator />
        </div>

        {/* Legal Argument Generator */}
        <div className="p-4 md:p-8 bg-indigo-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <MessageSquare size={isMobile ? 24 : 28} />
            Legal Arguments Generator
          </h2>
          <ArgumentGenerator />
        </div>

        {/* IRAC Generator */}
        <div className="p-4 md:p-8 bg-emerald-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <GanttChart size={isMobile ? 24 : 28} />
            AI IRAC Analysis Generator
          </h2>
          <IracGenerator />
        </div>

        {/* Case Brief Generator */}
        <div className="p-4 md:p-8 bg-orange-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Gavel size={isMobile ? 24 : 28} />
            Case Brief Generator
          </h2>
          <CaseBriefGenerator />
        </div>

        {/* Legal Research Assistant */}
        <div className="p-4 md:p-8 bg-teal-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <FileSearch size={isMobile ? 24 : 28} />
            Legal Research Assistant
          </h2>
          <LegalResearchAssistant />
        </div>

        {/* Legal Memo Generator */}
        <div className="p-4 md:p-8 bg-violet-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Scroll size={isMobile ? 24 : 28} />
            Legal Memo Generator
          </h2>
          <LegalMemoGenerator />
        </div>

        {/* Contract Drafter AI */}
        <div className="p-4 md:p-8 bg-indigo-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <FileText size={isMobile ? 24 : 28} />
            AI Contract Drafter
          </h2>
          <ContractDrafterAI />
        </div>

        {/* Legal Letter Generator */}
        <div className="p-4 md:p-8 bg-red-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Mail size={isMobile ? 24 : 28} />
            Legal Letter Generator
          </h2>
          <LegalLetterGenerator />
        </div>

        {/* Legal Q&A Generator */}
        <div className="p-4 md:p-8 bg-yellow-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <HelpCircle size={isMobile ? 24 : 28} />
            Legal Q&A Generator
          </h2>
          <LegalQAGenerator />
        </div>

        {/* Legal Outline Generator */}
        <div className="p-4 md:p-8 bg-slate-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <List size={isMobile ? 24 : 28} />
            Legal Outline Generator
          </h2>
          <LegalOutlineGenerator />
        </div>
      </motion.div>
    </div>
  );
};

export default Tools;
