import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { getActiveCollections } from "@/lib/adminData";

const Collections = () => {
  const collections = getActiveCollections();

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
              <span className="text-foreground">Collections</span>
            </nav>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold">Our Collections</h1>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Curated fabric collections for the discerning gentleman. Each collection represents the finest materials from the world's best mills.
            </p>
          </div>
        </section>

        {/* Collections List */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="space-y-16 lg:space-y-24">
              {collections.map((collection, index) => (
                <div 
                  key={collection.id}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <Link 
                    to={`/collections/${collection.slug}`}
                    className={`overflow-hidden group ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      {collection.productCount} Products
                    </span>
                    <h2 className="font-display text-3xl lg:text-4xl font-semibold mt-2 mb-4">
                      {collection.name}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    <Link
                      to={`/collections/${collection.slug}`}
                      className="inline-flex items-center text-foreground font-medium hover:opacity-70 transition-opacity"
                    >
                      Shop {collection.name}
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
