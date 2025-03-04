
import { motion } from "framer-motion";
import { FileText, BookOpen, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
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

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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

        if (error) {
          throw error;
        }

        if (data) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const groupedCourses = courses.reduce((acc, course) => {
    const key = `Year ${course.year} - Semester ${course.semester}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Course Catalog
        </h1>

        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Below is a comprehensive list of all Law courses in the LLB program.
            Click on any course code to view more details about the course.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <>
            {/* Course Details Modal */}
            {selectedCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-12 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
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
            
            {/* Course Table by Year and Semester */}
            {Object.entries(groupedCourses).map(([yearSemester, courses]) => (
              <div key={yearSemester} className="mb-12">
                <h2 className="text-2xl font-bold mb-4 bg-gray-100 p-3 border-l-4 border-blue-600">
                  {yearSemester}
                </h2>
                
                <div className="overflow-x-auto">
                  <Table className="w-full border-4 border-black">
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-1/6 font-bold text-black border-r-2 border-b-2 border-black">Course Code</TableHead>
                        <TableHead className="w-2/6 font-bold text-black border-r-2 border-b-2 border-black">Course Title</TableHead>
                        <TableHead className="w-1/12 font-bold text-black border-r-2 border-b-2 border-black text-center">Units</TableHead>
                        <TableHead className="w-2/6 font-bold text-black border-b-2 border-black">Lecturers</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id} className={course.completed ? "bg-green-50" : ""}>
                          <TableCell className="font-medium border-r-2 border-b-2 border-gray-300">
                            <Button
                              onClick={() => handleCourseClick(course)}
                              variant="ghost"
                              className="px-2 py-1 h-auto font-bold text-blue-700 hover:text-blue-900 hover:bg-blue-50"
                            >
                              {course.code}
                            </Button>
                          </TableCell>
                          <TableCell className="border-r-2 border-b-2 border-gray-300">{course.title}</TableCell>
                          <TableCell className="border-r-2 border-b-2 border-gray-300 text-center">{course.units}</TableCell>
                          <TableCell className="border-b-2 border-gray-300">{course.lecturers.join(", ")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}

            <div className="mt-12 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-50 border border-gray-300"></div>
                <span className="text-gray-700">Completed courses</span>
              </div>
            </div>

            {/* Navigation back to Resources */}
            <div className="mt-8">
              <a
                href="/resources"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Back to Resources
              </a>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Courses;
