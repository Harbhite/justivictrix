
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const Tools = () => {
  const [courses, setCourses] = useState([{ grade: "", units: "" }]);
  const [iracOpen, setIracOpen] = useState(false);

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
      "A": 5.0, "B": 4.0, "C": 3.0, "D": 2.0, "F": 0.0
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
          <h2 className="text-3xl font-bold mb-6">CGPA Calculator</h2>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(index, "grade", e.target.value)}
                  className="p-2 border-2 border-black"
                >
                  <option value="">Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
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

        {/* IRAC Method Guide */}
        <div className="p-8 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-between">
            IRAC Method Guide
            <button
              onClick={() => setIracOpen(!iracOpen)}
              className="text-xl border-2 border-black px-4 py-2 hover:bg-purple-200"
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
              <div className="p-4 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-2">Issue</h3>
                <p>Identify the legal question to be resolved</p>
              </div>

              <div className="p-4 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-2">Rule</h3>
                <p>State the relevant legal rules and authority</p>
              </div>

              <div className="p-4 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-2">Analysis</h3>
                <p>Apply the rules to the specific facts of your case</p>
              </div>

              <div className="p-4 bg-white border-2 border-black">
                <h3 className="text-xl font-bold mb-2">Conclusion</h3>
                <p>State your conclusion based on the analysis</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Tools;
