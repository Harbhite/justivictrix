import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 animate-fade-in">
      <div className="bg-white w-64 h-full absolute right-0 shadow-lg p-6 animate-slide-in-right">
        <div className="flex justify-end mb-8">
          <button 
            className="text-gray-600 hover:text-red-500 transition-colors transform hover:scale-110" 
            onClick={onClose}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/" onClick={onClose}>Home</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/people" onClick={onClose}>People</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/courses" onClick={onClose}>Courses</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/tools" onClick={onClose}>Tools</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/resources" onClick={onClose}>Resources</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition-all hover:translate-x-2 transform" to="/blog" onClick={onClose}>Blog</Link>
        </nav>
      </div>
    </div>
  );
};