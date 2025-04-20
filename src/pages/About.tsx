
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const BentoCard = ({ title, description, icon: Icon, color, expandedContent }: {
  title: string;
  description: string;
  icon: any;
  color: string;
  expandedContent?: string;
}) => {
  return (
    <Collapsible className={`${color} p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] duration-300`}>
      <CollapsibleTrigger className="w-full text-left">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <Icon size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </CollapsibleTrigger>
      {expandedContent && (
        <CollapsibleContent className="mt-4 pt-4 border-t border-black/5">
          <p className="text-sm text-gray-700">{expandedContent}</p>
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
      color: "bg-gradient-to-br from-rose-100 to-rose-200",
      expandedContent: "Dive deep into Constitutional Law, Criminal Law, and Legal Methods with our comprehensive curriculum designed for future legal professionals."
    },
    {
      title: "Community",
      description: "Supporting each other through law school",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      expandedContent: "Join our vibrant community of law students who share resources, study together, and support each other throughout their legal education journey."
    },
    {
      title: "Activities",
      description: "Engaging in practical legal exercises",
      icon: Trophy,
      color: "bg-gradient-to-br from-amber-100 to-amber-200",
      expandedContent: "Participate in moot courts, legal writing workshops, and various law school competitions to gain practical experience."
    },
    {
      title: "Study Groups",
      description: "Collaborative learning sessions",
      icon: Scale,
      color: "bg-gradient-to-br from-purple-100 to-purple-200",
      expandedContent: "Regular study groups and discussion sessions help everyone understand complex legal concepts through peer learning."
    },
    {
      title: "Projects",
      description: "Hands-on legal research",
      icon: Brain,
      color: "bg-gradient-to-br from-blue-100 to-blue-200",
      expandedContent: "Work on collaborative legal research projects and case studies that prepare you for real-world legal practice."
    },
    {
      title: "Court Visits",
      description: "Learning from real proceedings",
      icon: Gavel,
      color: "bg-gradient-to-br from-yellow-100 to-yellow-200",
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
        <h1 className="text-5xl font-black text-law-dark mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
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

        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg">
          <p className="text-lg mb-4 text-gray-700">
            We are LLB 28, a dynamic class of law students passionate about legal education and professional growth. Our website serves as a central hub for sharing resources, coordinating activities, and fostering collaboration among peers.
          </p>
          <p className="text-lg text-gray-700">
            Together, we navigate through various law subjects, from Constitutional Law to Criminal Law, Civil Procedure, and more. We believe in collaborative learning and helping each other succeed in our legal education journey.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
