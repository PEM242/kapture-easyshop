import { useEffect, useState } from "react";
import { StoreData } from "../store-creator/StoreCreator";
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
import { ArrowLeft, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    // Mettre à jour les données du magasin si elles changent
    setStoreData(initialStoreData);
    
    // Vérifier si la boutique est publiée
    const publishStatus = localStorage.getItem('isStorePublished');
    if (publishStatus === 'true') {
      setIsPublished(true);
    }

    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleOpenCart);
    
    return () => {
      document.removeEventListener('openCart', handleOpenCart);
    };
  }, [initialStoreData]);

  const handlePublish = () => {
    setIsPublished(true);
    localStorage.setItem('isStorePublished', 'true');
    toast({
      title: "Boutique publiée !",
      description: "Votre boutique est maintenant en ligne. Vous pouvez la partager !",
    });
  };

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
      <div className="min-h-screen flex flex-col relative">
        {/* Afficher les boutons uniquement si la boutique n'est pas publiée */}
        {!isPublished && (
          <div className="fixed top-4 left-4 z-50 flex gap-4">
            <Button
              onClick={handlePublish}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Publier ma boutique
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="bg-white shadow-md hover:bg-gray-100"
            >
              Aller au tableau de bord
            </Button>
          </div>
        )}

        {/* Afficher le bouton de partage une fois publié */}
        {isPublished && (
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-white shadow-md hover:bg-gray-100"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        )}

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