import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="section-title mb-6">stay connected</h2>
          <p className="text-muted-foreground mb-10">
            Receive exclusive updates about chef events and seasonal offerings.
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
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
