import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    if (isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 1500); // 1.5s for initial visit
      return () => clearTimeout(timer);
    }
    // No artificial loader on subsequent route navigations
  }, [location.pathname, isInitialLoad]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">
            <motion.h1
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl md:text-5xl font-display font-medium tracking-widest uppercase mb-8 text-foreground"
            >
              MGS Fabrics
            </motion.h1>
            <motion.div className="w-48 h-[1px] bg-border overflow-hidden relative">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-foreground h-full"
                initial={{ width: "0%", x: "-100%" }}
                animate={{ width: "100%", x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
