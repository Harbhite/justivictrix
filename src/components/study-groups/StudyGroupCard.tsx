
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface StudyGroupCardProps {
  id: number;
  name: string;
  subject: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  max_members: number;
  current_members: number;
  isJoined?: boolean;
  onJoinLeave?: () => void;
}

const StudyGroupCard = ({
  id,
  name,
  subject,
  meeting_day,
  meeting_time,
  location,
  max_members,
  current_members,
  isJoined = false,
  onJoinLeave
}: StudyGroupCardProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleJoinLeave = async () => {
    if (!user) {
      toast.error("Please log in to join study groups");
      return;
    }

    setLoading(true);
    try {
      if (isJoined) {
        const { error } = await supabase
          .from('study_group_members')
          .delete()
          .eq('study_group_id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success("Left study group successfully");
      } else {
        const { error } = await supabase
          .from('study_group_members')
          .insert({
            study_group_id: id,
            user_id: user.id
          });

        if (error) throw error;
        toast.success("Joined study group successfully");
      }
      onJoinLeave?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error(isJoined ? "Failed to leave study group" : "Failed to join study group");
    } finally {
      setLoading(false);
    }
  };

  const isFull = current_members >= max_members;

  return (
    <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <CardDescription className="text-base">{subject}</CardDescription>
          </div>
          <Badge variant={isJoined ? "default" : "secondary"}>
            {isJoined ? "Joined" : "Available"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{meeting_day}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{meeting_time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{current_members}/{max_members} members</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleJoinLeave}
          disabled={loading || (!isJoined && isFull)}
          className="w-full"
          variant={isJoined ? "destructive" : "default"}
        >
          {loading ? "..." : isJoined ? "Leave Group" : isFull ? "Group Full" : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyGroupCard;
