import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../store-creator/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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
  const navigate = useNavigate();

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
    // TODO: Implement checkout logic
    toast({
      title: "Redirection",
      description: "Redirection vers la page de paiement...",
    });
  };

  const allImages = [
    product.images.main,
    ...(product.images.gallery || []),
  ].filter(Boolean);

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
            {/* Image Gallery */}
            <div className="space-y-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square relative">
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      className="w-20 h-20 flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
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

              {/* Options */}
              {product.customization.sizes && product.customization.sizes.length > 0 && (
                <div className="space-y-2">
                  <Label>Taille</Label>
                  <Select
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une taille" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.customization.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.customization.colors && product.customization.colors.length > 0 && (
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.customization.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Stock Status */}
              {!product.inStock ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-md">
                  Ce produit est actuellement en rupture de stock.
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    className={cn("w-full", themeClasses.button)}
                    onClick={handleBuyNow}
                  >
                    Acheter maintenant
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full"
                onClick={onClose}
              >
                Retour à la boutique
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;