import { useState, useMemo, useEffect } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Link } from "react-router-dom";
import { getActiveProducts } from "@/lib/adminData";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Shop = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  // Local state for smooth slider interaction
  const [localPriceRange, setLocalPriceRange] = useState([0, 500]);

  // Sync local state when the actual filter changes (e.g. clear filters)
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Get all active products
  const products = getActiveProducts();

  // Extract unique values for filters
  const collections = Array.from(new Set(products.map(p => p.collection)));
  const materials = Array.from(new Set(products.map(p => {
    // Simple extraction of main material from composition string
    if (p.composition.includes("Wool")) return "Wool";
    if (p.composition.includes("Cotton")) return "Cotton";
    if (p.composition.includes("Linen")) return "Linen";
    if (p.composition.includes("Silk")) return "Silk";

    // GUIDE: How to add more materials
    // 1. Copy the line above: if (p.composition.includes("YOUR_MATERIAL")) return "YOUR_MATERIAL";
    // 2. Change "YOUR_MATERIAL" to the name of the fabric (e.g., "Polyester", "Velvet")
    // 3. Save the file. The new filter option will appear automatically if any product has that material.

    return "Other";
  })));

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Collection filter
      if (selectedCollections.length > 0 && !selectedCollections.includes(product.collection)) {
        return false;
      }

      // Price filter
      const price = product.salePrice || product.price;
      if (price < priceRange[0]) return false;
      if (priceRange[1] < 500 && price > priceRange[1]) return false;

      // Material filter
      if (selectedMaterials.length > 0) {
        const material = materials.find(m => product.composition.includes(m)) || "Other";
        if (!selectedMaterials.includes(material)) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCollections, priceRange, selectedMaterials, materials]);

  const toggleCollection = (collection: string) => {
    setSelectedCollections(prev =>
      prev.includes(collection)
        ? prev.filter(c => c !== collection)
        : [...prev, collection]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setSelectedCollections([]);
    setPriceRange([0, 500]);
    setSelectedMaterials([]);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <motion.section 
          className="py-12 lg:py-16 border-b border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container">
            <motion.nav 
              className="text-sm text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Shop All</span>
            </motion.nav>
            <motion.h1 
              className="font-display text-4xl lg:text-5xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Shop All Fabrics
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-3 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Explore our complete collection of premium men's fabrics, from luxurious suiting wool to crisp shirting cotton.
            </motion.p>
          </div>
        </motion.section>

        {/* Products Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Desktop Filters */}
              {showFilters && (
                <div className="hidden lg:block w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
                  <ShopFilters
                    selectedCollections={selectedCollections}
                    collections={collections}
                    toggleCollection={toggleCollection}
                    selectedMaterials={selectedMaterials}
                    materials={materials}
                    toggleMaterial={toggleMaterial}
                    priceRange={priceRange}
                    localPriceRange={localPriceRange}
                    setLocalPriceRange={setLocalPriceRange}
                    setPriceRange={setPriceRange}
                    clearFilters={clearFilters}
                  />
                </div>
              )}

              {/* Mobile Filters Trigger & Results */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground ml-1">
                      {filteredProducts.length} results
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="hidden lg:flex gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Filter className="h-4 w-4" />
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                  </div>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="py-6">
                        <ShopFilters
                          selectedCollections={selectedCollections}
                          collections={collections}
                          toggleCollection={toggleCollection}
                          selectedMaterials={selectedMaterials}
                          materials={materials}
                          toggleMaterial={toggleMaterial}
                          priceRange={priceRange}
                          localPriceRange={localPriceRange}
                          setLocalPriceRange={setLocalPriceRange}
                          setPriceRange={setPriceRange}
                          clearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      index={index}
                      product={{
                        ...product,
                        category: product.collection,
                        image: product.image
                      }}
                    />
                  ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20 border rounded-lg bg-muted/20">
                    <p className="text-lg text-muted-foreground mb-4">No fabrics match your filters.</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
