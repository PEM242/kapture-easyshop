import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { StoreData } from "./components/store-creator/types";
import { supabase } from "@/integrations/supabase/client";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StoreFront from "./components/store/StoreFront";
import Dashboard from "./components/dashboard/Dashboard";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const [storeData, setStoreData] = useState<StoreData>({
    type: "",
    name: "",
    logo: "",
    cover: "",
    sector: "",
    address: "",
    city: "",
    contact: "",
    shipping_policy: "",
    refund_policy: "",
    country: "",
    theme: "",
    payment_methods: [],
    delivery_methods: [],
    products: [],
  });

  useEffect(() => {
    const savedStoreData = localStorage.getItem('storeData');
    if (savedStoreData) {
      const parsedData = JSON.parse(savedStoreData);
      setStoreData(parsedData);
    }
  }, []);

  const handleStoreDataUpdate = (newData: StoreData) => {
    setStoreData(newData);
    localStorage.setItem('storeData', JSON.stringify(newData));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Index storeData={storeData} setStoreData={handleStoreDataUpdate} />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/store/:storeName" 
                element={
                  storeData.name ? (
                    <StoreFront storeData={storeData} showDashboardButton={true} />
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
              <Route 
                path="/s/:storeName" 
                element={
                  storeData.name ? (
                    <StoreFront storeData={storeData} showDashboardButton={false} />
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    {storeData.name ? (
                      <Dashboard storeData={storeData} onUpdateStore={handleStoreDataUpdate} />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;