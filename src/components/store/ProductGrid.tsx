import { StoreData } from "../store-creator/StoreCreator";

interface ProductGridProps {
  storeData: StoreData;
  buttonThemeClass: string;
}

const ProductGrid = ({ storeData, buttonThemeClass }: ProductGridProps) => {
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
            <h3 className={`font-semibold text-xl mb-2 ${
              storeData.theme === 'theme1' ? 'font-sans' : 
              storeData.theme === 'theme2' ? 'font-sans font-bold' : 
              'font-serif'
            }`}>
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{product.price} €</span>
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