
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import People from './pages/People';
import FullProfile from './pages/FullProfile';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/people/:id",
    element: <FullProfile />,
  },
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
