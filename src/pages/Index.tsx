import { Link } from 'react-router-dom';
import { useMetaTags } from '@/hooks/useMetaTags';
import { HeroSection } from '@/components/homepage/HeroSection';
import { StatisticsSection } from '@/components/homepage/StatisticsSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { AIToolsSection } from '@/components/homepage/AIToolsSection';

const Index = () => {

  useMetaTags({
    title: "LLB28HUB - Your Legal Education Hub",
    description: "Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.",
    image: "/og-image.png",
    type: "website"
  });



  return (
    <div className="min-h-screen">
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}

      <HeroSection />
      <StatisticsSection />

      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">About LLB28HUB</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              At LLB 28, we are committed to revolutionizing legal education through innovative, sustainable, and cost-effective learning solutions.
            </p>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <AIToolsSection />

      {/* Resources Section */}
      <section className="py-20 bg-white" id="resources">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our extensive library of study materials designed to help you excel.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "gavel", name: "Case Law", color: "blue", link: "/resources" },
              { icon: "menu_book", name: "Legislation", color: "green", link: "/resources" },
              { icon: "description", name: "Lecture Notes", color: "purple", link: "/resources" },
              { icon: "quiz", name: "Past Papers", color: "red", link: "/resources" }
            ].map((resource, index) => (
              <Link
                key={index}
                to={resource.link}
                className={`bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-${resource.color}-50 transition-all duration-300 transform hover:scale-105 group`}
              >
                <span className={`material-icons text-${resource.color}-500 text-4xl mb-4 block group-hover:animate-bounce`}>
                  {resource.icon}
                </span>
                <h3 className="font-semibold text-lg text-gray-700 group-hover:text-gray-900">{resource.name}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/resources" 
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              View All Resources
              <span className="material-icons ml-2">library_books</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Study Groups */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Study Groups</h2>
            <p className="text-xl mb-8 text-green-100">Connect with classmates and study together for better results</p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float">groups</span>
                <h3 className="font-bold mb-2">Collaborative Learning</h3>
                <p className="text-green-100">Study with peers and share knowledge</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float" style={{ animationDelay: '1s' }}>schedule</span>
                <h3 className="font-bold mb-2">Scheduled Sessions</h3>
                <p className="text-green-100">Regular study sessions that fit your schedule</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                <span className="material-icons text-4xl mb-4 block animate-float" style={{ animationDelay: '2s' }}>trending_up</span>
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-green-100">Monitor your group's learning progress</p>
              </div>
            </div>
            <Link 
              to="/study-groups" 
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all transform hover:scale-105"
            >
              Find Study Groups
              <span className="material-icons ml-2">group_add</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">Ready to elevate your legal studies?</h2>
          <p className="text-lg text-blue-100 mb-8">Join our community today and get instant access to all our resources.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/auth" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/blog" 
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Read Our Blog
              <span className="material-icons ml-2">article</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Reach out and we'll get back to you shortly.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          <div className="max-w-lg mx-auto">
            <form action="#" className="grid grid-cols-1 gap-y-6" method="POST">
              <div>
                <label className="sr-only" htmlFor="full-name">Full name</label>
                <input 
                  autoComplete="name" 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="full-name" 
                  name="full-name" 
                  placeholder="Full name" 
                  type="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                  autoComplete="email" 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md transition-all focus:scale-105" 
                  id="message" 
                  name="message" 
                  placeholder="Message" 
                  rows={4}
                ></textarea>
              </div>
              <div>
                <button 
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105" 
                  type="submit"
                >
                  Send Message
                  <span className="material-icons ml-2">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LLB28HUB</h3>
              <p className="text-gray-400 text-sm">Your partner in legal education.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/people">People</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/resources">Resources</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/tools">Tools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/blog">Blog</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/study-groups">Study Groups</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/events">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a className="text-gray-400 hover:text-white transform hover:scale-110 transition-all" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-white transform hover:scale-110 transition-all" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 LLB28HUB. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;