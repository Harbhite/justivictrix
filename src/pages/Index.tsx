
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, GraduationCap, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 bg-law-primary/10 text-law-primary rounded-full text-sm font-semibold tracking-wide">
              Welcome to LLB 28
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-law-dark mb-6">
              Your Gateway to Legal Excellence
            </h1>
            <p className="text-lg sm:text-xl text-law-neutral mb-8 max-w-2xl mx-auto">
              Join the prestigious LLB 28 cohort at our law school, where future legal 
              professionals are shaped through rigorous academic excellence and practical experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-law-primary hover:bg-law-primary/90 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center px-6 py-3 border border-law-primary text-base font-medium rounded-lg text-law-primary bg-transparent hover:bg-law-primary/5 transition-colors duration-200"
              >
                View Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-law-dark mb-4">Why LLB 28?</h2>
            <p className="text-lg text-law-neutral max-w-2xl mx-auto">
              Our program is designed to create well-rounded legal professionals ready 
              to tackle the challenges of tomorrow's legal landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Curriculum",
                description: "Carefully curated courses covering both traditional and emerging areas of law"
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Work alongside talented peers in an environment that fosters growth"
              },
              {
                icon: GraduationCap,
                title: "Expert Faculty",
                description: "Learn from experienced professors and practicing lawyers"
              },
              {
                icon: Scale,
                title: "Practical Experience",
                description: "Gain hands-on experience through moot courts and legal clinics"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <feature.icon className="w-12 h-12 text-law-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-law-neutral">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 px-4 bg-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join LLB 28's Journey</h2>
            <p className="text-lg text-law-neutral mb-8">
              Be part of a community that's shaping the future of legal practice. 
              Access resources, connect with peers, and excel in your legal studies.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-law-primary hover:bg-law-primary/90 transition-colors duration-200"
            >
              Access Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
