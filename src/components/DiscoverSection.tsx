import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeatureCard from "./FeatureCard";
import cuisineImage from "@/assets/cocktails.jpg";
import eventsImage from "@/assets/terrace.jpg";
import spacesImage from "@/assets/private-dining.jpg";

const features = [
  {
    image: cuisineImage,
    category: "Cuisine",
    title: "try our new seasonal menu",
    description:
      "Executive Chef Gastón Sanchez adds a creative twist to each dish, while our beverage program offers handcrafted cocktails, microbrews, and curated wines.",
    link: "/menus",
    linkText: "View",
  },
  {
    image: eventsImage,
    category: "Events",
    title: "signature social gatherings",
    description:
      "Industry Night, Happy Hours, Bottomless Cocktails, and more. Exclusive experiences you won't find elsewhere.",
    link: "/events",
    linkText: "Explore",
  },
  {
    image: spacesImage,
    category: "Spaces",
    title: "intimate private celebrations",
    description:
      "Three distinct venues accommodate 10 to 30 guests. Custom menus and personalized service for unforgettable occasions.",
    link: "/private-dining",
    linkText: "Discover",
  },
];

const DiscoverSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-16">discover excellence</h2>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center 
                         hover:bg-foreground hover:text-background transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center 
                         hover:bg-foreground hover:text-background transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
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
