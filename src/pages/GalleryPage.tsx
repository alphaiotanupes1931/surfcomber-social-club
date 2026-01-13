import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-dish.jpg";
import cocktailsImage from "@/assets/cocktails.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import terraceImage from "@/assets/terrace.jpg";
import privateDiningImage from "@/assets/private-dining.jpg";

const galleryImages = [
  { src: heroImage, alt: "Signature gourmet dish" },
  { src: cocktailsImage, alt: "Craft cocktails" },
  { src: interiorImage, alt: "Restaurant interior" },
  { src: terraceImage, alt: "Outdoor terrace" },
  { src: privateDiningImage, alt: "Private dining room" },
  { src: heroImage, alt: "Chef's special" },
  { src: cocktailsImage, alt: "Signature drinks" },
  { src: interiorImage, alt: "Dining atmosphere" },
];

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="hero-title text-foreground mb-6">visual stories</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our vibrant atmosphere and culinary artistry through 
            moments captured at The Social Club.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`overflow-hidden group cursor-pointer ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className={`${index === 0 ? "aspect-square" : "aspect-square"} overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;
