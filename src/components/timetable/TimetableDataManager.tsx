
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimetableDataManagerProps {
  setShowAddForm: (show: boolean) => void;
  isAdmin: boolean;
}

const TimetableDataManager = ({ 
  setShowAddForm, 
  isAdmin 
}: TimetableDataManagerProps) => {
  const queryClient = useQueryClient();

  const populateCoursesFirst = async () => {
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

    try {
      const { error: deleteError } = await supabase
        .from("timetable")
        .delete()
        .in('course_code', firstSemesterCourses.map(c => c.course_code));
      
      toast.info("Adding 1st semester courses...");
      
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

  const populateCoursesSecond = async () => {
    const secondSemesterCourses = [
      {
        course_code: "GES 104",
        course_title: "Science, Industry and Mankind",
        day: "Monday",
        start_time: "10:00 AM",
        end_time: "12:00 PM",
        location: "Science Block",
        lecturer: "Dr. Phillips"
      },
      {
        course_code: "GES 106",
        course_title: "Philosophy, Logic and Critical Thinking",
        day: "Monday",
        start_time: "3:00 PM",
        end_time: "5:00 PM",
        location: "Arts Building",
        lecturer: "Prof. Franklin"
      },
      {
        course_code: "LPU 202",
        course_title: "Constitutional Law 2",
        day: "Tuesday",
        start_time: "11:00 AM",
        end_time: "1:00 PM",
        location: "Law Theatre 1",
        lecturer: "Prof. Adebayo"
      },
      {
        course_code: "LJI 202",
        course_title: "Nigerian Legal System 2",
        day: "Wednesday",
        start_time: "9:00 AM",
        end_time: "11:00 AM",
        location: "Law Theatre 2",
        lecturer: "Dr. Nwachukwu"
      },
      {
        course_code: "LCI 202",
        course_title: "Contract Law 2",
        day: "Thursday",
        start_time: "1:00 PM",
        end_time: "3:00 PM",
        location: "Room 303",
        lecturer: "Dr. Clark"
      },
      {
        course_code: "LPP 202",
        course_title: "Reproductive and Sexual Health Law 2",
        day: "Thursday",
        start_time: "3:00 PM",
        end_time: "5:00 PM",
        location: "Law Theatre 3",
        lecturer: "Prof. Williams"
      },
      {
        course_code: "LAW 201",
        course_title: "Introduction to Law and Psychology",
        day: "Friday",
        start_time: "9:00 AM",
        end_time: "11:00 AM",
        location: "Psychology Building",
        lecturer: "Dr. Morgan"
      }
    ];

    try {
      const { error: deleteError } = await supabase
        .from("timetable")
        .delete()
        .in('course_code', secondSemesterCourses.map(c => c.course_code));
      
      toast.info("Adding 2nd semester courses...");
      
      // Add courses one by one
      for (const course of secondSemesterCourses) {
        const { error } = await supabase
          .from("timetable")
          .insert([course]);
          
        if (error) throw error;
      }
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("2nd semester courses added successfully!");
    } catch (error) {
      toast.error("Failed to add all courses");
      console.error(error);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <Button 
        onClick={() => setShowAddForm(true)}
        className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
      >
        <Plus className="mr-2" /> Add Class
      </Button>
      <Button 
        onClick={populateCoursesFirst}
        className="px-4 py-2 bg-purple-100 border-4 border-black hover:bg-purple-200 transition-colors"
      >
        Add 1st Semester
      </Button>
      <Button 
        onClick={populateCoursesSecond}
        className="px-4 py-2 bg-yellow-100 border-4 border-black hover:bg-yellow-200 transition-colors"
      >
        Add 2nd Semester
      </Button>
    </>
  );
};

export default TimetableDataManager;
