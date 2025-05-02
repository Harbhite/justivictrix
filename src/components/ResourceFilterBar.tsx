
import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResourceFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  categories: string[];
  sortOrder: "newest" | "oldest" | "popular";
  setSortOrder: (order: "newest" | "oldest" | "popular") => void;
}

const ResourceFilterBar: React.FC<ResourceFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  currentCategory,
  setCurrentCategory,
  categories,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white border-4 border-black p-4 shadow-lg">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-2 border-gray-300 focus:border-black transition-colors"
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-2 border-black flex items-center gap-2">
              <Filter size={18} />
              <span className="hidden sm:inline">Filter by:</span> {currentCategory === 'all' ? 'All Categories' : currentCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuItem 
                key={category} 
                onClick={() => setCurrentCategory(category)}
                className={currentCategory === category ? "bg-gray-100 font-medium" : ""}
              >
                {category === 'all' ? 'All Categories' : category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-2 border-black flex items-center gap-2">
              <ArrowUpDown size={18} />
              <span className="hidden sm:inline">Sort:</span> {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem 
              onClick={() => setSortOrder("newest")}
              className={sortOrder === "newest" ? "bg-gray-100 font-medium" : ""}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSortOrder("oldest")}
              className={sortOrder === "oldest" ? "bg-gray-100 font-medium" : ""}
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSortOrder("popular")}
              className={sortOrder === "popular" ? "bg-gray-100 font-medium" : ""}
            >
              Popular First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ResourceFilterBar;
