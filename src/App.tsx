import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
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

const StoreRoute = ({ showDashboardButton = true }: { showDashboardButton?: boolean }) => {
  const { storeName } = useParams();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeName) return;
      
      const { data: store, error } = await supabase
        .from('stores')
        .select('*')
        .eq('name', decodeURIComponent(storeName))
        .single();

      if (error) {
        console.error('Error fetching store:', error);
        setLoading(false);
        return;
      }

      if (store) {
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .eq('store_id', store.id);

        setStoreData({
          type: store.type,
          name: store.name,
          logo: store.logo || "",
          cover: store.cover || "",
          sector: store.sector || "",
          address: store.address || "",
          city: store.city || "",
          contact: store.contact || "",
          shipping_policy: store.shipping_policy || "",
          refund_policy: store.refund_policy || "",
          country: store.country || "",
          theme: store.theme || "",
          payment_methods: store.payment_methods || [],
          delivery_methods: store.delivery_methods || [],
          products: products?.map(p => ({
            name: p.name,
            price: Number(p.price),
            description: p.description || "",
            images: {
              main: p.main_image || "",
              gallery: p.gallery_images || [],
            },
            category: p.category || "",
            customization: {
              sizes: p.sizes || [],
              colors: p.colors || [],
              shoesSizes: p.shoes_sizes || [],
              customSizes: p.custom_sizes || "",
              customColors: p.custom_colors || "",
            },
            discount: {
              type: p.discount_type as any || null,
              value: Number(p.discount_value) || 0,
              finalPrice: Number(p.final_price) || 0,
            },
            isActive: p.is_active,
            inStock: p.in_stock,
            featured: p.collection_name ? {
              collectionName: p.collection_name
            } : undefined,
          })) || [],
        });
      }
      setLoading(false);
    };

    fetchStore();
  }, [storeName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!storeData) {
    return <Navigate to="/" />;
  }

  return <StoreFront storeData={storeData} showDashboardButton={showDashboardButton} />;
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
      try {
        const parsedData = JSON.parse(savedStoreData);
        setStoreData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
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
                element={<StoreRoute showDashboardButton={true} />}
              />
              <Route 
                path="/s/:storeName" 
                element={<StoreRoute showDashboardButton={false} />}
              />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard storeData={storeData} onUpdateStore={handleStoreDataUpdate} />
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