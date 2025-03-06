
import { motion } from "framer-motion";
import { Users, Plus, Edit, Trash, UserPlus, Calendar } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthContext } from "@/App";

const StudyGroups = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isAdmin = user?.email === "swisssunny1@gmail.com";
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    meeting_day: '',
    meeting_time: '',
    location: '',
    max_members: 10
  });

  // Fetch study groups from Supabase
  const { data: studyGroups = [], isLoading } = useQuery({
    queryKey: ["study-groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_groups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load study groups");
        throw error;
      }

      return data || [];
    },
  });

  // Add group mutation
  const addGroupMutation = useMutation({
    mutationFn: async (groupData: any) => {
      const { data, error } = await supabase
        .from("study_groups")
        .insert([groupData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-groups"] });
      toast.success("Study group added successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to add study group");
      console.error(error);
    }
  });

  // Update group mutation
  const updateGroupMutation = useMutation({
    mutationFn: async ({ id, groupData }: { id: number, groupData: any }) => {
      const { data, error } = await supabase
        .from("study_groups")
        .update(groupData)
        .eq("id", id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-groups"] });
      toast.success("Study group updated successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update study group");
      console.error(error);
    }
  });

  // Delete group mutation
  const deleteGroupMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("study_groups")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-groups"] });
      toast.success("Study group deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete study group");
      console.error(error);
    }
  });

  // Subscribe to study_groups changes
  useEffect(() => {
    const channel = supabase
      .channel('study-groups-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_groups'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["study-groups"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'max_members' ? parseInt(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGroup) {
      updateGroupMutation.mutate({ id: editingGroup.id, groupData: formData });
    } else {
      addGroupMutation.mutate(formData);
    }
  };

  const handleEditGroup = (group: any) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      subject: group.subject,
      meeting_day: group.meeting_day,
      meeting_time: group.meeting_time,
      location: group.location,
      max_members: group.max_members
    });
    setShowAddForm(true);
  };

  const handleDeleteGroup = (id: number) => {
    if (window.confirm("Are you sure you want to delete this study group?")) {
      deleteGroupMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      meeting_day: '',
      meeting_time: '',
      location: '',
      max_members: 10
    });
    setEditingGroup(null);
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
            Study Groups
          </h1>
          {isAdmin && !showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
            >
              <Plus className="mr-2" /> Create Group
            </Button>
          )}
        </div>

        {isAdmin && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold mb-4">{editingGroup ? 'Edit Study Group' : 'Create Study Group'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter group name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="meeting_day">Meeting Day</Label>
                  <Input
                    id="meeting_day"
                    name="meeting_day"
                    value={formData.meeting_day}
                    onChange={handleInputChange}
                    placeholder="e.g. Monday"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="meeting_time">Meeting Time</Label>
                  <Input
                    id="meeting_time"
                    name="meeting_time"
                    value={formData.meeting_time}
                    onChange={handleInputChange}
                    placeholder="e.g. 3:00 PM"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="max_members">Max Members</Label>
                  <Input
                    id="max_members"
                    name="max_members"
                    type="number"
                    min="1"
                    value={formData.max_members}
                    onChange={handleInputChange}
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
                  placeholder="Enter meeting location"
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit"
                  className="bg-green-400 border-2 border-black hover:bg-green-500"
                >
                  {editingGroup ? 'Update Group' : 'Create Group'}
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
          <div className="animate-pulse bg-white border-4 border-black p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
          </div>
        ) : studyGroups.length > 0 ? (
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Members</TableHead>
                  {isAdmin && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {studyGroups.map((group: any) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>{group.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {group.meeting_day}, {group.meeting_time}
                      </div>
                    </TableCell>
                    <TableCell>{group.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span className="font-bold">{group.current_members || 0}</span>/{group.max_members}
                      </div>
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditGroup(group)}
                            className="p-1.5 bg-blue-100 border-2 border-black rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteGroup(group.id)}
                            className="p-1.5 bg-red-100 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-12 text-center bg-white border-4 border-black">
            <Users className="mx-auto h-12 w-12 mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study groups yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first study group</p>
            {isAdmin && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors"
              >
                <Plus className="mr-2" /> Create First Group
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudyGroups;
