
import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, FileText, Lightbulb, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ProfileCompletionBanner from "@/components/profile/ProfileCompletionBanner";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Course Materials",
      description: "Access comprehensive course notes, past questions, and study materials for all LLB courses.",
      action: () => navigate("/courses"),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Class Directory",
      description: "Connect with your classmates, view profiles, and build your professional network.",
      action: () => navigate("/people"),
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Events & Schedule",
      description: "Stay updated with class schedules, events, and important academic dates.",
      action: () => navigate("/events"),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Resource Library",
      description: "Download PDFs, case studies, and additional learning resources shared by the class.",
      action: () => navigate("/resources"),
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Study Tools",
      description: "Access AI-powered legal tools for case analysis, citations, and study assistance.",
      action: () => navigate("/tools"),
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Discussion Forum",
      description: "Engage in academic discussions, ask questions, and share knowledge with peers.",
      action: () => navigate("/secret-forum"),
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Completion Banner for authenticated users */}
        {user && <ProfileCompletionBanner />}
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-primary">LLB Class Hub</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your comprehensive platform for academic excellence, collaboration, and professional growth in legal studies.
          </p>
          
          {!user && (
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
                Learn More
              </Button>
            </div>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={feature.action}>
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Join Our Growing Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Students</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Resources Shared</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Events Organized</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Platform Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
