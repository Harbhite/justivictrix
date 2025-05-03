
import { motion } from "framer-motion";
import { FileText, Download, Book, Video, Loader2, File, ExternalLink, BookOpen, List, LogIn, Pin, PinOff, Edit, Trash, Filter, X } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResourceUploadForm from "@/components/ResourceUploadForm";
import { AuthContext } from "@/App";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Resources = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const resourcesContainerRef = useRef<HTMLDivElement>(null);
  const [resourceToDelete, setResourceToDelete] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Check if user is admin (for pinning)
  const isAdmin = user?.email === "swisssunny1@gmail.com";

  // Fetch courses for filtering
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title")
        .order("code", { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    },
  });

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources", selectedCourse],
    queryFn: async () => {
      let query = supabase
        .from("resources")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });
        
      if (selectedCourse) {
        query = query.eq("category", selectedCourse);
      }
      
      const { data, error } = await query;

      if (error) {
        toast.error("Failed to load resources");
        throw error;
      }

      return data || [];
    },
  });

  // Delete resource
  const deleteResourceMutation = useMutation({
    mutationFn: async (id: number) => {
      // First get the resource to find the file URL
      const { data: resourceData, error: fetchError } = await supabase
        .from("resources")
        .select("file_url")
        .eq("id", id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Extract filename from URL
      if (resourceData && resourceData.file_url) {
        const filePathParts = resourceData.file_url.split('/');
        const fileName = filePathParts[filePathParts.length - 1];
        
        // Delete from storage first
        const { error: storageError } = await supabase.storage
          .from('resources')
          .remove([fileName]);
        
        if (storageError) {
          console.error("Storage deletion error:", storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }
      
      // Now delete the database record
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource deleted successfully");
      
      // If the deleted resource was the selected one, clear the selection
      if (selectedResource && resourceToDelete === selectedResource.id) {
        setSelectedResource(null);
      }
      
      setResourceToDelete(null);
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to delete resource");
      console.error(error);
      setResourceToDelete(null);
      setIsDeleteDialogOpen(false);
    }
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

  // Toggle pin status
  const handleTogglePin = (resource: any) => {
    togglePinMutation.mutate({ 
      id: resource.id, 
      isPinned: !resource.is_pinned 
    });
  };

  // Confirm delete resource
  const handleDeleteConfirmation = (id: number) => {
    setResourceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Process deletion after confirmation
  const confirmDelete = () => {
    if (resourceToDelete !== null) {
      deleteResourceMutation.mutate(resourceToDelete);
    }
  };

  // Auto-select the first PDF resource when resources are loaded
  useEffect(() => {
    if (resources && resources.length > 0) {
      const firstPdf = resources.find(resource => resource.type === 'pdf');
      if (firstPdf) {
        setSelectedResource(firstPdf);
      }
    }
  }, [resources]);

  useEffect(() => {
    // Subscribe to real-time changes
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

  // Clear course filter
  const clearCourseFilter = () => {
    setSelectedCourse(null);
  };

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

        {/* Course Filter */}
        <div className="mb-8">
          <motion.div
            className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Filter size={20} />
                  Filter Resources by Course
                </h3>
                <p className="text-gray-600 mb-4">Select a course to view related resources</p>
              </div>

              <div className="flex gap-4 items-center w-full md:w-auto">
                {coursesLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                ) : (
                  <Select value={selectedCourse || ""} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-full md:w-[250px] border-2 border-black">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses?.map((course) => (
                        <SelectItem key={course.id} value={course.code}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedCourse && (
                  <button
                    onClick={clearCourseFilter}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {selectedCourse && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-300">
                    Filtered by: {selectedCourse}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {resources?.length || 0} resources found
                  </span>
                </div>
              </div>
            )}
          </motion.div>
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

        {/* Authentication/Upload Section */}
        <div className="mb-8">
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
                <div>
                  <h2 className="text-2xl font-bold">{selectedResource.title}</h2>
                  {selectedResource.category && (
                    <Badge variant="outline" className="mt-1">
                      {selectedResource.category}
                    </Badge>
                  )}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteConfirmation(selectedResource.id)}
                    className="px-3 py-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors flex items-center gap-2"
                  >
                    <Trash size={18} />
                    Delete Resource
                  </button>
                )}
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
          ) : (
            <>
              {resources && resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.map((resource) => {
                    const Icon = getIconForType(resource.type);
                    const preview = getPreviewComponent(resource);
                    
                    return (
                      <motion.div
                        key={resource.id}
                        className={`p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                          resource.is_pinned ? "ring-4 ring-amber-400" : ""
                        }`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          if (resource.type === 'pdf') {
                            setSelectedResource(resource);
                            resourcesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <Icon size={24} className="mt-1" />
                          <div className="flex items-center gap-2">
                            {resource.is_pinned && (
                              <span className="p-1 bg-amber-200 border-2 border-black">
                                <Pin size={16} />
                              </span>
                            )}
                            <Badge className="bg-yellow-200 text-black border-2 border-black px-2 py-1 font-bold">
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                        
                        {preview}

                        <h3 className="text-xl font-bold mt-4 mb-2">
                          {resource.title}
                        </h3>
                        
                        {resource.category && (
                          <Badge variant="outline" className="mb-2">
                            {resource.category}
                          </Badge>
                        )}
                        
                        {resource.description && (
                          <p className="text-sm text-gray-600 mb-4">
                            {resource.description}
                          </p>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          {resource.type === 'pdf' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedResource(resource);
                                resourcesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-4 py-2 bg-blue-400 border-2 border-black hover:bg-blue-500 transition-colors flex items-center gap-2 inline-block"
                            >
                              <FileText size={20} />
                              View PDF
                            </button>
                          )}
                          <a
                            href={resource.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors flex items-center gap-2 inline-block"
                            download
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download size={20} />
                            Download {resource.file_type ? `.${resource.file_type}` : ''}
                          </a>
                          
                          {isAdmin && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTogglePin(resource);
                                }}
                                className={`px-4 py-2 border-2 border-black transition-colors flex items-center gap-2 inline-block ${
                                  resource.is_pinned 
                                    ? "bg-amber-400 hover:bg-amber-500" 
                                    : "bg-gray-200 hover:bg-gray-300"
                                }`}
                              >
                                {resource.is_pinned ? <PinOff size={20} /> : <Pin size={20} />}
                                {resource.is_pinned ? "Unpin" : "Pin"}
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteConfirmation(resource.id);
                                }}
                                className="px-4 py-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors flex items-center gap-2 inline-block"
                              >
                                <Trash size={20} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 border-4 border-black">
                  <File size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Resources Found</h3>
                  {selectedCourse ? (
                    <>
                      <p className="text-gray-600 mb-4">No resources available for the selected course: {selectedCourse}</p>
                      <button 
                        onClick={clearCourseFilter}
                        className="px-4 py-2 bg-blue-400 border-2 border-black hover:bg-blue-500 transition-colors"
                      >
                        Clear Filter
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-600">Upload some resources to get started</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource
              and remove the file from storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setResourceToDelete(null);
                setIsDeleteDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Resources;
