import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { StoreData } from "@/components/store-creator/types";
import CheckoutForm from "../checkout/CheckoutForm";
import { useState } from "react";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  storeData: StoreData;
}

const CartModal = ({ open, onClose, storeData }: CartModalProps) => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center py-6">
            <p className="text-gray-500">Votre panier est vide</p>
            <Button onClick={onClose} className="mt-4">
              Continuer mes achats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        {!isCheckingOut ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Votre Panier</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.images.main}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.selectedSize && `Taille: ${item.selectedSize}`}
                      {item.selectedColor &&
                        item.selectedSize &&
                        " | "}
                      {item.selectedColor && `Couleur: ${item.selectedColor}`}
                    </p>
                    <p className="font-medium">
                      {(item.discount.finalPrice || item.price).toLocaleString()} CFA
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(index, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {total.toLocaleString()} CFA
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => setIsCheckingOut(true)}
              >
                Passer la commande
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsCheckingOut(false)}
              className="mb-4 text-sm text-gray-500 hover:text-gray-700"
            >
              ← Retour au panier
            </button>
            <CheckoutForm
              storeData={storeData}
              onClose={onClose}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;