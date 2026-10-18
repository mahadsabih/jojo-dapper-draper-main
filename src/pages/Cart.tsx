import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

const Cart = () => {
  const { cartWithProducts, cartTotal, updateCartItem, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Page Header */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Cart</span>
            </nav>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold">Shopping Cart</h1>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12 lg:py-16">
          <div className="container">
            {cartWithProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Looks like you haven't added any fabrics yet. Explore our collections to find the perfect materials for your next project.
                </p>
                <Link to="/shop">
                  <Button className="px-8 h-12">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <motion.div 
                  className="lg:col-span-2 space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {cartWithProducts.map((item) => {
                      const price = item.product.salePrice || item.product.price;
                      return (
                        <motion.div 
                          key={item.productId} 
                          className="flex gap-4 lg:gap-6 pb-6 border-b border-border"
                          variants={itemVariants}
                          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                        >
                        {/* Product Image */}
                        <Link to={`/product/${item.productId}`} className="shrink-0">
                          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-muted overflow-hidden">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4">
                            <div>
                              <Link 
                                to={`/product/${item.productId}`}
                                className="font-medium hover:opacity-70 transition-opacity"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.product.collection}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-4 py-2 text-sm font-medium">{item.quantity}m</span>
                              <button
                                onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-medium">Rs.${(price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                Rs.${price}/m
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  </AnimatePresence>
                </motion.div>

                {/* Order Summary */}
                <div>
                  <div className="bg-muted/50 p-6 lg:p-8">
                    <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rs.${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Rs.${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full h-12">
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Cart;
