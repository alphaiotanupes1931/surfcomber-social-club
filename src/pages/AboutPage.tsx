import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import restaurantImage from "@/assets/restaurant-interior.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurantImage}
            alt="The Social Club interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="hero-title text-foreground">about us</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p className="text-xl lg:text-2xl font-serif text-foreground">
              At The Social Club, food, drink, and people come together in a 
              relaxed yet refined setting, making every visit unforgettable.
            </p>
            
            <p>
              Nestled in the heart of South Beach, The Social Club offers a fresh, 
              ingredient-driven take on French Mediterranean cuisine, blending bold 
              coastal flavors with a modern, lighter approach. Our menu is designed 
              for sharing, featuring vibrant small plates like Mezzo Board and Tuna 
              Tartar. Signature entrées highlight the best of land and sea, from 
              Snapper en Papillote to Filet Mignon with truffled bistro fries.
            </p>

            <p>
              By day, our renowned brunch delivers indulgent favorites with a creative 
              twist such as 7 Seas Benedict with lobster and mango hollandaise or our 
              Spanish Toast, featuring sweet mascarpone custard and a citrus cinnamon 
              syrup. Pair your meal with bottomless cocktails, and let the vibrant 
              energy of Miami Beach complete the experience.
            </p>

            <div className="pt-8 border-t border-border mt-12">
              <h2 className="section-title mb-6">Executive Chef</h2>
              <p className="text-foreground font-serif text-xl mb-4">Gastón Sanchez</p>
              <p>
                Chef Sanchez brings over 15 years of culinary expertise to The Social Club, 
                having trained in kitchens across France, Spain, and South America. His 
                innovative approach to French Mediterranean cuisine celebrates the freshest 
                seasonal ingredients while honoring classical techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
