
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-law-dark mb-8">About Our Law Class</h1>
        <div className="prose prose-lg text-law-neutral">
          <p className="mb-6">
            Welcome to our vibrant community of aspiring legal professionals. Our class
            is dedicated to fostering excellence in legal education and preparing the
            next generation of legal practitioners.
          </p>
          <p className="mb-6">
            Through rigorous academic work, practical experience, and collaborative
            learning, we aim to develop well-rounded legal minds capable of tackling
            the complex challenges of tomorrow's legal landscape.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
