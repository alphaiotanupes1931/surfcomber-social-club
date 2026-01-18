import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import baltimoreImage from "@/assets/baltimore-skyline.jpg";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [displayText, setDisplayText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const fullText = "baltimore";

  useEffect(() => {
    if (!isInView || hasTyped) return;

    let currentIndex = 0;
    const typingInterval = window.setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
        return;
      }

      window.clearInterval(typingInterval);
      setHasTyped(true);
    }, 80);

    return () => window.clearInterval(typingInterval);
  }, [isInView, hasTyped]);

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Gallery */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <motion.img
                src={baltimoreImage}
                alt="The AI Social Klub Baltimore"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title mb-8">
              {displayText}
              {!hasTyped || displayText.length < fullText.length ? (
                <span className="animate-pulse">|</span>
              ) : null}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Located in the heart of Baltimore, The AI Social Klub offers an 
              exclusive sanctuary for gentlemen seeking premium experiences. 
              Our sophisticated venue features private lounges, gaming areas, 
              and open bars—all designed for those who appreciate the 
              finer things in life.
            </p>
            <Link 
              to="/upcoming"
              className="btn-outline inline-block"
            >
              See Recent Events
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
