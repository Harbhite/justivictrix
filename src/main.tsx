
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure to create the root element properly
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Add animations and enhanced visual experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Redirect from study-groups to home if accessed directly
if (window.location.pathname === '/study-groups') {
  window.location.href = '/';
}
