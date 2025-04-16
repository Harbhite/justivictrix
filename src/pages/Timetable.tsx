
import { motion } from "framer-motion";
import { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import { AuthContext } from "@/App";
import TimetableForm from "@/components/timetable/TimetableForm";
import TimetableGrid from "@/components/timetable/TimetableGrid";
import TimetableExport from "@/components/timetable/TimetableExport";
import TimetableDataManager from "@/components/timetable/TimetableDataManager";

const Timetable = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  const timetableRef = useRef<HTMLDivElement>(null);
  
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
            const dataManager = new TimetableDataManager();
            await dataManager.populateCoursesFirst();
          }
        } catch (error) {
          console.error("Error checking timetable:", error);
        }
      };
      
      populateInitialData();
    }
  }, [classes.length]);

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
