import { StoreData } from "../store-creator/types";
import React from "react";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront: React.FC<StoreFrontProps> = ({ storeData }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
          {storeData.logo && (
            <img 
              src={storeData.logo} 
              alt={`${storeData.name} logo`} 
              className="h-12 w-auto object-contain"
            />
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{storeData.sector}</h2>
          <p className="text-gray-600">{storeData.address}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {storeData.products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                {product.images.main ? (
                  <img 
                    src={product.images.main} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Pas d'image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  {product.discount.finalPrice > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-through">
                        {product.price} CFA
                      </span>
                      <span className="text-lg font-semibold text-red-600">
                        {product.discount.finalPrice} CFA
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-semibold text-gray-900">
                      {product.price} CFA
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-sm text-gray-600">
            <p className="mb-2">Contact: {storeData.contact}</p>
            <p>Adresse: {storeData.address}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreFront;