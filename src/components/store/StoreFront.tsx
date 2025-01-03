import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreData } from "../store-creator/StoreCreator";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const { storeId } = useParams();

  useEffect(() => {
    console.log("Store data:", storeData);
    console.log("Store ID:", storeId);
  }, [storeData, storeId]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`w-full p-4 ${storeData.theme === 'theme1' ? 'bg-black text-white' : storeData.theme === 'theme2' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'}`}>
        <div className="container mx-auto flex items-center justify-between">
          {storeData.logo && (
            <img src={storeData.logo} alt="Logo" className="h-12 w-auto" />
          )}
          <h1 className="text-2xl font-bold">{storeData.name}</h1>
          <nav>
            <ul className="flex space-x-4">
              {storeData.type === "restaurant" ? (
                <li>Menu</li>
              ) : (
                <li>Produits</li>
              )}
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8">
        {/* Banner */}
        {storeData.cover && (
          <div className="w-full h-64 rounded-lg overflow-hidden mb-8">
            <img
              src={storeData.cover}
              alt="Couverture"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Products/Menu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storeData.products.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price} €</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p>{storeData.contact}</p>
            <p>{storeData.address}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Livraison</h3>
            <p>{storeData.shippingPolicy}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Remboursement</h3>
            <p>{storeData.refundPolicy}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreFront;