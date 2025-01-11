import { StoreData } from "../store-creator/types";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LayoutDashboard } from "lucide-react";
import CartModal from "./cart/CartModal";
import MobileNav from "./MobileNav";
import ProductGrid from "./product-grid/ProductGrid";
import { useNavigate } from "react-router-dom";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront: React.FC<StoreFrontProps> = ({ storeData }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Clear orders when entering a new store
  useEffect(() => {
    if (storeData.name) {
      localStorage.removeItem('orders');
      localStorage.removeItem('storeStats');
      // Trigger store view event
      document.dispatchEvent(new CustomEvent('storeView'));
    }
  }, [storeData.name]);

  const getButtonThemeClass = () => {
    switch (storeData.theme) {
      case 'theme1':
        return 'bg-theme1-button text-white hover:bg-theme1-buttonHover';
      case 'theme2':
        return 'bg-theme2-button text-white hover:bg-theme2-buttonHover';
      case 'theme3':
        return 'bg-theme3-button text-white hover:bg-theme3-buttonHover';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  React.useEffect(() => {
    const handleCartOpen = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleCartOpen);
    return () => document.removeEventListener('openCart', handleCartOpen);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
          <div className="flex items-center gap-4">
            {storeData.logo && (
              <img 
                src={storeData.logo} 
                alt={`${storeData.name} logo`} 
                className="h-12 w-auto object-contain"
              />
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <MobileNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{storeData.sector}</h2>
          <p className="text-gray-600">{storeData.address}</p>
        </div>
        
        <ProductGrid 
          storeData={storeData} 
          buttonThemeClass={getButtonThemeClass()} 
        />
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-sm text-gray-600">
            <p className="mb-2">Contact: {storeData.contact}</p>
            <p>Adresse: {storeData.address}</p>
          </div>
        </div>
      </footer>

      {/* Fixed Dashboard Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          variant="default"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 shadow-lg"
        >
          <LayoutDashboard className="h-5 w-5" />
          Tableau de bord
        </Button>
      </div>

      <CartModal 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        storeData={storeData}
      />
    </div>
  );
};

export default StoreFront;