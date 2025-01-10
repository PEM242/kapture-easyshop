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

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData: initialStoreData }: StoreFrontProps) => {
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

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

  const getThemeClasses = (element: 'header' | 'footer' | 'button' | 'text' | 'background') => {
    if (!storeData.theme) return '';

    const themeStyles = {
      theme1: {
        header: 'bg-theme1-bg text-theme1-text font-helvetica h-16 md:h-20',
        footer: 'bg-white text-theme1-textAlt font-helvetica py-6 md:py-8',
        button: 'bg-theme1-button text-theme1-text border-2 border-theme1-buttonBorder hover:bg-theme1-buttonBorder hover:text-white transition-colors font-helvetica',
        text: 'text-theme1-text font-helvetica',
        background: 'bg-white',
      },
      theme2: {
        header: 'bg-theme2-bg text-theme2-text font-sans h-16 md:h-20',
        footer: 'bg-white text-theme2-textAlt font-serif py-6 md:py-8',
        button: 'bg-theme2-button text-white hover:bg-theme2-buttonHover transition-colors font-sans',
        text: 'text-theme2-text',
        background: 'bg-white',
      },
      theme3: {
        header: 'bg-theme3-bg text-theme3-text font-serif h-16 md:h-20',
        footer: 'bg-white text-theme3-textAlt font-serif py-6 md:py-8',
        button: 'bg-theme3-button text-white hover:bg-theme3-buttonHover transition-colors font-serif',
        text: 'text-theme3-text font-serif',
        background: 'bg-white',
      },
    };

    return themeStyles[storeData.theme as keyof typeof themeStyles]?.[element] || '';
  };

  const getThemeFont = () => {
    switch (storeData.theme) {
      case 'theme1':
        return 'font-helvetica';
      case 'theme2':
        return 'font-sans';
      case 'theme3':
        return 'font-serif';
      default:
        return 'font-sans';
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