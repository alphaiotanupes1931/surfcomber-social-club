import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const fullText = "the ai social klub";
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Multi-layer parallax for depth
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Ensure video plays muted first (browser requirement)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
            }}
          >
            <source 
              src="https://res.cloudinary.com/ddfe8uqth/video/upload/videoplayback_edyrjz.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>
        {/* Dark tint overlay with parallax opacity */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </motion.div>

      {/* Mute/Unmute Button */}
      <motion.button
        onClick={toggleMute}
        className="absolute bottom-24 right-6 z-30 w-12 h-12 bg-background/30 backdrop-blur-sm 
                   flex items-center justify-center hover:bg-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h1 
          className="hero-title text-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayText}
          {showCursor && <span className="animate-pulse">|</span>}
        </motion.h1>
        <motion.button
          onClick={() => navigate('/upcoming')}
          className="btn-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
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
          opacity: { delay: 3, duration: 0.5 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-px h-16 bg-foreground/30" />
      </motion.div>
    </section>
  );
};

export default Hero;
