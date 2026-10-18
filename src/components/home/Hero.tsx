import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import mgsFabricsSilver from "@/assets/mgs_fabrics_silver.png";

interface HeroProps {
  image: string;
}

const Hero = ({ image }: HeroProps) => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={image}
          alt="Premium men's fabric collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div 
          className="max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >

<motion.img
            src={mgsFabricsSilver}
            alt="MGS Fabrics Silver"
            className="w-40 h-40 md:w-56 md:h-50 object-contain mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          <motion.p 
            className="text-primary-foreground/90 text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            New Collection
          </motion.p>
          <motion.h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-medium leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Crafted for the Modern Gentleman
          </motion.h1>
          <motion.p 
            className="text-primary-foreground/80 text-lg mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Premium fabrics sourced from Pakistan's finest mills. 
            Elevate your wardrobe with timeless quality.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button asChild size="lg" variant="hero">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="heroOutline">
              <Link to="/collections">View Collections</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
