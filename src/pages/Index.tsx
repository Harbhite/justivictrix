import { useMetaTags } from '@/hooks/useMetaTags';
import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Calendar, Wrench, GraduationCap, Star, TrendingUp, Award, Play, CheckCircle, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  useMetaTags({
    title: "LLB28 Hub - Your Complete Law Student Portal",
    description: "Join the ultimate law student community. Access resources, tools, study materials, connect with peers, and excel in your legal studies.",
    image: "/og-image.png",
    type: "website"
  });

  const stats = [
    { number: "157", label: "Class Members", icon: Users },
    { number: "15+", label: "Core Subjects", icon: BookOpen },
    { number: "25+", label: "Study Groups", icon: Brain },
    { number: "3", label: "Academic Years", icon: GraduationCap }
  ];

  const missionPoints = [
    "Fostering Collaborative Academic Excellence",
    "Mastering the Art of Legal Analysis",
    "Student-Centric Learning Approach", 
    "Building Strong Legal Communities"
  ];

  const visionPoints = [
    "Shaping Modern Legal Professionals",
    "Pioneering Sustainable Legal Education",
    "Empowering Communities Through Legal Knowledge",
    "Leading the Future of Legal Studies"
  ];

  const historyPoints = [
    "Founded as LLB 28 Cohort",
    "Built on Unity and Excellence",
    "Shaping the Future Lawyers of the Nation"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <Badge className="px-4 py-2 text-sm font-medium">
                  Welcome to LLB28 Hub
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                AI-Powered Learning
                <span className="block text-primary">
                  for Tomorrow's Leaders
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Empowering Students with Personalized, Interactive Learning
                Designed to Build Essential Skills for Future Success.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="lg" asChild className="px-8 py-4 text-lg">
                  <Link to="/tools">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg">
                  <Link to="/resources">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Hero Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-muted-foreground">Professional Courses</span>
                  </div>
                  <h3 className="font-semibold mb-2">Learn anything. anytime, anywhere</h3>
                  <p className="text-sm text-muted-foreground">Our courses.</p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Professional Teachers</span>
                  </div>
                  <h3 className="font-semibold mb-2">Every child deserves the right to learn</h3>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Math</span>
                  </div>
                  <h3 className="font-semibold mb-2">1st Place Winner</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>15</span>
                    <span>Lesson</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground">25,000+ Students</span>
            </div>
            <p className="text-muted-foreground">Empowered Since Launch</p>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon size={16} className="text-primary" />
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Skills That
              <span className="block">Shape Tomorrow</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We Believe Essential Life Skills Tailored to Help You Succeed in School, Work, and Life
            </p>
            <Button className="mt-6" size="lg">
              Join Now
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge className="mb-3">Join My EdSkills</Badge>
                  <h3 className="text-xl font-bold mb-2">To Activate Your Learning</h3>
                </div>
                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">💡</span>
                    </div>
                    <span className="font-medium">Critical Thinking</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Develop analytical skills</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge className="mb-3">Join My EdSkills</Badge>
                  <h3 className="text-xl font-bold mb-2">To Activate Your Teaching</h3>
                </div>
                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">👩‍🏫</span>
                    </div>
                    <span className="font-medium">Teaching Skills</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Master communication</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge className="mb-3">Support Your Child's</Badge>
                  <h3 className="text-xl font-bold mb-2">Learning Through My EdSkills</h3>
                </div>
                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">👨‍👩‍👧‍👦</span>
                    </div>
                    <span className="font-medium">Family Learning</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Engage together</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subject Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Where Questions
              <span className="block">Meet Answers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { name: "All Subject", color: "bg-red-100 text-red-700", href: "/courses" },
              { name: "English", color: "bg-pink-100 text-pink-700", href: "/courses" },
              { name: "Business", color: "bg-green-100 text-green-700", href: "/courses" },
              { name: "History", color: "bg-blue-100 text-blue-700", href: "/courses" },
              { name: "Geography", color: "bg-orange-100 text-orange-700", href: "/courses" },
              { name: "Chemistry", color: "bg-teal-100 text-teal-700", href: "/courses" },
              { name: "Physics", color: "bg-indigo-100 text-indigo-700", href: "/courses" },
              { name: "Engineering", color: "bg-cyan-100 text-cyan-700", href: "/courses" },
              { name: "Medicine", color: "bg-purple-100 text-purple-700", href: "/courses" },
              { name: "Computers", color: "bg-blue-100 text-blue-700", href: "/courses" },
              { name: "Mathematics", color: "bg-purple-100 text-purple-700", href: "/courses" },
              { name: "Arts", color: "bg-yellow-100 text-yellow-700", href: "/courses" }
            ].map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={subject.href}
                  className={`block p-4 rounded-xl ${subject.color} text-center font-medium hover:scale-105 transition-transform duration-200`}
                >
                  {subject.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Experience
                <span className="block">Learning Like</span>
                <span className="block">Never Before</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Bringing Personalized, AI-Powered Learning Solutions to Real World.
              </p>
              <Button size="lg" className="mb-8">
                Start Your Journey
              </Button>
            </div>
            
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Earn While You Learn</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accumulate eduskillment badges made to your progress
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold">Verified Credentials</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive blockchain certificates for your achievements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our
              <span className="block">Community</span>
              <span className="block">Banner</span>
            </h2>
            <Button size="lg" variant="secondary" className="mt-6">
              Join Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
