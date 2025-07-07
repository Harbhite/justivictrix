import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stats = [
  { number: "157", label: "Class Members", icon: "group" },
  { number: "15+", label: "Core Subjects", icon: "menu_book" },
  { number: "25+", label: "Study Groups", icon: "psychology" },
  { number: "3", label: "Academic Years", icon: "school" }
];

export const StatisticsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`py-20 bg-blue-600 text-white transition-all duration-700 ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Community in Numbers</h2>
          <p className="text-blue-100">Building the future of legal education together</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-110 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-4">
                <span className="material-icons text-4xl text-blue-200 animate-float">{stat.icon}</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-bounce-in">
                {stat.number}
              </div>
              <p className="text-blue-100 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};