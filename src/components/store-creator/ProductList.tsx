import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import type { Product } from "./types";

interface ProductListProps {
  products: Product[];
  onRemoveProduct: (index: number) => void;
  storeType: string;
}

const ProductList = ({ products, onRemoveProduct, storeType }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {storeType === "restaurant" ? "Plats ajoutés" : "Produits ajoutés"}
      </h3>
      <div className="grid gap-4">
        {products.map((product, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                {product.images?.main ? (
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-400">No image</span>
                  </div>
                )}
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.discount?.finalPrice > 0
                      ? `${product.discount.finalPrice} €`
                      : `${product.price} €`}
                  </p>
                  {product.featured && (
                    <p className="text-sm text-blue-500">
                      Produit vedette - Collection: {product.featured.collectionName}
                    </p>
                  )}
                  {!product.inStock && (
                    <p className="text-sm text-red-500">
                      En rupture de stock
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveProduct(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;