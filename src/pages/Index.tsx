
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  PenTool,
  Book,
  LayoutGrid,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  
  const { data: events } = useQuery({
    queryKey: ["homepage-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Your Law School <span className="text-green-600">Resource Hub</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Access course materials, collaborate with peers, and excel in your legal education journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/resources')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Course Resources
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/timetable')}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Class Schedule
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=600"
                alt="Law students studying" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Course Materials</h3>
              <p className="text-gray-600 mb-4">
                Access lecture notes, readings, and supplementary resources for all your courses.
              </p>
              <Link to="/resources" className="text-green-600 font-medium flex items-center">
                Browse Materials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Study Tools</h3>
              <p className="text-gray-600 mb-4">
                Enhance your learning with case briefs, citation tools, and legal dictionaries.
              </p>
              <Link to="/tools" className="text-green-600 font-medium flex items-center">
                Explore Tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with peers, join study groups, and participate in discussions.
              </p>
              <Link to="/forum" className="text-green-600 font-medium flex items-center">
                Join Forums <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Core Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "LAW101", title: "Introduction to Law", credit: "3 Credits" },
              { id: "LAW201", title: "Constitutional Law", credit: "4 Credits" },
              { id: "LAW205", title: "Criminal Law", credit: "3 Credits" },
              { id: "LAW210", title: "Contract Law", credit: "4 Credits" },
              { id: "LAW215", title: "Tort Law", credit: "3 Credits" },
              { id: "LAW301", title: "International Law", credit: "3 Credits" }
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="border-l-4 border-green-500 p-6">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{course.id}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {course.credit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/courses">
              <Button variant="outline" className="border-green-600 text-green-600">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-green-600 text-green-600"
              onClick={() => navigate('/events')}
            >
              All Events <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events?.length ? (
              events.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="bg-green-600 text-white p-3 text-center">
                    <span className="block text-sm">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="block text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <Link to={`/events`} className="text-green-600 font-medium flex items-center">
                      Event Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              [1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="bg-green-600 text-white p-3 text-center">
                    <span className="block text-sm">TBD</span>
                    <span className="block text-2xl font-bold">--</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Upcoming Event</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Time TBD</span>
                    </div>
                    <p className="text-gray-600 mb-4">Event details will be announced soon.</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get the Most Out of Your Education</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access all the resources, tools, and community support you need to excel in your legal studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => navigate('/resources')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Browse Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-green-700"
              onClick={() => navigate('/tools')}
            >
              <PenTool className="mr-2 h-5 w-5" />
              Access Tools
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
