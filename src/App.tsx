
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Courses from "./pages/Courses";
import People from "./pages/People";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import Gallery from "./pages/Gallery";
import Tools from "./pages/Tools";
import Timetable from "./pages/Timetable";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import NoteTaker from "./pages/NoteTaker";
import EasterEggs from "./pages/EasterEggs";
import MemberBio from "./pages/MemberBio";
import AlternativeProfile from "./pages/AlternativeProfile";
import FullProfile from "./pages/FullProfile";
import SecretForum from "./pages/SecretForum";
import ForumSettings from "./pages/ForumSettings";
import ForumCategory from "./pages/ForumCategory";
import ForumTopic from "./pages/ForumTopic";
import News from "./pages/News";
import StudyGroups from "./pages/StudyGroups";
import Settings from "./pages/Settings";
import PWAInstallBanner from "./components/PWAInstallBanner";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/people" element={<People />} />
                <Route path="/events" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog/new" element={<BlogEditor />} />
                <Route path="/blog/edit/:id" element={<BlogEditor />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/note-taker" element={<NoteTaker />} />
                <Route path="/easter-eggs" element={<EasterEggs />} />
                <Route path="/member/:id" element={<MemberBio />} />
                <Route path="/alternative-profile/:id" element={<AlternativeProfile />} />
                <Route path="/full-profile/:id" element={<FullProfile />} />
                <Route path="/secret-forum" element={<SecretForum />} />
                <Route path="/forum/settings" element={<ForumSettings />} />
                <Route path="/forum/category/:slug" element={<ForumCategory />} />
                <Route path="/forum/topic/:id" element={<ForumTopic />} />
                <Route path="/news" element={<News />} />
                <Route path="/study-groups" element={<StudyGroups />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <PWAInstallBanner />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
