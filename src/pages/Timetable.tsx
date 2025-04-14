import { motion } from "framer-motion";
import { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from 'xlsx';
import { Calendar, Clock, MapPin, BookOpen, Plus, Edit, Trash, Check, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const Timetable = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  const timetableRef = useRef<HTMLDivElement>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState({
    course_code: '',
    course_title: '',
    day: '',
    start_time: '',
    end_time: '',
    location: '',
    lecturer: ''
  });

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["timetable"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timetable")
        .select("*")
        .order("day", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) {
        toast.error("Failed to load timetable");
        throw error;
      }

      return data || [];
    },
  });

  const addClassMutation = useMutation({
    mutationFn: async (classData: any) => {
      const { data, error } = await supabase
        .from("timetable")
        .insert([classData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("Class added to timetable");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to add class");
      console.error(error);
    }
  });

  const updateClassMutation = useMutation({
    mutationFn: async ({ id, classData }: { id: number, classData: any }) => {
      const { data, error } = await supabase
        .from("timetable")
        .update(classData)
        .eq("id", id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("Timetable updated");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update timetable");
      console.error(error);
    }
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("timetable")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("Class removed from timetable");
    },
    onError: (error) => {
      toast.error("Failed to remove class");
      console.error(error);
    }
  });

  useEffect(() => {
    const channel = supabase
      .channel('timetable-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'timetable'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["timetable"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (type: 'start_time' | 'end_time', value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClass) {
      updateClassMutation.mutate({ id: editingClass.id, classData: formData });
    } else {
      addClassMutation.mutate(formData);
    }
  };

  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem);
    setFormData({
      course_code: classItem.course_code,
      course_title: classItem.course_title,
      day: classItem.day,
      start_time: classItem.start_time,
      end_time: classItem.end_time,
      location: classItem.location,
      lecturer: classItem.lecturer
    });
    setShowAddForm(true);
  };

  const handleDeleteClass = (id: number) => {
    if (window.confirm("Are you sure you want to remove this class from the timetable?")) {
      deleteClassMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      course_code: '',
      course_title: '',
      day: '',
      start_time: '',
      end_time: '',
      location: '',
      lecturer: ''
    });
    setEditingClass(null);
    setShowAddForm(false);
  };

  const getClassesForDay = (day: string) => {
    return classes.filter((classItem: any) => classItem.day === day);
  };

  const downloadAsPDF = async () => {
    if (!timetableRef.current) return;
    
    try {
      toast.info("Preparing your timetable download...");
      
      const canvas = await html2canvas(timetableRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 280;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('class-timetable.pdf');
      
      toast.success("Timetable downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download timetable");
    }
  };

  const downloadAsExcel = () => {
    try {
      toast.info("Preparing your Excel download...");
      
      const wb = XLSX.utils.book_new();
      
      const excelData = [
        ["Class Timetable"], // Title row
        [], // Empty row for spacing
        ["Day/Time", ...timeSlots], // Header row with time slots
      ];
      
      daysOfWeek.forEach(day => {
        const dayRow = [day];
        
        timeSlots.forEach(time => {
          const classesAtTime = classes.filter((classItem: any) => {
            if (classItem.day !== day) return false;
            
            const startTimeIndex = timeSlots.indexOf(classItem.start_time);
            const endTimeIndex = timeSlots.indexOf(classItem.end_time);
            const currentTimeIndex = timeSlots.indexOf(time);
            
            return currentTimeIndex >= startTimeIndex && currentTimeIndex < endTimeIndex;
          });
          
          const classItem = classesAtTime[0]; // Get the first class at this time slot if any
          
          if (classItem) {
            dayRow.push(`${classItem.course_code}: ${classItem.course_title}\nLocation: ${classItem.location}\nLecturer: ${classItem.lecturer}`);
          } else {
            dayRow.push("");
          }
        });
        
        excelData.push(dayRow);
      });
      
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      
      const wscols = [
        { wch: 15 }, // Day column
        ...timeSlots.map(() => ({ wch: 25 })) // Time slot columns
      ];
      
      ws['!cols'] = wscols;
      
      XLSX.utils.book_append_sheet(wb, ws, "Timetable");
      
      XLSX.writeFile(wb, "class-timetable.xlsx");
      
      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error("Failed to download timetable as Excel");
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-1">
            Class Timetable
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={downloadAsPDF}
              className="px-4 py-2 bg-blue-100 border-4 border-black hover:bg-blue-200 transition-colors"
            >
              <Download className="mr-2" /> PDF
            </Button>
            <Button
              onClick={downloadAsExcel}
              className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
            >
              <FileSpreadsheet className="mr-2" /> Excel
            </Button>
            {isAdmin && !showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
              >
                <Plus className="mr-2" /> Add Class
              </Button>
            )}
          </div>
        </div>

        {isAdmin && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold mb-4">{editingClass ? 'Edit Class Schedule' : 'Add Class to Timetable'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course_code">Course Code</Label>
                  <Input
                    id="course_code"
                    name="course_code"
                    value={formData.course_code}
                    onChange={handleInputChange}
                    placeholder="e.g. LAW101"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="course_title">Course Title</Label>
                  <Input
                    id="course_title"
                    name="course_title"
                    value={formData.course_title}
                    onChange={handleInputChange}
                    placeholder="Enter course title"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <select 
                    id="day"
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select day</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter class location"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    type="time"
                    id="start_time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="mt-2">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.start_time}
                      onChange={(e) => handleTimeChange('start_time', e.target.value)}
                    >
                      <option value="">Select start time</option>
                      {timeSlots.map(time => (
                        <option key={`start-${time}`} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    type="time"
                    id="end_time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="mt-2">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.end_time}
                      onChange={(e) => handleTimeChange('end_time', e.target.value)}
                    >
                      <option value="">Select end time</option>
                      {timeSlots.map(time => (
                        <option key={`end-${time}`} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="lecturer">Lecturer</Label>
                <Input
                  id="lecturer"
                  name="lecturer"
                  value={formData.lecturer}
                  onChange={handleInputChange}
                  placeholder="Enter lecturer name"
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit"
                  className="bg-green-400 border-2 border-black hover:bg-green-500"
                  disabled={!formData.start_time || !formData.end_time}
                >
                  {editingClass ? 'Update Class' : 'Add Class'}
                </Button>
                <Button 
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 border-2 border-black hover:bg-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div ref={timetableRef} className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            
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
                    {timeSlots.map((time) => {
                      const classesAtTime = classes.filter((classItem: any) => {
                        if (classItem.day !== day) return false;
                        
                        const startTimeIndex = timeSlots.indexOf(classItem.start_time);
                        const endTimeIndex = timeSlots.indexOf(classItem.end_time);
                        const currentTimeIndex = timeSlots.indexOf(time);
                        
                        return currentTimeIndex >= startTimeIndex && currentTimeIndex < endTimeIndex;
                      });
                      
                      const classItem = classesAtTime[0]; // Get the first class at this time slot if any
                      
                      return (
                        <TableCell key={`${day}-${time}`} className="p-1 min-h-[80px] h-20 align-top">
                          {classItem ? (
                            <div className={`p-2 h-full rounded ${getCourseColor(classItem.course_code)}`}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-bold">{classItem.course_code}</p>
                                  <p className="text-sm line-clamp-1">{classItem.course_title}</p>
                                </div>
                                {isAdmin && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleEditClass(classItem)}
                                      className="p-1 bg-white/70 border-2 border-black rounded-md hover:bg-white/90 transition-colors"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClass(classItem.id)}
                                      className="p-1 bg-red-100 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
                                    >
                                      <Trash size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div className="text-xs mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {classItem.location}
                              </div>
                              <div className="text-xs flex items-center gap-1 line-clamp-1">
                                <span className="font-medium">Lecturer:</span> {classItem.lecturer}
                              </div>
                            </div>
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
              <div className="p-12 text-center bg-white border-4 border-black mt-4">
                <Calendar className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled yet</h3>
                <p className="text-gray-500 mb-6">Get started by adding classes to your timetable</p>
                {isAdmin && (
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors"
                  >
                    <Plus className="mr-2" /> Add First Class
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Timetable;
