
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import PWAInstallBanner from "./components/PWAInstallBanner";
import "./App.css";

const Index = lazy(() => import("./pages/Index"));
const Resources = lazy(() => import("./pages/Resources"));
const Courses = lazy(() => import("./pages/Courses"));
const People = lazy(() => import("./pages/People"));
const Events = lazy(() => import("./pages/Events"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Tools = lazy(() => import("./pages/Tools"));
const Timetable = lazy(() => import("./pages/Timetable"));
const Profile = lazy(() => import("./pages/Profile"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NoteTaker = lazy(() => import("./pages/NoteTaker"));
const EasterEggs = lazy(() => import("./pages/EasterEggs"));
const MemberBio = lazy(() => import("./pages/MemberBio"));
const AlternativeProfile = lazy(() => import("./pages/AlternativeProfile"));
const FullProfile = lazy(() => import("./pages/FullProfile"));
const SecretForum = lazy(() => import("./pages/SecretForum"));
const ForumSettings = lazy(() => import("./pages/ForumSettings"));
const ForumCategory = lazy(() => import("./pages/ForumCategory"));
const ForumTopic = lazy(() => import("./pages/ForumTopic"));
const News = lazy(() => import("./pages/News"));
const StudyGroups = lazy(() => import("./pages/StudyGroups"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading…</div>}>
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
              </Suspense>
              <PWAInstallBanner />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
