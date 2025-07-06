import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInstallBannerVisible, setIsInstallBannerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const parallaxOffset = useParallax();

  useMetaTags({
    title: "LLB28HUB - Your Legal Education Hub",
    description: "Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.",
    image: "/og-image.png",
    type: "website"
  });

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCloseBanner = () => {
    setIsInstallBannerVisible(false);
  };

  const AnimatedSection = ({ children, className = "", animation = "fade-in-up", ...props }: { 
    children: React.ReactNode, 
    className?: string,
    animation?: string,
    [key: string]: any
  }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
      <div 
        ref={ref} 
        className={`${className} transition-all duration-700 ${
          isVisible ? `animate-${animation}` : 'opacity-0 translate-y-8'
        }`}
        {...props}
      >
        {children}
      </div>
    );
  };

  const stats = [
    { number: "157", label: "Class Members", icon: "group" },
    { number: "15+", label: "Core Subjects", icon: "menu_book" },
    { number: "25+", label: "Study Groups", icon: "psychology" },
    { number: "3", label: "Academic Years", icon: "school" }
  ];

  const features = [
    {
      icon: "school",
      title: "Expert-Led Content",
      description: "Our resources are curated by legal experts and top-performing students, ensuring you get the most relevant and accurate information.",
      color: "blue"
    },
    {
      icon: "groups",
      title: "Collaborative Learning",
      description: "Join study groups, participate in forums, and collaborate on projects with your peers to enhance your understanding.",
      color: "green"
    },
    {
      icon: "auto_stories",
      title: "Comprehensive Resources",
      description: "From case summaries and lecture notes to mock exams and flashcards, we have everything you need to succeed.",
      color: "purple"
    },
    {
      icon: "timeline",
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and personalized study recommendations.",
      color: "orange"
    },
    {
      icon: "forum",
      title: "Interactive Forums",
      description: "Engage in meaningful discussions, ask questions, and share insights with your classmates.",
      color: "indigo"
    },
    {
      icon: "event",
      title: "Event Management",
      description: "Stay updated with class schedules, exam dates, and important academic events.",
      color: "pink"
    }
  ];

  const tools = [
    { name: "AI Study Assistant", icon: "smart_toy", description: "Get personalized study help", link: "/tools" },
    { name: "Case Brief Generator", icon: "gavel", description: "Generate professional case briefs", link: "/tools" },
    { name: "Legal Citation Tool", icon: "format_quote", description: "Perfect your citations", link: "/tools" },
    { name: "Flashcard Creator", icon: "style", description: "Create interactive flashcards", link: "/tools" },
    { name: "Mind Map Builder", icon: "account_tree", description: "Visualize complex concepts", link: "/tools" },
    { name: "Mock Exam Generator", icon: "quiz", description: "Practice with custom exams", link: "/tools" }
  ];

  return (
    <div className="bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Enhanced Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            LLB28HUB
          </h1>
          <button 
            className="text-gray-600 focus:outline-none hover:text-blue-600 transition-colors transform hover:scale-110" 
            onClick={handleMobileMenuToggle}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`${isMobileMenuOpen ? '' : 'hidden'} fixed inset-0 bg-gray-800 bg-opacity-75 z-50 animate-fade-in`}>
        <div className="bg-white w-64 h-full absolute right-0 shadow-lg p-6 animate-slide-in-right">
          <div className="flex justify-end mb-8">
            <button 
              className="text-gray-600 hover:text-red-500 transition-colors transform hover:scale-110" 
              onClick={handleCloseMobileMenu}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-lg">
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/" onClick={handleCloseMobileMenu}>Home</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/people" onClick={handleCloseMobileMenu}>People</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/courses" onClick={handleCloseMobileMenu}>Courses</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/tools" onClick={handleCloseMobileMenu}>Tools</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/resources" onClick={handleCloseMobileMenu}>Resources</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/blog" onClick={handleCloseMobileMenu}>Blog</Link>
          </nav>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <main className="relative overflow-hidden pt-20" id="home">
        <div 
          className="bg-white pt-24 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28 relative"
          style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
        >
          <div className="relative max-w-lg mx-auto lg:max-w-7xl">
            <div className="text-center">
              <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold py-1 px-4 rounded-full mb-4 animate-bounce-in">
                Welcome to LLB28HUB
              </div>
              <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-fade-in-up">
                Your Legal Education Hub
              </h2>
              <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.
              </p>
              <div className="mt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link 
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-all transform hover:scale-105 animate-pulse-glow" 
                  to="/tools"
                >
                  Get Started
                  <span className="material-icons ml-2">arrow_forward</span>
                </Link>
                <Link 
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md transition-all transform hover:scale-105" 
                  to="/resources"
                >
                  Browse Resources
                  <span className="material-icons ml-2">library_books</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 -mr-48 mt-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{animationDelay: '4s'}}></div>
      </main>

      {/* Statistics Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Community in Numbers</h2>
            <p className="text-blue-100">Building the future of legal education together</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="material-icons text-4xl text-blue-200 animate-float">{stat.icon}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 animate-bounce-in">
                  {stat.number}
                </div>
                <p className="text-blue-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About LLB28HUB</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  At LLB 28, we are committed to revolutionizing legal education through innovative, sustainable, and cost-effective learning solutions. With a proven track record of delivering exceptional academic results, we combine state-of-the-art study technology, refined expertise, and student-centric approaches to bring our learning objectives to life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-3">check_circle</span>
                    <span className="text-gray-700">Innovative Learning Technology</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-3">check_circle</span>
                    <span className="text-gray-700">Expert Legal Faculty</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-3">check_circle</span>
                    <span className="text-gray-700">Student-Centric Approach</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg transform hover:rotate-1 transition-transform duration-300">
                  <div className="text-center">
                    <span className="material-icons text-6xl text-blue-600 mb-4 animate-float">balance</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence in Legal Education</h3>
                    <p className="text-gray-600">Shaping tomorrow's legal professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Features Section */}
      <AnimatedSection className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover the features that make our platform the best choice for your legal studies.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-icons text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* AI Tools Showcase */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">AI-Powered Study Tools</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">Harness the power of artificial intelligence to supercharge your legal studies</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group border border-white/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <span className="material-icons text-3xl text-indigo-300 group-hover:text-white transition-colors mr-3">
                    {tool.icon}
                  </span>
                  <h3 className="font-semibold group-hover:text-white transition-colors">{tool.name}</h3>
                </div>
                <p className="text-indigo-200 text-sm group-hover:text-white/90 transition-colors">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/tools" 
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-900 rounded-lg font-medium hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              Explore All Tools
              <span className="material-icons ml-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Resources Section */}
      <AnimatedSection className="py-20 bg-white" id="resources">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our extensive library of study materials designed to help you excel.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "gavel", name: "Case Law", color: "blue", link: "/resources" },
              { icon: "menu_book", name: "Legislation", color: "green", link: "/resources" },
              { icon: "description", name: "Lecture Notes", color: "purple", link: "/resources" },
              { icon: "quiz", name: "Past Papers", color: "red", link: "/resources" }
            ].map((resource, index) => (
              <Link
                key={index}
                to={resource.link}
                className={`bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-${resource.color}-50 transition-all duration-300 transform hover:scale-105 group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`material-icons text-${resource.color}-500 text-4xl mb-4 block group-hover:animate-bounce`}>
                  {resource.icon}
                </span>
                <h3 className="font-semibold text-lg text-gray-700 group-hover:text-gray-900">{resource.name}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/resources" 
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              View All Resources
              <span className="material-icons ml-2">library_books</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Study Groups */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Study Groups</h2>
            <p className="text-xl mb-8 text-green-100">Connect with classmates and study together for better results</p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float">groups</span>
                <h3 className="font-bold mb-2">Collaborative Learning</h3>
                <p className="text-green-100">Study with peers and share knowledge</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float" style={{ animationDelay: '1s' }}>schedule</span>
                <h3 className="font-bold mb-2">Scheduled Sessions</h3>
                <p className="text-green-100">Regular study sessions that fit your schedule</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float" style={{ animationDelay: '2s' }}>trending_up</span>
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-green-100">Monitor your group's learning progress</p>
              </div>
            </div>
            <Link 
              to="/study-groups" 
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all transform hover:scale-105"
            >
              Find Study Groups
              <span className="material-icons ml-2">group_add</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <div className="bg-blue-600">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">Ready to elevate your legal studies?</h2>
            <p className="text-lg text-blue-100 mb-8">Join our community today and get instant access to all our resources.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/auth" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/blog" 
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Read Our Blog
                <span className="material-icons ml-2">article</span>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection className="py-20 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Reach out and we'll get back to you shortly.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          <div className="max-w-lg mx-auto">
            <form action="#" className="grid grid-cols-1 gap-y-6" method="POST">
              <div>
                <label className="sr-only" htmlFor="full-name">Full name</label>
                <input 
                  autoComplete="name" 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="full-name" 
                  name="full-name" 
                  placeholder="Full name" 
                  type="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                  autoComplete="email" 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="message" 
                  name="message" 
                  placeholder="Message" 
                  rows={4}
                ></textarea>
              </div>
              <div>
                <button 
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105" 
                  type="submit"
                >
                  Send Message
                  <span className="material-icons ml-2">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LLB28HUB</h3>
              <p className="text-gray-400 text-sm">Your partner in legal education.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/people">People</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/resources">Resources</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/tools">Tools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/blog">Blog</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/study-groups">Study Groups</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/events">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a className="text-gray-400 hover:text-white transform hover:scale-110 transition-all" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-white transform hover:scale-110 transition-all" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 LLB28HUB. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Enhanced Install Banner */}
      {isInstallBannerVisible && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-40 animate-slide-in-right">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-gray-900 shadow-lg sm:p-3 border-l-4 border-blue-500">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg bg-blue-800 animate-pulse">
                    <span className="material-icons text-white">system_update</span>
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">Get our app!</span>
                    <span className="hidden md:inline">Install Law Portal: Get quick access to all your study resources with our app!</span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <a className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:scale-105" href="#">
                    Install
                  </a>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto sm:ml-2">
                  <button 
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 transition-all"
                    onClick={handleCloseBanner}
                  >
                    Later
                  </button>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button 
                    className="-mr-1 flex p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition-all transform hover:rotate-90" 
                    type="button"
                    onClick={handleCloseBanner}
                  >
                    <span className="sr-only">Dismiss</span>
                    <span className="material-icons text-white h-6 w-6">close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;