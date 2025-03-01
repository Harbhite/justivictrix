
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import People from './pages/People';
import FullProfile from './pages/FullProfile';
import Index from './pages/Index';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Timetable from './pages/Timetable';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/people/:id",
    element: <FullProfile />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/timetable",
    element: <Timetable />,
  },
  {
    path: "/tools",
    element: <Tools />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
