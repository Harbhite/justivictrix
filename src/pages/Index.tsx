
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, FileText, Image, Wrench, ArrowRight, Star, Trophy, Target, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TypewriterEffect from "@/components/TypewriterEffect";

const FeatureCard = ({ title, description, icon: Icon, href, delay }: {
  title: string;
  description: string;
  icon: any;
  href: string;
  delay: number;
}) => (
  <motion.div
    initial={{ y: 50, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className="group"
  >
    <Card className="h-full border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-amber-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg group-hover:text-purple-700 transition-colors duration-300">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Link to={href}>
          <Button variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-300 transition-all duration-300">
            Explore
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  </motion.div>
);

const FloatingIcon = ({ icon: Icon, delay, position }: { icon: any; delay: number; position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 0.1, 
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      opacity: { delay, duration: 1 },
      scale: { delay, duration: 0.5 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }}
    className={`absolute ${position} text-purple-300 pointer-events-none`}
  >
    <Icon size={48} />
  </motion.div>
);

const Index = () => {
  const features = [
    {
      title: "Resources",
      description: "Access comprehensive study materials, notes, and academic resources shared by fellow students.",
      icon: FileText,
      href: "/resources",
    },
    {
      title: "Courses",
      description: "Explore our curriculum, course schedules, and academic information for all LLB subjects.",
      icon: BookOpen,
      href: "/courses",
    },
    {
      title: "Community",
      description: "Connect with classmates, join discussions, and build lasting professional relationships.",
      icon: Users,
      href: "/people",
    },
    {
      title: "Events",
      description: "Stay updated on upcoming lectures, seminars, moot courts, and social gatherings.",
      icon: Calendar,
      href: "/events",
    },
    {
      title: "Gallery",
      description: "Browse photos from our academic journey, events, and memorable moments together.",
      icon: Image,
      href: "/gallery",
    },
    {
      title: "Tools",
      description: "Access helpful study tools, calculators, and utilities designed for law students.",
      icon: Wrench,
      href: "/tools",
    },
  ];

  const typewriterWords = [
    "Future Lawyers",
    "Legal Scholars", 
    "Justice Seekers",
    "Law Students",
    "Legal Minds"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 relative overflow-hidden">
      {/* Floating Background Icons */}
      <FloatingIcon icon={BookOpen} delay={0.5} position="top-20 left-10" />
      <FloatingIcon icon={Scale} delay={1} position="top-40 right-20" />
      <FloatingIcon icon={Trophy} delay={1.5} position="bottom-40 left-20" />
      <FloatingIcon icon={Target} delay={2} position="bottom-20 right-10" />
      <FloatingIcon icon={Star} delay={2.5} position="top-60 left-1/3" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600 mb-6"
          >
            Welcome to LLB28HUB
          </motion.h1>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-3xl text-gray-700 mb-8 min-h-[2.5rem] flex items-center justify-center"
          >
            <span className="mr-3">Where</span>
            <TypewriterEffect 
              words={typewriterWords}
              delay={150}
              className="text-purple-600 font-bold"
            />
            <span className="ml-3">Connect</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Your central hub for academic excellence, collaboration, and growth in legal education. 
            Join our vibrant community of law students as we navigate through our legal journey together.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/about">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Discover Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Explore Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.title} 
                {...feature} 
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-1 rounded-2xl max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin?</h3>
              <p className="text-gray-600 mb-6">
                Join our community and start your journey towards legal excellence today.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="font-semibold border-2 hover:bg-purple-50 hover:border-purple-300">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
