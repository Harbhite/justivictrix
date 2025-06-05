
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, BookOpen, Calendar, Award, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
  position?: string;
  created_at: string;
}

interface ProfileStats {
  profileCompletion: number;
  totalPosts: number;
  coursesEnrolled: number;
  eventsAttended: number;
}

const ProfileDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<ProfileStats>({
    profileCompletion: 0,
    totalPosts: 0,
    coursesEnrolled: 0,
    eventsAttended: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      calculateStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = async () => {
    if (!user?.id) return;

    try {
      // Calculate profile completion
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        const fields = ['username', 'full_name', 'avatar_url', 'bio', 'position'];
        const completedFields = fields.filter(field => profileData[field]).length;
        const profileCompletion = Math.round((completedFields / fields.length) * 100);

        setStats(prev => ({
          ...prev,
          profileCompletion,
          coursesEnrolled: 8, // Mock data - in real app, query courses table
          eventsAttended: 5,  // Mock data - in real app, query events table
          totalPosts: 12      // Mock data - in real app, query forum posts
        }));
      }
    } catch (error) {
      console.error("Error calculating stats:", error);
    }
  };

  const getProfileCompletionColor = (completion: number) => {
    if (completion >= 80) return "text-green-600";
    if (completion >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || profile?.username} />
              <AvatarFallback className="bg-primary text-white text-xl">
                {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{profile?.full_name || profile?.username}</h3>
              {profile?.position && (
                <Badge variant="secondary" className="mt-1">
                  {profile.position}
                </Badge>
              )}
              {profile?.bio && (
                <p className="text-muted-foreground mt-2">{profile.bio}</p>
              )}
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className={`text-sm font-bold ${getProfileCompletionColor(stats.profileCompletion)}`}>
                    {stats.profileCompletion}%
                  </span>
                </div>
                <Progress value={stats.profileCompletion} className="h-2" />
                {stats.profileCompletion < 100 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete your profile to unlock more features
                  </p>
                )}
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.coursesEnrolled}</p>
                <p className="text-sm text-muted-foreground">Courses Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.eventsAttended}</p>
                <p className="text-sm text-muted-foreground">Events Attended</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
                <p className="text-sm text-muted-foreground">Forum Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">View Courses</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Check Events</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Award className="h-5 w-5" />
              <span className="text-xs">View Achievements</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDashboard;
