import { useState } from "react";
import { StoreData, Product } from "./StoreCreator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface ProductConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const ProductConfig = ({ storeData, setStoreData }: ProductConfigProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    customization: [],
    discount: 0,
  });
  const [customOption, setCustomOption] = useState("");

  const categories = {
    retail: ["Vêtements", "Accessoires", "Électronique", "Beauté"],
    restaurant: ["Entrées", "Plats", "Desserts", "Boissons"],
    artisan: ["Bijoux", "Vêtements", "Décorations", "Sur mesure"],
  };

  const handleAddProduct = () => {
    setStoreData({
      ...storeData,
      products: [...storeData.products, currentProduct],
    });
    setCurrentProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",
      customization: [],
      discount: 0,
    });
  };

  const handleAddCustomization = () => {
    if (customOption.trim()) {
      setCurrentProduct({
        ...currentProduct,
        customization: [...currentProduct.customization, customOption.trim()],
      });
      setCustomOption("");
    }
  };

  const handleRemoveCustomization = (index: number) => {
    setCurrentProduct({
      ...currentProduct,
      customization: currentProduct.customization.filter((_, i) => i !== index),
    });
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Ajout de produits
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={currentProduct.name}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, name: e.target.value })
              }
              placeholder="Nom du produit"
            />
          </div>

          <div>
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  price: parseFloat(e.target.value),
                })
              }
              placeholder="Prix"
            />
          </div>

          <div>
            <Label htmlFor="discount">Réduction (%)</Label>
            <Input
              id="discount"
              type="number"
              value={currentProduct.discount}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  discount: parseFloat(e.target.value),
                })
              }
              placeholder="Réduction en pourcentage"
            />
            {currentProduct.discount > 0 && currentProduct.price > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Prix final:{" "}
                <span className="line-through">{currentProduct.price}€</span>{" "}
                <span className="text-primary font-bold">
                  {calculateDiscountedPrice(
                    currentProduct.price,
                    currentProduct.discount
                  )}
                  €
                </span>
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={currentProduct.category}
              onValueChange={(value) =>
                setCurrentProduct({ ...currentProduct, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories[storeData.type as keyof typeof categories]?.map(
                  (category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
              placeholder="Description du produit"
              className="h-32"
            />
          </div>

          <ImageUpload
            label="Image du produit"
            onImageSelect={(image) =>
              setCurrentProduct({ ...currentProduct, image })
            }
            defaultImage={currentProduct.image}
          />

          <div className="space-y-4">
            <Label>Options de personnalisation</Label>
            <div className="flex gap-2">
              <Input
                value={customOption}
                onChange={(e) => setCustomOption(e.target.value)}
                placeholder="Ajouter une option"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomization}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProduct.customization.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{option}</span>
                  <button
                    onClick={() => handleRemoveCustomization(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleAddProduct} className="w-full md:w-auto">
          Ajouter le produit
        </Button>
      </div>

      {storeData.products.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Produits ajoutés ({storeData.products.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storeData.products.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-2"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm">
                  {product.discount > 0 ? (
                    <>
                      <span className="line-through">{product.price}€</span>{" "}
                      <span className="text-primary font-bold">
                        {calculateDiscountedPrice(
                          product.price,
                          product.discount
                        )}
                        €
                      </span>
                    </>
                  ) : (
                    `${product.price}€`
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductConfig;