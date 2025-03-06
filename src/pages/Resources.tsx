import { motion } from "framer-motion";
import { FileText, Download, Book, Video, Loader2, File, ExternalLink, BookOpen, List, LogIn, Pin, PinOff } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResourceUploadForm from "@/components/ResourceUploadForm";

const Resources = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isPinMode, setIsPinMode] = useState(false);
  const resourcesContainerRef = useRef<HTMLDivElement>(null);

  // Check authentication status on load
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    getUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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

  // Toggle pin status
  const handleTogglePin = (resource: any) => {
    togglePinMutation.mutate({ 
      id: resource.id, 
      isPinned: !resource.is_pinned 
    });
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

  // Toggle pin mode
  const togglePinMode = () => {
    setIsPinMode(!isPinMode);
    toast.info(isPinMode ? "Pin mode disabled" : "Pin mode enabled. Click on resources to pin/unpin them.");
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
            <button
              onClick={togglePinMode}
              className={`px-4 py-2 border-2 border-black flex items-center gap-2 ${
                isPinMode ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              {isPinMode ? <PinOff size={20} /> : <Pin size={20} />}
              {isPinMode ? "Exit Pin Mode" : "Enter Pin Mode"}
            </button>
          )}
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
              <h2 className="text-2xl font-bold mb-4">{selectedResource.title}</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources?.map((resource) => {
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
                      if (isPinMode && isAdmin) {
                        handleTogglePin(resource);
                      } else if (resource.type === 'pdf') {
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
                        <span className="px-2 py-1 bg-yellow-200 border-2 border-black text-sm font-bold">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    
                    {preview}

                    <h3 className="text-xl font-bold mt-4 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-law-neutral mb-4">{resource.category}</p>
                    {resource.description && (
                      <p className="text-sm text-gray-600 mb-4">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex gap-2">
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
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
