
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";

interface AccessCodeEntryProps {
  onAccessGranted: () => void;
}

const AccessCodeEntry: React.FC<AccessCodeEntryProps> = ({ onAccessGranted }) => {
  const { user } = useAuth();
  const [accessCode, setAccessCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      toast.error("Please enter an access code");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to access the forum");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate access code
      const { data: codeData, error: codeError } = await supabase
        .from("forum_access_codes")
        .select("*")
        .eq("access_code", accessCode.trim())
        .eq("is_active", true)
        .single();

      if (codeError || !codeData) {
        toast.error("Invalid access code");
        setIsSubmitting(false);
        return;
      }
      
      // Check if code is expired
      if (codeData.expiry_date && new Date(codeData.expiry_date) < new Date()) {
        toast.error("This access code has expired");
        setIsSubmitting(false);
        return;
      }

      // Grant access to the user
      const { error: accessError } = await supabase
        .from("forum_user_access")
        .insert({
          user_id: user.id,
          access_code_id: codeData.id
        });

      if (accessError) {
        if (accessError.code === "23505") { // Unique violation
          toast.error("You already have access to the forum");
        } else {
          throw accessError;
        }
      } else {
        // Initialize user reputation
        await supabase
          .from("user_reputation")
          .insert({
            user_id: user.id,
            reputation_points: 0,
            level: 1
          })
          .onConflict("user_id")
          .ignore();
          
        toast.success("Access granted to the secret forum");
        onAccessGranted();
      }
    } catch (error) {
      console.error("Error validating access code:", error);
      toast.error("Failed to validate access code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your access code"
            className="pl-9"
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Submit"}
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 italic">
        Hint: Try entering "LLB28_SECRET_2025"
      </div>
    </form>
  );
};

export default AccessCodeEntry;
