import { motion } from "framer-motion";
import { FileText, BookOpen, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Decorative blob shape for backgrounds
const BentoBlob = ({ colorClass = "bg-blue-200/40", className = "" }) => (
  <div className={`absolute blur-2xl opacity-60 ${colorClass} pointer-events-none rounded-full z-0 ${className}`}></div>
);

type Course = {
  id: number;
  code: string;
  title: string;
  units: number;
  lecturers: string[];
  description: string;
  year: number;
  semester: number;
  completed: boolean;
  course_outline?: string;
};

const bentoGridTemplate = `
  grid-cols-1 
  sm:grid-cols-2
  lg:grid-cols-4
  gap-8
  auto-rows-[240px]
  lg:auto-rows-[280px]
`;

const getBentoGridSpan = (index: number) => {
  // Patterns for variety; consider adjusting for more flavor
  const patterns = [
    "lg:col-span-2 lg:row-span-2", // large
    "lg:col-span-1 lg:row-span-1", // small
    "lg:col-span-2 lg:row-span-1", // wide
    "lg:col-span-1 lg:row-span-2", // tall
  ];
  return patterns[index % patterns.length];
};

const getCardColor = (index: number) => {
  const colors = [
    "bg-blue-50 border-blue-200 hover:bg-blue-100",
    "bg-green-50 border-green-200 hover:bg-green-100",
    "bg-purple-50 border-purple-200 hover:bg-purple-100",
    "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    "bg-pink-50 border-pink-200 hover:bg-pink-100",
    "bg-orange-50 border-orange-200 hover:bg-orange-100",
    "bg-teal-50 border-teal-200 hover:bg-teal-100",
    "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
  ];
  return colors[index % colors.length];
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useMetaTags({
    title: "Course Catalog - LLB28 Hub",
    description: "Browse all Law courses in the LLB program. View course details, outlines, and lecturer information.",
    image: "/og-image.png",
    type: "website"
  });

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('year')
          .order('semester')
          .order('code');
        if (error) throw error;
        if (data) setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // We'll map all courses to a flat array and just display them as bento tiles
  // Grouping by year-semester can instead become a subtle badge in each tile
  return (
    <div className="container mx-auto px-2 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1 bg-law-light relative rounded-2xl shadow-lg">
          Course Catalog
        </h1>

        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Explore all Law courses in the LLB program.<br />
            Tap on any tile to view details, outlines, and resources!
          </p>
        </div>

        {loading ? (
          <div className={`grid ${bentoGridTemplate}`}>
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-gray-200/60 rounded-2xl h-full w-full animate-pulse col-span-1 row-span-1"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Course Details Modal */}
            {selectedCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-12 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl max-w-2xl mx-auto relative overflow-hidden z-20"
              >
                <BentoBlob colorClass="bg-blue-200/40" className="top-0 left-1/2 w-40 h-24 -z-0" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCourse.code}: {selectedCourse.title}</h2>
                    <p className="text-lg text-gray-600">{selectedCourse.units} Units • {selectedCourse.completed ? "Completed" : "Upcoming"}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${selectedCourse.completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                      Year {selectedCourse.year}, Semester {selectedCourse.semester}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                <p className="text-gray-700 mb-4">{selectedCourse.description}</p>
                {selectedCourse.course_outline && (
                  <>
                    <h3 className="text-lg font-semibold mb-2">Course Outline</h3>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                      {selectedCourse.course_outline.split('\n').map((line, index) => (
                        <p key={index} className="text-gray-700 mb-2">{line}</p>
                      ))}
                    </div>
                  </>
                )}
                <h3 className="text-lg font-semibold mb-2">Lecturers</h3>
                <ul className="list-disc pl-5 mb-6">
                  {selectedCourse.lecturers.map((lecturer, index) => (
                    <li key={index} className="text-gray-700">{lecturer}</li>
                  ))}
                </ul>
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    onClick={() => setSelectedCourse(null)}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => window.open("/resources", "_self")}
                    className="bg-blue-600 text-white hover:bg-blue-700 border-2 border-black"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Related Resources
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Bento grid for course tiles */}
            <div className={`relative grid ${bentoGridTemplate} w-full`}>
              <BentoBlob colorClass="bg-purple-200/40" className="bottom-0 right-10 w-40 h-32" />
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.38 }}
                  whileHover={{ y: -6, scale: 1.025 }}
                  className={`relative ${getBentoGridSpan(index)} 
                    rounded-2xl cursor-pointer shadow-xl transition-all overflow-hidden
                    border-4 border-black group bg-gradient-to-br from-white to-law-light/80`}
                  onClick={() => setSelectedCourse(course)}
                >
                  {/* Background decorative blobs */}
                  <BentoBlob
                    colorClass={
                      index % 3 === 0 ? "bg-pink-200/40"
                      : index % 3 === 1 ? "bg-yellow-200/50"
                      : "bg-green-200/40"
                    }
                    className={`-top-10 -right-8 w-32 h-24`} 
                  />

                  <div className={`flex flex-col h-full justify-between p-6 z-10 relative ${getCardColor(index)} transition-all hover:scale-[1.008]`}>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg border border-black bg-white font-bold text-xs text-law-dark shadow">
                          {course.code}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border border-black
                            ${course.completed ? "bg-green-100 text-green-800" : "bg-blue-50 text-blue-800"}`}>
                          Year {course.year}, S{course.semester}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold mt-2 line-clamp-2">{course.title}</h2>
                      <p className="text-sm mt-2 mb-1 text-gray-600 line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.lecturers.map((lect, li) => (
                        <span key={li} className="bg-law-neutral/10 text-law-dark px-2 py-0.5 text-xs rounded mr-1">{lect}</span>
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 opacity-70">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-xs font-medium">{course.units} Unit{course.units === 1 ? "" : "s"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Navigation back to Resources & completed info */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-50 border border-gray-300"></div>
            <span className="text-gray-700">Completed courses</span>
          </div>
          <div>
            <a
              href="/resources"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium story-link"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Back to Resources
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Courses;
