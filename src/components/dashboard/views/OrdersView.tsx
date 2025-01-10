import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrdersViewProps {
  storeData: StoreData;
}

const OrdersView = ({ storeData }: OrdersViewProps) => {
  // Données factices pour les commandes
  const orders = [
    {
      id: "1",
      customer: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      address: "123 Rue de Paris, 75001 Paris",
      payment: "Paiement à la livraison",
      delivery: "Livraison à domicile",
      total: 89.99,
      date: "2024-02-20",
      status: "nouveau",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nouveau":
        return "bg-blue-500";
      case "en cours":
        return "bg-yellow-500";
      case "livré":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="py-6 space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Commande #{order.id}</CardTitle>
                <CardDescription>{order.date}</CardDescription>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Client</h4>
              <p className="text-sm text-muted-foreground">{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.phone}</p>
              <p className="text-sm text-muted-foreground">{order.address}</p>
            </div>
            <div>
              <h4 className="font-medium">Détails</h4>
              <p className="text-sm text-muted-foreground">
                {order.payment} | {order.delivery}
              </p>
              <p className="text-sm font-medium">Total: {order.total} €</p>
            </div>
            <Button className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmer et transmettre au livreur
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersView;