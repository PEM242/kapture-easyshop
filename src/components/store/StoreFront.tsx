import { useEffect, useState } from "react";
import { StoreData } from "../store-creator/StoreCreator";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import ProductGrid from "./ProductGrid";
import MobileNav from "./MobileNav";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData: initialStoreData }: StoreFrontProps) => {
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);

  useEffect(() => {
    const savedStoreData = localStorage.getItem('storeData');
    if (savedStoreData) {
      setStoreData(JSON.parse(savedStoreData));
    }
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

  const featuredProducts = storeData.products.filter(product => product.featured && product.isActive);

  if (!storeData.type || !storeData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader 
        storeData={storeData} 
        themeClasses={getThemeClasses('header')} 
      />
      <MobileNav />

      <main className="flex-grow bg-white">
        {storeData.cover && (
          <div className="relative h-24 md:h-48 w-full overflow-hidden">
            <img
              src={storeData.cover}
              alt="Couverture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className={`text-xl md:text-3xl font-bold text-white text-center px-4 ${
                storeData.theme === 'theme1' ? 'font-helvetica' : 
                storeData.theme === 'theme2' ? 'font-sans' : 
                'font-serif'
              }`}>
                {storeData.name}
              </h2>
            </div>
          </div>
        )}

        {featuredProducts.length > 0 && (
          <section className="py-4 px-4">
            <h3 className={`text-lg md:text-xl font-semibold mb-4 ${getThemeClasses('text')}`}>
              {storeData.type === 'restaurant' ? 'Plats en vedette' : 'Produits en vedette'}
            </h3>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-200 relative">
                      {product.images.main ? (
                        <img
                          src={product.images.main}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center mt-1 truncate max-w-[80px]">
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
        )}

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
    </div>
  );
};

export default StoreFront;
