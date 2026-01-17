import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import baltimoreImage from "@/assets/baltimore-skyline.jpg";
import drinksImage from "@/assets/drinks.jpg";
import fellowshipImage from "@/assets/fellowship.jpg";

const galleryImages = [baltimoreImage, drinksImage, fellowshipImage];

const LocationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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
                key={activeIndex}
                src={galleryImages[activeIndex]}
                alt="The AI Social Klub Baltimore"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <motion.button
                onClick={prev}
                className="w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center 
                           hover:bg-primary transition-colors"
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center 
                           hover:bg-primary transition-colors"
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title mb-8">baltimore</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Located in the heart of Baltimore, The AI Social Klub offers an 
              exclusive sanctuary for gentlemen seeking premium experiences. 
              Our sophisticated venue features private lounges, gaming areas, 
              and a world-class bar—all designed for those who appreciate the 
              finer things in life.
            </p>
            <motion.a 
              href="/location" 
              className="btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hours & Location
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
