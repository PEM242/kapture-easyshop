import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProductFormState } from "../types";

interface BasicFieldsProps {
  product: ProductFormState;
  storeType: string;
  onProductChange: (updates: Partial<ProductFormState>) => void;
}

const BasicFields = ({ product, storeType, onProductChange }: BasicFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="productName">Nom</Label>
        <Input
          id="productName"
          value={product.name}
          onChange={(e) =>
            onProductChange({ name: e.target.value })
          }
          placeholder={
            storeType === "restaurant"
              ? "Nom du plat"
              : "Nom du produit"
          }
        />
      </div>

      <div>
        <Label htmlFor="productPrice">Prix</Label>
        <Input
          id="productPrice"
          type="number"
          value={product.price}
          onChange={(e) =>
            onProductChange({ price: parseFloat(e.target.value) })
          }
          placeholder="Prix"
        />
      </div>

      <div>
        <Label htmlFor="productDescription">Description</Label>
        <Textarea
          id="productDescription"
          value={product.description}
          onChange={(e) =>
            onProductChange({ description: e.target.value })
          }
          placeholder="Description"
        />
      </div>
    </>
  );
};

export default BasicFields;