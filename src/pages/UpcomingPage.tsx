import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import upcomingEventImage from "@/assets/upcoming-event.jpg";
import RSVPModal from "@/components/RSVPModal";

const UpcomingPage = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            className="hero-title text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            special events
          </motion.h1>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="section-title text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            next event
          </motion.h2>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden group">
              <img
                src={upcomingEventImage}
                alt="AI Game Night - January 18, 2026"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* RSVP Button */}
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsRSVPOpen(true)}
                className="btn-primary text-lg px-10 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RSVP NOW
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="section-title text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            past events
          </motion.h2>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg">Coming Soon</p>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default UpcomingPage;
