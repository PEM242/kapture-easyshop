import { useParams } from "react-router-dom";
import { StoreData } from "../store-creator/StoreCreator";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const { storeId } = useParams();

  const getThemeClasses = () => {
    switch (storeData.theme) {
      case "theme1":
        return "bg-black text-white";
      case "theme2":
        return storeData.type === "restaurant" 
          ? "bg-red-600 text-white" 
          : "bg-blue-600 text-white";
      case "theme3":
        return storeData.type === "restaurant"
          ? "bg-yellow-400 text-black"
          : "bg-green-500 text-white";
      default:
        return "bg-white text-black";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`w-full p-4 ${getThemeClasses()} transition-colors duration-300`}>
        <div className="container mx-auto flex items-center justify-between">
          {storeData.logo && (
            <img src={storeData.logo} alt="Logo" className="h-12 w-auto object-contain" />
          )}
          <h1 className="text-2xl font-bold">{storeData.name || "Ma Boutique"}</h1>
          <nav>
            <ul className="flex space-x-4">
              <li className="cursor-pointer hover:opacity-80">
                {storeData.type === "restaurant" ? "Menu" : "Produits"}
              </li>
              <li className="cursor-pointer hover:opacity-80">Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
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

        {/* Products/Menu Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {storeData.type === "restaurant" ? "Notre Menu" : "Nos Produits"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeData.products.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
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
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-lg font-bold mt-2">{product.price} €</p>
                  <button className={`mt-4 px-4 py-2 rounded-md w-full ${getThemeClasses()} hover:opacity-90 transition-opacity`}>
                    {storeData.type === "restaurant" ? "Commander" : "Ajouter au panier"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p>{storeData.contact || "Aucune information de contact"}</p>
            <p>{storeData.address || "Aucune adresse"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Livraison</h3>
            <p>{storeData.shippingPolicy || "Aucune politique de livraison définie"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Remboursement</h3>
            <p>{storeData.refundPolicy || "Aucune politique de remboursement définie"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreFront;