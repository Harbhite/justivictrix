
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, UsersRound, BookOpen, Calendar, ClipboardList, Lightbulb, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Interactive features
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
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

  // Automatic testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Quick links section for class resources
  const quickLinks = [
    {
      name: "Class Members",
      icon: <UsersRound size={24} />,
      path: "/people",
      color: "bg-green-900/20 text-green-500"
    },
    {
      name: "Course Materials",
      icon: <BookOpen size={24} />,
      path: "/resources",
      color: "bg-green-900/20 text-green-500"
    },
    {
      name: "Class Events",
      icon: <Calendar size={24} />,
      path: "/events",
      color: "bg-green-900/20 text-green-500"
    },
    {
      name: "Timetable",
      icon: <ClipboardList size={24} />,
      path: "/timetable",
      color: "bg-green-900/20 text-green-500"
    },
    {
      name: "Study Tools",
      icon: <Lightbulb size={24} />,
      path: "/tools",
      color: "bg-green-900/20 text-green-500"
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

  // Faculty highlights
  const facultyHighlights = [
    {
      name: "Prof. Adedoyin Akinsulore",
      title: "Dean of Law",
      achievement: "Recently published groundbreaking research on International Trade Law in the African Journal of Legal Studies",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop"
    },
    {
      name: "Dr. Olufunmilayo Arewa",
      title: "Head of Department, Public Law",
      achievement: "Appointed as consultant to the African Union on constitutional reforms",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop"
    },
    {
      name: "Prof. Jadesola Akande",
      title: "Professor of Criminal Law",
      achievement: "Received the National Merit Award for contributions to Legal Education in Nigeria",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop"
    }
  ];

  // Academic resources
  const academicResources = [
    {
      title: "Nigerian Law Reports",
      description: "Complete collection of Supreme Court and Court of Appeal decisions",
      link: "/resources"
    },
    {
      title: "Constitutional Law Materials",
      description: "Lecture notes, case summaries, and practice questions",
      link: "/resources"
    },
    {
      title: "Moot Court Preparation Guide",
      description: "Comprehensive guide to excelling in moot court competitions",
      link: "/resources"
    },
    {
      title: "Legal Research Methodology",
      description: "Step-by-step guide to conducting effective legal research",
      link: "/resources"
    }
  ];

  // Core courses
  const coreCourses = [
    {
      code: "LAW 101",
      title: "Nigerian Legal System",
      description: "Introduction to the sources of Nigerian law, court structure, and legal profession"
    },
    {
      code: "LAW 102",
      title: "Constitutional Law",
      description: "Study of the Nigerian Constitution and fundamental rights"
    },
    {
      code: "LAW 103",
      title: "Law of Contract",
      description: "Principles governing formation, terms, and enforcement of contracts"
    },
    {
      code: "LAW 104",
      title: "Criminal Law",
      description: "Elements of crimes, defenses, and criminal procedure"
    }
  ];

  // Career paths
  const careerPaths = [
    {
      title: "Legal Practice",
      description: "Become a barrister or solicitor in private practice",
      icon: "⚖️"
    },
    {
      title: "Judiciary",
      description: "Serve as a judge or magistrate in the court system",
      icon: "👨‍⚖️"
    },
    {
      title: "Corporate Counsel",
      description: "Work as in-house legal advisor for corporations",
      icon: "🏢"
    },
    {
      title: "Public Service",
      description: "Serve in government agencies or public institutions",
      icon: "🏛️"
    },
    {
      title: "Academia",
      description: "Pursue research and teaching in legal education",
      icon: "🎓"
    },
    {
      title: "International Organizations",
      description: "Work with UN, EU, AU and other international bodies",
      icon: "🌍"
    }
  ];

  // Alumni spotlights
  const alumniSpotlights = [
    {
      name: "Justice Olukayode Ariwoola",
      position: "Chief Justice of Nigeria",
      quote: "The foundation of my legal career was laid at the University of Ibadan. The rigorous training prepared me for the challenges of the judiciary.",
      gradYear: "Class of 1980"
    },
    {
      name: "Folake Solanke",
      position: "First Female Senior Advocate of Nigeria",
      quote: "My time at UI Law Faculty instilled in me the courage to break barriers and set precedents in the legal profession.",
      gradYear: "Class of 1962"
    },
    {
      name: "Femi Falana",
      position: "Human Rights Activist and Senior Advocate of Nigeria",
      quote: "The emphasis on justice and equity at UI shaped my passion for human rights advocacy.",
      gradYear: "Class of 1982"
    }
  ];

  // Student testimonials
  const testimonials = [
    {
      name: "Adeola Ogunleye",
      year: "4th Year",
      text: "The quality of teaching and mentorship at UI Law Faculty is unparalleled. The professors are not just educators but life coaches.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop"
    },
    {
      name: "Chukwudi Nnamdi",
      year: "3rd Year",
      text: "The practical approach to legal education through moot courts and law clinics has given me real-world experience even before graduation.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1287&auto=format&fit=crop"
    },
    {
      name: "Amina Ibrahim",
      year: "5th Year",
      text: "Being part of this law class has exposed me to diverse perspectives and created networking opportunities that will last beyond our time here.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1287&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden text-white">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center">
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(74, 222, 128, 0.2) 0%, transparent 50%)"
          }}
        ></div>
        <div 
          className="absolute right-[-10%] bottom-[-10%] w-[40vw] h-[40vw] rounded-full bg-green-500/20 blur-3xl pointer-events-none"
          style={{ 
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            zIndex: 1
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-start mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                We are <span className="text-green-500">LLB</span> Class
                <br />→ of 2028
              </h1>
              <div className="h-px w-20 bg-green-500 mb-6"></div>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
                Your central hub for class resources, events, and connecting with fellow law students at the University of Ibadan.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/resources">
                <Button variant="default" className="rounded-none bg-green-500 hover:bg-green-600 px-8 py-6 font-medium flex items-center text-lg group">
                  Explore Resources
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/people">
                <Button variant="outline" className="rounded-none border-green-500 text-green-500 hover:bg-green-950/20 px-8 py-6 font-medium flex items-center text-lg">
                  Meet Classmates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth"
            });
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <ArrowDown className="text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-400 mt-2">Scroll to explore</span>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div 
          className="absolute left-0 top-1/4 w-[20vw] h-[20vw] rounded-full bg-green-900/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-2/5"
            >
              <div className="flex items-center mb-6">
                <div className="h-px w-12 bg-green-500 mr-4"></div>
                <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">About</h2>
              </div>
              <div className="text-white border-l-4 border-green-500 pl-8 py-6">
                <h3 className="text-3xl md:text-5xl font-bold mb-8">Great legal education is more than just knowledge — it's about <span className="text-green-500">impact</span></h3>
                <p className="text-gray-300 text-lg mb-6">
                  The LLB Class of 2028 at the University of Ibadan represents the future of legal excellence in Nigeria. Our cohort comprises brilliant minds dedicated to upholding justice and advancing the rule of law.
                </p>
                <p className="text-gray-300 text-lg">
                  Together, we're not just studying law—we're preparing to shape its future through rigorous academic pursuit, practical legal training, and a commitment to ethical practice.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-3/5 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-green-500/20 z-10"></div>
              <div className="relative h-[400px] bg-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Law students studying together" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="bg-black/80 backdrop-blur-sm p-6 max-w-md">
                  <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
                  <p className="text-gray-300">To graduate as well-rounded legal professionals equipped to tackle complex challenges in a rapidly evolving global legal landscape.</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 border border-green-900/30 bg-black/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-4">5-Year Program</h3>
              <p className="text-gray-300">Comprehensive curriculum covering all aspects of Nigerian and international law</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-green-900/30 bg-black/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-4">130+ Students</h3>
              <p className="text-gray-300">Diverse cohort of brilliant minds from across Nigeria and beyond</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 border border-green-900/30 bg-black/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-4">85% Bar Pass Rate</h3>
              <p className="text-gray-300">Exceptional preparation for Nigerian Law School and legal practice</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-32 bg-black relative">
        <div 
          className="absolute right-0 top-1/3 w-[25vw] h-[25vw] rounded-full bg-green-500/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Resources</h2>
              <div className="h-px w-12 bg-green-500 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Quick Access to Class Resources</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                    className={`h-full ${link.color} border border-green-500/20 rounded-none p-6 flex flex-col items-center text-center hover:bg-green-900/30 transition-all duration-300`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-green-900/30 p-3 rounded-full mb-4">
                      {link.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">{link.name}</h3>
                    <p className="text-sm text-gray-300">Access your {link.name.toLowerCase()}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Resources Section */}
      <section className="py-32 bg-neutral-950 relative">
        <div 
          className="absolute left-1/4 bottom-1/4 w-[20vw] h-[20vw] rounded-full bg-green-900/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="h-px w-12 bg-green-500 mr-4"></div>
                <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Materials</h2>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Academic Resources</h2>
              <p className="text-lg text-gray-300 max-w-2xl">
                Curated materials to support your learning journey
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/resources" className="flex items-center text-green-500 group">
                <span className="mr-2 font-medium">View all resources</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={resource.link}>
                  <motion.div 
                    className="p-6 border border-green-900/30 bg-black/30 backdrop-blur-sm hover:bg-green-900/20 transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-4">{resource.description}</p>
                    <div className="flex items-center text-green-500 mt-auto">
                      <span className="text-sm">Access now</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Courses Section */}
      <section className="py-32 bg-black relative">
        <div 
          className="absolute right-1/3 top-1/4 w-[15vw] h-[15vw] rounded-full bg-green-500/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Curriculum</h2>
              <div className="h-px w-12 bg-green-500 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Courses</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Foundational subjects in our rigorous curriculum
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-green-900/30 bg-black/30 backdrop-blur-sm"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-green-900/30 text-green-500 font-mono">
                    {course.code}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400">{course.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/courses">
              <Button variant="outline" className="rounded-none border-green-500 text-green-500 hover:bg-green-950/20 px-8 py-6 font-medium flex items-center text-lg mx-auto">
                View Full Curriculum
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Faculty Highlights Section */}
      <section className="py-32 bg-neutral-950 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Faculty</h2>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Faculty Highlights</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Learn from Nigeria's most distinguished legal scholars
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facultyHighlights.map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <div className="absolute inset-0 bg-green-900/40 z-10 group-hover:bg-green-900/20 transition-all duration-300"></div>
                  <img 
                    src={faculty.image} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">{faculty.name}</h3>
                  <p className="text-green-400 mb-2">{faculty.title}</p>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{faculty.achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-16"
          >
            <div>
              <div className="flex items-center mb-6">
                <div className="h-px w-12 bg-green-500 mr-4"></div>
                <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Schedule</h2>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Upcoming Class Events</h2>
              <p className="text-gray-300">Stay updated with tests, activities, and deadlines</p>
            </div>
            <Link 
              to="/events"
              className="mt-4 md:mt-0 inline-flex items-center text-green-500 font-medium hover:text-green-400 transition-colors"
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
                className="bg-black border border-green-900/30 p-6 hover:bg-green-900/10 transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-green-900/30 rounded-none">
                    <Calendar className="text-green-500" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 text-sm mb-1">{event.date} • {event.time}</p>
                    <p className="text-gray-400 text-sm">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div 
          className="absolute left-1/4 bottom-0 w-[30vw] h-[30vw] rounded-full bg-green-900/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Opportunities</h2>
              <div className="h-px w-12 bg-green-500 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Legal Career Paths</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Diverse opportunities await UI Law graduates
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-green-900/30 bg-black/30 backdrop-blur-sm hover:bg-green-900/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{career.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
                <p className="text-gray-400">{career.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Spotlights Section */}
      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Alumni</h2>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Alumni Spotlights</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Distinguished graduates who are making an impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {alumniSpotlights.map((alumni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-green-900/30 bg-black/30 backdrop-blur-sm"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{alumni.name}</h3>
                  <p className="text-green-500">{alumni.position}</p>
                </div>
                <p className="text-gray-300 mb-4 italic">"{alumni.quote}"</p>
                <p className="text-gray-500 text-sm">{alumni.gradYear}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-green-600 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-white mr-4"></div>
              <h2 className="text-white uppercase tracking-widest text-sm font-semibold">Testimonials</h2>
              <div className="h-px w-12 bg-white ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Student Experiences</h2>
            
            <div className="relative">
              <div className="h-[350px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentTestimonial === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center"
                    style={{ display: currentTestimonial === index ? 'flex' : 'none' }}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <blockquote className="text-2xl font-light text-white mb-8 italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <p className="text-white text-lg font-semibold">{testimonial.name}</p>
                      <p className="text-white/70">{testimonial.year} Student</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                    } transition-all duration-300`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Announcements Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-green-500 mr-4"></div>
              <h2 className="text-green-500 uppercase tracking-widest text-sm font-semibold">Updates</h2>
              <div className="h-px w-12 bg-green-500 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Class Announcements</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Important updates from class representatives and faculty
            </p>
          </motion.div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border-l-4 border-green-500 p-6 hover:bg-green-900/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-white mb-2">{announcement.title}</h3>
                    <p className="text-gray-300">{announcement.content}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-gray-500">{announcement.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 w-96 h-96 rounded-full bg-green-500/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` 
          }}
        ></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Join the Legal Journey
              <br />
              <span className="text-green-500">Let's Connect</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              From orientation to graduation, we're building memories and professional skills as a class.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/2349014412044"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-none bg-green-500 text-white px-8 py-4 font-medium inline-flex items-center"
              >
                Join Class WhatsApp Group
                <ExternalLink size={16} className="ml-2" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:llbclass28@ui.edu.ng"
                className="rounded-none border border-green-500 text-green-500 px-8 py-4 font-medium inline-flex items-center"
              >
                Contact Class Representatives
                <ExternalLink size={16} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-green-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-4">LLB Class of 2028</h2>
            <p className="text-center text-gray-400 mb-8 max-w-md">
              Faculty of Law, University of Ibadan
            </p>
            <div className="flex space-x-6 mb-12">
              <a href="https://wa.me/2349014412044" className="text-gray-400 hover:text-green-500 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382C17.094 14.194 15.12 13.277 14.773 13.151C14.426 13.025 14.174 12.91 13.923 13.278C13.672 13.646 12.91 14.558 12.658 14.81C12.406 15.062 12.154 15.088 11.776 14.9C11.398 14.712 10.114 14.307 8.768 13.106C7.709 12.155 7.086 11.011 6.834 10.643C6.582 10.275 6.807 10.061 7.025 9.863C7.223 9.685 7.459 9.403 7.679 9.152C7.899 8.901 8.05 8.713 8.176 8.562C8.302 8.411 8.365 8.26 8.491 8.009C8.617 7.757 8.586 7.506 8.491 7.318C8.397 7.13 7.782 5.34 7.467 4.58C7.193 3.872 6.904 3.944 6.624 3.929C6.356 3.915 6.104 3.911 5.853 3.911C5.602 3.911 5.191 4.005 4.844 4.373C4.497 4.741 3.484 5.658 3.484 7.448C3.484 9.238 4.872 10.966 5.092 11.218C5.312 11.47 7.05 14.115 9.716 15.709C10.335 15.977 10.825 16.142 11.213 16.267C11.834 16.465 12.417 16.437 12.886 16.346C13.403 16.244 14.991 15.429 15.306 14.533C15.621 13.637 15.621 12.877 15.527 12.689C15.433 12.501 15.181 12.407 14.803 12.22H14.802C14.364 12.005 12.351 11.073 11.957 10.929C11.563 10.785 11.329 10.713 11.095 11.061C10.896 11.358 10.399 12.003 10.2 12.301C10.001 12.599 9.802 12.634 9.438 12.436C9.074 12.238 8.276 11.958 7.383 11.158C6.756 10.571 6.319 9.852 6.14 9.474C5.961 9.096 6.145 8.897 6.297 8.73C6.436 8.578 6.607 8.347 6.759 8.158C6.911 7.969 7.001 7.824 7.105 7.62C7.209 7.416 7.175 7.191 7.105 7.047C7.035 6.903 6.661 5.555 6.426 4.808C6.213 4.143 5.95 4.218 5.753 4.207C5.56 4.196 5.355 4.196 5.151 4.196" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.5 20.5C5.5 18.5 9.23899 17.9832 11 19.5C12.8851 21.1209 15.5 21.5 17.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="mailto:llbclass28@ui.edu.ng" className="text-gray-400 hover:text-green-500 transition-colors">
                <span className="sr-only">Email</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.75 6.75V17.25C21.75 18.3546 20.8546 19.25 19.75 19.25H4.25C3.14543 19.25 2.25 18.3546 2.25 17.25V6.75M21.75 6.75C21.75 5.64543 20.8546 4.75 19.75 4.75H4.25C3.14543 4.75 2.25 5.64543 2.25 6.75M21.75 6.75V6.825C21.75 7.57364 21.3474 8.2723 20.6795 8.68378L13.1795 13.1838C12.4413 13.6306 11.5587 13.6306 10.8205 13.1838L3.32047 8.68378C2.65264 8.2723 2.25 7.57364 2.25 6.825V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
            
            <div className="w-full border-t border-green-900/30 pt-8">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} UI Law Class 2028. All rights reserved.
                </p>
                <div className="flex space-x-8">
                  <a href="#" className="text-gray-500 text-sm hover:text-green-500 transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-500 text-sm hover:text-green-500 transition-colors">Terms of Use</a>
                  <a href="#" className="text-gray-500 text-sm hover:text-green-500 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
