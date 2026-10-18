import { useParams } from "react-router-dom";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Link } from "react-router-dom";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/adminData";

const CollectionDetail = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const collection = getCollectionBySlug(collectionId || "");
  const products = getProductsByCollection(collectionId || "").map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    salePrice: p.salePrice,
    image: p.image,
    category: p.collection,
    isNew: p.isNew,
    isSale: p.isSale,
  }));

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl mb-4">Collection Not Found</h1>
            <Link to="/collections" className="text-muted-foreground hover:text-foreground">
              Back to Collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <nav className="text-sm text-white/80 mb-4">
                <Link to="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/collections" className="hover:text-white">Collections</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{collection.name}</span>
              </nav>
              <h1 className="font-display text-4xl lg:text-6xl font-semibold text-white">
                {collection.name}
              </h1>
              <p className="text-white/90 mt-4 max-w-xl text-lg">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">{products.length} products</p>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products in this collection yet.</p>
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

export default CollectionDetail;
