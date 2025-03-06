
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Plus, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/App";

const Events = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  // Fetch events from Supabase
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        toast.error("Failed to load events");
        throw error;
      }

      return data || [];
    },
  });

  // Add event mutation
  const addEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      const { data, error } = await supabase
        .from("events")
        .insert([eventData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event added successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to add event");
      console.error(error);
    }
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, eventData }: { id: number, eventData: any }) => {
      const { data, error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update event");
      console.error(error);
    }
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete event");
      console.error(error);
    }
  });

  // Subscribe to events changes
  useEffect(() => {
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["events"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, eventData: formData });
    } else {
      addEventMutation.mutate(formData);
    }
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description
    });
    setShowAddForm(true);
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: ''
    });
    setEditingEvent(null);
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
            Class Events
          </h1>
          <div className="flex gap-4">
            <Link
              to="/tools"
              className="px-4 py-2 bg-purple-100 border-4 border-black hover:bg-purple-200 transition-colors"
            >
              View Timetable
            </Link>
            {isAdmin && !showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
              >
                <Plus className="mr-2" /> Add New Event
              </Button>
            )}
          </div>
        </div>

        {isAdmin && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. March 15, 2024"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g. 10:00 AM"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit"
                  className="bg-green-400 border-2 border-black hover:bg-green-500"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            [1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event: any, index: number) => (
              <motion.div
                key={event.id}
                className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                  
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1.5 bg-blue-100 border-2 border-black rounded-md hover:bg-blue-200 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 bg-red-100 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 text-law-neutral">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {event.location}
                  </p>
                </div>
                <p className="mt-4 text-law-dark">{event.description}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 p-6 text-center">
              <p className="text-lg text-gray-500">No events found.</p>
              {isAdmin && (
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 px-4 py-2 bg-green-100 border-2 border-black hover:bg-green-200 transition-colors"
                >
                  <Plus className="mr-2" /> Add First Event
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
