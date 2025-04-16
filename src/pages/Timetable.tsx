
import { motion } from "framer-motion";
import { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import { AuthContext } from "@/App";
import { useIsMobile } from "@/hooks/use-mobile";
import TimetableForm from "@/components/timetable/TimetableForm";
import TimetableGrid from "@/components/timetable/TimetableGrid";
import TimetableExport from "@/components/timetable/TimetableExport";
import TimetableDataManager from "@/components/timetable/TimetableDataManager";

const Timetable = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  const timetableRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);

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

  // Initial data loading
  useEffect(() => {
    if (classes.length === 0) {
      const populateInitialData = async () => {
        try {
          const { data } = await supabase.from("timetable").select("count");
          if (data && data[0] && data[0].count === 0) {
            // Load 1st semester courses if timetable is empty
            // Don't use 'new' with React components
            await populateCoursesFirst();
          }
        } catch (error) {
          console.error("Error checking timetable:", error);
        }
      };
      
      populateInitialData();
    }
  }, [classes.length]);

  // Function to populate first semester courses
  const populateCoursesFirst = async () => {
    try {
      toast.info("Adding 1st semester courses...");
      
      const firstSemesterCourses = [
        {
          course_code: "GES 201",
          course_title: "Use of English 2",
          day: "Monday",
          start_time: "8:00 AM",
          end_time: "10:00 AM",
          location: "Room 101",
          lecturer: "Dr. Johnson"
        },
        {
          course_code: "GES 105",
          course_title: "Agriculture, Renewable Natural Resources, Animal Husbandry & Health",
          day: "Monday",
          start_time: "1:00 PM",
          end_time: "3:00 PM",
          location: "Room 102",
          lecturer: "Prof. Adams"
        },
        {
          course_code: "LPU 201",
          course_title: "Constitutional Law 1",
          day: "Tuesday",
          start_time: "9:00 AM",
          end_time: "11:00 AM",
          location: "Law Theatre 1",
          lecturer: "Prof. Adebayo"
        },
        {
          course_code: "LJI 201",
          course_title: "Nigerian Legal System 1",
          day: "Tuesday",
          start_time: "2:00 PM",
          end_time: "4:00 PM",
          location: "Law Theatre 2",
          lecturer: "Dr. Nwachukwu"
        },
        {
          course_code: "LCI 201",
          course_title: "Contract Law 1",
          day: "Wednesday",
          start_time: "10:00 AM",
          end_time: "12:00 PM",
          location: "Room 303",
          lecturer: "Dr. Clark"
        },
        {
          course_code: "LPP 201",
          course_title: "Reproductive and Sexual Health Law 1",
          day: "Thursday",
          start_time: "8:00 AM",
          end_time: "10:00 AM",
          location: "Law Theatre 3",
          lecturer: "Prof. Williams"
        },
        {
          course_code: "SOC 208",
          course_title: "Entrepreneurship and Leadership Development",
          day: "Friday",
          start_time: "1:00 PM",
          end_time: "3:00 PM",
          location: "Business Hall",
          lecturer: "Dr. Thompson"
        }
      ];
      
      // Delete existing courses first
      const { error: deleteError } = await supabase
        .from("timetable")
        .delete()
        .in('course_code', firstSemesterCourses.map(c => c.course_code));
      
      // Add courses one by one
      for (const course of firstSemesterCourses) {
        const { error } = await supabase
          .from("timetable")
          .insert([course]);
          
        if (error) throw error;
      }
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("1st semester courses added successfully!");
    } catch (error) {
      toast.error("Failed to add all courses");
      console.error(error);
    }
  };

  // Real-time subscription
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

  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem);
    setShowAddForm(true);
  };

  const handleDeleteClass = (id: number) => {
    if (window.confirm("Are you sure you want to remove this class from the timetable?")) {
      deleteClassMutation.mutate(id);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start mb-6 sm:mb-12`}>
          <h1 className="text-3xl sm:text-5xl font-black text-law-dark border-4 border-black p-2 sm:p-4 inline-block transform -rotate-1 mb-4 sm:mb-0">
            Class Timetable
          </h1>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <TimetableExport 
              timetableRef={timetableRef}
              classes={classes}
              timeSlots={timeSlots}
              daysOfWeek={daysOfWeek}
            />
            {isAdmin && !showAddForm && (
              <TimetableDataManager 
                setShowAddForm={setShowAddForm}
                isAdmin={isAdmin}
              />
            )}
          </div>
        </div>

        {isAdmin && showAddForm && (
          <TimetableForm 
            editingClass={editingClass}
            setEditingClass={setEditingClass}
            setShowAddForm={setShowAddForm}
            timeSlots={timeSlots}
            daysOfWeek={daysOfWeek}
          />
        )}

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <TimetableGrid 
            classes={classes}
            timeSlots={timeSlots}
            daysOfWeek={daysOfWeek}
            handleEditClass={handleEditClass}
            handleDeleteClass={handleDeleteClass}
            timetableRef={timetableRef}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Timetable;
