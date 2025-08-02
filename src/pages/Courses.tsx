import { motion } from "framer-motion";
import { Users, BookOpen, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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

const getBadgeColor = (year: number, semester: number) => {
  if (year === 1) return semester === 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  if (year === 2) return semester === 1 ? "bg-yellow-100 text-yellow-800" : "bg-orange-100 text-orange-800";
  return "bg-purple-100 text-purple-800";
};

const getCardSpan = (index: number) => {
  // Some cards span 2 columns for variety
  return index % 5 === 0 ? "md:col-span-2" : "md:col-span-1";
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useMetaTags({
    title: "Law Course Catalog - Constitutional Law, Criminal Law, Civil Procedure & More | LLB28 Hub",
    description: "Browse our complete law school curriculum featuring constitutional law, criminal law, civil procedure, contract law, tort law, and specialized legal courses with detailed syllabi and learning objectives.",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-muted rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Course Catalog</h1>
            <p className="text-muted-foreground text-lg">
              Explore all Law courses in the LLB program. Tap on any tile to view details, outlines, and resources!
            </p>
          </div>

          {/* Course Details Modal */}
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-6 bg-card border rounded-lg shadow-lg max-w-2xl mx-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedCourse.code}: {selectedCourse.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedCourse.units} Units • {selectedCourse.completed ? "Completed" : "Upcoming"}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(selectedCourse.year, selectedCourse.semester)}`}>
                  Year {selectedCourse.year}, S{selectedCourse.semester}
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                <p className="text-muted-foreground">{selectedCourse.description}</p>
              </div>

              {selectedCourse.course_outline && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Course Outline</h3>
                  <div className="bg-muted p-4 rounded border">
                    {selectedCourse.course_outline.split('\n').map((line, index) => (
                      <p key={index} className="text-muted-foreground mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Lecturers</h3>
                <ul className="list-disc pl-5">
                  {selectedCourse.lecturers.map((lecturer, index) => (
                    <li key={index} className="text-muted-foreground">{lecturer}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                <Button asChild>
                  <Link to="/resources">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Related Resources
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -4 }}
                className={`cursor-pointer ${getCardSpan(index)}`}
                onClick={() => setSelectedCourse(course)}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 border bg-card">
                  <CardContent className="p-6">
                    {/* Header with course code and year badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-bold">
                        {course.code}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(course.year, course.semester)}`}>
                        Year {course.year}, S{course.semester}
                      </span>
                    </div>

                    {/* Course title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Course description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Lecturers */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {course.lecturers.slice(0, 3).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                          >
                            <Users className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                      {course.lecturers.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{course.lecturers.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Units */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">{course.units} Units</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link 
              to="/resources"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;