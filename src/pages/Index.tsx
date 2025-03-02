
import { motion } from "framer-motion";
import { ArrowRight, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Stats data
  const stats = [
    { value: "250+", label: "Law Graduates" },
    { value: "5+", label: "Years of Excellence" },
    { value: "20+", label: "Academic Awards" },
    { value: "15+", label: "Partner Firms" },
  ];

  // Popular courses data
  const courses = [
    {
      id: 1,
      title: "Constitutional Law & Human Rights",
      instructor: "Dr. Samantha Brown",
      rating: 4.8,
      reviews: 234,
      originalPrice: "$39.99",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=300&auto=format&fit=crop",
      tag: "BEST SELLER"
    },
    {
      id: 2,
      title: "Criminal Law: Theory & Practice",
      instructor: "Prof. James Morgan",
      rating: 4.6,
      reviews: 178,
      originalPrice: "$45.99",
      price: "$35.33",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=300&auto=format&fit=crop",
      tag: "POPULAR"
    },
    {
      id: 3,
      title: "Legal Writing & Research Methods",
      instructor: "Maria Gonzalez",
      rating: 4.9,
      reviews: 256,
      originalPrice: "$49.99",
      price: "$35.75",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=300&auto=format&fit=crop",
      tag: "HOT"
    },
    {
      id: 4,
      title: "Foundations of Legal Ethics",
      instructor: "Dr. Eric Knight",
      rating: 4.7,
      reviews: 195,
      originalPrice: "$42.99",
      price: "$36.88",
      image: "https://images.unsplash.com/photo-1505664063603-28e48c8ad148?q=80&w=300&auto=format&fit=crop",
      tag: "BEST RATED"
    }
  ];

  // Categories data
  const categories = [
    { name: "Academic", count: 15 },
    { name: "Technical", count: 8 },
    { name: "Vocational", count: 7 },
    { name: "Others", count: 5 }
  ];

  // Mentors data
  const mentors = [
    {
      id: 1,
      name: "Ronald Richards",
      specialty: "Constitutional Law",
      rating: 5.0,
      reviews: "176,859",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Theresa Webb",
      specialty: "Business Law",
      rating: 4.9,
      reviews: "175,835",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Leslie Alexander",
      specialty: "International Law",
      rating: 4.9,
      reviews: "175,835",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Darrell Steward",
      specialty: "Criminal Law",
      rating: 5.0,
      reviews: "176,835",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Winchester Robin",
      title: "Law Student",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      text: "Learning in this way is outstanding! I couldn't have begun long ago. The concepts are nothing new because looking for more interactions."
    },
    {
      id: 2,
      name: "Henrieta Stan",
      title: "Courts Reporter",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      text: "This course was very interesting & I would absolutely love it! Certainly recommend for any teacher that is now trying to work with their students."
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Realities you really want to remember before start profession",
      date: "06/10/2023",
      author: "Philip Hall",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "20 facts you need to reconsider before you start career",
      date: "12/09/2023",
      author: "Martin Wolf",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Discover career that matches your skills & interests in job",
      date: "11/08/2023",
      author: "Alison Hyde",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learning skills<br />for a better career
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              LLB Class of 28 offers specialized courses to help you build the legal skills you need to know how to implement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 border border-gray-300 rounded-md w-full"
                />
                <button className="absolute right-0 top-0 h-full bg-gray-900 text-white px-4 rounded-r-md">
                  14 Days Trial
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">© 2023 Terms and Conditions apply</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/lovable-uploads/b9841bb1-c885-44ef-aa04-590ac9d0b73e.png"
                alt="Hero image"
                className="w-full max-w-md mx-auto"
              />
              <div className="absolute top-24 -left-4 bg-yellow-300 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-full">
                    <Check size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">99.24%</p>
                    <p className="text-xs">Our clients recommend</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-48 -right-4 bg-yellow-300 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-full">
                    <Check size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">99.24%</p>
                    <p className="text-xs">Satisfaction rate</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-gray-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
          <Link to="/resources" className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: course.id * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-44 object-cover" />
                <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                  {course.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 font-semibold mr-1">{course.rating}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-900 font-bold">{course.price}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">{course.originalPrice}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <span className="text-blue-600 font-bold">W</span>
              </div>
              <div>
                <h3 className="font-bold">World Best Instructors</h3>
                <p className="text-sm text-gray-600">4,000+ Instructors</p>
              </div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 flex items-center">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <span className="text-indigo-600 font-bold">L</span>
              </div>
              <div>
                <h3 className="font-bold">Live Class & Video Courses</h3>
                <p className="text-sm text-gray-600">460,000+ Courses</p>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <span className="text-orange-600 font-bold">O</span>
              </div>
              <div>
                <h3 className="font-bold">Over Active Students</h3>
                <p className="text-sm text-gray-600">500,000+ Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className={`
              rounded-lg p-6 text-center relative cursor-pointer hover:opacity-90 transition-opacity
              ${index === 0 ? 'bg-purple-200' : ''}
              ${index === 1 ? 'bg-blue-200' : ''}
              ${index === 2 ? 'bg-red-200' : ''}
              ${index === 3 ? 'bg-yellow-200' : ''}
            `}>
              <h3 className="font-semibold">{category.name}</h3>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {category.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentors Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Meet Our Mentors</h2>
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: mentor.id * 0.1 }}
                className="bg-white rounded-lg p-4 text-center border border-gray-200"
              >
                <div className="mx-auto w-24 h-24 mb-4 overflow-hidden rounded-full">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{mentor.specialty}</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-gray-900 font-semibold">{mentor.rating}</span>
                  <Star size={14} className="text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-xs text-gray-500">({mentor.reviews})</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-2">
            <button className="bg-gray-900 text-white rounded-full p-1">
              <ChevronLeft size={20} />
            </button>
            <button className="bg-gray-900 text-white rounded-full p-1">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
              className="bg-yellow-100 rounded-lg p-6 relative"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className="text-yellow-400" 
                        fill={i < testimonial.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6 items-center gap-3">
          <button className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center">
            1
          </button>
          <span className="text-gray-500 text-sm">2 of 125</span>
          <button className="bg-gray-900 text-white rounded-full p-1">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Read Our Daily Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm">
            Read More
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to our Newsletter</h2>
              <p className="text-gray-600">Stay updated with the latest legal education resources</p>
            </div>
            <div className="mt-6 md:mt-0 flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 border border-gray-300 rounded-l-md w-full md:w-64"
              />
              <button className="bg-gray-900 text-white px-4 py-3 rounded-r-md whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold text-law-dark mb-4">LLB28</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 text-sm">+234 9734 5867</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm">llb28support@univibadan.com</span>
              </div>
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <svg width="20" height="20" fill="currentColor" className="text-gray-600" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <svg width="20" height="20" fill="currentColor" className="text-gray-600" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="sr-only">LinkedIn</span>
                  <svg width="20" height="20" fill="currentColor" className="text-gray-600" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Categories</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">All Resources</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Events</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Gallery</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Tools</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Members</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Alumni</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Mentors</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Security</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Comments</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Community</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
