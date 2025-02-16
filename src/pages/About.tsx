
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel, Building2, GraduationCap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "LLB 28 maintains the highest standards of legal education, preparing students for the complexities of modern law practice.",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Our cohort emphasizes peer-to-peer learning and knowledge sharing, creating a supportive community of future lawyers.",
    },
    {
      icon: Trophy,
      title: "Professional Development",
      description: "Through internships, moot courts, and practical workshops, we prepare our students for successful legal careers.",
    },
    {
      icon: Scale,
      title: "Legal Ethics",
      description: "Strong emphasis on ethical practice and integrity, core values that define LLB 28's approach to legal education.",
    },
    {
      icon: Brain,
      title: "Critical Thinking",
      description: "Develop advanced analytical and problem-solving skills essential for legal practice.",
    },
    {
      icon: Gavel,
      title: "Practical Experience",
      description: "Gain real-world experience through law clinics and court visits.",
    },
    {
      icon: Building2,
      title: "Industry Connections",
      description: "Network with leading law firms and legal professionals.",
    },
    {
      icon: GraduationCap,
      title: "Career Support",
      description: "Comprehensive career guidance and placement assistance for LLB 28 students.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          About LLB 28
        </h1>

        <div className="prose prose-lg text-law-neutral mb-12">
          <div className="p-8 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-6 text-xl">
              Welcome to LLB 28, a distinguished cohort of aspiring legal professionals. 
              Our batch represents the future of legal practice, combining traditional legal 
              education with modern approaches to law and justice.
            </p>
            <p className="mb-6 text-xl">
              Through rigorous academic work, practical experience, and collaborative 
              learning, we aim to develop well-rounded legal minds capable of tackling 
              the complex challenges of tomorrow's legal landscape.
            </p>
            <p className="text-xl">
              LLB 28 stands out for its commitment to excellence, ethical practice, 
              and innovative approaches to legal education. Our students are trained 
              not just in legal theory, but in practical applications that prepare 
              them for successful careers in law.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg mb-4">
              LLB 28's mission is to nurture legal professionals who will:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Champion justice and ethical legal practice</li>
              <li>Excel in both traditional and emerging areas of law</li>
              <li>Lead innovation in legal services and technology</li>
              <li>Contribute to the development of legal scholarship</li>
              <li>Serve society through pro bono work and legal advocacy</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <feature.icon size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-law-neutral">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
