import { StoreData } from "../store-creator/types";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import StoreCover from "./sections/StoreCover";
import FeaturedProducts from "./sections/FeaturedProducts";
import { useStoreReset } from "@/hooks/useStoreReset";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import ProductGrid from "./product-grid/ProductGrid";
import { useState } from "react";
import CartModal from "./cart/CartModal";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const navigate = useNavigate();
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Utiliser le nouveau hook pour réinitialiser les données
  useStoreReset(storeData);

  // Event listener for opening cart
  document.addEventListener('openCart', () => setIsCartOpen(true));

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeData={storeData} />
      <main>
        <StoreCover 
          storeData={storeData} 
          themeFont={getThemeFont()} 
        />
        <FeaturedProducts 
          products={storeData.products}
          themeClasses={getThemeClasses('text')}
          storeType={storeData.type}
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
        themeClasses={getThemeClasses('footer')} 
      />
      
      <Button
        onClick={() => navigate("/dashboard")}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg"
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