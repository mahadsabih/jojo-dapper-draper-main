import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden mb-4">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-[15px]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-2.5 py-1 z-10">
              New
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-3 left-3 bg-gold text-foreground text-xs font-medium px-2.5 py-1 z-10">
              Sale
            </span>
          )}
          
          {/* Quick Action Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
             <Button variant="default" className="w-full shadow-lg gap-2" onClick={(e) => {
               e.preventDefault();
               // Here we would normally add to cart
               console.log("Add to cart", product.id);
             }}>
               <ShoppingBag className="w-4 h-4" /> Quick Add
             </Button>
          </div>
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
      <div>
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-medium mb-1.5 group-hover:text-muted-foreground transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.isSale && product.salePrice ? (
              <>
                <span className="text-sm font-medium">Rs.${product.salePrice}</span>
                <span className="text-sm text-muted-foreground line-through">
                  Rs.${product.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium">Rs.${product.price}</span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
