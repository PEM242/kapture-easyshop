import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductActionsProps {
  inStock: boolean;
  themeClasses: {
    button: string;
  };
  onAddToCart: () => void;
  onBuyNow: () => void;
  onClose: () => void;
}

const ProductActions = ({
  inStock,
  themeClasses,
  onAddToCart,
  onBuyNow,
  onClose,
}: ProductActionsProps) => {
  return (
    <div className="space-y-4">
      {!inStock ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          Ce produit est actuellement en rupture de stock.
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            className={cn("w-full", themeClasses.button)}
            onClick={onBuyNow}
          >
            Acheter maintenant
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onAddToCart}
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
  );
};

export default ProductActions;