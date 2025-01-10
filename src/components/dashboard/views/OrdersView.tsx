import { StoreData } from "../../store-creator/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OrderList from "./orders/OrderList";
import ProcessOrderDialog from "./orders/ProcessOrderDialog";
import DeliveryDialog from "./orders/DeliveryDialog";
import { useOrders } from "./orders/useOrders";
import { Order } from "./orders/types";
import OrderFilters from "./orders/OrderFilters";
import { DateRange } from "react-day-picker";

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

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesDate =
      !dateRange?.from ||
      !dateRange?.to ||
      (new Date(order.date) >= dateRange.from &&
        new Date(order.date) <= dateRange.to);

    return matchesSearch && matchesStatus && matchesDate;
  });

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
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <OrderList
        orders={filteredOrders}
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
