
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface TimetableFormProps {
  editingClass: any | null;
  setEditingClass: (classItem: any | null) => void;
  setShowAddForm: (show: boolean) => void;
  timeSlots: string[];
  daysOfWeek: string[];
}

const TimetableForm = ({ 
  editingClass, 
  setEditingClass, 
  setShowAddForm,
  timeSlots,
  daysOfWeek
}: TimetableFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    course_code: '',
    course_title: '',
    day: '',
    start_time: '',
    end_time: '',
    location: '',
    lecturer: ''
  });

  useEffect(() => {
    if (editingClass) {
      setFormData({
        course_code: editingClass.course_code,
        course_title: editingClass.course_title,
        day: editingClass.day,
        start_time: editingClass.start_time,
        end_time: editingClass.end_time,
        location: editingClass.location,
        lecturer: editingClass.lecturer
      });
    }
  }, [editingClass]);

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
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.start_time}
              onChange={(e) => handleTimeChange('start_time', e.target.value)}
              required
            >
              <option value="">Select start time</option>
              {timeSlots.map(time => (
                <option key={`start-${time}`} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="end_time">End Time</Label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.end_time}
              onChange={(e) => handleTimeChange('end_time', e.target.value)}
              required
            >
              <option value="">Select end time</option>
              {timeSlots.map(time => (
                <option key={`end-${time}`} value={time}>{time}</option>
              ))}
            </select>
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
            {editingClass ? <Check className="mr-2" /> : <Plus className="mr-2" />}
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
  );
};

export default TimetableForm;
