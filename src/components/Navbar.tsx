import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Menus", href: "/menus" },
  { name: "Private Dining", href: "/private-dining" },
  { name: "Special Events", href: "/events" },
  { name: "Hours & Location", href: "/location" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
              <span className="font-serif text-primary text-lg">SC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Reserve Button */}
          <div className="hidden lg:block">
            <a
              href="#reserve"
              className="btn-primary inline-block"
            >
              Reserve
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="font-serif text-primary text-lg">SC</span>
              </div>
            </Link>
            <button
              className="text-foreground"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-2xl font-serif tracking-wide hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#reserve"
              className="btn-primary inline-block text-center mt-6"
              onClick={() => setIsOpen(false)}
            >
              Reserve
            </a>
          </div>

          <div className="absolute bottom-12 left-6 flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
