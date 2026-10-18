import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import QualitySection from "@/components/home/QualitySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getActiveCollections, getFeaturedProducts } from "@/lib/adminData";
import heroImage from "@/assets/hero-fabrics-1.jpeg";

const Index = () => {
  
  const collections = getActiveCollections().map((c) => ({
    id: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
    href: `/collections/${c.slug}`,
  }));

  const featuredProducts = getFeaturedProducts(4).map((p) => ({
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
        <Hero image={heroImage} />
        <FeaturedProducts products={featuredProducts} />
        <FeaturedCollections collections={collections} />
        {/* <FeaturedProducts products={featuredProducts} /> */}
        <QualitySection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
