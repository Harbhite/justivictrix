import { useState } from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInstallBannerVisible, setIsInstallBannerVisible] = useState(true);

  useMetaTags({
    title: "LLB28HUB - Your Legal Education Hub",
    description: "Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.",
    image: "/og-image.png",
    type: "website"
  });

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCloseBanner = () => {
    setIsInstallBannerVisible(false);
  };

  return (
    <div className="bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">LLB28HUB</h1>
          <button 
            className="text-gray-600 focus:outline-none" 
            onClick={handleMobileMenuToggle}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? '' : 'hidden'} fixed inset-0 bg-gray-800 bg-opacity-75 z-50`}>
        <div className="bg-white w-64 h-full absolute right-0 shadow-lg p-6">
          <div className="flex justify-end mb-8">
            <button className="text-gray-600" onClick={handleCloseMobileMenu}>
              <span className="material-icons">close</span>
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-lg">
            <a className="text-gray-700 hover:text-blue-600" href="#home" onClick={handleCloseMobileMenu}>Home</a>
            <a className="text-gray-700 hover:text-blue-600" href="#about" onClick={handleCloseMobileMenu}>About Us</a>
            <a className="text-gray-700 hover:text-blue-600" href="#features" onClick={handleCloseMobileMenu}>Features</a>
            <a className="text-gray-700 hover:text-blue-600" href="#resources" onClick={handleCloseMobileMenu}>Resources</a>
            <a className="text-gray-700 hover:text-blue-600" href="#contact" onClick={handleCloseMobileMenu}>Contact</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative overflow-hidden" id="home">
        <div className="bg-white pt-24 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28">
          <div className="relative max-w-lg mx-auto lg:max-w-7xl">
            <div className="text-center">
              <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold py-1 px-4 rounded-full mb-4">
                Welcome to LLB28HUB
              </div>
              <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Your Legal Education Hub
              </h2>
              <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl">
                Connect, learn, and excel with your fellow LLB28 classmates. Access resources, join study groups, and build your legal career together.
              </p>
              <div className="mt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg" href="#">
                  Get Started
                  <span className="material-icons ml-2">arrow_forward</span>
                </a>
                <a className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md" href="#resources">
                  Browse Resources
                  <span className="material-icons ml-2">library_books</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-48 mt-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
      </main>

      {/* About Section */}
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">About LLB28HUB</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              At LLB 28, we are committed to revolutionizing legal education through innovative, sustainable, and cost-effective learning solutions. With a proven track record of delivering exceptional academic results, we combine state-of-the-art study technology, refined expertise, and student-centric approaches to bring our learning objectives to life.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover the features that make our platform the best choice for your legal studies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <span className="material-icons text-3xl">school</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert-Led Content</h3>
              <p className="text-gray-600">Our resources are curated by legal experts and top-performing students, ensuring you get the most relevant and accurate information.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                <span className="material-icons text-3xl">groups</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Collaborative Learning</h3>
              <p className="text-gray-600">Join study groups, participate in forums, and collaborate on projects with your peers to enhance your understanding.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                <span className="material-icons text-3xl">auto_stories</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Resources</h3>
              <p className="text-gray-600">From case summaries and lecture notes to mock exams and flashcards, we have everything you need to succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white" id="resources">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Our Resources</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Explore our extensive library of study materials designed to help you excel.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-blue-50 transition-colors">
              <span className="material-icons text-blue-500 text-4xl mb-4">gavel</span>
              <h3 className="font-semibold text-lg text-gray-700">Case Law</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-green-50 transition-colors">
              <span className="material-icons text-green-500 text-4xl mb-4">menu_book</span>
              <h3 className="font-semibold text-lg text-gray-700">Legislation</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-purple-50 transition-colors">
              <span className="material-icons text-purple-500 text-4xl mb-4">description</span>
              <h3 className="font-semibold text-lg text-gray-700">Lecture Notes</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm hover:bg-red-50 transition-colors">
              <span className="material-icons text-red-500 text-4xl mb-4">quiz</span>
              <h3 className="font-semibold text-lg text-gray-700">Past Papers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to elevate your legal studies?</h2>
          <p className="mt-4 text-lg text-blue-100">Join our community today and get instant access to all our resources.</p>
          <div className="mt-8">
            <a className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50" href="#">
              Sign Up Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Get In Touch</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Reach out and we'll get back to you shortly.</p>
          </div>
          <div className="max-w-lg mx-auto">
            <form action="#" className="grid grid-cols-1 gap-y-6" method="POST">
              <div>
                <label className="sr-only" htmlFor="full-name">Full name</label>
                <input 
                  autoComplete="name" 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" 
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
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" 
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea 
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md" 
                  id="message" 
                  name="message" 
                  placeholder="Message" 
                  rows={4}
                ></textarea>
              </div>
              <div>
                <button 
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                  type="submit"
                >
                  Send Message
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
                <li><a className="text-gray-400 hover:text-white" href="#about">About Us</a></li>
                <li><a className="text-gray-400 hover:text-white" href="#resources">Resources</a></li>
                <li><a className="text-gray-400 hover:text-white" href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="text-gray-400 hover:text-white" href="#">Privacy Policy</a></li>
                <li><a className="text-gray-400 hover:text-white" href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a className="text-gray-400 hover:text-white" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-white" href="#">
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

      {/* Install Banner */}
      {isInstallBannerVisible && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-40">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-gray-900 shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg bg-blue-800">
                    <span className="material-icons text-white">system_update</span>
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">Get our app!</span>
                    <span className="hidden md:inline">Install Law Portal: Get quick access to all your study resources with our app!</span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <a className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50" href="#">
                    Install
                  </a>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto sm:ml-2">
                  <button 
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700"
                    onClick={handleCloseBanner}
                  >
                    Later
                  </button>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button 
                    className="-mr-1 flex p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white" 
                    type="button"
                    onClick={handleCloseBanner}
                  >
                    <span className="sr-only">Dismiss</span>
                    <span className="material-icons text-white h-6 w-6">close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;