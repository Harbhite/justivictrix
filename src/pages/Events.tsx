import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Plus, Edit, Trash, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMetaTags } from "@/hooks/useMetaTags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const bentoGridTemplate = `
  grid-cols-1 
  md:grid-cols-6 
  auto-rows-[200px]
  md:auto-rows-[250px] 
  gap-6
`;

const getBentoGridSpan = (index: number) => {
  // Make some tiles span multiple columns/rows based on index for bento feel
  // Cycle through patterns for variety
  const patterns = [
    "md:col-span-3 md:row-span-2", // large
    "md:col-span-2 md:row-span-1", // horizontal
    "md:col-span-1 md:row-span-1", // small
    "md:col-span-2 md:row-span-2", // tall
    "md:col-span-3 md:row-span-1", // wide
    "md:col-span-1 md:row-span-2"  // vertical
  ];
  return patterns[index % patterns.length];
};

// Adds subtle background shapes for bento feel
const BentoBlob = ({ colorClass = "bg-blue-200/40", className = "" }) => (
  <div className={`absolute blur-2xl opacity-60 ${colorClass} pointer-events-none rounded-full z-0 ${className}`}></div>
);

const Events = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";

  useMetaTags({
    title: "Legal Events & Workshops - Seminars, Networking & Professional Development | LLB28 Hub",
    description: "Discover upcoming legal events, professional workshops, academic seminars, moot court competitions, and networking opportunities designed for law students and legal professionals.",
    image: "/og-image.png",
    type: "website"
  });
  
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

  // Shuffle events array for more visual interest (never re-order on every render though)
  const eventsShuffled = events.slice();

  // Optionally randomize on mount, keep order stable
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

  // Function to get a unique color for each event
  const getEventColor = (index: number) => {
    const colors = [
      "bg-blue-50 border-blue-200 hover:bg-blue-100",
      "bg-green-50 border-green-200 hover:bg-green-100",
      "bg-purple-50 border-purple-200 hover:bg-purple-100",
      "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      "bg-pink-50 border-pink-200 hover:bg-pink-100",
      "bg-orange-50 border-orange-200 hover:bg-orange-100",
      "bg-teal-50 border-teal-200 hover:bg-teal-100",
      "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
    ];
    
    return colors[index % colors.length];
  };

  const addToGoogleCalendar = (event: any) => {
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location);
    const description = encodeURIComponent(event.description);
    
    // Parse date and time (assuming format like "March 15, 2024" and "14:30")
    const dateParts = event.date.split(',');
    const dateText = dateParts.length > 1 ? dateParts[1].trim() + ' ' + dateParts[0].trim() : event.date;
    const [hours, minutes] = event.time.split(':');
    
    // Create start and end dates
    const startDate = new Date(dateText + ' ' + event.time);
    const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // Add 1 hour
    
    // Format dates for Google Calendar URL
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };
    
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${endDateStr}&details=${description}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  // Add event mutation
  const addEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      // Add a unique ID to ensure the insert works properly
      const eventWithId = {
        ...eventData,
        id: Date.now()
      };
      
      const { data, error } = await supabase
        .from("events")
        .insert([eventWithId])
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

  return (
    <div className="container mx-auto px-2 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-2 bg-law-light relative z-10 rounded-xl shadow-lg"
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Class Events
            {/* playful icon */}
            <Calendar className="absolute -top-4 -left-6 text-law-primary/40 blur-[1px] h-14 w-14 rotate-6" />
          </motion.h1>
          <div className="flex gap-4 z-10">
            <Link
              to="/timetable"
              className="px-4 py-2 bg-purple-100 border-4 border-black rounded-lg hover:bg-purple-200 transition-colors shadow"
            >
              View Timetable
            </Link>
            {isAdmin && !showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-100 border-4 border-black rounded-lg hover:bg-green-200 transition-colors"
              >
                <Plus className="mr-2" /> Add New Event
              </Button>
            )}
          </div>
        </div>

        {/* Admin form with bento styling */}
        {isAdmin && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden"
          >
            <BentoBlob colorClass="bg-green-200/40" className="top-0 left-1/2 w-40 h-24 -z-0" />
            <h2 className="text-2xl font-bold mb-4 z-10 relative">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  className="rounded-xl"
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
                    className="rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="rounded-xl"
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
                  className="rounded-xl"
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
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit"
                  className="bg-green-400 border-2 border-black hover:bg-green-500 rounded-xl"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </Button>
                <Button 
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 border-2 border-black hover:bg-gray-300 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Bento grid */}
        {isLoading ? (
          <div className={`grid ${bentoGridTemplate}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-200/60 rounded-2xl h-full w-full animate-pulse col-span-1 row-span-1"></div>
            ))}
          </div>
        ) : (
          <div className={`relative grid ${bentoGridTemplate} w-full`}>
            <BentoBlob colorClass="bg-purple-200/40" className="bottom-0 right-10 w-40 h-32" />
            {events.length > 0 ? (
              events.map((event: any, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.42 }}
                  whileHover={{ y: -6, scale: 1.014 }}
                  className={`relative ${getBentoGridSpan(index)} rounded-2xl cursor-pointer shadow-xl transition-all border-4 border-black group overflow-hidden bg-gradient-to-br from-white to-law-light/90`}
                >
                  {/* Decorative blob/shape */}
                  <BentoBlob colorClass={
                    index % 3 === 0 ? "bg-pink-200/40"
                    : index % 3 === 1 ? "bg-yellow-200/50"
                    : "bg-green-200/40"
                  } className={`-top-10 -right-8 w-32 h-24`} />

                  <Card className="rounded-2xl shadow-none border-none h-full w-full flex flex-col bg-transparent z-10 relative">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                          {event.title}
                          {/* pop accent icon */}
                          {index % 2 === 0
                            ? <Calendar className="text-law-primary/60 h-5 w-5" />
                            : <MapPin className="text-law-secondary/50 h-5 w-5" />}
                        </CardTitle>
                        {isAdmin && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditEvent(event)}
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-2 border-black rounded-full bg-white/60 hover:bg-law-primary/10"
                            >
                              <Edit size={15} />
                            </Button>
                            <Button
                              onClick={() => handleDeleteEvent(event.id)}
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-2 border-black text-red-500 rounded-full bg-white/60 hover:bg-red-50"
                            >
                              <Trash size={15} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mt-1 mb-2 space-y-1">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="mr-2 h-4 w-4 opacity-70" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm">
                          <Clock className="mr-2 h-4 w-4 opacity-70" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm">
                          <MapPin className="mr-2 h-4 w-4 opacity-70" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </CardContent>
                    <CardFooter className="flex items-center pt-0">
                      <Button 
                        onClick={() => addToGoogleCalendar(event)}
                        className="w-full mt-2 border-2 border-black bg-white text-black hover:bg-law-primary/20 rounded-xl shadow-sm" 
                        variant="outline"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto relative overflow-hidden"
                >
                  <BentoBlob colorClass="bg-blue-200/40" className="top-0 left-1/2 w-40 h-24 -z-0" />
                  <Calendar className="mx-auto h-16 w-16 mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No events scheduled</h3>
                  <p className="text-gray-500 mb-6">There are no upcoming events at the moment</p>
                  {isAdmin && (
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      className="mx-auto px-4 py-2 bg-green-100 border-2 border-black rounded-xl hover:bg-green-200 transition-colors"
                    >
                      <Plus className="mr-2" /> Create First Event
                    </Button>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Events;
