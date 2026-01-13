import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import cocktailsImage from "@/assets/cocktails.jpg";

const menuItems = {
  starters: [
    { name: "Mezzo Board", description: "Selection of Mediterranean dips, olives, and artisan breads", price: "24" },
    { name: "Tuna Tartar", description: "Fresh tuna, avocado, sesame, citrus ponzu", price: "22" },
    { name: "Burrata", description: "Creamy burrata, heirloom tomatoes, basil oil", price: "19" },
    { name: "Grilled Octopus", description: "Tender octopus, chickpea purée, chorizo crumble", price: "26" },
  ],
  mains: [
    { name: "Snapper en Papillote", description: "Fresh snapper, seasonal vegetables, herb butter", price: "42" },
    { name: "Filet Mignon", description: "8oz prime beef, truffled bistro fries, red wine jus", price: "58" },
    { name: "Rack of Lamb", description: "Herb-crusted lamb, roasted vegetables, mint gremolata", price: "52" },
    { name: "Lobster Risotto", description: "Maine lobster, saffron risotto, parmesan foam", price: "48" },
  ],
  brunch: [
    { name: "7 Seas Benedict", description: "Lobster, poached eggs, mango hollandaise", price: "28" },
    { name: "Spanish Toast", description: "Mascarpone custard, citrus cinnamon syrup", price: "22" },
    { name: "Avocado Toast", description: "Sourdough, smashed avocado, poached eggs, dukkah", price: "18" },
    { name: "Steak & Eggs", description: "6oz filet, sunny side eggs, truffle hash", price: "36" },
  ],
};

const MenusPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cocktailsImage}
            alt="Social Club dining experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="hero-title text-foreground">our menus</h1>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Starters */}
          <div className="mb-20">
            <h2 className="section-title text-center mb-12">starters</h2>
            <div className="space-y-8">
              {menuItems.starters.map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b border-border pb-6">
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <span className="text-primary font-serif text-xl">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mains */}
          <div className="mb-20">
            <h2 className="section-title text-center mb-12">mains</h2>
            <div className="space-y-8">
              {menuItems.mains.map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b border-border pb-6">
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <span className="text-primary font-serif text-xl">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brunch */}
          <div>
            <h2 className="section-title text-center mb-12">brunch</h2>
            <div className="space-y-8">
              {menuItems.brunch.map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b border-border pb-6">
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <span className="text-primary font-serif text-xl">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenusPage;
