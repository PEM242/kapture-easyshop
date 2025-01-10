import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Send } from "lucide-react";
import { Order } from "./types";

interface OrderListProps {
  orders: Order[];
  onProcessOrder: (orderId: string) => void;
  onSendToDelivery: (orderId: string) => void;
}

const OrderList = ({ orders, onProcessOrder, onSendToDelivery }: OrderListProps) => {
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

  return (
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
                    onClick={() => onProcessOrder(order.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Traiter la commande
                  </Button>
                )}
                {order.status === "traité" && (
                  <Button
                    size="sm"
                    onClick={() => onSendToDelivery(order.id)}
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
  );
};

export default OrderList;