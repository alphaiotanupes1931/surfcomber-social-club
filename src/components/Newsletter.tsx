import { useState, useRef } from "react";
import { Instagram, Facebook } from "lucide-react";
import { motion, useInView } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-6">stay connected</h2>
          <p className="text-muted-foreground mb-10">
            Receive exclusive updates about events, members-only gatherings, and special occasions.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-1 bg-transparent border border-foreground/30 px-6 py-4 
                         text-foreground placeholder:text-muted-foreground 
                         focus:outline-none focus:border-primary transition-colors"
            />
            <motion.button 
              type="submit" 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </form>

          <p className="text-xs text-muted-foreground mt-6">
            By subscribing you agree to our{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Instagram"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Facebook"
              whileHover={{ scale: 1.2, rotate: -5 }}
            >
              <Facebook size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
