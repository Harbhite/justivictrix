
import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "sonner";
import People from './pages/People';
import FullProfile from './pages/FullProfile';
import MemberBio from './pages/MemberBio';
import Index from './pages/Index';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Courses from './pages/Courses';
import Timetable from './pages/Timetable';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogEditor from './pages/BlogEditor';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import SecretForum from './pages/SecretForum';
import ForumCategory from './pages/ForumCategory';
import ForumTopic from './pages/ForumTopic';
import ForumSettings from './pages/ForumSettings';
import EasterEggs from './pages/EasterEggs';
import NoteTaker from './pages/NoteTaker';

const queryClient = new QueryClient();

// Layout component that includes Navbar and Outlet for nested routes
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <Outlet />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

// Create a context for authentication
export const AuthContext = React.createContext<{
  user: any | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

// AuthProvider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for current session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting session:", error);
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "people/:id",
        element: <FullProfile />,
      },
      {
        path: "member-bio/:id",
        element: <MemberBio />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "resources",
        element: <Resources />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "timetable",
        element: <Timetable />,
      },
      {
        path: "tools",
        element: <Tools />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogPost />,
      },
      {
        path: "blog/new",
        element: <BlogEditor />,
      },
      {
        path: "blog/edit/:id",
        element: <BlogEditor />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Secret Forum Routes
      {
        path: "secret-forum",
        element: <SecretForum />,
      },
      {
        path: "forum/category/:categorySlug",
        element: <ForumCategory />,
      },
      {
        path: "forum/topic/:topicId",
        element: <ForumTopic />,
      },
      {
        path: "forum/settings",
        element: <ForumSettings />,
      },
      // Easter Eggs route
      {
        path: "easter-eggs",
        element: <EasterEggs />,
      },
      // Note Taker route
      {
        path: "note-taker",
        element: <NoteTaker />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
