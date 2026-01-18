import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RSVPModal from "./RSVPModal";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const fullText = "the ai social klub";
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="absolute inset-0 scale-150">
          <iframe
            src="https://www.youtube.com/embed/S_3ZQM_vLQo?autoplay=1&mute=0&loop=1&playlist=S_3ZQM_vLQo&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=1"
            title="Background Video"
            className="w-full h-full pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200vw',
              height: '200vh',
              minWidth: '100%',
              minHeight: '100%',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* Dark tint overlay for text visibility */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.h1 
          className="hero-title text-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.h1>
        <motion.button
          onClick={() => setIsRSVPOpen(true)}
          className="btn-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          RSVP
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2.5, duration: 0.5 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-px h-16 bg-foreground/30" />
      </motion.div>

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </section>
  );
};

export default Hero;
