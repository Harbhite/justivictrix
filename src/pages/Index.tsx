
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, FileText, Image, Wrench, ArrowRight } from "lucide-react";
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
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5 }}
    className="group"
  >
    <Card className="h-full border border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={href}>
          <Button variant="outline" size="sm" className="group-hover:bg-blue-500/5 transition-colors duration-300">
            Explore
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardContent>
    </Card>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
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
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Welcome to LLB28HUB
          </motion.h1>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 min-h-[2.5rem] flex items-center justify-center"
          >
            <span className="mr-3">Where</span>
            <TypewriterEffect 
              words={typewriterWords}
              delay={150}
              className="text-blue-600 font-bold"
            />
            <span className="ml-3">Connect</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Your central hub for academic excellence, collaboration, and growth in legal education. 
            Join our vibrant community of law students as we navigate through our legal journey together.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link to="/about">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Learn More About Us
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
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin?</h3>
            <p className="text-gray-600 mb-6">
              Join our community and start your journey towards legal excellence today.
            </p>
            <Link to="/auth">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
