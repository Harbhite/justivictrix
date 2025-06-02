
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure to create the root element properly
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Remove React.StrictMode from here since it's already in App.tsx
root.render(<App />);

// Redirect from study-groups to home if accessed directly
if (window.location.pathname === '/study-groups') {
  window.location.href = '/';
}
