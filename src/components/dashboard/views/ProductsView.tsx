import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { Plus, Share2 } from "lucide-react";
import { useState } from "react";
import ProductForm from "../../store-creator/ProductForm";

interface ProductsViewProps {
  storeData: StoreData;
  onUpdateStore: (data: StoreData) => void;
}

const ProductsView = ({ storeData, onUpdateStore }: ProductsViewProps) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProduct = (product: any) => {
    const updatedStore = {
      ...storeData,
      products: [...(storeData.products || []), product],
    };
    onUpdateStore(updatedStore);
    setShowAddProduct(false);
  };

  if (showAddProduct) {
    return (
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => setShowAddProduct(false)}
          className="mb-4"
        >
          Retour
        </Button>
        <ProductForm onAddProduct={handleAddProduct} storeType={storeData.type} />
      </div>
    );
  }

  return (
    <div className="py-6 space-y-4">
      {storeData.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
        >
          <div className="flex items-center space-x-4">
            {product.images?.main && (
              <img
                src={product.images.main}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.price} € | Stock: {product.inStock ? "Disponible" : "Rupture"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        onClick={() => setShowAddProduct(true)}
        className="fixed bottom-20 right-4 shadow-lg"
      >
        <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
      </Button>
    </div>
  );
};

export default ProductsView;