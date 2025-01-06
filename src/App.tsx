import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StoreFront from "./components/store/StoreFront";
import { useState, useEffect } from "react";
import { StoreData } from "./components/store-creator/StoreCreator";

const queryClient = new QueryClient();

const App = () => {
  const [storeData, setStoreData] = useState<StoreData>({
    type: "",
    name: "",
    logo: "",
    cover: "",
    sector: "",
    address: "",
    contact: "",
    shippingPolicy: "",
    refundPolicy: "",
    country: "",
    theme: "",
    paymentMethods: [],
    deliveryMethods: [],
    products: [],
  });

  useEffect(() => {
    const savedStoreData = localStorage.getItem('storeData');
    if (savedStoreData) {
      setStoreData(JSON.parse(savedStoreData));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index storeData={storeData} setStoreData={setStoreData} />} />
            <Route path="/store" element={<StoreFront storeData={storeData} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;