import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import type { StoreData, Product } from "./types";

interface ProductConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const ProductConfig = ({ storeData, setStoreData }: ProductConfigProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProduct = (product: Product) => {
    setStoreData({
      ...storeData,
      products: [...(storeData.products || []), product],
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

    // Sauvegarder les données actuelles
    localStorage.setItem('storeData', JSON.stringify(storeData));
    
    // Réinitialiser le formulaire
    setStoreData({
      type: "",
      name: "",
      logo: "",
      cover: "",
      sector: "",
      address: "",
      city: "",
      contact: "",
      shippingPolicy: "",
      refundPolicy: "",
      country: "",
      theme: "",
      paymentMethods: [],
      deliveryMethods: [],
      products: [],
    });

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

      <ProductForm
        onAddProduct={handleAddProduct}
        storeType={storeData.type}
      />

      {storeData.products && storeData.products.length > 0 && (
        <ProductList
          products={storeData.products}
          onRemoveProduct={handleRemoveProduct}
          storeType={storeData.type}
        />
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
  );
};

export default ProductConfig;