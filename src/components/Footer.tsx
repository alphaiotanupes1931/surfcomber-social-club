import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import RSVPModal from "./RSVPModal";

const Footer = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Address */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <motion.img 
                src={logo} 
                alt="AI Social Klub Logo" 
                className="w-16 h-16 object-contain"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The AI Social Klub<br />
              Baltimore, MD
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/events" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Special Events
              </Link>
              <Link to="/menus" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Drink Menu
              </Link>
              <Link to="/gallery" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link to="/upcoming" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Upcoming
              </Link>
            </nav>
          </div>

          {/* RSVP */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Join Us
            </h4>
            <motion.button
              onClick={() => setIsRSVPOpen(true)}
              className="btn-primary inline-block text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RSVP
            </motion.button>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The AI Social Klub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </footer>
  );
};

export default Footer;
