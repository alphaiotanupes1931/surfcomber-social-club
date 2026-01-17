import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FeatureCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard = ({
  image,
  category,
  title,
  description,
  link,
  linkText,
}: FeatureCardProps) => {
  return (
    <motion.div 
      className="card-feature relative h-[500px] lg:h-[600px] group"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7 }}
      />
      <div className="card-feature-overlay group-hover:from-background/95" />
      
      <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
        <span className="section-subtitle mb-3">{category}</span>
        <h3 className="font-serif text-2xl lg:text-3xl font-light mb-4 lowercase tracking-wide">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
          {description}
        </p>
        <Link
          to={link}
          className="text-xs tracking-[0.2em] uppercase text-primary font-medium 
                     hover:text-foreground transition-colors inline-flex items-center gap-2 group/link"
        >
          {linkText}
          <motion.span 
            className="text-lg"
            whileHover={{ x: 5 }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
