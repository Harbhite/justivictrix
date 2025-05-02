
import { motion } from "framer-motion";
import { FileText, Download, Book, Video, Loader2, File, ExternalLink, BookOpen, List, LogIn, Pin, PinOff, Edit, Trash, Search, Filter, Users, Tag, Calendar, Info, ArrowUpDown } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResourceUploadForm from "@/components/ResourceUploadForm";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "@/components/ResourceCard";
import ResourceFilterBar from "@/components/ResourceFilterBar";
import ResourceStatistics from "@/components/ResourceStatistics";

const Resources = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const resourcesContainerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "popular">("newest");

  // Check if user is admin (for pinning)
  const isAdmin = user?.email === "swisssunny1@gmail.com";

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load resources");
        throw error;
      }

      return data || [];
    },
  });

  // Update resource pin status
  const togglePinMutation = useMutation({
    mutationFn: async ({ id, isPinned }: { id: number, isPinned: boolean }) => {
      const { data, error } = await supabase
        .from("resources")
        .update({ is_pinned: isPinned })
        .eq("id", id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource updated");
    },
    onError: (error) => {
      toast.error("Failed to update resource");
      console.error(error);
    }
  });

  // Delete resource
  const deleteResourceMutation = useMutation({
    mutationFn: async (id: number) => {
      // First, get the resource to find the file URL
      const { data: resourceData, error: fetchError } = await supabase
        .from("resources")
        .select("file_url")
        .eq("id", id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Delete the database record
      const { error: deleteError } = await supabase
        .from("resources")
        .delete()
        .eq("id", id);
      
      if (deleteError) throw deleteError;
      
      // Extract the file path from the URL to delete from storage
      if (resourceData?.file_url) {
        try {
          const pathParts = resourceData.file_url.split('/');
          const fileName = pathParts[pathParts.length - 1];
          
          const { error: storageError } = await supabase.storage
            .from('resources')
            .remove([fileName]);
          
          if (storageError) console.error("Storage delete error:", storageError);
        } catch (err) {
          console.error("Error parsing file URL:", err);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource deleted");
      setConfirmDelete(null);
      
      // Reset selected resource if it was the one deleted
      if (selectedResource && selectedResource.id === confirmDelete) {
        setSelectedResource(null);
      }
    },
    onError: (error) => {
      toast.error("Failed to delete resource");
      console.error(error);
      setConfirmDelete(null);
    }
  });

  // Toggle pin status
  const handleTogglePin = (resource: any) => {
    togglePinMutation.mutate({ 
      id: resource.id, 
      isPinned: !resource.is_pinned 
    });
  };

  // Delete resource confirmation
  const handleDeleteResource = (id: number) => {
    setConfirmDelete(id);
  };

  // Filtered resources
  const filteredResources = resources?.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      currentCategory === "all" || 
      resource.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort resources
  const sortedResources = [...(filteredResources || [])].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    // For "popular" sorting, we can use is_pinned as a factor
    return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0);
  });

  // Auto-select the first PDF resource when resources are loaded
  useEffect(() => {
    if (resources && resources.length > 0 && !selectedResource) {
      const firstPdf = resources.find(resource => resource.type === 'pdf');
      if (firstPdf) {
        setSelectedResource(firstPdf);
      }
    }
  }, [resources, selectedResource]);

  // Real-time subscription to resource changes
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'resources'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["resources"] });
          toast.success("Resources list updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleResourceUploadSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["resources"] });
  };

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return FileText;
      case "ppt":
        return FileText;
      case "video":
        return Video;
      case "ebook":
        return Book;
      default:
        return File;
    }
  };

  const getPreviewComponent = (resource: any) => {
    const fileType = resource.file_type?.toLowerCase();
    
    if (fileType === 'pdf') {
      return (
        <iframe
          src={`${resource.file_url}#toolbar=0`}
          className="w-full h-48 border-2 border-black mb-4"
          title={resource.title}
        />
      );
    }
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return (
        <img
          src={resource.file_url}
          alt={resource.title}
          className="w-full h-48 object-cover border-2 border-black mb-4"
        />
      );
    }

    return null;
  };

  // Statistics data
  const resourceStats = {
    totalResources: resources?.length || 0,
    totalDocuments: resources?.filter(r => r.type === 'pdf' || r.type === 'document').length || 0,
    totalImages: resources?.filter(r => ['jpg', 'jpeg', 'png', 'gif'].includes(r.file_type?.toLowerCase() || '')).length || 0,
    totalVideos: resources?.filter(r => r.type === 'video').length || 0
  };

  // Get unique categories
  const categories = resources ? [...new Set(resources.map(r => r.category))].sort() : [];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-1">
            Resources
          </h1>
          
          {isAdmin && (
            <div className="flex items-center gap-4">
              <Link 
                to="/events" 
                className="px-4 py-2 border-2 border-black bg-purple-300 hover:bg-purple-400 transition-colors flex items-center gap-2"
              >
                <Edit size={20} />
                Manage Events
              </Link>
              <Link 
                to="/timetable" 
                className="px-4 py-2 border-2 border-black bg-blue-300 hover:bg-blue-400 transition-colors flex items-center gap-2"
              >
                <Edit size={20} />
                Manage Timetable
              </Link>
              <Link 
                to="/study-groups" 
                className="px-4 py-2 border-2 border-black bg-green-300 hover:bg-green-400 transition-colors flex items-center gap-2"
              >
                <Edit size={20} />
                Manage Groups
              </Link>
            </div>
          )}
        </div>

        {/* Resource Statistics Section */}
        <div className="mb-8">
          <ResourceStatistics stats={resourceStats} />
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <ResourceFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            categories={['all', ...categories]}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* Course Catalog Card */}
        <div className="mb-8">
          <motion.div
            className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 items-center">
                <BookOpen size={32} className="text-purple-600" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Course Catalog</h3>
                  <p className="text-gray-600 mb-4">View all courses, units, lecturers, and course details</p>
                  <Link 
                    to="/courses" 
                    className="px-4 py-2 bg-purple-100 border-2 border-black hover:bg-purple-200 transition-colors flex items-center gap-2 inline-block"
                  >
                    <List size={20} />
                    View Course Catalog
                  </Link>
                </div>
              </div>
              <span className="px-2 py-1 bg-purple-200 border-2 border-black text-sm font-bold">
                ACADEMIC
              </span>
            </div>
          </motion.div>
        </div>

        {/* Google Drive Link Card */}
        <div className="mb-8">
          <motion.div
            className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 items-center">
                <ExternalLink size={32} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Class Google Drive</h3>
                  <p className="text-gray-600 mb-4">Access all our shared class materials, notes, and resources</p>
                  <a 
                    href="https://drive.google.com/drive/folders/1Ari0uhW8reGSfskUj6EwHtexK31ooL6Y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-100 border-2 border-black hover:bg-blue-200 transition-colors flex items-center gap-2 inline-block"
                  >
                    <ExternalLink size={20} />
                    Open Google Drive
                  </a>
                </div>
              </div>
              <span className="px-2 py-1 bg-blue-200 border-2 border-black text-sm font-bold">
                SHARED FOLDER
              </span>
            </div>
          </motion.div>
        </div>

        {/* Resource Management Section */}
        <div className="mb-8">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse" className="text-lg font-medium">Browse Resources</TabsTrigger>
              <TabsTrigger value="upload" className="text-lg font-medium">Upload Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="browse" className="pt-4">
              {user ? (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border-2 border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    <span>You are logged in as <strong>{user.email}</strong></span>
                  </div>
                  <Button variant="outline" onClick={() => navigate('/profile')}>
                    View Profile
                  </Button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center justify-center p-4 bg-white border-4 border-black cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="w-6 h-6 mr-2" />
                  Login to Upload & Manage Resources
                </Link>
              )}
            </TabsContent>
            <TabsContent value="upload" className="pt-4">
              {user ? (
                <ResourceUploadForm onUploadSuccess={handleResourceUploadSuccess} />
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center justify-center p-4 bg-white border-4 border-black cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="w-6 h-6 mr-2" />
                  Login to Upload Resources
                </Link>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* PDF Viewer for Selected Resource */}
        {selectedResource && selectedResource.type === 'pdf' && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedResource.title}</h2>
                <Button 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedResource(null)}
                >
                  Close
                </Button>
              </div>
              <div className="w-full h-[600px] border-2 border-black mb-4">
                <iframe
                  src={`${selectedResource.file_url}#toolbar=1`}
                  className="w-full h-full"
                  title={selectedResource.title}
                />
              </div>
              <div className="flex justify-end">
                <a
                  href={selectedResource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors flex items-center gap-2 inline-block"
                  download
                >
                  <Download size={20} />
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        )}

        {/* Resources Grid */}
        <div ref={resourcesContainerRef}>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <File className="mr-2" />
            {currentCategory === 'all' ? 'All Resources' : `${currentCategory} Resources`}
            {searchTerm && <span className="ml-2 text-lg font-normal"> — Search: "{searchTerm}"</span>}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
                >
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : sortedResources && sortedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isAdmin={isAdmin}
                  onView={() => {
                    if (resource.type === 'pdf') {
                      setSelectedResource(resource);
                      resourcesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onTogglePin={() => handleTogglePin(resource)}
                  onDelete={() => handleDeleteResource(resource.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Info size={48} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500 text-center mb-4">
                {searchTerm ? `No matches found for "${searchTerm}"` : "No resources available in this category"}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Confirm Delete Dialog */}
        <Dialog open={confirmDelete !== null} onOpenChange={() => setConfirmDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this resource? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => confirmDelete !== null && deleteResourceMutation.mutate(confirmDelete)}
              >
                {deleteResourceMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Resource"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Resources;
