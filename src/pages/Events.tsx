
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "Class Presentation",
      date: "March 15, 2024",
      time: "10:00 AM",
      location: "Law Theatre 1",
      description: "Group presentations on Constitutional Law"
    },
    {
      title: "Moot Court Session",
      date: "March 20, 2024",
      time: "2:00 PM",
      location: "Moot Court Room",
      description: "Practice session for upcoming competition"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-black text-law-dark border-4 border-black p-4 inline-block transform -rotate-1">
            Class Events
          </h1>
          <Link
            to="/tools"
            className="px-4 py-2 bg-purple-100 border-4 border-black hover:bg-purple-200 transition-colors"
          >
            View Timetable
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
              <div className="space-y-2 text-law-neutral">
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {event.location}
                </p>
              </div>
              <p className="mt-4 text-law-dark">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
