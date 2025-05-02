import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, BookOpen, Book, MessageSquare, BookTemplate, Plus, Minus, Sparkles, List, BrainCircuit, FileText, GanttChart, File } from "lucide-react";
import MindMapGenerator from "@/components/tools/MindMapGenerator";
import NotesGenerator from "@/components/tools/NotesGenerator";
import LegalDictionary from "@/components/tools/LegalDictionary";
import LegalCaseGenerator from "@/components/tools/LegalCaseGenerator";
import LegalFlashcardGenerator from "@/components/tools/LegalFlashcardGenerator";
import ArgumentGenerator from "@/components/tools/ArgumentGenerator";
import CitationGenerator from "@/components/tools/CitationGenerator";
import IracGuideGenerator from "@/components/tools/IracGuideGenerator";
import ContractGenerator from "@/components/tools/ContractGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tools = () => {
  const [courses, setCourses] = useState([{ grade: "", units: "" }]);
  const [referenceOpen, setReferenceOpen] = useState(false);

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

        {/* AI Tools Section with Tabs */}
        <div className="p-8 bg-blue-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Sparkles size={28} />
            AI Legal Assistant Tools
          </h2>

          <Tabs defaultValue="mind-map" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 mb-8">
              <TabsTrigger value="mind-map" className="text-xs md:text-sm">Mind Map</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs md:text-sm">Study Notes</TabsTrigger>
              <TabsTrigger value="dictionary" className="text-xs md:text-sm">Dictionary</TabsTrigger>
              <TabsTrigger value="case-study" className="text-xs md:text-sm">Case Study</TabsTrigger>
              <TabsTrigger value="flashcards" className="text-xs md:text-sm">Flashcards</TabsTrigger>
              <TabsTrigger value="arguments" className="text-xs md:text-sm">Arguments</TabsTrigger>
              <TabsTrigger value="citation" className="text-xs md:text-sm">Citation</TabsTrigger>
              <TabsTrigger value="irac" className="text-xs md:text-sm">IRAC Guide</TabsTrigger>
              <TabsTrigger value="contract" className="text-xs md:text-sm">Contracts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mind-map">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BrainCircuit size={20} />
                  Legal Mind Map Generator
                </h3>
                <MindMapGenerator />
              </div>
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Legal Notes Generator
                </h3>
                <NotesGenerator />
              </div>
            </TabsContent>
            
            <TabsContent value="dictionary">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Book size={20} />
                  Legal Dictionary
                </h3>
                <LegalDictionary />
              </div>
            </TabsContent>
            
            <TabsContent value="case-study">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Legal Case Study Generator
                </h3>
                <LegalCaseGenerator />
              </div>
            </TabsContent>
            
            <TabsContent value="flashcards">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <List size={20} />
                  Legal Flashcards Generator
                </h3>
                <LegalFlashcardGenerator />
              </div>
            </TabsContent>
            
            <TabsContent value="arguments">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Legal Arguments Generator
                </h3>
                <ArgumentGenerator />
              </div>
            </TabsContent>
            
            <TabsContent value="citation">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookTemplate size={20} />
                  Legal Citation Generator
                </h3>
                <CitationGenerator />
              </div>
            </TabsContent>

            <TabsContent value="irac">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GanttChart size={20} />
                  AI IRAC Analysis Generator
                </h3>
                <IracGuideGenerator />
              </div>
            </TabsContent>

            <TabsContent value="contract">
              <div className="rounded-lg bg-white p-6 shadow-md border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <File size={20} />
                  Legal Contract Generator
                </h3>
                <ContractGenerator />
              </div>
            </TabsContent>
          </Tabs>
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
