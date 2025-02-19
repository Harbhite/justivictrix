
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, User, FileType } from "lucide-react";
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
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
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

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 mx-auto md:mx-0 bg-white border-4 border-black rounded-full flex items-center justify-center shrink-0">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <User size={48} />
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-black text-law-dark mb-4">{member.name}</h1>
              <div className="space-y-4">
                <p className="text-xl"><strong>Matric Number:</strong> {member.matric_number}</p>
                <p className="text-xl"><strong>Gender:</strong> {member.gender}</p>
                {member.post_held && (
                  <p className="text-xl"><strong>Post Held:</strong> {member.post_held}</p>
                )}
                {member.bio && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-2">Bio</h2>
                    <p className="text-lg leading-relaxed">{member.bio}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
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
      </motion.div>
    </div>
  );
};

export default FullProfile;
