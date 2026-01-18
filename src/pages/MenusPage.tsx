import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import cocktailsImage from "@/assets/cocktails.jpg";
import { supabase } from "@/integrations/supabase/client";

interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: boolean;
}

const MenusPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchDrinks = async () => {
      const { data, error } = await supabase
        .from("drink_menu")
        .select("*")
        .eq("is_available", true)
        .order("display_order", { ascending: true });
      
      if (!error && data) {
        setDrinks(data);
      }
      setLoading(false);
    };
    fetchDrinks();
  }, []);

  const categories = ["all", ...new Set(drinks.map(d => d.category))];
  const filteredDrinks = activeCategory === "all" 
    ? drinks 
    : drinks.filter(d => d.category === activeCategory);

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

      {/* Menu Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : drinks.length > 0 ? (
            <>
              {/* Category Filter */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${
                      activeCategory === category 
                        ? "bg-primary text-white" 
                        : "border border-foreground/30 hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Drinks List */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {filteredDrinks.map((drink, index) => (
                  <motion.div
                    key={drink.id}
                    className="flex justify-between items-start border-b border-border pb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground mb-1">{drink.name}</h3>
                      {drink.description && (
                        <p className="text-muted-foreground text-sm">{drink.description}</p>
                      )}
                    </div>
                    <span className="text-primary font-serif text-lg ml-4">
                      ${drink.price?.toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.p 
              className="text-muted-foreground text-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Coming Soon
            </motion.p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenusPage;
