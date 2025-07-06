import { Link } from 'react-router-dom';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';

export const HeroSection = () => {
  const parallaxOffset = useParallax();

  return (
    <main className="relative overflow-hidden" id="home">
      <div 
        className="bg-white pt-24 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28 relative"
        style={{ transform: `translateY(${parallaxOffset * 0.05}px)` }}
      >
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold py-1 px-4 rounded-full mb-4 animate-bounce-in">
              Welcome to LLB28HUB
            </div>
            <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-fade-in-up">
              Your Legal Education Hub
            </h2>
            <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.
            </p>
            <div className="mt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-all transform hover:scale-105" 
                to="/tools"
              >
                Get Started
                <span className="material-icons ml-2">arrow_forward</span>
              </Link>
              <Link 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md transition-all transform hover:scale-105" 
                to="/resources"
              >
                Browse Resources
                <span className="material-icons ml-2">library_books</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 -mr-48 mt-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{animationDelay: '4s'}}></div>
    </main>
  );
};