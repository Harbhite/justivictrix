
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BadgeType {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  required_points: number;
  earned: boolean;
}

interface UserBadgesProps {
  userId: string;
}

const UserBadges: React.FC<UserBadgesProps> = ({ userId }) => {
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // Get user's reputation
        const { data: repData } = await supabase
          .from("user_reputation")
          .select("*")
          .eq("user_id", userId)
          .single();
          
        const points = repData?.reputation_points || 0;
        setUserPoints(points);
        
        // Get all badges
        const { data: badgesData } = await supabase
          .from("forum_badges")
          .select("*")
          .order("required_points", { ascending: true });
          
        if (!badgesData) {
          setBadges([]);
          setLoading(false);
          return;
        }
        
        // Get user's earned badges
        const { data: earnedData } = await supabase
          .from("user_badges")
          .select("badge_id")
          .eq("user_id", userId);
          
        const earnedBadgeIds = earnedData?.map(item => item.badge_id) || [];
        
        // Mark badges as earned or not
        const badgesWithEarnedStatus = badgesData.map(badge => ({
          ...badge,
          earned: earnedBadgeIds.includes(badge.id) || badge.required_points <= points
        }));
        
        setBadges(badgesWithEarnedStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching badges:", error);
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <CardDescription>
            Badges you've earned through participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>
          You have {userPoints} reputation points
        </CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <div className="text-center py-8">
            <Badge className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">No badges available</h3>
            <p className="text-gray-500 mt-1">Badges will appear here as they become available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`border rounded-md p-4 ${
                  badge.earned 
                    ? "bg-green-50 border-green-200" 
                    : "bg-gray-50 border-gray-200 opacity-70"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    badge.earned ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
                  }`}>
                    <Badge className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {badge.earned 
                        ? "Earned" 
                        : `Requires ${badge.required_points} points`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserBadges;
