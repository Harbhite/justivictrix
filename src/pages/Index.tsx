
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 bg-law-primary/10 text-law-primary rounded-full text-sm font-semibold tracking-wide">
            Welcome to Law Class
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-law-dark mb-6">
            Your Gateway to Legal Excellence
          </h1>
          <p className="text-lg sm:text-xl text-law-neutral mb-8 max-w-2xl mx-auto">
            Access resources, connect with classmates, and excel in your legal
            studies with our comprehensive platform.
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
  );
};

export default Index;
