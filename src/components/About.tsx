import restaurantImage from "@/assets/restaurant-interior.jpg";

const About = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="section-title mb-8">
              Get Social in South Beach
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Nestled in the heart of South Beach, The Social Club offers a fresh, 
                ingredient-driven take on French Mediterranean cuisine, blending bold 
                coastal flavors with a modern, lighter approach.
              </p>
              <p>
                Our menu is designed for sharing, featuring vibrant small plates like 
                Mezzo Board and Tuna Tartar. Signature entrées highlight the best of 
                land and sea, from Snapper en Papillote to Filet Mignon with truffled 
                bistro fries.
              </p>
              <p>
                By day, our renowned brunch delivers indulgent favorites with a creative 
                twist—pair your meal with bottomless cocktails, and let the vibrant 
                energy of Miami Beach complete the experience.
              </p>
            </div>
            <a href="/about" className="btn-outline inline-block mt-10">
              Learn More
            </a>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={restaurantImage}
                alt="The Social Club restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
