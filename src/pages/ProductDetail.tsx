import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getProduct } from "@/lib/adminData";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<"meters" | "suits">("meters");
  const [suitCutting, setSuitCutting] = useState<"4m" | "4.5m" | "5m">("4m");
  const [suitCount, setSuitCount] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const { addToCart } = useCart();

  const product = getProduct(productId || "");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-muted-foreground hover:text-foreground">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Use images array if available, fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[activeImageIndex];

  const displayPrice = product.salePrice || product.price;
  const suitMetersPerSuit = suitCutting === "4m" ? 4 : suitCutting === "4.5m" ? 4.5 : 5;
  const suitMeters = suitMetersPerSuit * suitCount;

  const handleAddToCart = () => {
    const qty = mode === "meters" ? quantity : suitMeters;
    addToCart(product.id, qty);
    const label = mode === "meters" ? `${qty} meter${qty > 1 ? "s" : ""}` : `${suitCount} suit(s) cut at ${suitCutting} each`;
    toast.success(`${label} of ${product.name} added to cart`);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="container py-8 lg:py-12">
          {/* Breadcrumb */}
          <motion.nav
            className="text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image Gallery */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Main Image with Zoom */}
              <div
                className="aspect-square overflow-hidden bg-muted relative group border border-border/50 cursor-crosshair"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPosition({ x, y });
                }}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-200",
                    isZoomed ? "scale-150 origin-center" : "scale-100"
                  )}
                  style={isZoomed ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : undefined}
                />

                {/* Navigation Arrows for Main Image (only if multiple) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={cn(
                        "w-20 h-20 flex-shrink-0 border-2 overflow-hidden",
                        activeImageIndex === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="lg:py-8"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={fadeUp} className="text-sm text-muted-foreground uppercase tracking-wider block">
                {product.collection}
              </motion.span>
              <motion.h1 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-semibold mt-2 mb-4">
                {product.name}
              </motion.h1>

              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-display">Rs.${displayPrice}</span>
                {product.salePrice && (
                  <span className="text-lg text-muted-foreground line-through">Rs.${product.price}</span>
                )}
                <span className="text-sm text-muted-foreground">per meter</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </motion.p>

              {/* Quantity Selector */}
              <motion.div variants={fadeUp} className="mb-6">
                {/* Mode Toggle */}
                <div className="flex items-center gap-2 border border-border rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setMode("meters")}
                    className={cn(
                      "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                      mode === "meters"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Meters
                  </button>
                  <button
                    onClick={() => setMode("suits")}
                    className={cn(
                      "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                      mode === "suits"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Suits
                  </button>
                </div>
  

                {mode === "meters" ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-6 py-3 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-muted-foreground">
                      Total: Rs.${(displayPrice * quantity).toFixed(2)}
                    </span>
                    
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* Cutting size selection */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">Cutting Size:</span>
                      {[4, 4.5, 5].map((meters) => (
                        <button
                          key={meters}
                          onClick={() =>
                            setSuitCutting(
                              meters === 4 ? "4m" : meters === 4.5 ? "4.5m" : "5m"
                            )
                          }
                          className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium border transition-all",
                            (suitCutting === "4m" && meters === 4) ||
                              (suitCutting === "4.5m" && meters === 4.5) ||
                              (suitCutting === "5m" && meters === 5)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-muted-foreground hover:bg-muted hover:border-primary"
                          )}
                        >
                          {meters}m
                        </button>
                      ))}
                    </div>

                    {/* Suit count counter */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-muted-foreground">Number of Suits:</label>
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => setSuitCount(Math.max(1, suitCount - 1))}
                          className="p-3 hover:bg-muted transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-6 py-3 font-medium">{suitCount}</span>
                        <button
                          onClick={() => setSuitCount(suitCount + 1)}
                          className="p-3 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-muted-foreground">
                        Total: Rs.${(displayPrice * suitMeters).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Add to Cart */}
              <motion.div variants={fadeUp}>
                <Button className="w-full h-12 text-base mb-8" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </motion.div>

              {/* Product Details */}
              <div className="border-t border-border pt-8 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Composition</span>
                    <p className="font-medium mt-1">{product.composition}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Width</span>
                    <p className="font-medium mt-1">{product.width}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight</span>
                    <p className="font-medium mt-1">{product.weight}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Origin</span>
                    <p className="font-medium mt-1">{product.origin}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
