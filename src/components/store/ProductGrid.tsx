import { StoreData } from "../store-creator/StoreCreator";

interface ProductGridProps {
  storeData: StoreData;
  buttonThemeClass: string;
}

const ProductGrid = ({ storeData, buttonThemeClass }: ProductGridProps) => {
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

  const activeProducts = storeData.products.filter(product => product.isActive);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {activeProducts.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="aspect-square relative overflow-hidden">
            {product.images.main ? (
              <img
                src={product.images.main}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-gray-400">No image</span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  En rupture de stock
                </span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className={`font-medium text-sm md:text-base mb-1 ${getThemeFont()}`}>
              {product.name}
            </h3>
            <p className={`text-xs md:text-sm text-gray-600 mb-2 line-clamp-2 ${getThemeFont()}`}>
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.discount.finalPrice > 0 ? (
                  <>
                    <span className="text-xs text-gray-500 line-through">
                      {product.price} €
                    </span>
                    <span className={`text-sm md:text-base font-semibold text-red-500 ${getThemeFont()}`}>
                      {product.discount.finalPrice.toFixed(2)} €
                    </span>
                  </>
                ) : (
                  <span className={`text-sm md:text-base font-semibold ${getThemeFont()}`}>
                    {product.price} €
                  </span>
                )}
              </div>
              <button 
                className={`text-xs md:text-sm px-3 py-1 rounded-md ${buttonThemeClass}`}
                disabled={!product.inStock}
              >
                {storeData.type === "restaurant" ? "Commander" : "Voir détails"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;