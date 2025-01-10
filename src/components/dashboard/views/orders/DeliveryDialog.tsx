import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { Order } from "./types";
import { StoreData } from "@/components/store-creator/types";

interface DeliveryDialogProps {
  order: Order | null;
  storeData: StoreData;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeliveryDialog = ({
  order,
  storeData,
  isOpen,
  onClose,
  onConfirm,
}: DeliveryDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transmettre au livreur</DialogTitle>
          <DialogDescription>
            Informations pour la livraison
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informations client</h3>
              <p>Nom: {order.customer}</p>
              <p>Téléphone: {order.phone}</p>
              {order.delivery === "Livraison à domicile" ? (
                <p>Adresse: {order.address}</p>
              ) : (
                <p className="text-yellow-600">Retrait en boutique</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Produits à livrer</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {order.payment === "Paiement à la livraison" && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold">
                  Montant à récupérer: {order.total.toLocaleString()} CFA
                </p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Informations vendeur</h3>
              <p>Nom: {storeData.name}</p>
              <p>Adresse: {storeData.address}</p>
              <p>Contact: {storeData.contact}</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
              <Button onClick={onConfirm}>
                <Send className="mr-2 h-4 w-4" />
                Transmettre
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryDialog;