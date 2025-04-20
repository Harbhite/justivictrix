import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Search, 
  Calendar, 
  Book, 
  GalleryHorizontal, 
  UserCircle,
  Settings
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import SecretLink from "./SecretLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: "Timetable", path: "/timetable", icon: Calendar },
    { name: "Resources", path: "/resources", icon: Book },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Tools", path: "/tools", icon: Book },
    { name: "Gallery", path: "/gallery", icon: GalleryHorizontal },
    { name: "About us", path: "/about", icon: Book },
    { name: "Mentors", path: "/people", icon: Book },
    { name: "Blog", path: "/blog", icon: Book },
  ];

  const isForumPage = location.pathname.includes("/forum") || location.pathname === "/secret-forum";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md" : "bg-[#f8f6f3]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-gray-900 font-bold text-xl tracking-tight mr-8">
              LLB28
            </Link>

            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search any course"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  location.pathname === link.path ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <SecretLink />
            
            {isForumPage && user && (
              <Link
                to="/forum/settings"
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Settings size={16} />
                Forum Settings
              </Link>
            )}
            
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <UserCircle size={20} />
                Profile
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-gray-600 transition-colors p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search any course"
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="mr-3" size={20} />
                  {link.name}
                </Link>
              ))}
              
              <div className="flex px-3 py-2 rounded-md text-base font-medium transition-colors">
                <SecretLink />
              </div>
              
              {isForumPage && user && (
                <Link
                  to="/forum/settings"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="mr-3" size={20} />
                  Forum Settings
                </Link>
              )}
              
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="mr-3" size={20} />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
