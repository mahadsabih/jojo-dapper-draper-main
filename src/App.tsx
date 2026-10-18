import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetail from "./pages/ProductDetail";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import DynamicPage from "./pages/DynamicPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminCollections from "./pages/admin/AdminCollections";
import AdminCollectionEdit from "./pages/admin/AdminCollectionEdit";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminContent from "./pages/admin/AdminContent";
import AdminContentEdit from "./pages/admin/AdminContentEdit";
import AdminSettings from "./pages/admin/AdminSettings";
import { PageLoader } from "./components/ui/PageLoader";
import { syncWithServer, saveToServer } from "@/lib/adminData";
import { useEffect } from "react";

const queryClient = new QueryClient();

function AppWithSync() {
  useEffect(() => {
    syncWithServer();

    const handleBeforeUnload = () => {
      saveToServer();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageLoader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:collectionId" element={<CollectionDetail />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/new" element={<NewArrivals />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />

              {/* Dynamic Content Routes - Catch all for content pages */}
              <Route path="/:slug" element={<DynamicPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/:id" element={<AdminProductEdit />} />
              <Route path="/admin/collections" element={<AdminCollections />} />
              <Route path="/admin/collections/:id" element={<AdminCollectionEdit />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/admin/content/:id" element={<AdminContentEdit />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default AppWithSync;
