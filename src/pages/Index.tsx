import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DiscoverSection from "@/components/DiscoverSection";
import LocationSection from "@/components/LocationSection";
import Newsletter from "@/components/Newsletter";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <DiscoverSection />
      <LocationSection />
      <Newsletter />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
