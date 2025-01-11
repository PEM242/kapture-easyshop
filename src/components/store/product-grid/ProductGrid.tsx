import { useState } from "react";
import { StoreData } from "../../store-creator/types";
import ProductDetails from "../ProductDetails";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  storeData: StoreData;
  buttonThemeClass: string;
}

const ProductGrid = ({ storeData, buttonThemeClass }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

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
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            themeFont={getThemeFont()}
            buttonThemeClass={buttonThemeClass}
            onProductClick={() => setSelectedProduct(index)}
            storeType={storeData.type}
          />
        ))}
      </div>

      {selectedProduct !== null && (
        <ProductDetails
          product={activeProducts[selectedProduct]}
          themeClasses={{
            text: getThemeFont(),
            button: buttonThemeClass,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;