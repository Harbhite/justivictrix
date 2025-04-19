
import { motion } from "framer-motion";
import { User, ExternalLink, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getProfileColor } from "@/utils/profileColors";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    matric_number: string;
    avatar_url?: string;
    post_held?: string;
    bio?: string;
  };
  index: number;
  onSelect: (id: number) => void;
}

const MemberCard = ({ member, index, onSelect }: MemberCardProps) => {
  const navigate = useNavigate();
  const gradientColor = getProfileColor(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className={`h-20 bg-gradient-to-r ${gradientColor}`} />
        <CardContent className="pt-0 p-6">
          <div className="flex flex-col -mt-10">
            <Avatar className="w-20 h-20 border-4 border-white shadow-xl self-center mb-4 bg-white">
              {member.avatar_url ? (
                <AvatarImage src={member.avatar_url} alt={member.name} />
              ) : (
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  <User size={32} />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.matric_number}</p>
              {member.post_held && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{member.post_held}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(member.id);
                }}
              >
                View Details
              </Button>
              <Button
                className={`w-full text-white bg-gradient-to-r ${gradientColor} border-0 hover:opacity-90`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/member-bio/${member.id}`);
                }}
              >
                <ExternalLink size={16} className="mr-2" />
                View Bio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MemberCard;
