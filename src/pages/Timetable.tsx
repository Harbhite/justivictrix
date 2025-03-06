
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, BookOpen, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/App";

const Timetable = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  
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

  // Get days of the week for grouping
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Fetch timetable entries from Supabase
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

  // Add class entry mutation
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

  // Update class entry mutation
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

  // Delete class entry mutation
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

  // Subscribe to timetable changes
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

  // Group classes by day
  const classesByDay = daysOfWeek.map(day => {
    return {
      day,
      classes: classes.filter((c: any) => c.day === day)
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          {isAdmin && !showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
            >
              <Plus className="mr-2" /> Add Class
            </Button>
          )}
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <select 
                    id="day"
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange as any}
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
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    placeholder="e.g. 9:00 AM"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit"
                  className="bg-green-400 border-2 border-black hover:bg-green-500"
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
          <div className="space-y-6">
            {[1, 2].map(day => (
              <div key={day} className="animate-pulse">
                <div className="h-8 bg-gray-200 w-1/4 mb-4 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {classesByDay.map(day => (
              <div key={day.day}>
                {day.classes.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">{day.day}</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {day.classes.map((classItem: any) => (
                        <motion.div
                          key={classItem.id}
                          className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="text-blue-600" />
                                <h3 className="text-xl font-bold">{classItem.course_title}</h3>
                              </div>
                              <p className="text-sm font-semibold text-gray-500 mb-3">{classItem.course_code}</p>
                            </div>
                            
                            {isAdmin && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditClass(classItem)}
                                  className="p-1.5 bg-blue-100 border-2 border-black rounded-md hover:bg-blue-200 transition-colors"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClass(classItem.id)}
                                  className="p-1.5 bg-red-100 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-5 h-5" />
                              <span>{classItem.start_time} - {classItem.end_time}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-5 h-5" />
                              <span>{classItem.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="font-medium">Lecturer:</span>
                              <span>{classItem.lecturer}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {classes.length === 0 && (
              <div className="p-12 text-center bg-white border-4 border-black">
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
