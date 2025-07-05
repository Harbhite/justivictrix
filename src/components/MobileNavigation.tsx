import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, Calendar, Wrench, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "People", href: "/people", icon: Users },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;