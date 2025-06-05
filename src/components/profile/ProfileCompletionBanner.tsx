
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, User, Camera, FileText, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileCompletion {
  percentage: number;
  missingFields: string[];
}

const ProfileCompletionBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completion, setCompletion] = useState<ProfileCompletion | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (user) {
      checkProfileCompletion();
    }
  }, [user]);

  const checkProfileCompletion = async () => {
    if (!user?.id) return;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        const fields = [
          { key: 'username', label: 'Username' },
          { key: 'full_name', label: 'Full Name' },
          { key: 'avatar_url', label: 'Profile Picture' },
          { key: 'bio', label: 'Bio' },
          { key: 'position', label: 'Position' }
        ];

        const completedFields = fields.filter(field => profile[field.key]);
        const percentage = Math.round((completedFields.length / fields.length) * 100);
        const missingFields = fields
          .filter(field => !profile[field.key])
          .map(field => field.label);

        setCompletion({
          percentage,
          missingFields
        });
      }
    } catch (error) {
      console.error("Error checking profile completion:", error);
    }
  };

  if (!completion || completion.percentage >= 100 || !isVisible) {
    return null;
  }

  const getIcon = (field: string) => {
    switch (field) {
      case 'Username':
      case 'Full Name':
        return <User className="h-4 w-4" />;
      case 'Profile Picture':
        return <Camera className="h-4 w-4" />;
      case 'Bio':
        return <FileText className="h-4 w-4" />;
      case 'Position':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <AlertDescription>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Complete your profile to unlock all features</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Profile completion</span>
                  <span className="font-medium">{completion.percentage}%</span>
                </div>
                <Progress value={completion.percentage} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-2">
                {completion.missingFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getIcon(field)}
                    <span>Add {field}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="sm" 
                onClick={() => navigate('/profile')}
                className="mt-2"
              >
                Complete Profile
              </Button>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default ProfileCompletionBanner;
