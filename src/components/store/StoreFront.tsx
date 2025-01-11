import { StoreData } from "../store-creator/types";
import StoreCover from "./sections/StoreCover";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import FeaturedProducts from "./sections/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import ProductGrid from "./product-grid/ProductGrid";
import { useState, useEffect } from "react";
import CartModal from "./cart/CartModal";
import { useStoreReset } from "@/hooks/useStoreReset";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const navigate = useNavigate();
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useStoreReset(storeData);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleOpenCart);
    
    // Increment store views
    document.dispatchEvent(new CustomEvent('storeView'));

    return () => {
      document.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader 
        storeData={storeData}
      />
      <main>
        <StoreCover 
          storeData={storeData}
          themeFont={getThemeFont()}
        />
        <FeaturedProducts 
          products={storeData.products || []}
        />
        <div className="container mx-auto px-4 py-8">
          <ProductGrid 
            storeData={storeData}
            buttonThemeClass={getThemeClasses('button')}
          />
        </div>
      </main>
      <StoreFooter 
        storeData={storeData}
      />

      <Button
        onClick={() => navigate('/dashboard')}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg"
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Tableau de bord
      </Button>

      <CartModal 
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        storeData={storeData}
      />
    </div>
  );
};

export default StoreFront;