import { Scissors, Truck, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Sourced from the finest textile mills in Punjab.",
  },
  {
    icon: Scissors,
    title: "Expert Craftsmanship",
    description: "Each fabric is carefully inspected and prepared for tailoring perfection.",
  },
  {
    icon: Truck,
    title: "Pakistan Wide Shipping",
    description: "Delivered with care to your doorstep.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description: "Providing quality fabric with comfort is our guarantee.",
  },
];

const QualitySection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
            Why Choose MGS Fabrics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the finest fabrics and exceptional service for discerning gentlemen.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 min-w-0"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent mb-5"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: index * 0.2 // stagger the float slightly
                }}
              >
                <feature.icon className="w-6 h-6 text-foreground" />
              </motion.div>
              <h3 className="font-display text-xl font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QualitySection;
