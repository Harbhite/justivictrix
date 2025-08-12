
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, BookOpen, FileText, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useMetaTags } from "@/hooks/useMetaTags";
import ResourceManagement from "@/components/ResourceManagement";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const { user } = useAuth();
  const isAdmin = user?.email === "swisssunny1@gmail.com";

  useMetaTags({
    title: "Comprehensive Legal Study Resources - Case Documents, Notes & Materials | LLB28 Hub",
    description: "Access an extensive collection of legal study materials including case documents, lecture notes, constitutional law resources, criminal law cases, and academic papers. Perfect for law students and legal research.",
    image: "/og-image.png",
    type: "website"
  });

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["resources", searchQuery, categoryFilter, sortOrder],
    queryFn: async () => {
      let query = supabase.from("resources").select("*");

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter);
      }

      if (sortOrder === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortOrder === "oldest") {
        query = query.order("created_at", { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Failed to load resources");
        throw error;
      }

      return data;
    },
  });

  const categories = [
    "all",
    "lecture_note",
    "past_question",
    "textbook",
    "assignment",
    "handout",
    "reference",
    "other",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <p className="text-sm sm:text-base text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft animate-fade-in-fast py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Resources
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Discover and access academic materials and study resources
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 space-y-4 sm:space-y-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Search and Category Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full sm:w-64 lg:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <select
                  className="w-full sm:w-auto px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort and Admin Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <select
                  className="w-full sm:w-auto px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base bg-white"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                {isAdmin && (
                  <div className="w-full sm:w-auto">
                    <ResourceManagement />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {resources?.map((resource: any, index: number) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden group hover-animate-float"
              >
                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  {/* Resource Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h2>
                      <span className="flex-shrink-0 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {resource.category?.replace("_", " ") || "Other"}
                      </span>
                    </div>
                    
                    {resource.description && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {resource.description}
                      </p>
                    )}
                  </div>

                  {/* Resource Meta */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <FileText size={14} className="flex-shrink-0" />
                    <span className="truncate">{resource.type || "Document"}</span>
                    {resource.file_type && (
                      <>
                        <span>•</span>
                        <span className="uppercase">{resource.file_type}</span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </a>
                    <a
                      href={resource.file_url}
                      download
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {resources?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                {searchQuery || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No resources have been uploaded yet"}
              </p>
              {isAdmin && (
                <ResourceManagement />
              )}
            </motion.div>
          )}

          {/* Quick Navigation */}
          <div className="text-center pt-6 sm:pt-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <BookOpen size={16} />
              Browse Course Catalog
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
