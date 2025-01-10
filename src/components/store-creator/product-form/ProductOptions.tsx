import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProductFormState } from "../types";

interface ProductOptionsProps {
  product: ProductFormState;
  onProductChange: (updates: Partial<ProductFormState>) => void;
}

const ProductOptions = ({ product, onProductChange }: ProductOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={product.isActive}
            onCheckedChange={(checked) =>
              onProductChange({ isActive: checked as boolean })
            }
          />
          <Label htmlFor="isActive">Produit actif</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={product.inStock}
            onCheckedChange={(checked) =>
              onProductChange({ inStock: checked as boolean })
            }
          />
          <Label htmlFor="inStock">En stock</Label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={product.isFeatured}
          onCheckedChange={(checked) =>
            onProductChange({ isFeatured: checked as boolean })
          }
        />
        <Label htmlFor="featured">Ajouter en produit vedette</Label>
      </div>

      {product.isFeatured && (
        <div>
          <Label htmlFor="collectionName">Nom de la collection</Label>
          <Input
            id="collectionName"
            value={product.collectionName}
            onChange={(e) =>
              onProductChange({ collectionName: e.target.value })
            }
            placeholder="Nom de la collection"
          />
        </div>
      )}
    </div>
  );
};

export default ProductOptions;