import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import terraceImage from "@/assets/terrace.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import privateDiningImage from "@/assets/private-dining.jpg";

const galleryImages = [terraceImage, interiorImage, privateDiningImage];

const LocationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Gallery */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={galleryImages[activeIndex]}
                alt="The Social Club Miami Beach"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            
            {/* Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center 
                           hover:bg-primary transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center 
                           hover:bg-primary transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="section-title mb-8">miami beach</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Join us at 1717 Collins Avenue for brunch, happy hour, or unforgettable 
              dinner experiences. Our open-air terraces and art-filled spaces create 
              perfect backdrops for memorable moments in the heart of South Beach's 
              cultural scene.
            </p>
            <a href="/location" className="btn-outline inline-block">
              Hours & Location
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
