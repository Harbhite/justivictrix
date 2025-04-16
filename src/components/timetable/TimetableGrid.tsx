
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Edit, Trash, MapPin, Info, X } from "lucide-react";
import { AuthContext } from "@/App";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface TimetableGridProps {
  classes: any[];
  timeSlots: string[];
  daysOfWeek: string[];
  handleEditClass: (classItem: any) => void;
  handleDeleteClass: (id: number) => void;
  timetableRef: React.RefObject<HTMLDivElement>;
}

const TimetableGrid = ({
  classes,
  timeSlots,
  daysOfWeek,
  handleEditClass,
  handleDeleteClass,
  timetableRef
}: TimetableGridProps) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const getCourseColor = (courseCode: string) => {
    const colors = [
      "bg-blue-100 border-blue-300",
      "bg-green-100 border-green-300",
      "bg-purple-100 border-purple-300",
      "bg-yellow-100 border-yellow-300",
      "bg-pink-100 border-pink-300",
      "bg-orange-100 border-orange-300",
      "bg-teal-100 border-teal-300",
      "bg-indigo-100 border-indigo-300"
    ];
    
    let hash = 0;
    for (let i = 0; i < courseCode.length; i++) {
      hash = courseCode.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Function to calculate the column span for a class
  const getColumnSpan = (startTime: string, endTime: string) => {
    const startIndex = timeSlots.indexOf(startTime);
    const endIndex = timeSlots.indexOf(endTime);
    return endIndex - startIndex;
  };

  // Organize classes by day and handle multi-hour spans
  const getOrganizedClasses = () => {
    const organizedClasses = {};

    daysOfWeek.forEach(day => {
      organizedClasses[day] = {};
      
      // Initialize each time slot
      timeSlots.forEach(time => {
        organizedClasses[day][time] = null;
      });
      
      // Add classes for this day
      const dayClasses = classes.filter(c => c.day === day);
      
      dayClasses.forEach(classItem => {
        const startTimeIndex = timeSlots.indexOf(classItem.start_time);
        const endTimeIndex = timeSlots.indexOf(classItem.end_time);
        
        // Mark the start slot with the class and its span
        if (startTimeIndex >= 0 && endTimeIndex > startTimeIndex) {
          organizedClasses[day][classItem.start_time] = {
            ...classItem,
            colSpan: endTimeIndex - startTimeIndex
          };
          
          // Mark subsequent slots as occupied
          for (let i = startTimeIndex + 1; i < endTimeIndex; i++) {
            organizedClasses[day][timeSlots[i]] = 'occupied';
          }
        }
      });
    });

    return organizedClasses;
  };

  const organizedClasses = getOrganizedClasses();

  return (
    <>
      <div 
        ref={timetableRef} 
        className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        <Table>
          <TableCaption>Your weekly class schedule</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[100px] font-bold text-black">Day / Time</TableHead>
              {timeSlots.map((time) => (
                <TableHead key={time} className="font-bold text-black text-center">{time}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOfWeek.map((day) => (
              <TableRow key={day} className="hover:bg-gray-50">
                <TableCell className="font-medium text-black bg-gray-100">{day}</TableCell>
                {timeSlots.map((time, index) => {
                  const classItem = organizedClasses[day][time];
                  
                  // Skip rendering for occupied slots (will be covered by colSpan)
                  if (classItem === 'occupied') {
                    return null;
                  }

                  return (
                    <TableCell 
                      key={`${day}-${time}`} 
                      className="p-1 min-h-[80px] h-20 align-top"
                      colSpan={classItem?.colSpan || 1}
                    >
                      {classItem ? (
                        <motion.div 
                          className={`p-2 h-full rounded ${getCourseColor(classItem.course_code)} cursor-pointer`}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          onClick={() => setSelectedClass(classItem)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold">{classItem.course_code}</p>
                              <p className="text-sm line-clamp-1">{classItem.course_title}</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedClass(classItem);
                                }}
                                className="p-1 bg-white/70 border-2 border-black rounded-md hover:bg-white/90 transition-colors"
                                aria-label="View details"
                              >
                                <Info size={14} />
                              </button>
                              {isAdmin && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditClass(classItem);
                                    }}
                                    className="p-1 bg-white/70 border-2 border-black rounded-md hover:bg-white/90 transition-colors"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClass(classItem.id);
                                    }}
                                    className="p-1 bg-red-100 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-xs mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {classItem.location}
                          </div>
                          <div className="text-xs flex items-center gap-1 line-clamp-1">
                            <span className="font-medium">Lecturer:</span> {classItem.lecturer}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full"></div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {classes.length === 0 && (
          <EmptyTimetable isAdmin={isAdmin} />
        )}
      </div>

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              {selectedClass?.course_code}
            </DialogTitle>
            <DialogDescription>
              <div className={`inline-block px-3 py-1 rounded-full ${selectedClass && getCourseColor(selectedClass.course_code)} mt-2`}>
                {selectedClass?.course_title}
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Schedule</h3>
                <p className="text-base">{selectedClass?.day}, {selectedClass?.start_time} - {selectedClass?.end_time}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="text-base">{selectedClass?.location}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
              <p className="text-base">{selectedClass?.lecturer}</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Course Details</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Students should bring relevant textbooks and materials</li>
                <li>Attendance is mandatory for this course</li>
                <li>Office hours: After class or by appointment</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Empty state component
const EmptyTimetable = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="p-12 text-center bg-white border-4 border-black mt-4">
      <div className="mx-auto h-12 w-12 mb-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled yet</h3>
      <p className="text-gray-500 mb-6">Get started by adding classes to your timetable</p>
    </div>
  );
};

export default TimetableGrid;
