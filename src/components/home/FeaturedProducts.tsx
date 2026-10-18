import ProductCard from "./ProductCard";

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

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const FeaturedProducts = ({ 
  products, 
  title = "Featured Fabrics",
  subtitle = "Handpicked selections from our latest arrivals"
}: FeaturedProductsProps) => {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
