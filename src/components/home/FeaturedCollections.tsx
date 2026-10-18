import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

interface FeaturedCollectionsProps {
  collections: Collection[];
}

const FeaturedCollections = ({ collections }: FeaturedCollectionsProps) => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
            Shop by Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections, each designed for a specific purpose and crafted with exceptional attention to detail.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Link
                to={collection.href}
                className="group relative block aspect-[3/4] overflow-hidden bg-muted rounded-[15px]"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="font-display text-2xl lg:text-3xl text-primary-foreground font-medium mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {collection.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
