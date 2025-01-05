import { useEffect, useState } from "react";
import { StoreData } from "../store-creator/StoreCreator";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import ProductGrid from "./ProductGrid";

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
        header: 'bg-theme1-bg text-theme1-text border-b border-theme1-buttonBorder',
        footer: 'bg-theme1-bg text-theme1-textAlt border-t border-theme1-buttonBorder',
        button: 'bg-theme1-button text-theme1-text border border-theme1-buttonBorder hover:bg-theme1-buttonBorder hover:text-white transition-colors',
        text: 'text-theme1-text',
        background: 'bg-theme1-bg',
      },
      theme2: {
        header: 'bg-theme2-bg text-theme2-text shadow-md',
        footer: 'bg-theme2-bg text-theme2-textAlt',
        button: 'bg-theme2-button text-white hover:bg-theme2-buttonHover transition-colors',
        text: 'text-theme2-text',
        background: 'bg-theme2-bg',
      },
      theme3: {
        header: 'bg-theme3-bg text-theme3-text',
        footer: 'bg-theme3-bg text-theme3-textAlt',
        button: 'bg-theme3-button text-white hover:bg-theme3-buttonHover transition-colors',
        text: 'text-theme3-text',
        background: 'bg-theme3-bg',
      },
    };

    return themeStyles[storeData.theme as keyof typeof themeStyles]?.[element] || '';
  };

  if (!storeData.type || !storeData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${getThemeClasses('background')}`}>
      <StoreHeader 
        storeData={storeData} 
        themeClasses={getThemeClasses('header')} 
      />

      <main className="flex-grow">
        {storeData.cover && (
          <div className="relative h-[400px] w-full overflow-hidden">
            <img
              src={storeData.cover}
              alt="Couverture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className={`text-4xl font-bold text-white text-center px-4 ${
                storeData.theme === 'theme1' ? 'font-sans' : 
                storeData.theme === 'theme2' ? 'font-sans font-bold' : 
                'font-serif'
              }`}>
                Bienvenue chez {storeData.name}
              </h2>
            </div>
          </div>
        )}

        <section className="container mx-auto py-16 px-4">
          <h2 className={`text-3xl font-semibold mb-8 text-center ${getThemeClasses('text')} ${
            storeData.theme === 'theme1' ? 'font-sans' : 
            storeData.theme === 'theme2' ? 'font-sans font-bold' : 
            'font-serif'
          }`}>
            {storeData.type === "restaurant" ? "Notre Menu" : "Nos Produits en Vedette"}
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