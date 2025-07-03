import React, { useState, useRef, useEffect } from "react";
import { Search, FileText, Users, BookOpen, Calendar, X, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "blog" | "resource" | "member" | "course" | "event";
  url: string;
  image?: string;
  category?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["global-search", query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];

      const searchResults: SearchResult[] = [];
      const searchTerm = `%${query}%`;

      // Search blog posts
      const { data: blogPosts } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, category, image_url")
        .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm},content.ilike.${searchTerm}`)
        .eq("status", "published")
        .limit(5);

      if (blogPosts) {
        blogPosts.forEach((post) => {
          searchResults.push({
            id: `blog-${post.id}`,
            title: post.title,
            description: post.excerpt || "Blog post",
            type: "blog",
            url: `/blog/${post.id}`,
            image: post.image_url,
            category: post.category,
          });
        });
      }

      // Search resources
      const { data: resources } = await supabase
        .from("resources")
        .select("id, title, description, category, type")
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5);

      if (resources) {
        resources.forEach((resource) => {
          searchResults.push({
            id: `resource-${resource.id}`,
            title: resource.title,
            description: resource.description || "Resource",
            type: "resource",
            url: "/resources",
            category: resource.category,
          });
        });
      }

      // Search members
      const { data: members } = await supabase
        .from("members")
        .select("id, name, bio, post_held, avatar_url")
        .or(`name.ilike.${searchTerm},bio.ilike.${searchTerm},post_held.ilike.${searchTerm}`)
        .limit(5);

      if (members) {
        members.forEach((member) => {
          searchResults.push({
            id: `member-${member.id}`,
            title: member.name,
            description: member.post_held || member.bio || "Law Student",
            type: "member",
            url: `/people/bio/${member.id}`,
            image: member.avatar_url,
          });
        });
      }

      // Search courses
      const { data: courses } = await supabase
        .from("courses")
        .select("id, title, description, code")
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm},code.ilike.${searchTerm}`)
        .limit(5);

      if (courses) {
        courses.forEach((course) => {
          searchResults.push({
            id: `course-${course.id}`,
            title: course.title,
            description: `${course.code} - ${course.description}`,
            type: "course",
            url: "/courses",
            category: course.code,
          });
        });
      }

      // Search events
      const { data: events } = await supabase
        .from("events")
        .select("id, title, description, date, location")
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5);

      if (events) {
        events.forEach((event) => {
          searchResults.push({
            id: `event-${event.id}`,
            title: event.title,
            description: `${event.description} - ${event.location}`,
            type: "event",
            url: "/events",
            category: new Date(event.date).toLocaleDateString(),
          });
        });
      }

      return searchResults.slice(0, 20);
    },
    enabled: query.length >= 2,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onClose();
    setQuery("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "blog": return <FileText size={16} className="text-blue-500" />;
      case "resource": return <FileText size={16} className="text-green-500" />;
      case "member": return <Users size={16} className="text-purple-500" />;
      case "course": return <BookOpen size={16} className="text-orange-500" />;
      case "event": return <Calendar size={16} className="text-red-500" />;
      default: return <Search size={16} className="text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center px-4 py-3 border-b">
              <Search size={20} className="text-gray-400 mr-3" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search blog posts, resources, members, courses..."
                className="border-none focus:ring-0 text-lg"
              />
              <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading && query.length >= 2 && (
                <div className="p-4 text-center text-gray-500">
                  <Clock size={16} className="animate-spin mx-auto mb-2" />
                  Searching...
                </div>
              )}

              {!isLoading && query.length >= 2 && results.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              )}

              {query.length < 2 && (
                <div className="p-4 text-center text-gray-500">
                  Type at least 2 characters to search
                </div>
              )}

              <AnimatePresence>
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 cursor-pointer border-b last:border-b-0 ${
                      index === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex items-start gap-3">
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getIcon(result.type)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {result.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                        {result.category && (
                          <p className="text-xs text-gray-400 mt-1">
                            {result.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {results.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-between">
                <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
                <span>{results.length} results</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default GlobalSearch;