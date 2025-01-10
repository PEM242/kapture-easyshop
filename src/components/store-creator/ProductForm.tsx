import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import type { Product, ProductFormState } from "./types";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  storeType: string;
}

const ProductForm = ({ onAddProduct, storeType }: ProductFormProps) => {
  const [newProduct, setNewProduct] = useState<ProductFormState>({
    name: "",
    price: 0,
    description: "",
    images: {
      main: "",
      gallery: [],
    },
    category: "",
    customization: {},
    discount: {
      type: null,
      value: 0,
      finalPrice: 0,
    },
    isActive: true,
    inStock: true,
    isFeatured: false,
    collectionName: "",
  });

  const { toast } = useToast();

  const calculateFinalPrice = (price: number, discount: ProductFormState["discount"]) => {
    if (!discount.type || !discount.value) return price;
    if (discount.type === "percentage") {
      return price * (1 - discount.value / 100);
    }
    return Math.max(0, price - discount.value);
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.images.main) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const productToAdd: Product = {
      ...newProduct,
      featured: newProduct.isFeatured ? {
        collectionName: newProduct.collectionName
      } : undefined,
      discount: {
        ...newProduct.discount,
        finalPrice: calculateFinalPrice(newProduct.price, newProduct.discount),
      },
      images: {
        main: newProduct.images.main || "",
        gallery: newProduct.images.gallery || [],
      },
    };

    onAddProduct(productToAdd);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      images: {
        main: "",
        gallery: [],
      },
      category: "",
      customization: {},
      discount: {
        type: null,
        value: 0,
        finalPrice: 0,
      },
      isActive: true,
      inStock: true,
      isFeatured: false,
      collectionName: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="productName">Nom</Label>
          <Input
            id="productName"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
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
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
                discount: {
                  ...newProduct.discount,
                  finalPrice: calculateFinalPrice(
                    parseFloat(e.target.value),
                    newProduct.discount
                  ),
                },
              })
            }
            placeholder="Prix"
          />
        </div>

        <div>
          <Label htmlFor="productDescription">Description</Label>
          <Textarea
            id="productDescription"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Description"
          />
        </div>

        <ProductImages
          mainImage={newProduct.images.main}
          galleryImages={newProduct.images.gallery}
          onMainImageChange={(url) =>
            setNewProduct({
              ...newProduct,
              images: { ...newProduct.images, main: url },
            })
          }
          onGalleryImageChange={(urls) =>
            setNewProduct({
              ...newProduct,
              images: { ...newProduct.images, gallery: urls },
            })
          }
        />

        <ProductVariants
          customization={newProduct.customization}
          onChange={(customization) =>
            setNewProduct({ ...newProduct, customization })
          }
        />

        <div>
          <Label>Réduction</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                className="w-full p-2 border rounded"
                value={newProduct.discount.type || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    discount: {
                      ...newProduct.discount,
                      type: e.target.value as "percentage" | "fixed" | null,
                      finalPrice: calculateFinalPrice(newProduct.price, {
                        ...newProduct.discount,
                        type: e.target.value as "percentage" | "fixed" | null,
                      }),
                    },
                  })
                }
              >
                <option value="">Pas de réduction</option>
                <option value="percentage">Pourcentage (%)</option>
                <option value="fixed">Montant fixe</option>
              </select>
            </div>
            {newProduct.discount.type && (
              <Input
                type="number"
                value={newProduct.discount.value}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    discount: {
                      ...newProduct.discount,
                      value: parseFloat(e.target.value),
                      finalPrice: calculateFinalPrice(newProduct.price, {
                        ...newProduct.discount,
                        value: parseFloat(e.target.value),
                      }),
                    },
                  })
                }
                placeholder={
                  newProduct.discount.type === "percentage"
                    ? "Pourcentage"
                    : "Montant"
                }
              />
            )}
          </div>
          {newProduct.discount.type && (
            <p className="text-sm text-muted-foreground mt-2">
              Prix final : {newProduct.discount.finalPrice.toFixed(2)} €
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={newProduct.isActive}
              onCheckedChange={(checked) =>
                setNewProduct({ ...newProduct, isActive: checked as boolean })
              }
            />
            <Label htmlFor="isActive">Produit actif</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={newProduct.inStock}
              onCheckedChange={(checked) =>
                setNewProduct({ ...newProduct, inStock: checked as boolean })
              }
            />
            <Label htmlFor="inStock">En stock</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={newProduct.isFeatured}
            onCheckedChange={(checked) =>
              setNewProduct({ ...newProduct, isFeatured: checked as boolean })
            }
          />
          <Label htmlFor="featured">Ajouter en produit vedette</Label>
        </div>

        {newProduct.isFeatured && (
          <div>
            <Label htmlFor="collectionName">Nom de la collection</Label>
            <Input
              id="collectionName"
              value={newProduct.collectionName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, collectionName: e.target.value })
              }
              placeholder="Nom de la collection"
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Ajouter {storeType === "restaurant" ? "le plat" : "le produit"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;