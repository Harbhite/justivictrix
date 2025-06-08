
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, UsersRound, BookOpen, Calendar, ClipboardList, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  // Interactive features
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for dynamic effects
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5
    });
  };
  
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Quick links section for class resources
  const quickLinks = [
    {
      name: "Class Members",
      icon: <UsersRound size={24} />,
      path: "/people",
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Course Materials",
      icon: <BookOpen size={24} />,
      path: "/resources",
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Class Events",
      icon: <Calendar size={24} />,
      path: "/events",
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Timetable",
      icon: <ClipboardList size={24} />,
      path: "/timetable",
      color: "bg-amber-100 text-amber-600"
    },
    {
      name: "Study Tools",
      icon: <Lightbulb size={24} />,
      path: "/tools",
      color: "bg-red-100 text-red-600"
    }
  ];
  
  // Upcoming events
  const upcomingEvents = [
    {
      title: "Constitutional Law Mid-Semester Test",
      date: "May 15, 2023",
      time: "10:00 AM",
      location: "Law Lecture Theatre (LLT)"
    },
    {
      title: "Moot Court Competition",
      date: "May 22, 2023",
      time: "2:00 PM",
      location: "Wole Olanipekun Lecture Theatre"
    },
    {
      title: "Criminal Law Group Study",
      date: "May 25, 2023",
      time: "4:00 PM",
      location: "New Faculty of Law Complex"
    }
  ];
  
  // Class announcements
  const announcements = [
    {
      title: "Class Rep Election Results",
      content: "Congratulations to Oluwadare Agbede for being elected as our new Class Representative!",
      date: "April 30, 2023"
    },
    {
      title: "Revised Exam Timetable Posted",
      content: "Please check the updated exam schedule on the timetable page",
      date: "May 2, 2023"
    },
    {
      title: "Law Clinic Sign-up Open",
      content: "Volunteer opportunities are now available at the campus legal aid clinic",
      date: "May 5, 2023"
    }
  ];

  return (
    <div 
      className="relative bg-[#f8f6f3] min-h-screen overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-yellow-100 blur-3xl opacity-40"
          style={{ 
            top: '10%', 
            left: '5%'
          }}
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        ></motion.div>
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"
          style={{ 
            bottom: '15%', 
            right: '10%'
          }}
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto px-4 pt-20 pb-40 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[90vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to University of Ibadan{" "}
            <motion.span 
              className="text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Law Class of 2028
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your central hub for class resources, events, and connecting with fellow law students at the University of Ibadan.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link to="/resources">
              <motion.div 
                className="group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Resources</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRight />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Link>
            
            <Link to="/people">
              <motion.div 
                className="group relative overflow-hidden bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Meet Classmates</span>
                <motion.div
                  className="ml-2"
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <UsersRound />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-gray-400"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth"
                });
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-gray-500 mb-2 group-hover:text-gray-700 transition-colors">Scroll to Explore</span>
              <ArrowDown className="text-gray-500 group-hover:text-gray-700 transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Access Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access to Class Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for your law studies in one place
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={link.path}>
                  <motion.div 
                    className={`h-full ${link.color} rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <motion.div 
                      className="bg-white p-3 rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {link.icon}
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">{link.name}</h3>
                    <p className="text-sm text-gray-600">Access your {link.name.toLowerCase()}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="py-16 bg-gradient-to-b from-[#f8f6f3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Class Events</h2>
              <p className="text-gray-600">Stay updated with tests, activities, and deadlines</p>
            </div>
            <Link to="/events">
              <motion.div
                className="mt-4 md:mt-0 inline-flex items-center text-blue-600 font-medium transition-colors cursor-pointer"
                whileHover={{ x: 5, color: "#1e40af" }}
              >
                View All Events
                <motion.div
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start">
                  <motion.div 
                    className="p-3 bg-blue-50 rounded-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="text-blue-600" size={24} />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-800 text-sm mb-1">{event.date} • {event.time}</p>
                    <p className="text-gray-600 text-sm">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Announcements Section */}
      <div className="py-16 bg-[#f8f6f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Class Announcements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important updates from class representatives and faculty
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="bg-white rounded-lg p-6 border-l-4 border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600">{announcement.content}</p>
                  </div>
                  <motion.div 
                    className="mt-2 md:mt-0 text-sm text-gray-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    {announcement.date}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Class Section */}
      <div className="relative py-20 bg-blue-600 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Experience the Journey Together</h2>
            <p className="text-xl mb-10">
              From orientation to graduation, we're building memories and professional skills as a class.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-300"
                onClick={() => {
                  window.open('https://wa.me/2349014412044', '_blank');
                }}
              >
                Join Class WhatsApp Group
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-300"
                onClick={() => {
                  window.open('mailto:llbclass28@ui.edu.ng');
                }}
              >
                Contact Class Representatives
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Touch Elements */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Class Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Swipe or drag to explore our academic timeline
            </p>
          </motion.div>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 h-full w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            {[
              { 
                year: "Year 1", 
                title: "Foundations of Legal Thought", 
                description: "Embarking on our legal journey with Nigerian Legal Methods, discovering the building blocks of legal reasoning and research. The first steps in a transformative professional path.",
                highlight: "Nigerian legal methods and introduction to foundational law courses" 
              },
              { 
                year: "Year 2", 
                title: "Constitutional Frameworks & Psychological Dimensions", 
                description: "Diving deeper into the Nigerian legal system and constitutional law while exploring the fascinating intersection of law and human psychology. Building critical analytical skills.",
                highlight: "Nigerian legal system, contract, constitutional law, law and psychology" 
              },
              { 
                year: "Year 3", 
                title: "Civil & Commercial Jurisprudence", 
                description: "Mastering tort law, commercial regulations, and criminal justice principles. Developing the ability to navigate both civil wrongs and business transactions with legal precision.",
                highlight: "Tort, commercial and criminal law" 
              },
              { 
                year: "Year 4", 
                title: "Procedural & Property Rights", 
                description: "Unraveling the intricacies of evidence law, equity principles, and property rights. Learning to apply complex legal doctrines to real-world scenarios with confidence.",
                highlight: "Evidence, equity and trust, land law" 
              },
              { 
                year: "Year 5", 
                title: "Professional Integration & Transition", 
                description: "Culminating our academic journey with capstone projects and practical legal drafting skills. Preparing for the transition to law school and the professional legal world ahead.",
                highlight: "Final year project, legal drafting, and law school preparation" 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-5/12`}
              >
                <motion.div 
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative z-10 cursor-grab active:cursor-grabbing"
                >
                  <motion.div 
                    className={`absolute top-6 ${index % 2 === 0 ? 'md:-right-10' : 'md:-left-10'} w-8 h-8 rounded-full bg-blue-600 border-4 border-white z-20`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.year}
                  </motion.span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <p className="text-sm text-gray-500 italic">Key focus: {item.highlight}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Quote */}
      <div className="py-16 bg-gradient-to-b from-white to-[#f8f6f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.blockquote 
              className="text-2xl md:text-3xl italic font-medium text-gray-700 mb-6 max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              "In the class of law, we don't just study principles—we become advocates for justice, together."
            </motion.blockquote>
            <motion.p 
              className="text-lg text-gray-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Class of 2028 Motto
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-12 border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <motion.h2 
              className="text-2xl font-bold text-gray-900 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              LLB Class of 2028
            </motion.h2>
            <p className="text-center text-gray-600 mb-6 max-w-md">
              Faculty of Law, University of Ibadan
            </p>
            <div className="flex space-x-6 mb-8">
              <motion.a 
                href="https://wa.me/2349014412044" 
                className="text-gray-500 transition-colors"
                whileHover={{ scale: 1.2, color: "#059669" }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">WhatsApp</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382C17.094 14.194 15.12 13.277 14.773 13.151C14.426 13.025 14.174 12.91 13.923 13.278C13.672 13.646 12.91 14.558 12.658 14.81C12.406 15.062 12.154 15.088 11.776 14.9C11.398 14.712 10.114 14.307 8.768 13.106C7.709 12.155 7.086 11.011 6.834 10.643C6.582 10.275 6.807 10.061 7.025 9.863C7.223 9.685 7.459 9.403 7.679 9.152C7.899 8.901 8.05 8.713 8.176 8.562C8.302 8.411 8.365 8.26 8.491 8.009C8.617 7.757 8.586 7.506 8.491 7.318C8.397 7.13 7.782 5.34 7.467 4.58C7.193 3.872 6.904 3.944 6.624 3.929C6.356 3.915 6.104 3.911 5.853 3.911C5.602 3.911 5.191 4.005 4.844 4.373C4.497 4.741 3.484 5.658 3.484 7.448C3.484 9.238 4.872 10.966 5.092 11.218C5.312 11.47 7.05 14.115 9.716 15.709C10.335 15.977 10.825 16.142 11.213 16.267C11.834 16.465 12.417 16.437 12.886 16.346C13.403 16.244 14.991 15.429 15.306 14.533C15.621 13.637 15.621 12.877 15.527 12.689C15.433 12.501 15.181 12.407 14.803 12.22H14.802C14.364 12.005 12.351 11.073 11.957 10.929C11.563 10.785 11.329 10.713 11.095 11.061C10.896 11.358 10.399 12.003 10.2 12.301C10.001 12.599 9.802 12.634 9.438 12.436C9.074 12.238 8.276 11.958 7.383 11.158C6.756 10.571 6.319 9.852 6.14 9.474C5.961 9.096 6.145 8.897 6.297 8.73C6.436 8.578 6.607 8.347 6.759 8.158C6.911 7.969 7.001 7.824 7.105 7.62C7.209 7.416 7.175 7.191 7.105 7.047C7.035 6.903 6.661 5.555 6.426 4.808C6.213 4.143 5.95 4.218 5.753 4.207C5.56 4.196 5.355 4.196 5.151 4.196" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.5 20.5C5.5 18.5 9.23899 17.9832 11 19.5C12.8851 21.1209 15.5 21.5 17.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a 
                href="mailto:llbclass28@ui.edu.ng" 
                className="text-gray-500 transition-colors"
                whileHover={{ scale: 1.2, color: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Email</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.75 6.75V17.25C21.75 18.3546 20.8546 19.25 19.75 19.25H4.25C3.14543 19.25 2.25 18.3546 2.25 17.25V6.75M21.75 6.75C21.75 5.64543 20.8546 4.75 19.75 4.75H4.25C3.14543 4.75 2.25 5.64543 2.25 6.75M21.75 6.75V6.825C21.75 7.57364 21.3474 8.2723 20.6795 8.68378L13.1795 13.1838C12.4413 13.6306 11.5587 13.6306 10.8205 13.1838L3.32047 8.68378C2.65264 8.2723 2.25 7.57364 2.25 6.825V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 transition-colors"
                whileHover={{ scale: 1.2, color: "#ec4899" }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Instagram</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
