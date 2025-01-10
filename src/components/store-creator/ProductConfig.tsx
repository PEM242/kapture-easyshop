import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import type { StoreData, Product } from "./StoreCreator";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";

interface ProductConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

interface ProductFormState {
  name: string;
  price: number;
  description: string;
  images: {
    main: string;
    gallery: string[];
  };
  category: string;
  customization: {
    sizes?: string[];
    colors?: string[];
    shoesSizes?: string[];
    customSizes?: string;
    customColors?: string;
  };
  discount: {
    type: 'percentage' | 'fixed' | null;
    value: number;
    finalPrice: number;
  };
  isActive: boolean;
  inStock: boolean;
  isFeatured: boolean;
  collectionName: string;
}

const ProductConfig = ({ storeData, setStoreData }: ProductConfigProps) => {
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
  const navigate = useNavigate();

  const calculateFinalPrice = (price: number, discount: ProductFormState["discount"]) => {
    if (!discount.type || !discount.value) return price;
    if (discount.type === "percentage") {
      return price * (1 - discount.value / 100);
    }
    return Math.max(0, price - discount.value);
  };

  const handleAddProduct = () => {
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
    };

    setStoreData({
      ...storeData,
      products: [...storeData.products, productToAdd],
    });

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

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = storeData.products.filter((_, i) => i !== index);
    setStoreData({ ...storeData, products: updatedProducts });
  };

  const handleCreateStore = () => {
    if (storeData.products.length === 0) {
      toast({
        title: "Aucun produit",
        description: "Veuillez ajouter au moins un produit à votre boutique",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('storeData', JSON.stringify(storeData));
    
    toast({
      title: "Boutique créée avec succès !",
      description: (
        <div className="mt-2">
          <p>Votre boutique est maintenant accessible en ligne.</p>
          <a 
            href="/store"
            className="text-blue-500 hover:underline mt-2 block"
          >
            Cliquez ici pour voir votre boutique
          </a>
        </div>
      ),
    });

    navigate("/store");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Ajoutez vos {storeData.type === "restaurant" ? "plats" : "produits"}
      </h2>

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
                storeData.type === "restaurant"
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
            onClick={handleAddProduct}
            className="w-full flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter {storeData.type === "restaurant" ? "le plat" : "le produit"}
          </Button>
        </div>

        {storeData.products.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {storeData.type === "restaurant" ? "Plats ajoutés" : "Produits ajoutés"}
            </h3>
            <div className="grid gap-4">
              {storeData.products.map((product, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images.main}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.discount.finalPrice > 0
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
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t">
          <Button
            onClick={handleCreateStore}
            className="w-full"
            size="lg"
            variant="default"
          >
            Valider et Créer Ma Boutique
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfig;