import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import type { StoreData, Product } from "./StoreCreator";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const ProductConfig = ({ storeData, setStoreData }: ProductConfigProps) => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    customization: [],
    discount: 0,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setStoreData({
      ...storeData,
      products: [...storeData.products, newProduct],
    });

    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",
      customization: [],
      discount: 0,
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

    // Génération d'un identifiant unique pour la boutique
    const storeId = Math.random().toString(36).substring(2, 15);
    
    toast({
      title: "Boutique créée avec succès !",
      description: "Votre boutique est maintenant accessible en ligne.",
      variant: "default",
    });

    // Navigation vers la page de la boutique
    navigate(`/store/${storeId}`);
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

          <div>
            <Label>Image</Label>
            <ImageUpload
              value={newProduct.image}
              onChange={(url) => setNewProduct({ ...newProduct, image: url })}
              label="Image du produit"
            />
          </div>

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
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.price} €
                      </p>
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