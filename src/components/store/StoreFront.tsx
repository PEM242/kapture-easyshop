import { StoreData } from "../store-creator/StoreCreator";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import ProductGrid from "./ProductGrid";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const getThemeClasses = (element: 'header' | 'footer' | 'button') => {
    const storeType = storeData.type === 'retail' || storeData.type === 'artisan' ? 'retail' : 'restaurant';
    const themeNumber = storeData.theme.replace('theme', '');
    
    const theme = {
      retail: {
        theme1: {
          header: 'bg-black text-white',
          footer: 'bg-black text-gray-400',
          button: 'bg-gray-400 text-black hover:bg-gray-600',
        },
        theme2: {
          header: 'bg-blue-600 text-white',
          footer: 'bg-blue-200 text-blue-600',
          button: 'bg-blue-200 text-blue-600 hover:bg-blue-800 hover:text-white',
        },
        theme3: {
          header: 'bg-green-500 text-white',
          footer: 'bg-green-200 text-green-500',
          button: 'bg-green-200 text-green-500 hover:bg-green-700 hover:text-white',
        },
      },
      restaurant: {
        theme1: {
          header: 'bg-black text-white',
          footer: 'bg-gray-400 text-black',
          button: 'bg-black text-white hover:bg-gray-700',
        },
        theme2: {
          header: 'bg-red-600 text-white',
          footer: 'bg-orange-200 text-red-600',
          button: 'bg-orange-200 text-red-600 hover:bg-red-800 hover:text-white',
        },
        theme3: {
          header: 'bg-olive text-white',
          footer: 'bg-beige text-olive',
          button: 'bg-beige text-olive hover:bg-olive-dark hover:text-white',
        },
      },
    };

    return theme[storeType][`theme${themeNumber}`][element];
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              <h2 className="text-4xl font-bold text-white text-center px-4">
                Bienvenue chez {storeData.name}
              </h2>
            </div>
          </div>
        )}

        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
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