
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel, Building2, GraduationCap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Our Studies",
      description: "We're currently focusing on core legal subjects including Constitutional Law, Criminal Law, and Legal Methods.",
    },
    {
      icon: Users,
      title: "Our Community",
      description: "LLB 28 consists of dedicated law students who support each other through group studies and shared resources.",
    },
    {
      icon: Trophy,
      title: "Class Activities",
      description: "We participate in moot courts, legal writing workshops, and various law school competitions as a class.",
    },
    {
      icon: Scale,
      title: "Study Groups",
      description: "Our class organizes regular study groups and discussion sessions to help each other understand complex legal concepts.",
    },
    {
      icon: Brain,
      title: "Class Projects",
      description: "We work on collaborative legal research projects and case studies throughout the semester.",
    },
    {
      icon: Gavel,
      title: "Court Visits",
      description: "Our class regularly attends court sessions to observe real legal proceedings and learn from practicing lawyers.",
    },
    {
      icon: Building2,
      title: "Class Schedule",
      description: "We meet for lectures, tutorials, and practical sessions throughout the week, following the law school curriculum.",
    },
    {
      icon: GraduationCap,
      title: "Academic Support",
      description: "Our class representatives coordinate with faculty to ensure we have access to necessary study materials and guidance.",
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
          About Our Class
        </h1>

        <div className="prose prose-lg text-law-neutral mb-12">
          <div className="p-8 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-6 text-xl">
              We are LLB 28, a class of law students in our journey through legal education. 
              Our class website serves as a central hub for sharing resources, coordinating 
              activities, and supporting each other throughout our studies.
            </p>
            <p className="mb-6 text-xl">
              Together, we navigate through various law subjects, from Constitutional Law 
              to Criminal Law, Civil Procedure, and more. We believe in collaborative 
              learning and helping each other succeed in our legal education journey.
            </p>
            <p className="text-xl">
              This platform helps us stay connected, share study materials, and keep track 
              of our class activities. Whether it's organizing study groups, sharing notes, 
              or coordinating for moot court competitions, this is our digital classroom.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Class Activities</h2>
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg mb-4">
              As a class, we regularly engage in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Weekly study group sessions for different subjects</li>
              <li>Mock trials and moot court practice</li>
              <li>Group discussions on recent legal cases</li>
              <li>Collaborative note-taking and resource sharing</li>
              <li>Court visits and legal procedure observations</li>
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
