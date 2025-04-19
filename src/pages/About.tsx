
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel, Building2, GraduationCap } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const BentoCard = ({ title, description, icon: Icon, color, expandedContent }: {
  title: string;
  description: string;
  icon: any;
  color: string;
  expandedContent?: string;
}) => {
  return (
    <Collapsible className={`${color} border-4 border-black p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
      <CollapsibleTrigger className="w-full text-left">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-white border-2 border-black rounded-lg">
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </CollapsibleTrigger>
      {expandedContent && (
        <CollapsibleContent className="mt-4 pt-4 border-t-2 border-black">
          <p className="text-sm">{expandedContent}</p>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

const About = () => {
  const bentoItems = [
    {
      title: "Our Studies",
      description: "Core legal subjects and methodologies",
      icon: BookOpen,
      color: "bg-rose-200",
      expandedContent: "Dive deep into Constitutional Law, Criminal Law, and Legal Methods with our comprehensive curriculum designed for future legal professionals."
    },
    {
      title: "Community",
      description: "Supporting each other through law school",
      icon: Users,
      color: "bg-emerald-200",
      expandedContent: "Join our vibrant community of law students who share resources, study together, and support each other throughout their legal education journey."
    },
    {
      title: "Activities",
      description: "Engaging in practical legal exercises",
      icon: Trophy,
      color: "bg-orange-200",
      expandedContent: "Participate in moot courts, legal writing workshops, and various law school competitions to gain practical experience."
    },
    {
      title: "Study Groups",
      description: "Collaborative learning sessions",
      icon: Scale,
      color: "bg-purple-200",
      expandedContent: "Regular study groups and discussion sessions help everyone understand complex legal concepts through peer learning."
    },
    {
      title: "Projects",
      description: "Hands-on legal research",
      icon: Brain,
      color: "bg-blue-200",
      expandedContent: "Work on collaborative legal research projects and case studies that prepare you for real-world legal practice."
    },
    {
      title: "Court Visits",
      description: "Learning from real proceedings",
      icon: Gavel,
      color: "bg-yellow-200",
      expandedContent: "Regular visits to courts allow students to observe real legal proceedings and learn from practicing lawyers."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          About Our Class
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BentoCard {...item} />
            </motion.div>
          ))}
        </div>

        <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg mb-4">
            We are LLB 28, a dynamic class of law students passionate about legal education and professional growth. Our website serves as a central hub for sharing resources, coordinating activities, and fostering collaboration among peers.
          </p>
          <p className="text-lg">
            Together, we navigate through various law subjects, from Constitutional Law to Criminal Law, Civil Procedure, and more. We believe in collaborative learning and helping each other succeed in our legal education journey.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
