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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {storeData.products.slice(0, 6).map((product, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
            storeData.theme === 'theme1' ? 'border border-theme1-buttonBorder' : ''
          }`}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className={`font-semibold text-xl mb-2 ${getThemeFont()}`}>
              {product.name}
            </h3>
            <p className={`mb-4 ${
              storeData.theme === 'theme1' ? 'text-theme1-textAlt' :
              storeData.theme === 'theme2' ? 'text-theme2-textAlt' :
              'text-theme3-textAlt'
            } ${getThemeFont()}`}>
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${getThemeFont()}`}>
                {product.price} €
              </span>
              <button className={`px-4 py-2 rounded-md ${buttonThemeClass}`}>
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