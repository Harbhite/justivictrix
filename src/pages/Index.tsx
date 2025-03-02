
import { motion } from "framer-motion";
import { ArrowRight, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Stats data
  const stats = [
    { value: "120+", label: "Class Members" },
    { value: "5", label: "Years of Study" },
    { value: "15+", label: "Distinguished Alumni" },
    { value: "10+", label: "Academic Awards" },
  ];

  // Popular courses data
  const courses = [
    {
      id: 1,
      title: "Nigerian Constitutional Law",
      instructor: "Prof. Ayo Adebowale",
      rating: 4.8,
      reviews: 87,
      originalPrice: "₦15,000",
      price: "₦12,500",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=300&auto=format&fit=crop",
      tag: "REQUIRED"
    },
    {
      id: 2,
      title: "Criminal Justice System",
      instructor: "Dr. Ngozi Okoye",
      rating: 4.7,
      reviews: 64,
      originalPrice: "₦12,000",
      price: "₦10,000",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=300&auto=format&fit=crop",
      tag: "ELECTIVE"
    },
    {
      id: 3,
      title: "Law of Evidence & Procedure",
      instructor: "Dr. Benjamin Akande",
      rating: 4.9,
      reviews: 92,
      originalPrice: "₦13,500",
      price: "₦11,800",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=300&auto=format&fit=crop",
      tag: "REQUIRED"
    },
    {
      id: 4,
      title: "Commercial Law Practice",
      instructor: "Barrister Fatima Ibrahim",
      rating: 4.6,
      reviews: 75,
      originalPrice: "₦14,500",
      price: "₦12,900",
      image: "https://images.unsplash.com/photo-1505664063603-28e48c8ad148?q=80&w=300&auto=format&fit=crop",
      tag: "ELECTIVE"
    }
  ];

  // Categories data
  const categories = [
    { name: "Constitutional Law", count: 12 },
    { name: "Criminal Law", count: 8 },
    { name: "Civil Procedure", count: 7 },
    { name: "Corporate Law", count: 5 }
  ];

  // Mentors data
  const mentors = [
    {
      id: 1,
      name: "Prof. Oluwole Akintoye",
      specialty: "Constitutional Law",
      rating: 5.0,
      reviews: "134",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Amina Bello",
      specialty: "Commercial Law",
      rating: 4.9,
      reviews: "112",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Chief Tunde Bakare, SAN",
      specialty: "Litigation Practice",
      rating: 4.9,
      reviews: "128",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Barrister Emeka Okafor",
      specialty: "Criminal Law",
      rating: 5.0,
      reviews: "142",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Damilola Adeleke",
      title: "LLB '23 Graduate",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      text: "My experience in the LLB Class of 28 has been exceptional. The rigorous academic environment and supportive faculty have prepared me well for my career in law."
    },
    {
      id: 2,
      name: "Chioma Nwosu",
      title: "Class Representative",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      text: "The collaborative atmosphere within our class has fostered deep learning and lasting professional relationships. The moot court competitions were particularly valuable."
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Changes to the Nigerian Bar Association Examination Format",
      date: "15/06/2023",
      author: "Prof. Oluwadare Agbede",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The Impact of Recent Supreme Court Decisions on Administrative Law",
      date: "23/05/2023",
      author: "Dr. Joy Okeke",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Preparing for Your First Internship at a Law Firm: Essential Tips",
      date: "07/04/2023",
      author: "Barrister Olusegun Ajayi",
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
              LLB Class of 28<br />University of Ibadan
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Welcome to the official platform of the Faculty of Law, Class of 2028. Access class resources, events, and connect with your fellow law students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex">
                <input 
                  type="email" 
                  placeholder="Enter your email for updates" 
                  className="px-4 py-3 border border-gray-300 rounded-md w-full"
                />
                <button className="absolute right-0 top-0 h-full bg-gray-900 text-white px-4 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">© 2023 Faculty of Law, University of Ibadan</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
                alt="Law students"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <div className="absolute top-24 -left-4 bg-yellow-300 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-full">
                    <Check size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">98.5%</p>
                    <p className="text-xs">Bar passage rate</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-48 -right-4 bg-yellow-300 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-full">
                    <Check size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Top 5</p>
                    <p className="text-xs">Law faculty in Nigeria</p>
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

      {/* Course Materials Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Course Materials</h2>
          <Link to="/resources" className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm">
            View All Resources
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

      {/* Department Features */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <span className="text-blue-600 font-bold">M</span>
              </div>
              <div>
                <h3 className="font-bold">Moot Court Sessions</h3>
                <p className="text-sm text-gray-600">Practical advocacy skills</p>
              </div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 flex items-center">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <span className="text-indigo-600 font-bold">L</span>
              </div>
              <div>
                <h3 className="font-bold">Law Clinics</h3>
                <p className="text-sm text-gray-600">Pro bono legal services</p>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <span className="text-orange-600 font-bold">I</span>
              </div>
              <div>
                <h3 className="font-bold">International Law Society</h3>
                <p className="text-sm text-gray-600">Global legal perspective</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Major Areas of Study</h2>
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

      {/* Faculty Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Our Distinguished Faculty</h2>
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
                <p className="text-xs text-gray-500">({mentor.reviews} student reviews)</p>
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
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Student Testimonials</h2>
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
          <span className="text-gray-500 text-sm">2 of 8</span>
          <button className="bg-gray-900 text-white rounded-full p-1">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Law School Insights</h2>
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
          <Link to="/blog" className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm">
            Read More Articles
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Class Updates</h2>
              <p className="text-gray-600">Stay updated with class announcements, event schedules, and resources</p>
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
                <span className="text-gray-600 text-sm">+234 801 234 5678</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm">llbclass28@ui.edu.ng</span>
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
                  <span className="sr-only">Instagram</span>
                  <svg width="20" height="20" fill="currentColor" className="text-gray-600" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/resources" className="text-gray-600 hover:text-gray-900 text-sm">Course Resources</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 hover:text-gray-900 text-sm">Class Events</Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-600 hover:text-gray-900 text-sm">Photo Gallery</Link>
                </li>
                <li>
                  <Link to="/timetable" className="text-gray-600 hover:text-gray-900 text-sm">Class Timetable</Link>
                </li>
                <li>
                  <Link to="/tools" className="text-gray-600 hover:text-gray-900 text-sm">Study Tools</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">Class History</Link>
                </li>
                <li>
                  <Link to="/people" className="text-gray-600 hover:text-gray-900 text-sm">Class Members</Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Faculty Profile</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Class Executives</a>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Class Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-sm mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact Class Reps</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Feedback Form</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Technical Support</a>
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

