import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import FeatureCard from "./FeatureCard";
import drinksImage from "@/assets/drinks.jpg";
import entertainmentImage from "@/assets/entertainment.jpg";
import gamesImage from "@/assets/games.jpg";
import fellowshipImage from "@/assets/fellowship.jpg";

const features = [
  {
    image: drinksImage,
    category: "Drinks",
    title: "premium bar experience",
    description:
      "Handcrafted cocktails, top-shelf whiskey, and curated selections. Our bartenders craft the perfect drink for every occasion.",
    link: "/menus",
    linkText: "View Menu",
  },
  {
    image: entertainmentImage,
    category: "Entertainment",
    title: "live music & events",
    description:
      "From live DJs to special performances, we bring the energy. Every night is an experience you won't forget.",
    link: "/events",
    linkText: "See Events",
  },
  {
    image: gamesImage,
    category: "Games",
    title: "high-stakes excitement",
    description:
      "Poker nights, dice games, and friendly competition. Test your skills and enjoy the thrill of the game.",
    link: "/events",
    linkText: "Join Us",
  },
  {
    image: fellowshipImage,
    category: "Fellowship",
    title: "brotherhood connections",
    description:
      "Build lasting relationships with like-minded men. Network, celebrate, and grow together as brothers.",
    link: "/about",
    linkText: "Learn More",
  },
];

const DiscoverSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2 
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          experience brotherhood
        </motion.h2>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center 
                         hover:bg-foreground hover:text-background transition-colors"
              aria-label="Previous slide"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={next}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center 
                         hover:bg-foreground hover:text-background transition-colors"
              aria-label="Next slide"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
