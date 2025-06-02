
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import People from "./pages/People";
import FullProfile from "./pages/FullProfile";
import MemberBio from "./pages/MemberBio";
import AlternativeProfile from "./pages/AlternativeProfile";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Tools from "./pages/Tools";
import Timetable from "./pages/Timetable";
import EasterEggs from "./pages/EasterEggs";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoteTaker from "./pages/NoteTaker";
import SecretForum from "./pages/SecretForum";
import ForumCategory from "./pages/ForumCategory";
import ForumTopic from "./pages/ForumTopic";
import ForumSettings from "./pages/ForumSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<FullProfile />} />
              <Route path="/member-bio/:id" element={<MemberBio />} />
              <Route path="/alternative-profile/:id" element={<AlternativeProfile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/easter-eggs" element={<EasterEggs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog-editor" element={<BlogEditor />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/notes" element={<NoteTaker />} />
              <Route path="/secret-forum" element={<SecretForum />} />
              <Route path="/forum/:category" element={<ForumCategory />} />
              <Route path="/forum/:category/:topicId" element={<ForumTopic />} />
              <Route path="/forum-settings" element={<ForumSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
