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
import PublishButton from "./sections/PublishButton";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData: initialStoreData }: StoreFrontProps) => {
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedStoreData = localStorage.getItem('storeData');
    if (savedStoreData) {
      setStoreData(JSON.parse(savedStoreData));
    }

    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleOpenCart);
    
    // Dispatch storeView event when the store is visited
    const event = new Event('storeView');
    document.dispatchEvent(event);
    
    return () => {
      document.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié !",
        description: "Le lien de votre boutique a été copié dans le presse-papier.",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };

  if (!storeData.type || !storeData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="bg-white shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-white shadow-md"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
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

        <PublishButton 
          isPublished={isPublished}
          onPublish={() => setIsPublished(true)}
          storeName={storeData.name}
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