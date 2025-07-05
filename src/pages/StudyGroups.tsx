import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMetaTags } from "@/hooks/useMetaTags";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Plus, MapPin, Clock, BookOpen } from "lucide-react";

interface StudyGroup {
  id: number;
  name: string;
  subject: string;
  location: string;
  meeting_day: string;
  meeting_time: string;
  max_members: number;
  current_members: number;
  created_at: string;
}

const StudyGroups = () => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    location: "",
    meeting_day: "",
    meeting_time: "",
    max_members: 10
  });

  useMetaTags({
    title: "Study Groups - LLB28 Hub",
    description: "Join or create study groups with your fellow law students. Collaborate, share knowledge, and excel together in your legal studies.",
    image: "/og-image.png",
    type: "website"
  });

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStudyGroups(data || []);
    } catch (error) {
      console.error("Error fetching study groups:", error);
      toast.error("Failed to load study groups");
    } finally {
      setLoading(false);
    }
  };

  const createStudyGroup = async () => {
    if (!user) {
      toast.error("Please sign in to create a study group");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("study_groups")
        .insert([{
          ...formData,
          current_members: 1
        }])
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await supabase
        .from("study_group_members")
        .insert([{
          study_group_id: data.id,
          user_id: user.id,
          is_admin: true
        }]);

      toast.success("Study group created successfully!");
      setIsCreateDialogOpen(false);
      setFormData({
        name: "",
        subject: "",
        location: "",
        meeting_day: "",
        meeting_time: "",
        max_members: 10
      });
      fetchStudyGroups();
    } catch (error) {
      console.error("Error creating study group:", error);
      toast.error("Failed to create study group");
    }
  };

  const joinStudyGroup = async (groupId: number) => {
    if (!user) {
      toast.error("Please sign in to join a study group");
      return;
    }

    try {
      // Check if already a member
      const { data: existingMember } = await supabase
        .from("study_group_members")
        .select("*")
        .eq("study_group_id", groupId)
        .eq("user_id", user.id)
        .single();

      if (existingMember) {
        toast.error("You're already a member of this group");
        return;
      }

      // Add as member
      const { error } = await supabase
        .from("study_group_members")
        .insert([{
          study_group_id: groupId,
          user_id: user.id,
          is_admin: false
        }]);

      if (error) throw error;

      // Update member count
      const group = studyGroups.find(g => g.id === groupId);
      if (group) {
        await supabase
          .from("study_groups")
          .update({ current_members: group.current_members + 1 })
          .eq("id", groupId);
      }

      toast.success("Successfully joined the study group!");
      fetchStudyGroups();
    } catch (error) {
      console.error("Error joining study group:", error);
      toast.error("Failed to join study group");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Groups</h1>
          <p className="text-muted-foreground">Join study groups and collaborate with your peers</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Study Group</DialogTitle>
              <DialogDescription>
                Create a new study group and invite your classmates to join.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Constitutional Law Study Group"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Constitutional Law"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Library Room 205"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meeting_day">Meeting Day</Label>
                <Select value={formData.meeting_day} onValueChange={(value) => setFormData({ ...formData, meeting_day: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meeting_time">Meeting Time</Label>
                <Input
                  id="meeting_time"
                  type="time"
                  value={formData.meeting_time}
                  onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max_members">Max Members</Label>
                <Input
                  id="max_members"
                  type="number"
                  min="2"
                  max="20"
                  value={formData.max_members}
                  onChange={(e) => setFormData({ ...formData, max_members: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <Button onClick={createStudyGroup} className="w-full">
              Create Study Group
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="line-clamp-1">{group.name}</span>
                <Badge variant="secondary">
                  {group.current_members}/{group.max_members}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {group.subject}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {group.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {group.meeting_day}s at {group.meeting_time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {group.current_members} members
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => joinStudyGroup(group.id)}
                  disabled={group.current_members >= group.max_members}
                >
                  {group.current_members >= group.max_members ? "Group Full" : "Join Group"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {studyGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Study Groups Yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to create a study group and start collaborating!</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Group
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;