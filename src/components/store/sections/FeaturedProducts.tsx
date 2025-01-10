import { ScrollArea } from "@/components/ui/scroll-area";
import { StoreData } from "../../store-creator/types";

interface FeaturedProductsProps {
  products: StoreData['products'];
  themeClasses: string;
  storeType: StoreData['type'];
}

const FeaturedProducts = ({ products, themeClasses, storeType }: FeaturedProductsProps) => {
  const featuredProducts = products.filter(product => product.featured && product.isActive);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-4 px-4">
      <h3 className={`text-lg md:text-xl font-semibold mb-4 ${themeClasses}`}>
        {storeType === 'restaurant' ? 'Plats en vedette' : 'Produits en vedette'}
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
  );
};

export default FeaturedProducts;