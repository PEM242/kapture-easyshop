import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, Send, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface OrdersViewProps {
  storeData: StoreData;
}

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  total: number;
  date: string;
  status: "non traité" | "traité";
  phone: string;
  address: string;
  payment: string;
  delivery: string;
  items: OrderItem[];
}

const OrdersView = ({ storeData }: OrdersViewProps) => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Listen for new orders from localStorage changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pendingOrder' && e.newValue) {
        const newOrder = JSON.parse(e.newValue);
        setOrders(prevOrders => {
          const updatedOrders = [...prevOrders, {
            ...newOrder,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: "non traité" as const
          }];
          return updatedOrders;
        });
        
        // Clear the pending order
        localStorage.removeItem('pendingOrder');
        
        // Show notification
        toast({
          title: "Nouvelle commande !",
          description: `Commande reçue de ${newOrder.customer}`,
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);

  const handleProcessOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsProcessDialogOpen(true);
    }
  };

  const handleConfirmProcess = () => {
    if (!selectedOrder || !isConfirmed) return;

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "traité" as const }
          : order
      )
    );

    toast({
      title: "Commande traitée",
      description: "La commande a été marquée comme traitée",
    });

    setIsProcessDialogOpen(false);
    setSelectedOrder(null);
    setIsConfirmed(false);
  };

  const handleSendToDelivery = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsDeliveryDialogOpen(true);
    }
  };

  const handleConfirmDelivery = () => {
    if (!selectedOrder) return;

    toast({
      title: "Commande transmise",
      description: "La commande a été transmise au livreur",
    });

    setIsDeliveryDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "non traité":
        return "bg-yellow-500";
      case "traité":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // ... keep existing code (return JSX with Table and Dialog components)

  return (
    <div className="py-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.total.toLocaleString()} CFA</TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {order.status === "non traité" && (
                    <Button
                      size="sm"
                      onClick={() => handleProcessOrder(order.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Traiter la commande
                    </Button>
                  )}
                  {order.status === "traité" && (
                    <Button
                      size="sm"
                      onClick={() => handleSendToDelivery(order.id)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Transmettre au livreur
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Process Order Dialog */}
      <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Traiter la commande</DialogTitle>
            <DialogDescription>
              Vérifiez les informations de la commande avant de la traiter
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations client</h3>
                  <p>Nom: {selectedOrder.customer}</p>
                  <p>Téléphone: {selectedOrder.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Livraison et paiement</h3>
                  <p>Mode de livraison: {selectedOrder.delivery}</p>
                  {selectedOrder.delivery === "Livraison à domicile" && (
                    <p>Adresse: {selectedOrder.address}</p>
                  )}
                  <p>Paiement: {selectedOrder.payment}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Produits commandés</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
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
                      Total: {selectedOrder.total.toLocaleString()} CFA
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-800">
                    Contactez le client pour confirmer cette commande avant de la
                    marquer comme "Traité".
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confirm"
                    checked={isConfirmed}
                    onCheckedChange={(checked) =>
                      setIsConfirmed(checked as boolean)
                    }
                  />
                  <Label htmlFor="confirm">
                    Commande confirmée. Marquer comme traitée.
                  </Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsProcessDialogOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </Button>
                  <Button
                    onClick={handleConfirmProcess}
                    disabled={!isConfirmed}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirmer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delivery Dialog */}
      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transmettre au livreur</DialogTitle>
            <DialogDescription>
              Informations pour la livraison
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations client</h3>
                  <p>Nom: {selectedOrder.customer}</p>
                  <p>Téléphone: {selectedOrder.phone}</p>
                  {selectedOrder.delivery === "Livraison à domicile" ? (
                    <p>Adresse: {selectedOrder.address}</p>
                  ) : (
                    <p className="text-yellow-600">Retrait en boutique</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Produits à livrer</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
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

                {selectedOrder.payment === "Paiement à la livraison" && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-semibold">
                      Montant à récupérer: {selectedOrder.total.toLocaleString()} CFA
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
                  <Button
                    variant="outline"
                    onClick={() => setIsDeliveryDialogOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </Button>
                  <Button onClick={handleConfirmDelivery}>
                    <Send className="mr-2 h-4 w-4" />
                    Transmettre
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersView;
