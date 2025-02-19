
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, User, FileType, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const FullProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: member, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      
      const numberId = parseInt(id);
      if (isNaN(numberId)) throw new Error("Invalid ID format");

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", numberId)
        .single();

      if (error) {
        toast.error("Failed to load member profile");
        throw error;
      }

      return data;
    },
  });

  const downloadAsPdf = async () => {
    if (!member) return;
    
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text(member.name, 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Matric Number: ${member.matric_number}`, 20, 40);
    pdf.text(`Gender: ${member.gender}`, 20, 50);
    if (member.post_held) pdf.text(`Post Held: ${member.post_held}`, 20, 60);
    if (member.bio) {
      const splitBio = pdf.splitTextToSize(member.bio, 170);
      pdf.text(splitBio, 20, 80);
    }
    
    pdf.save(`${member.name.replace(/\s+/g, '_')}_profile.pdf`);
    toast.success("Profile downloaded as PDF");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-2xl font-bold">Member not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => navigate('/people')}
          className="flex items-center gap-2 text-law-dark hover:text-law-primary mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to People
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-t-xl border-4 border-b-0 border-black">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 bg-white border-4 border-black rounded-full flex items-center justify-center shrink-0">
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-36 h-36 rounded-full object-cover"
                  />
                ) : (
                  <User size={64} />
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-black text-law-dark mb-4">{member.name}</h1>
                <p className="text-xl text-law-neutral mb-4">{member.post_held || "Student"}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button
                    onClick={downloadAsPdf}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <FileType className="w-5 h-5" />
                    Download Profile as PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white p-8 rounded-b-xl border-4 border-t-0 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    Academic Information
                  </h2>
                  <p className="text-lg"><strong>Matric Number:</strong> {member.matric_number}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    Position
                  </h2>
                  <p className="text-lg">{member.post_held || "Student"}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About Me</h2>
                  <p className="text-lg leading-relaxed">
                    {member.bio || "No bio available"}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                  <p className="text-lg"><strong>Gender:</strong> {member.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FullProfile;
