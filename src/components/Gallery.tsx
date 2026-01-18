import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">visual stories</h2>
          <p className="text-muted-foreground text-lg">
            Coming Soon
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
