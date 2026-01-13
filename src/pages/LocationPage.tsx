import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import terraceImage from "@/assets/terrace.jpg";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={terraceImage}
            alt="The Social Club terrace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="hero-title text-foreground">hours & location</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Info Cards */}
            <div className="space-y-12">
              {/* Address */}
              <div className="flex gap-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Address</h3>
                  <p className="text-muted-foreground">
                    1717 Collins Avenue<br />
                    Miami Beach, FL 33139
                  </p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm tracking-wider uppercase mt-3 inline-block hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Hours</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p><span className="text-foreground">Brunch:</span> Sat-Sun 11am - 3pm</p>
                    <p><span className="text-foreground">Happy Hour:</span> Mon-Fri 4pm - 7pm</p>
                    <p><span className="text-foreground">Dinner:</span> Daily 5pm - 11pm</p>
                    <p><span className="text-foreground">Late Night:</span> Fri-Sat until 1am</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Reservations</h3>
                  <p className="text-muted-foreground mb-3">
                    For parties of 8 or more, please call us directly.
                  </p>
                  <a 
                    href="tel:+13055551717"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    (305) 555-1717
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-secondary aspect-square lg:aspect-auto flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">Interactive map</p>
                <a 
                  href="https://maps.google.com/?q=1717+Collins+Avenue+Miami+Beach+FL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline inline-block"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
