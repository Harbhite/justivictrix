
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Scale, Brain, Gavel, GraduationCap, Clock, Target, Award } from "lucide-react";

const About = () => {
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-law-primary to-law-secondary text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-sm font-medium mb-4 text-blue-200"
              variants={itemVariants}
            >
              Home / About
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-black mb-6 leading-tight"
              variants={itemVariants}
            >
              Crafting Legal Excellence
              <br />
              <span className="text-edtech-yellow">Together</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              At LLB 28, we believe in the power of collaborative law education. We are 
              committed to quality, our unit work hard—both with our capacity to 
              help us learn more than before, the create spaces and structures 
              for academic and professional growth.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Floating Badge */}
        <motion.div 
          className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20">
            <GraduationCap size={48} className="text-edtech-yellow" />
          </div>
        </motion.div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At LLB 28, we are committed to revolutionizing legal education 
              through innovative, sustainable, and cost-effective learning solutions. With 
              a proven track record of delivering exceptional academic results, we combine 
              state-of-the-art study technology, refined expertise, and student-centric 
              approaches to bring our learning objectives to life.
            </p>
          </div>

          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="text-center group cursor-pointer"
                  variants={statVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-black text-law-primary mb-2"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(155, 135, 245, 0)", "0 0 20px rgba(155, 135, 245, 0.3)", "0 0 0px rgba(155, 135, 245, 0)"]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon size={20} className="text-law-secondary group-hover:text-law-primary transition-colors" />
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-black text-law-dark mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To provide exceptional legal education where law students come together, 
                fostering innovative approaches that contribute to our shared academic 
                development. We seek to be the best version of ourselves as future 
                lawyers and law-abiding citizens of Ghana.
              </p>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {missionPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-law-primary rounded-full flex-shrink-0"></div>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Mission Image Placeholder */}
            <motion.div 
              className="relative h-80 bg-gradient-to-br from-law-primary/20 to-law-secondary/20 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Scale size={80} className="text-law-primary/30" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vision Image Placeholder */}
            <motion.div 
              className="relative h-80 bg-gradient-to-br from-edtech-yellow/20 to-law-primary/20 rounded-2xl overflow-hidden order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gavel size={80} className="text-law-primary/30" />
                </motion.div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-black text-law-dark mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Renovex, our vision is to redefine the future of legal education through 
                innovative and tailored learning solutions. We strive to create a new 
                standard of excellence where students and educators collaborate to reach 
                their full potential in the legal profession.
              </p>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {visionPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-edtech-yellow rounded-full flex-shrink-0"></div>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* History */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-purple-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-black text-law-dark mb-6">Our History</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                LLB 28 was established as a cohort with a very distinct bond. As a class, 
                we bonded with each other on the journey to become legal professionals. 
                We have formed the structure that helps us learn and grow together, 
                creating lasting friendships and professional networks.
              </p>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {historyPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-law-secondary rounded-full flex-shrink-0"></div>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              className="relative h-80 bg-gradient-to-br from-law-secondary/20 to-edtech-yellow/20 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Trophy size={80} className="text-law-secondary/30" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How We Study */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-black text-law-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How We Study
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We believe in collaborative learning and peer support. Our study methodology 
            focuses on group discussions, shared resources, and collective growth.
          </motion.p>
          
          <motion.div 
            className="relative h-96 bg-gradient-to-br from-law-primary/10 to-edtech-yellow/10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen size={120} className="text-law-primary/20" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-law-primary to-law-secondary text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Crafting Legal Excellence as a Team
          </motion.h2>
          <motion.p 
            className="text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Students in part of the distinctive mini collective of our team, will easily begin to enjoy 
            the learning experience and opportunity to participate in various academic initiatives 
            designed to shape our legal education.
          </motion.p>
          <motion.button 
            className="bg-edtech-yellow text-law-dark px-8 py-3 rounded-lg font-bold text-lg border-2 border-transparent hover:border-white transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join LLB 28
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
