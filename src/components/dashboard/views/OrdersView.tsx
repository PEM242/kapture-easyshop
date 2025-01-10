import { StoreData } from "../../store-creator/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OrderList from "./orders/OrderList";
import ProcessOrderDialog from "./orders/ProcessOrderDialog";
import DeliveryDialog from "./orders/DeliveryDialog";
import { useOrders } from "./orders/useOrders";
import { Order } from "./orders/types";

interface OrdersViewProps {
  storeData: StoreData;
}

const OrdersView = ({ storeData }: OrdersViewProps) => {
  const { toast } = useToast();
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleProcessOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsProcessDialogOpen(true);
    }
  };

  const handleConfirmProcess = () => {
    if (!selectedOrder || !isConfirmed) return;

    updateOrderStatus(selectedOrder.id, "traité");

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

  return (
    <div className="py-6">
      <OrderList
        orders={orders}
        onProcessOrder={handleProcessOrder}
        onSendToDelivery={handleSendToDelivery}
      />

      <ProcessOrderDialog
        order={selectedOrder}
        isOpen={isProcessDialogOpen}
        onClose={() => setIsProcessDialogOpen(false)}
        onConfirm={handleConfirmProcess}
        isConfirmed={isConfirmed}
        onConfirmedChange={(checked) => setIsConfirmed(checked)}
      />

      <DeliveryDialog
        order={selectedOrder}
        storeData={storeData}
        isOpen={isDeliveryDialogOpen}
        onClose={() => setIsDeliveryDialogOpen(false)}
        onConfirm={handleConfirmDelivery}
      />
    </div>
  );
};

export default OrdersView;