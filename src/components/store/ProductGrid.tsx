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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {storeData.products.map((product, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
            storeData.theme === 'theme1' ? 'border border-theme1-buttonBorder' : ''
          }`}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 md:h-48 object-cover"
            />
          )}
          <div className="p-3 md:p-6">
            <h3 className={`font-semibold text-base md:text-xl mb-2 ${getThemeFont()}`}>
              {product.name}
            </h3>
            <p className={`mb-4 text-sm md:text-base ${
              storeData.theme === 'theme1' ? 'text-theme1-textAlt' :
              storeData.theme === 'theme2' ? 'text-theme2-textAlt' :
              'text-theme3-textAlt'
            } ${getThemeFont()}`}>
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-lg md:text-xl font-bold ${getThemeFont()}`}>
                {product.price} €
              </span>
              <button className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base ${buttonThemeClass}`}>
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