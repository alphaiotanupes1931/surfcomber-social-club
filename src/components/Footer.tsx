import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Address */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="font-serif text-primary text-lg">SC</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              1717 Collins Avenue<br />
              Miami Beach, FL 33139
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/menus" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Menus
              </Link>
              <Link to="/private-dining" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Private Dining
              </Link>
              <Link to="/events" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Special Events
              </Link>
              <Link to="/gallery" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Gallery
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground/20 flex items-center justify-center 
                           hover:bg-primary hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground/20 flex items-center justify-center 
                           hover:bg-primary hover:border-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
            <a
              href="#reserve"
              className="btn-primary inline-block text-center"
            >
              Reserve
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Social Club. All rights reserved.
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
    </footer>
  );
};

export default Footer;
