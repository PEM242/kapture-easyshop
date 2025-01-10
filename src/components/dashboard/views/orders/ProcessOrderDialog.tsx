import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle, X } from "lucide-react";
import { Order } from "./types";

interface ProcessOrderDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isConfirmed: boolean;
  onConfirmedChange: (checked: boolean) => void;
}

const ProcessOrderDialog = ({
  order,
  isOpen,
  onClose,
  onConfirm,
  isConfirmed,
  onConfirmedChange,
}: ProcessOrderDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Traiter la commande</DialogTitle>
          <DialogDescription>
            Vérifiez les informations de la commande avant de la traiter
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informations client</h3>
              <p>Nom: {order.customer}</p>
              <p>Téléphone: {order.phone}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Livraison et paiement</h3>
              <p>Mode de livraison: {order.delivery}</p>
              {order.delivery === "Livraison à domicile" && (
                <p>Adresse: {order.address}</p>
              )}
              <p>Paiement: {order.payment}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Produits commandés</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString()} CFA</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold">
                  Total: {order.total.toLocaleString()} CFA
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800">
                Contactez le client pour confirmer cette commande avant de
                la marquer comme "Traité".
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm"
                checked={isConfirmed}
                onCheckedChange={(checked) => onConfirmedChange(checked as boolean)}
              />
              <Label htmlFor="confirm">
                Commande confirmée. Marquer comme traitée.
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
              <Button onClick={onConfirm} disabled={!isConfirmed}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessOrderDialog;