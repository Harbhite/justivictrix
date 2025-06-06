
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel, Heart, Star, Target, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ number, label, icon: Icon }: { number: string; label: string; icon: any }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 text-center group hover:shadow-xl transition-all duration-300"
  >
    <div className="bg-gradient-to-br from-purple-500 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-2">{number}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </motion.div>
);

const FeatureCard = ({ title, description, icon: Icon, color, delay }: {
  title: string;
  description: string;
  icon: any;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group cursor-pointer"
  >
    <Card className={`${color} border-2 border-transparent group-hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
            <Icon size={28} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const About = () => {
  const stats = [
    { number: "28", label: "Dedicated Students", icon: Users },
    { number: "12", label: "Core Subjects", icon: BookOpen },
    { number: "100%", label: "Success Rate", icon: Trophy },
    { number: "24/7", label: "Study Support", icon: Heart }
  ];

  const features = [
    {
      title: "Collaborative Learning",
      description: "We believe in the power of learning together. Our community thrives on sharing knowledge, supporting each other, and growing as future legal professionals.",
      icon: Users,
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
    },
    {
      title: "Comprehensive Curriculum",
      description: "From Constitutional Law to Criminal Procedure, we cover all essential legal subjects with depth and practical application to prepare for real-world practice.",
      icon: Scale,
      color: "bg-gradient-to-br from-purple-50 to-pink-100",
    },
    {
      title: "Practical Experience",
      description: "Through moot courts, legal research projects, and court visits, we gain hands-on experience that bridges theory with practice.",
      icon: Gavel,
      color: "bg-gradient-to-br from-amber-50 to-orange-100",
    },
    {
      title: "Academic Excellence",
      description: "Our commitment to academic excellence drives us to continuously improve, challenge ourselves, and achieve outstanding results in our legal education.",
      icon: Star,
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
    },
    {
      title: "Future-Focused",
      description: "We're not just studying law; we're preparing to shape the future of justice, advocacy, and legal practice in our communities and beyond.",
      icon: Target,
      color: "bg-gradient-to-br from-rose-50 to-red-100",
    },
    {
      title: "Innovation & Growth",
      description: "Embracing new technologies and methodologies in legal education, we stay ahead of the curve in an evolving legal landscape.",
      icon: Lightbulb,
      color: "bg-gradient-to-br from-cyan-50 to-blue-100",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/80 via-white to-amber-50/80">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600 mb-6"
          >
            LLB 28 Class
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
          >
            Where future legal minds unite to learn, grow, and shape tomorrow's justice system
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            What Makes Us Special
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-1 rounded-3xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
              <Brain className="w-16 h-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are more than just a class – we are a community of passionate individuals dedicated to excellence in legal education. 
                Our collaborative approach ensures that every member grows both academically and personally, preparing us to become 
                ethical, competent, and compassionate legal professionals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Together, we're not just studying law; we're building the foundation for a more just and equitable society.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
