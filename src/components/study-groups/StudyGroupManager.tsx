
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import StudyGroupCard from './StudyGroupCard';

interface StudyGroup {
  id: number;
  name: string;
  subject: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  max_members: number;
  current_members: number;
}

const StudyGroupManager = () => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [userGroups, setUserGroups] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    meeting_day: '',
    meeting_time: '',
    location: '',
    max_members: 10
  });

  useEffect(() => {
    fetchStudyGroups();
    if (user) {
      fetchUserGroups();
    }
  }, [user]);

  const fetchStudyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .order('name');

      if (error) throw error;
      setStudyGroups(data || []);
    } catch (error) {
      console.error('Error fetching study groups:', error);
      toast.error('Failed to load study groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGroups = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('study_group_members')
        .select('study_group_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserGroups(data?.map(m => m.study_group_id) || []);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          ...formData,
          current_members: 1
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin member
      await supabase
        .from('study_group_members')
        .insert({
          study_group_id: data.id,
          user_id: user.id,
          is_admin: true
        });

      toast.success('Study group created successfully');
      setDialogOpen(false);
      setFormData({
        name: '',
        subject: '',
        meeting_day: '',
        meeting_time: '',
        location: '',
        max_members: 10
      });
      fetchStudyGroups();
      fetchUserGroups();
    } catch (error) {
      console.error('Error creating study group:', error);
      toast.error('Failed to create study group');
    }
  };

  const handleGroupChange = () => {
    fetchStudyGroups();
    fetchUserGroups();
  };

  if (loading) {
    return <div className="text-center py-8">Loading study groups...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Groups</h2>
        {user && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Study Group</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="meeting_day">Meeting Day</Label>
                  <Select value={formData.meeting_day} onValueChange={(value) => setFormData(prev => ({ ...prev, meeting_day: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
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
                <div>
                  <Label htmlFor="meeting_time">Meeting Time</Label>
                  <Input
                    id="meeting_time"
                    type="time"
                    value={formData.meeting_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, meeting_time: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_members">Max Members</Label>
                  <Input
                    id="max_members"
                    type="number"
                    min="2"
                    max="50"
                    value={formData.max_members}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_members: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Group</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {studyGroups.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600">No study groups available yet.</p>
            {user && <p className="text-sm text-gray-500 mt-2">Be the first to create one!</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyGroups.map((group) => (
            <StudyGroupCard
              key={group.id}
              {...group}
              isJoined={userGroups.includes(group.id)}
              onJoinLeave={handleGroupChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyGroupManager;
