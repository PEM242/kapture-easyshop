import { Product } from "../../store-creator/types";

interface ProductCardProps {
  product: Product;
  themeFont: string;
  buttonThemeClass: string;
  onProductClick: () => void;
  storeType: string;
}

const ProductCard = ({ 
  product, 
  themeFont, 
  buttonThemeClass, 
  onProductClick,
  storeType 
}: ProductCardProps) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onProductClick}
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
        <h3 className={`font-medium text-sm md:text-base mb-1 ${themeFont}`}>
          {product.name}
        </h3>
        <p className={`text-xs md:text-sm text-gray-600 mb-2 line-clamp-2 ${themeFont}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount.finalPrice > 0 ? (
              <>
                <span className="text-xs text-gray-500 line-through">
                  {product.price} CFA
                </span>
                <span className={`text-sm md:text-base font-semibold text-red-500 ${themeFont}`}>
                  {product.discount.finalPrice.toFixed(2)} CFA
                </span>
              </>
            ) : (
              <span className={`text-sm md:text-base font-semibold ${themeFont}`}>
                {product.price} CFA
              </span>
            )}
          </div>
          <button 
            className={`text-xs md:text-sm px-3 py-1 rounded-md ${buttonThemeClass}`}
            disabled={!product.inStock}
          >
            {storeType === "restaurant" ? "Commander" : "Voir détails"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;