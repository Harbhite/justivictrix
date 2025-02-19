import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import People from './pages/People';
import FullProfile from './pages/FullProfile';

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
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
