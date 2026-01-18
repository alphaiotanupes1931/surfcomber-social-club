import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import cocktailsImage from "@/assets/cocktails.jpg";

const MenusPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cocktailsImage}
            alt="Social Club bar experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            className="hero-title text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            drink menu
          </motion.h1>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Coming Soon
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenusPage;
