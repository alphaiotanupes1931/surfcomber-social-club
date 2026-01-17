import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "the ai social klub";

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
      {/* Background Video */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 scale-125">
          <iframe
            src="https://www.youtube.com/embed/S_3ZQM_vLQo?autoplay=1&mute=0&loop=1&playlist=S_3ZQM_vLQo&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            title="Background Video"
            className="w-full h-full pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '177.78vh',
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw',
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
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1 
          className="hero-title text-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.h1>
        <motion.a
          href="#reserve"
          className="btn-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          RSVP
        </motion.a>
      </div>

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
    </section>
  );
};

export default Hero;
