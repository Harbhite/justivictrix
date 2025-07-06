import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: "school",
    title: "Expert-Led Content",
    description: "Our resources are curated by legal experts and top-performing students, ensuring you get the most relevant and accurate information.",
    color: "blue"
  },
  {
    icon: "groups",
    title: "Collaborative Learning",
    description: "Join study groups, participate in forums, and collaborate on projects with your peers to enhance your understanding.",
    color: "green"
  },
  {
    icon: "auto_stories",
    title: "Comprehensive Resources",
    description: "From case summaries and lecture notes to mock exams and flashcards, we have everything you need to succeed.",
    color: "purple"
  }
];

export const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`py-20 bg-gray-50 transition-all duration-700 ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
    }`} id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the features that make our platform the best choice for your legal studies.</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-icons text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};