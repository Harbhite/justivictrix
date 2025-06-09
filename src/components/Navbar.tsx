
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Users, Calendar, FileText, Image, Wrench, Clock, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = [
    { name: "Resources", href: "/resources", icon: FileText },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "People", href: "/people", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Tools", href: "/tools", icon: Wrench },
    { name: "Timetable", href: "/timetable", icon: Clock },
    { name: "Fun Tools", href: "/easter-eggs", icon: Sparkles },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToAbout = () => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage first then scroll
      window.location.href = '/#about';
    } else {
      // If on homepage, scroll to about section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-law-dark">
                LLB28<span className="text-law-gold">HUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={scrollToAbout}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300"
            >
              <BookOpen className="w-4 h-4" />
              <span>About</span>
            </button>
            
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                    isActive(item.href)
                      ? "bg-law-dark text-white border-2 border-black"
                      : "text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {user ? (
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                  isActive("/profile")
                    ? "bg-law-dark text-white border-2 border-black"
                    : "text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-law-gold text-law-dark px-4 py-2 rounded-md text-sm font-bold border-2 border-black hover:bg-yellow-400 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md">
            <button
              onClick={scrollToAbout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 text-gray-700 hover:bg-gray-100 border-2 border-transparent"
            >
              <BookOpen className="w-5 h-5" />
              <span>About</span>
            </button>
            
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? "bg-law-dark text-white border-2 border-black"
                      : "text-gray-700 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {user ? (
              <Link
                to="/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  isActive("/profile")
                    ? "bg-law-dark text-white border-2 border-black"
                    : "text-gray-700 hover:bg-gray-100 border-2 border-transparent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="block w-full text-center bg-law-gold text-law-dark px-4 py-2 rounded-md text-base font-bold border-2 border-black hover:bg-yellow-400 transition-colors duration-200 mt-4"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
