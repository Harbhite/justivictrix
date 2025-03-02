
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Scroll, UsersRound, BookOpen, Calendar, ClipboardList, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const Index = () => {
  // Scroll animation references
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [1, 0.8, 0.6, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [1, 0.98, 0.96, 0.94, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);
  
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
      location: "Faculty Hall 3"
    },
    {
      title: "Moot Court Competition",
      date: "May 22, 2023",
      time: "2:00 PM",
      location: "Law Auditorium"
    },
    {
      title: "Criminal Law Group Study",
      date: "May 25, 2023",
      time: "4:00 PM",
      location: "Law Library"
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
      ref={containerRef} 
      className="relative bg-[#f8f6f3] min-h-screen overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-64 h-64 rounded-full bg-yellow-100 blur-3xl opacity-40"
          style={{ 
            top: '10%', 
            left: '5%',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"
          style={{ 
            bottom: '15%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative max-w-7xl mx-auto px-4 pt-20 pb-40 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[90vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to LLB <span className="text-blue-600">Class of 28</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Your central hub for class resources, events, and connecting with fellow law students at the University of Ibadan.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link 
              to="/resources" 
              className="group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center"
            >
              <span>Explore Resources</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.1 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            
            <Link 
              to="/people" 
              className="group relative overflow-hidden bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center"
            >
              <span>Meet Classmates</span>
              <UsersRound className="ml-2 group-hover:translate-x-1 transition-transform" />
              <motion.div 
                className="absolute inset-0 bg-gray-400"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.1 }}
                transition={{ duration: 0.4 }}
              />
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
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth"
                });
              }}
            >
              <span className="text-gray-500 mb-2">Scroll to Explore</span>
              <ArrowDown className="text-gray-500" />
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
                    className={`h-full ${link.color} rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-white p-3 rounded-full mb-4">
                      {link.icon}
                    </div>
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
            <Link 
              to="/events"
              className="mt-4 md:mt-0 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              View All Events
              <ArrowRight className="ml-1" size={16} />
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
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
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
                className="bg-white rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600">{announcement.content}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-gray-500">{announcement.date}</div>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium cursor-pointer"
                onClick={() => {
                  window.open('https://chat.whatsapp.com/yourclassinvite', '_blank');
                }}
              >
                Join Class WhatsApp Group
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium cursor-pointer"
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
                title: "Foundation of Legal Studies", 
                description: "Introduction to Nigerian legal system and constitutional law fundamentals" 
              },
              { 
                year: "Year 2", 
                title: "Core Legal Principles", 
                description: "Diving deeper into contract law, criminal law, and tort" 
              },
              { 
                year: "Year 3", 
                title: "Specialized Practice Areas", 
                description: "Exploring commercial law, property law, and administrative law" 
              },
              { 
                year: "Year 4", 
                title: "Advanced Legal Practice", 
                description: "Focusing on evidence, civil procedure, and legal drafting" 
              },
              { 
                year: "Year 5", 
                title: "Professional Integration", 
                description: "Final year projects, moot court competitions, and Law School preparation" 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-5/12`}
              >
                <motion.div 
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative z-10"
                >
                  <div className={`absolute top-6 ${index % 2 === 0 ? 'md:-right-10' : 'md:-left-10'} w-8 h-8 rounded-full bg-blue-600 border-4 border-white z-20`}></div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <blockquote className="text-2xl md:text-3xl italic font-medium text-gray-700 mb-6 max-w-4xl mx-auto">
              "In the class of law, we don't just study principles—we become advocates for justice, together."
            </blockquote>
            <p className="text-lg text-gray-600">Class of 2028 Motto</p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">LLB Class of 28</h2>
            <p className="text-center text-gray-600 mb-6 max-w-md">
              Faculty of Law, University of Ibadan
            </p>
            <div className="flex space-x-6 mb-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382C17.094 14.194 15.12 13.277 14.773 13.151C14.426 13.025 14.174 12.91 13.923 13.278C13.672 13.646 12.91 14.558 12.658 14.81C12.406 15.062 12.154 15.088 11.776 14.9C11.398 14.712 10.114 14.307 8.768 13.106C7.709 12.155 7.086 11.011 6.834 10.643C6.582 10.275 6.807 10.061 7.025 9.863C7.223 9.685 7.459 9.403 7.679 9.152C7.899 8.901 8.05 8.713 8.176 8.562C8.302 8.411 8.365 8.26 8.491 8.009C8.617 7.757 8.586 7.506 8.491 7.318C8.397 7.13 7.782 5.34 7.467 4.58C7.193 3.872 6.904 3.944 6.624 3.929C6.356 3.915 6.104 3.911 5.853 3.911C5.602 3.911 5.191 4.005 4.844 4.373C4.497 4.741 3.484 5.658 3.484 7.448C3.484 9.238 4.872 10.966 5.092 11.218C5.312 11.47 7.05 14.115 9.716 15.709C10.335 15.977 10.825 16.142 11.213 16.267C11.834 16.465 12.417 16.437 12.886 16.346C13.403 16.244 14.991 15.429 15.306 14.533C15.621 13.637 15.621 12.877 15.527 12.689C15.433 12.501 15.181 12.407 14.803 12.22H14.802C14.364 12.005 12.351 11.073 11.957 10.929C11.563 10.785 11.329 10.713 11.095 11.061C10.896 11.358 10.399 12.003 10.2 12.301C10.001 12.599 9.802 12.634 9.438 12.436C9.074 12.238 8.276 11.958 7.383 11.158C6.756 10.571 6.319 9.852 6.14 9.474C5.961 9.096 6.145 8.897 6.297 8.73C6.436 8.578 6.607 8.347 6.759 8.158C6.911 7.969 7.001 7.824 7.105 7.62C7.209 7.416 7.175 7.191 7.105 7.047C7.035 6.903 6.661 5.555 6.426 4.808C6.213 4.143 5.95 4.218 5.753 4.207C5.56 4.196 5.355 4.196 5.151 4.196" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.5 20.5C5.5 18.5 9.23899 17.9832 11 19.5C12.8851 21.1209 15.5 21.5 17.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                <span className="sr-only">Email</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.75 6.75V17.25C21.75 18.3546 20.8546 19.25 19.75 19.25H4.25C3.14543 19.25 2.25 18.3546 2.25 17.25V6.75M21.75 6.75C21.75 5.64543 20.8546 4.75 19.75 4.75H4.25C3.14543 4.75 2.25 5.64543 2.25 6.75M21.75 6.75V6.825C21.75 7.57364 21.3474 8.2723 20.6795 8.68378L13.1795 13.1838C12.4413 13.6306 11.5587 13.6306 10.8205 13.1838L3.32047 8.68378C2.65264 8.2723 2.25 7.57364 2.25 6.825V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.1313 2.76747C17.9654 2.76747 19.6792 3.45618 20.9325 4.70953C22.1859 5.96288 22.8746 7.67663 22.8746 9.51074V14.4894C22.8746 16.3235 22.1859 18.0372 20.9325 19.2906C19.6792 20.5439 17.9654 21.2326 16.1313 21.2326H7.86881C6.0347 21.2326 4.32095 20.5439 3.0676 19.2906C1.81425 18.0372 1.12555 16.3235 1.12555 14.4894V9.51074C1.12555 7.67663 1.81425 5.96288 3.0676 4.70953C4.32095 3.45618 6.0347 2.76747 7.86881 2.76747H16.1313Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M17.6246 8.02504C18.1359 8.02504 18.5496 7.61135 18.5496 7.10004C18.5496 6.58873 18.1359 6.17505 17.6246 6.17505C17.1133 6.17505 16.6996 6.58873 16.6996 7.10004C16.6996 7.61135 17.1133 8.02504 17.6246 8.02504Z" fill="currentColor" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">&copy; 2023 University of Ibadan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed scroll to top button - appears after scrolling */}
      <ScrollToTopButton />
    </div>
  );
};

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50"
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19.5V4.5M12 4.5L5.25 11.25M12 4.5L18.75 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
};

export default Index;
