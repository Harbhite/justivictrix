
import { motion } from "framer-motion";
import { FileText, BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Sample course data
  const courses: Course[] = [
    {
      id: 1,
      code: "LPL 101",
      title: "Nigerian Legal Method I",
      units: 3,
      lecturers: ["Prof. A. B. Johnson", "Dr. M. O. Williams"],
      description: "Introduction to Nigerian Legal Method, sources of Nigerian Law, legal reasoning and Nigerian legal system.",
      year: 1,
      semester: 1,
      completed: true,
    },
    {
      id: 2,
      code: "LPL 102",
      title: "Nigerian Legal Method II",
      units: 3,
      lecturers: ["Prof. A. B. Johnson", "Dr. M. O. Williams"],
      description: "Advanced concepts in Nigerian Legal Method, legal writing and research methodology.",
      year: 1,
      semester: 2,
      completed: true,
    },
    {
      id: 3,
      code: "LPL 103",
      title: "Constitutional Law I",
      units: 3,
      lecturers: ["Prof. O. A. Smith", "Dr. F. T. Davies"],
      description: "Study of the Nigerian constitution, fundamental rights, and governmental structures.",
      year: 1,
      semester: 1,
      completed: true,
    },
    {
      id: 4,
      code: "LPL 104",
      title: "Constitutional Law II",
      units: 3,
      lecturers: ["Prof. O. A. Smith", "Dr. F. T. Davies"],
      description: "Advanced constitutional principles, separation of powers, and judicial review.",
      year: 1,
      semester: 2,
      completed: true,
    },
    {
      id: 5,
      code: "LPL 201",
      title: "Law of Contract I",
      units: 3,
      lecturers: ["Dr. R. E. Okonkwo", "Dr. T. I. Ahmed"],
      description: "Fundamental principles of contract law, formation, and terms of contract.",
      year: 2,
      semester: 1,
      completed: false,
    },
    {
      id: 6,
      code: "LPL 202",
      title: "Law of Contract II",
      units: 3,
      lecturers: ["Dr. R. E. Okonkwo", "Dr. T. I. Ahmed"],
      description: "Breach of contract, remedies, and special contracts.",
      year: 2,
      semester: 2,
      completed: false,
    },
    {
      id: 7,
      code: "LPL 203",
      title: "Criminal Law I",
      units: 3,
      lecturers: ["Prof. B. A. Adebayo", "Dr. L. K. Nwachukwu"],
      description: "General principles of criminal law, elements of crimes, and defenses.",
      year: 2,
      semester: 1,
      completed: false,
    },
    {
      id: 8,
      code: "LPL 204",
      title: "Criminal Law II",
      units: 3,
      lecturers: ["Prof. B. A. Adebayo", "Dr. L. K. Nwachukwu"],
      description: "Specific offenses, punishment theories, and criminal procedure.",
      year: 2,
      semester: 2,
      completed: false,
    },
    {
      id: 9,
      code: "LPL 301",
      title: "Law of Torts I",
      units: 3,
      lecturers: ["Dr. S. O. Ogundipe", "Prof. I. J. Ezekiel"],
      description: "Introduction to tort law, negligence, and nuisance.",
      year: 3,
      semester: 1,
      completed: false,
    },
    {
      id: 10,
      code: "LPL 302",
      title: "Law of Torts II",
      units: 3,
      lecturers: ["Dr. S. O. Ogundipe", "Prof. I. J. Ezekiel"],
      description: "Defamation, economic torts, and tort remedies.",
      year: 3,
      semester: 2,
      completed: false,
    },
    {
      id: 11,
      code: "LPL 303",
      title: "Property Law I",
      units: 3,
      lecturers: ["Prof. P. K. Olatunji", "Dr. G. F. Okoli"],
      description: "Real property law, land tenure systems, and estates.",
      year: 3,
      semester: 1,
      completed: false,
    },
    {
      id: 12,
      code: "LPL 304",
      title: "Property Law II",
      units: 3,
      lecturers: ["Prof. P. K. Olatunji", "Dr. G. F. Okoli"],
      description: "Leases, mortgages, and easements.",
      year: 3,
      semester: 2,
      completed: false,
    },
    {
      id: 13,
      code: "LPL 401",
      title: "Equity and Trusts I",
      units: 3,
      lecturers: ["Dr. M. A. Hassan", "Prof. C. T. Uzoma"],
      description: "Principles of equity, maxims, and remedies.",
      year: 4,
      semester: 1,
      completed: false,
    },
    {
      id: 14,
      code: "LPL 402",
      title: "Equity and Trusts II",
      units: 3,
      lecturers: ["Dr. M. A. Hassan", "Prof. C. T. Uzoma"],
      description: "Trust creation, types, and administration.",
      year: 4,
      semester: 2,
      completed: false,
    },
    {
      id: 15,
      code: "LPL 403",
      title: "Evidence Law I",
      units: 3,
      lecturers: ["Prof. D. B. Adekunle", "Dr. H. I. Jimoh"],
      description: "Rules of evidence, admissibility, and burden of proof.",
      year: 4,
      semester: 1,
      completed: false,
    },
  ];

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
      </motion.div>
    </div>
  );
};

export default Courses;
