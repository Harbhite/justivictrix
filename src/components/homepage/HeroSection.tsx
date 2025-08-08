import { Link } from 'react-router-dom';
import { useParallax } from '@/hooks/useScrollAnimation';
import { ArrowRight, BookOpen } from 'lucide-react';

export const HeroSection = () => {
  const parallaxOffset = useParallax();

  return (
    <main className="relative overflow-hidden" id="home">
      <div 
        className="bg-background pt-24 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28 relative"
        style={{ transform: `translateY(${parallaxOffset * 0.05}px)` }}
      >
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div className="text-center">
            <div className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold py-1 px-4 rounded-full mb-4 animate-fade-in">
              Welcome to LLB28HUB
            </div>
            <h2 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl animate-fade-in">
              Your Legal Education Hub
            </h2>
            <p className="mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.
            </p>
            <div className="mt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground md:py-4 md:text-lg md:px-10 border border-input shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-primary/90" 
                to="/tools"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground md:py-4 md:text-lg md:px-10 border border-input shadow-md transition-transform duration-200 hover:scale-105 hover:bg-secondary/80" 
                to="/resources"
              >
                Browse Resources
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
};