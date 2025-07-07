import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const tools = [
  { name: "AI Study Assistant", icon: "smart_toy", description: "Get personalized study help", link: "/tools" },
  { name: "Case Brief Generator", icon: "gavel", description: "Generate professional case briefs", link: "/tools" },
  { name: "Legal Citation Tool", icon: "format_quote", description: "Perfect your citations", link: "/tools" },
  { name: "Flashcard Creator", icon: "style", description: "Create interactive flashcards", link: "/tools" },
  { name: "Mind Map Builder", icon: "account_tree", description: "Visualize complex concepts", link: "/tools" },
  { name: "Mock Exam Generator", icon: "quiz", description: "Practice with custom exams", link: "/tools" }
];

export const AIToolsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`py-20 bg-indigo-900 text-white transition-all duration-700 ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Study Tools</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">Harness the power of artificial intelligence to supercharge your legal studies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.link}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <span className="material-icons text-3xl text-indigo-300 group-hover:text-white transition-colors mr-3">
                  {tool.icon}
                </span>
                <h3 className="font-semibold group-hover:text-white transition-colors">{tool.name}</h3>
              </div>
              <p className="text-indigo-200 text-sm group-hover:text-white/90 transition-colors">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            to="/tools" 
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-900 rounded-lg font-medium hover:bg-indigo-50 transition-all transform hover:scale-105"
          >
            Explore All Tools
            <span className="material-icons ml-2">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};