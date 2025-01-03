import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoreFront from "./components/store/StoreFront";
import { useState } from "react";
import { StoreData } from "./components/store-creator/StoreCreator";

const queryClient = new QueryClient();

const App = () => {
  const [storeData] = useState<StoreData>({
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store/:storeId" element={<StoreFront storeData={storeData} />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;