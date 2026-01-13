import heroImage from "@/assets/hero-dish.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gourmet French Mediterranean cuisine"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="hero-title text-foreground mb-8 animate-fade-in">
          the social club
        </h1>
        <a
          href="#reserve"
          className="btn-primary animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Make Reservation
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-foreground/30" />
      </div>
    </section>
  );
};

export default Hero;
