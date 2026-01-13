import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dish.jpg";
import cocktailsImage from "@/assets/cocktails.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import terraceImage from "@/assets/terrace.jpg";

const galleryImages = [
  { src: heroImage, alt: "Gourmet dish at The Social Club" },
  { src: cocktailsImage, alt: "Craft cocktails" },
  { src: interiorImage, alt: "Restaurant interior" },
  { src: terraceImage, alt: "Outdoor terrace dining" },
];

const Gallery = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <h2 className="section-title mb-4">visual stories</h2>
            <p className="text-muted-foreground">
              Explore our vibrant atmosphere and culinary artistry.
            </p>
          </div>
          <Link
            to="/gallery"
            className="text-xs tracking-[0.2em] uppercase text-primary font-medium 
                       hover:text-foreground transition-colors mt-6 lg:mt-0 
                       inline-flex items-center gap-2"
          >
            View All
            <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 
                           group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
