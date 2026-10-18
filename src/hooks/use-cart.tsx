import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  getCart,
  addToCart as addToCartFn,
  updateCartItem as updateCartItemFn,
  removeFromCart as removeFromCartFn,
  clearCart as clearCartFn,
  getCartWithProducts,
  getCartTotal,
  getCartItemCount,
  CartItem,
  Product,
} from "@/lib/adminData";

interface CartContextType {
  cart: CartItem[];
  cartWithProducts: Array<CartItem & { product: Product }>;
  cartTotal: number;
  cartItemCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartWithProducts, setCartWithProducts] = useState<Array<CartItem & { product: Product }>>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  const refreshCart = () => {
    setCart(getCart());
    setCartWithProducts(getCartWithProducts());
    setCartTotal(getCartTotal());
    setCartItemCount(getCartItemCount());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = (productId: string, quantity: number = 1) => {
    addToCartFn(productId, quantity);
    refreshCart();
  };

  const updateCartItem = (productId: string, quantity: number) => {
    updateCartItemFn(productId, quantity);
    refreshCart();
  };

  const removeFromCart = (productId: string) => {
    removeFromCartFn(productId);
    refreshCart();
  };

  const clearCart = () => {
    clearCartFn();
    refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartWithProducts,
        cartTotal,
        cartItemCount,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
