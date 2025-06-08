
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, UsersRound, BookOpen, Calendar, ClipboardList, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-law-gold text-law-dark font-bold text-sm rounded-full border-2 border-black shadow-lg transform hover:scale-105 transition-transform duration-200">
                Welcome to LLB28HUB
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black text-law-dark mb-6 leading-tight"
              variants={itemVariants}
            >
              Your Legal Education
              <span className="block text-law-gold transform hover:scale-105 transition-transform duration-300">
                Hub
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Connect, learn, and excel with your fellow LLB28 classmates. Access resources, 
              join study groups, and build your legal career together.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-law-dark text-white px-8 py-4 rounded-lg text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/resources"
                className="group inline-flex items-center gap-2 bg-white text-law-dark px-8 py-4 rounded-lg text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Browse Resources
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-law-gold rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        className="py-16 bg-white border-t-4 border-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-law-dark text-center mb-12"
            variants={itemVariants}
          >
            Quick Access
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Our People",
                description: "Meet your classmates",
                icon: UsersRound,
                href: "/people",
                color: "bg-blue-100 border-blue-500 hover:bg-blue-200"
              },
              {
                title: "Courses",
                description: "Academic resources",
                icon: BookOpen,
                href: "/courses",
                color: "bg-green-100 border-green-500 hover:bg-green-200"
              },
              {
                title: "Events",
                description: "Upcoming activities",
                icon: Calendar,
                href: "/events",
                color: "bg-purple-100 border-purple-500 hover:bg-purple-200"
              },
              {
                title: "Tools",
                description: "Study aids & utilities",
                icon: ClipboardList,
                href: "/tools",
                color: "bg-orange-100 border-orange-500 hover:bg-orange-200"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`group block p-6 rounded-xl border-4 ${item.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200`}
                  >
                    <Icon className="w-8 h-8 text-gray-800 mb-4 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-gray-600 transition-colors duration-200">
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="py-16 bg-gray-50 border-t-4 border-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-black text-law-dark mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for LLB28 students
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Study Resources",
                description: "Access lecture notes, past questions, textbooks, and study materials curated by your peers.",
                features: ["Lecture Notes", "Past Questions", "Textbooks", "Study Guides"]
              },
              {
                title: "Academic Tools",
                description: "Powerful tools to enhance your learning experience and academic performance.",
                features: ["CGPA Calculator", "Citation Generator", "Legal Dictionary", "Note Taker"]
              },
              {
                title: "Community Hub",
                description: "Connect with classmates, join discussions, and collaborate on projects.",
                features: ["Member Profiles", "Discussion Forum", "Event Calendar", "Gallery"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <h3 className="text-2xl font-bold text-law-dark mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-law-gold rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-law-dark border-t-4 border-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <Lightbulb className="w-16 h-16 text-law-gold mx-auto mb-6 animate-pulse" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-white mb-6"
            variants={itemVariants}
          >
            Ready to Excel in Your Legal Journey?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join your classmates and access everything you need to succeed in law school.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              to="/auth"
              className="group inline-flex items-center gap-2 bg-law-gold text-law-dark px-8 py-4 rounded-lg text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg text-lg font-bold border-4 border-white hover:bg-white hover:text-law-dark transition-all duration-200"
            >
              Learn More
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
