
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  PenTool,
  Book,
  LayoutGrid,
  ArrowRight,
  Clock,
  Trophy,
  Globe,
  Briefcase,
  Heart,
  Share2,
  UserCheck,
  VoteIcon,
  Megaphone,
  MessageCircle,
  Sparkles,
  Settings,
  ExternalLink,
  School,
  Lightbulb
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const { data: events } = useQuery({
    queryKey: ["homepage-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data || [];
    },
  });

  const testimonials = [
    {
      quote: "The law program has completely transformed my understanding of legal systems and prepared me well for my career journey.",
      author: "Sarah Johnson",
      role: "Class of 2023",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    {
      quote: "The professors are incredibly knowledgeable and supportive. I've gained practical skills that I use every day in my practice.",
      author: "Michael Chen",
      role: "Class of 2021",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      quote: "Studying here opened doors to opportunities I never thought possible, including my dream internship at the Supreme Court.",
      author: "Aisha Patel",
      role: "Class of 2022",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const careerPaths = [
    { title: "Corporate Law", icon: <Briefcase className="h-6 w-6" />, description: "Advise businesses on legal matters and corporate strategy" },
    { title: "Public Interest", icon: <Heart className="h-6 w-6" />, description: "Work for nonprofits and advocate for societal causes" },
    { title: "Criminal Justice", icon: <VoteIcon className="h-6 w-6" />, description: "Serve as a prosecutor or defense attorney in criminal cases" },
    { title: "International Law", icon: <Globe className="h-6 w-6" />, description: "Practice law across borders and in international organizations" }
  ];
  
  const alumniSpotlights = [
    {
      name: "David Garcia",
      graduation: "Class of 2015",
      position: "Partner at Wilson & Reed LLP",
      achievement: "Named Rising Star by Legal 500",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Priya Sharma",
      graduation: "Class of 2010",
      position: "Senior Counsel at Tech Innovations Inc.",
      achievement: "Led landmark IP rights case in tech sector",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "James Wilson",
      graduation: "Class of 2018",
      position: "Environmental Law Specialist",
      achievement: "Published in Harvard Law Review",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  const recentAnnouncements = [
    {
      title: "Fall Registration Now Open",
      date: "2025-04-28",
      category: "Academic",
      brief: "Registration for fall semester courses is now open through the student portal."
    },
    {
      title: "New Legal Clinic Partnership",
      date: "2025-04-22",
      category: "Program",
      brief: "The university has established a new partnership with the City Legal Aid Center."
    },
    {
      title: "Summer Internship Opportunities",
      date: "2025-04-15",
      category: "Career",
      brief: "Multiple summer internship positions are available at top law firms."
    }
  ];

  const communityHighlights = [
    {
      title: "Pro Bono Project Success",
      description: "Our student-led pro bono project has provided legal assistance to over 200 community members this semester.",
      icon: <UserCheck className="h-10 w-10 text-amber-500" />
    },
    {
      title: "Law Review Publication",
      description: "The spring edition of our student law review has been published, featuring groundbreaking research.",
      icon: <FileText className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Debate Team Victory",
      description: "Our debate team won the national championship, marking the third consecutive victory for our university.",
      icon: <Trophy className="h-10 w-10 text-green-500" />
    }
  ];

  const researchCenters = [
    {
      title: "Center for Constitutional Law",
      description: "Studying modern constitutional challenges and precedents"
    },
    {
      title: "Institute for Legal Tech Innovation",
      description: "Exploring how technology is transforming legal practice"
    },
    {
      title: "Environmental Law Research Group",
      description: "Addressing climate change legal frameworks and policies"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                Your Journey in
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 block">
                  Legal Excellence
                </span>
                Begins Here
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl">
                Navigate your law school experience with our comprehensive resource hub. Access course materials, collaborate with peers, and excel in your legal education.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/resources')}
                className="bg-green-500 hover:bg-green-600 text-white py-6 px-8 rounded-md text-lg flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Course Resources
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/timetable')}
                className="border-2 border-white text-white py-6 px-8 rounded-md text-lg flex items-center gap-2 hover:bg-white/10"
              >
                <Calendar className="w-5 h-5" />
                Class Schedule
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-green-500 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-10 left-40 w-80 h-80 rounded-full bg-blue-500 blur-3xl"
        ></motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Platform</h2>
              <p className="text-gray-700 text-lg mb-6">
                This platform serves as your central hub for navigating law school successfully. We've designed it to consolidate all the resources and tools you need in one place.
              </p>
              <p className="text-gray-700 text-lg mb-8">
                From lecture materials and timetables to study groups and events, everything is organized to enhance your academic journey and foster a supportive learning community.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Course Resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Event Calendar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Study Groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Discussion Forum</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-green-100 rounded-xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=700&auto=format&fit=crop"
                  alt="Law students studying"
                  className="relative rounded-lg shadow-lg border-4 border-white z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Course Resources", icon: <BookOpen className="h-8 w-8" />, path: "/resources" },
              { title: "Timetable", icon: <Calendar className="h-8 w-8" />, path: "/timetable" },
              { title: "Study Groups", icon: <Users className="h-8 w-8" />, path: "/study-groups" },
              { title: "Legal Tools", icon: <PenTool className="h-8 w-8" />, path: "/tools" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-gray-100 overflow-hidden"
              >
                <Link to={item.path} className="flex flex-col items-center p-6 text-center h-full">
                  <div className="bg-green-50 p-4 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <div className="mt-auto">
                    <span className="text-green-600 flex items-center justify-center mt-2">
                      Access <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Resources Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Academic Resources</h2>
            <Button className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600" onClick={() => navigate('/resources')}>
              View All Resources <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 rounded-xl p-6 border border-green-100"
            >
              <div className="bg-white p-4 rounded-full inline-block mb-4">
                <Book className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Course Materials</h3>
              <p className="text-gray-700 mb-4">
                Access lecture notes, slides, reading materials, and supplementary resources for all your courses.
              </p>
              <Link to="/resources" className="text-green-600 font-medium flex items-center">
                Browse Materials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="bg-white p-4 rounded-full inline-block mb-4">
                <PenTool className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Study Tools</h3>
              <p className="text-gray-700 mb-4">
                Enhance your learning with case briefs, IRAC guides, citation tools, and legal dictionaries.
              </p>
              <Link to="/tools" className="text-blue-600 font-medium flex items-center">
                Explore Tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-purple-50 rounded-xl p-6 border border-purple-100"
            >
              <div className="bg-white p-4 rounded-full inline-block mb-4">
                <LayoutGrid className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Course Catalog</h3>
              <p className="text-gray-700 mb-4">
                View comprehensive course descriptions, professor information, and prerequisite details.
              </p>
              <Link to="/courses" className="text-purple-600 font-medium flex items-center">
                View Catalog <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "LAW101", title: "Introduction to Law", credit: "3 Credits" },
              { id: "LAW201", title: "Constitutional Law", credit: "4 Credits" },
              { id: "LAW205", title: "Criminal Law", credit: "3 Credits" },
              { id: "LAW210", title: "Contract Law", credit: "4 Credits" },
              { id: "LAW215", title: "Tort Law", credit: "3 Credits" },
              { id: "LAW301", title: "International Law", credit: "3 Credits" }
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="border-l-4 border-green-500 p-6">
                  <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{course.id}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {course.credit}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/courses">
              <Button variant="outline" className="border-2 border-gray-800">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty Highlights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Faculty Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Prof. Elizabeth Carter",
                specialty: "Constitutional Law",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=150&h=150",
                bio: "Former Supreme Court clerk with over 15 years of teaching experience"
              },
              {
                name: "Prof. Robert Chen",
                specialty: "Criminal Law",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
                bio: "Published author of three acclaimed textbooks on criminal procedure"
              },
              {
                name: "Prof. Maria Rodriguez",
                specialty: "International Law",
                image: "https://images.unsplash.com/photo-1544717305-2782549b5136?fit=crop&w=150&h=150",
                bio: "Former counsel to the United Nations with extensive field experience"
              }
            ].map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center"
              >
                <img 
                  src={faculty.image} 
                  alt={faculty.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-4"
                />
                <h3 className="font-bold text-xl mb-1">{faculty.name}</h3>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-3">
                  {faculty.specialty}
                </span>
                <p className="text-gray-600">{faculty.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-2 border-gray-800"
              onClick={() => navigate('/events')}
            >
              All Events <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events?.length ? (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="bg-green-500 text-white p-3 text-center">
                    <span className="block text-sm">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="block text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <Link to={`/events`} className="text-green-600 font-medium flex items-center">
                      Event Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="bg-green-500 text-white p-3 text-center">
                    <span className="block text-sm">TBD</span>
                    <span className="block text-2xl font-bold">--</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">Upcoming Event</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Time TBD</span>
                    </div>
                    <p className="text-gray-600 mb-4">Event details will be announced soon.</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Career Paths</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-green-50 p-4 rounded-full border border-green-100 mb-4">
                  {path.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{path.title}</h3>
                <p className="text-gray-600">{path.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-green-50 rounded-xl p-8 mt-12 border border-green-100">
            <h3 className="text-xl font-bold mb-4 text-center">Career Development Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" /> Resume Workshops
                </h4>
                <p className="text-sm text-gray-600">Monthly workshops to perfect your legal CV</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-green-600" /> Internship Programs
                </h4>
                <p className="text-sm text-gray-600">Partnerships with top firms for summer positions</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" /> Networking Events
                </h4>
                <p className="text-sm text-gray-600">Connect with alumni and practicing attorneys</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Spotlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Alumni Spotlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {alumniSpotlights.map((alumni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={alumni.image} 
                    alt={alumni.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{alumni.name}</h3>
                    <p className="text-gray-600 text-sm">{alumni.graduation}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-medium mb-2">{alumni.position}</p>
                  <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg text-sm">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 text-yellow-600 mr-2" />
                      <span>{alumni.achievement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-2 border-gray-800">
              View Alumni Network <Share2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" ref={testimonialRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Testimonials</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  display: activeTestimonial === index ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="bg-green-50 p-8 rounded-xl text-center border border-green-100 shadow-sm"
              >
                <div className="mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white mx-auto"
                  />
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </motion.div>
            ))}
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hidden md:block"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hidden md:block"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recent Announcements</h2>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-2 border-gray-800"
              onClick={() => navigate('/blog')}
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentAnnouncements.map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${announcement.category === 'Academic' ? 'bg-blue-100 text-blue-800' : 
                     announcement.category === 'Program' ? 'bg-purple-100 text-purple-800' : 
                     'bg-green-100 text-green-800'}`}>
                    {announcement.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{announcement.brief}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Research Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Community Highlights</h2>
              
              <div className="space-y-6">
                {communityHighlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-8">Research Centers</h2>
              
              <div className="space-y-6">
                {researchCenters.map((center, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className="font-bold">{center.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{center.description}</p>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 flex justify-end">
                      <button className="text-green-600 text-sm font-medium flex items-center">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Law School Journey</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Access all the resources, tools, and community support you need to excel in your legal education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-green-800 hover:bg-gray-100 text-lg px-6 py-3"
              onClick={() => navigate('/resources')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Explore Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-6 py-3"
              onClick={() => navigate('/tools')}
            >
              <Settings className="mr-2 h-5 w-5" />
              Access Tools
            </Button>
          </div>
          <div className="mt-10">
            <a 
              href="https://drive.google.com/drive/folders/1Ari0uhW8reGSfskUj6EwHtexK31ooL6Y" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-200 hover:text-white transition-colors"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit our Google Drive for additional resources
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
