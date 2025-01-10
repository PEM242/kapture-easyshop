import { useEffect, useState } from "react";
import { StoreData } from "../store-creator/types";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import ProductGrid from "./ProductGrid";
import MobileNav from "./MobileNav";
import { CartProvider } from "@/contexts/CartContext";
import CartModal from "./cart/CartModal";
import StoreCover from "./sections/StoreCover";
import FeaturedProducts from "./sections/FeaturedProducts";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData: initialStoreData }: StoreFrontProps) => {
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStoreData = localStorage.getItem('storeData');
    if (savedStoreData) {
      setStoreData(JSON.parse(savedStoreData));
    }

    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleOpenCart);
    
    return () => {
      document.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  if (!storeData.type || !storeData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col relative">
        {/* Bouton de retour au tableau de bord - Toujours visible en haut */}
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="bg-white shadow-md hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tableau de bord
          </Button>
        </div>

        <StoreHeader 
          storeData={storeData} 
          themeClasses={getThemeClasses('header')}
          onCartClick={() => setIsCartOpen(true)}
        />
        <MobileNav />

        <main className="flex-grow bg-white">
          <StoreCover 
            storeData={storeData}
            themeFont={getThemeFont()}
          />

          <FeaturedProducts 
            products={storeData.products}
            themeClasses={getThemeClasses('text')}
            storeType={storeData.type}
          />

          <section className="container mx-auto py-6 px-4">
            <h2 className={`text-xl md:text-2xl font-semibold mb-6 text-center ${getThemeClasses('text')}`}>
              {storeData.type === "restaurant" ? "Notre Menu" : "Nos Produits"}
            </h2>
            <ProductGrid 
              storeData={storeData} 
              buttonThemeClass={getThemeClasses('button')} 
            />
          </section>
        </main>

        <StoreFooter 
          storeData={storeData} 
          themeClasses={getThemeClasses('footer')} 
        />

        <CartModal
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          storeData={storeData}
        />
      </div>
    </CartProvider>
  );
};

export default StoreFront;