import { StoreData } from "../store-creator/types";
import React from "react";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront: React.FC<StoreFrontProps> = ({ storeData }) => {
  return (
    <div className="store-front">
      <header className="store-header">
        <h1 className="store-name">{storeData.name}</h1>
        <img src={storeData.logo} alt={`${storeData.name} logo`} className="store-logo" />
      </header>
      <main className="store-content">
        <h2 className="store-sector">{storeData.sector}</h2>
        <div className="store-products">
          {storeData.products.map((product) => (
            <div key={product.name} className="product-card">
              <img src={product.images.main} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} €</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="store-footer">
        <p>Contact: {storeData.contact}</p>
        <p>Address: {storeData.address}</p>
      </footer>
    </div>
  );
};

export default StoreFront;