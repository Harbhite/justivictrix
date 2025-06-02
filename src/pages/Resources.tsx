import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, BookOpen, FileText, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import ResourceManagement from "@/components/ResourceManagement";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const { user } = useAuth();
  const isAdmin = user?.email === "swisssunny1@gmail.com";

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
      <div className="flex items-center justify-center h-screen">
        <p>Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Resources</h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={16} />
              </div>
            </div>
            <select
              className="ml-2 p-2 border rounded-md focus:ring focus:ring-blue-200"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <select
              className="p-2 border rounded-md focus:ring focus:ring-blue-200"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            {isAdmin && <ResourceManagement />}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources?.map((resource: any) => (
            <div
              key={resource.id}
              className="bg-white rounded-md shadow-sm border p-4"
            >
              <h2 className="text-lg font-semibold mb-2">{resource.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FileText size={16} />
                <span>{resource.type}</span>
              </div>
              <div className="flex justify-between mt-4">
                <a
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                >
                  <span className="mr-1">View</span>
                  <Eye size={16} />
                </a>
                <a
                  href={resource.file_url}
                  download
                  className="text-green-500 hover:underline flex items-center"
                >
                  <span className="mr-1">Download</span>
                  <Download size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
