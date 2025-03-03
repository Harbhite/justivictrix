
import { useState } from "react";
import { motion } from "framer-motion";
import { UsersRound, Plus, Search, BookOpen, Calendar, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

type StudyGroup = {
  id: number;
  name: string;
  course: string;
  schedule: string;
  location: string;
  description: string;
  members: number;
  tags: string[];
}

const StudyGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    course: "",
    schedule: "",
    location: "",
    description: "",
    tags: ""
  });
  
  // Mock data for study groups
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      name: "Constitutional Law Champions",
      course: "Constitutional Law",
      schedule: "Tuesdays, 4-6 PM",
      location: "Law Lecture Room (LLR)",
      description: "Weekly discussions on constitutional principles and case studies. Focus on practical applications and exam preparation.",
      members: 8,
      tags: ["Constitutional", "Case Studies", "Exam Prep"]
    },
    {
      id: 2,
      name: "Contract Law Study Circle",
      course: "Contract Law",
      schedule: "Mondays & Wednesdays, 5-7 PM",
      location: "New Faculty of Law Complex",
      description: "In-depth analysis of contract law principles. Regular mock exercises and problem-solving sessions.",
      members: 6,
      tags: ["Contract", "Problem Solving", "Mock Tests"]
    },
    {
      id: 3,
      name: "Criminal Law Discourse",
      course: "Criminal Law",
      schedule: "Fridays, 3-5 PM",
      location: "Law Lecture Theatre (LLT)",
      description: "Focused on critical analysis of criminal cases. Regular debates on controversial topics and legal reforms.",
      members: 10,
      tags: ["Criminal", "Debates", "Case Analysis"]
    },
    {
      id: 4, 
      name: "Evidence Law Masterclass",
      course: "Evidence Law",
      schedule: "Thursdays, 4-6 PM",
      location: "Wole Olanipekun Lecture Theatre",
      description: "Expert-led sessions on rules of evidence. Practice court simulations and evidence analysis techniques.",
      members: 7,
      tags: ["Evidence", "Court Simulation", "Practice"]
    }
  ]);
  
  // Available courses for filtering
  const courses = [
    "All Courses",
    "Constitutional Law",
    "Contract Law",
    "Tort Law",
    "Criminal Law",
    "Evidence Law",
    "Land Law",
    "Legal Methods"
  ];
  
  // Handle creating new study group
  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.course || !newGroup.schedule) {
      alert("Please fill in all required fields!");
      return;
    }
    
    const newId = studyGroups.length > 0 ? Math.max(...studyGroups.map(g => g.id)) + 1 : 1;
    
    const createdGroup: StudyGroup = {
      id: newId,
      name: newGroup.name,
      course: newGroup.course,
      schedule: newGroup.schedule,
      location: newGroup.location,
      description: newGroup.description,
      members: 1, // Starting with creator
      tags: newGroup.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    };
    
    setStudyGroups([...studyGroups, createdGroup]);
    setShowCreateModal(false);
    setNewGroup({
      name: "",
      course: "",
      schedule: "",
      location: "",
      description: "",
      tags: ""
    });
  };
  
  // Filter groups based on search and course selection
  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCourse = selectedCourse === null || 
                          selectedCourse === "All Courses" || 
                          group.course === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });
  
  // Join a study group
  const joinGroup = (id: number) => {
    setStudyGroups(studyGroups.map(group => 
      group.id === id ? {...group, members: group.members + 1} : group
    ));
    
    // Show confirmation
    alert(`You've successfully joined the study group!`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div>
            <h1 className="text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-1 mb-4 md:mb-0">
              Study Groups
            </h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white border-4 border-black hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Plus size={20} />
            Create New Study Group
          </motion.button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-yellow-100 border-4 border-black p-6 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by group name, description, or tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-2 border-black w-full"
              />
            </div>
            
            <div className="md:w-64">
              <select 
                value={selectedCourse || "All Courses"}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full py-3 px-4 border-2 border-black"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Study Groups List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{group.name}</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium">
                    {group.course}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{group.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UsersRound size={16} />
                    <span>{group.members} members</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Location:</span>
                    <span className="font-medium">{group.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {group.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => joinGroup(group.id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white border-2 border-black hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <UsersRound size={16} />
                    Join Group
                  </button>
                  
                  <button
                    className="px-4 py-2 bg-blue-100 text-blue-800 border-2 border-black hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center bg-gray-100 border-4 border-black">
              <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">No study groups found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or create a new group</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-blue-600 text-white border-2 border-black hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create New Study Group
              </button>
            </div>
          )}
        </div>
        
        {/* Create New Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Study Group</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Group Name *</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    placeholder="E.g., Constitutional Law Study Group"
                    className="w-full p-3 border-2 border-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Course *</label>
                  <select
                    value={newGroup.course}
                    onChange={(e) => setNewGroup({...newGroup, course: e.target.value})}
                    className="w-full p-3 border-2 border-black"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.filter(course => course !== "All Courses").map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Schedule *</label>
                    <input
                      type="text"
                      value={newGroup.schedule}
                      onChange={(e) => setNewGroup({...newGroup, schedule: e.target.value})}
                      placeholder="E.g., Mondays, 4-6 PM"
                      className="w-full p-3 border-2 border-black"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={newGroup.location}
                      onChange={(e) => setNewGroup({...newGroup, location: e.target.value})}
                      placeholder="E.g., Law Lecture Room (LLR)"
                      className="w-full p-3 border-2 border-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    placeholder="Describe the focus and goals of your study group"
                    className="w-full p-3 border-2 border-black h-32"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newGroup.tags}
                    onChange={(e) => setNewGroup({...newGroup, tags: e.target.value})}
                    placeholder="E.g., Case Studies, Exam Prep, Discussion"
                    className="w-full p-3 border-2 border-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCreateGroup}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white border-2 border-black hover:bg-blue-700 transition-colors"
                  >
                    Create Group
                  </button>
                  
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 border-2 border-black hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudyGroups;
