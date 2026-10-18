import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Link } from "react-router-dom";
import { getNewArrivals } from "@/lib/adminData";

const NewArrivals = () => {
  const newProducts = getNewArrivals().map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    salePrice: p.salePrice,
    image: p.image,
    category: p.collection,
    isNew: p.isNew,
    isSale: p.isSale,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">New Arrivals</span>
            </nav>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold">New Arrivals</h1>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Discover our latest fabric additions. Fresh from the world's finest mills, these new arrivals represent the cutting edge of textile craftsmanship.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">{newProducts.length} products</p>
            </div>
            {newProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No new arrivals at the moment.</p>
                <Link to="/shop" className="text-foreground hover:opacity-70 mt-4 inline-block">
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewArrivals;
