import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import diceImage from "@/assets/dice-hero.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [displayText, setDisplayText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const fullText = "Get Social in Baltimore";

  useEffect(() => {
    if (isInView && !hasTyped) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      setHasTyped(true);
      return () => clearInterval(typingInterval);
    }
  }, [isInView, hasTyped]);

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title mb-8">
              {displayText}
              {!hasTyped || displayText.length < fullText.length ? (
                <span className="animate-pulse">|</span>
              ) : null}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to The AI Social Klub, Baltimore's premier destination for 
                brotherhood, networking, and unforgettable experiences. Where 
                ambitious men come together to build lasting connections.
              </p>
              <p>
                Our exclusive club offers a sophisticated atmosphere for professionals 
                and entrepreneurs to unwind, connect, and elevate. From open bars 
                to high-stakes games, every detail is crafted for the modern gentleman.
              </p>
              <p>
                Join a community that values excellence, loyalty, and the art of 
                celebration. Whether it's game night, live entertainment, or simply 
                enjoying good company—this is where legends are made.
              </p>
            </div>
            <motion.a 
              href="/about" 
              className="btn-outline inline-block mt-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                src={diceImage}
                alt="Dice in the air - The AI Social Klub"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
