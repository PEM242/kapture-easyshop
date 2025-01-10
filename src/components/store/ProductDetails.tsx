import { useState } from "react";
import { Product } from "../store-creator/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ProductGallery from "./product-details/ProductGallery";
import ProductCustomization from "./product-details/ProductCustomization";
import ProductActions from "./product-details/ProductActions";

interface ProductDetailsProps {
  product: Product;
  themeClasses: {
    text: string;
    button: string;
  };
  onClose: () => void;
}

const ProductDetails = ({ product, themeClasses, onClose }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize && product.customization.sizes?.length) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor && product.customization.colors?.length) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une couleur",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Produit ajouté",
      description: "Le produit a été ajouté au panier",
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.customization.sizes?.length) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor && product.customization.colors?.length) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une couleur",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Redirection",
      description: "Redirection vers la page de paiement...",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductGallery images={product.images} name={product.name} />

            <div className="space-y-6">
              <h1 className={cn("text-2xl font-bold", themeClasses.text)}>
                {product.name}
              </h1>

              <div className="space-y-2">
                {product.discount.finalPrice > 0 ? (
                  <div className="space-y-1">
                    <p className="text-gray-500 line-through">
                      {product.price} CFA
                    </p>
                    <p className={cn("text-xl font-bold", themeClasses.text)}>
                      {product.discount.finalPrice} CFA
                    </p>
                  </div>
                ) : (
                  <p className={cn("text-xl font-bold", themeClasses.text)}>
                    {product.price} CFA
                  </p>
                )}
              </div>

              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>

              <ProductCustomization
                customization={product.customization}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />

              <ProductActions
                inStock={product.inStock}
                themeClasses={themeClasses}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;