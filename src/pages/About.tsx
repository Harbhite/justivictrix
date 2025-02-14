
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Committed to the highest standards of legal education",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Foster peer-to-peer learning and knowledge sharing",
    },
    {
      icon: Trophy,
      title: "Professional Development",
      description: "Prepare for successful legal careers",
    },
    {
      icon: Scale,
      title: "Legal Ethics",
      description: "Emphasis on ethical practice and integrity",
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
          About Our Law Class
        </h1>

        <div className="prose prose-lg text-law-neutral mb-12">
          <div className="p-8 bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-6 text-xl">
              Welcome to our vibrant community of aspiring legal professionals. Our class
              is dedicated to fostering excellence in legal education and preparing the
              next generation of legal practitioners.
            </p>
            <p className="text-xl">
              Through rigorous academic work, practical experience, and collaborative
              learning, we aim to develop well-rounded legal minds capable of tackling
              the complex challenges of tomorrow's legal landscape.
            </p>
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
