import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, Send } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OrdersViewProps {
  storeData: StoreData;
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
}

const OrdersView = ({ storeData }: OrdersViewProps) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customer: "Jean Mbemba",
      phone: "+221 77 123 45 67",
      address: "123 Rue de Dakar, Sénégal",
      payment: "Paiement à la livraison",
      delivery: "Livraison à domicile",
      total: 12000,
      date: "2024-02-20 14:30",
      status: "non traité",
    },
  ]);

  const handleProcessOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "traité" as const }
        : order
    ));
    
    toast({
      title: "Commande traitée",
      description: "La commande a été marquée comme traitée",
    });
  };

  const handleSendToDelivery = (orderId: string) => {
    // Here you would typically integrate with a delivery service
    toast({
      title: "Commande transmise",
      description: "La commande a été transmise au livreur",
    });
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
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
    </div>
  );
};

export default OrdersView;