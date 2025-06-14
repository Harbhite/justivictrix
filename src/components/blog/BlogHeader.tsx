
import { Search, Rss, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BlogHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuToggle: () => void;
}

const BlogHeader = ({ searchTerm, onSearchChange, onMenuToggle }: BlogHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">UI Law Blog</h1>
          </div>
          
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Rss size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={onMenuToggle}
            >
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
