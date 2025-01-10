import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "./types";

export const useOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

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
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
          return updatedOrders;
        });
        
        localStorage.removeItem('pendingOrder');
        
        toast({
          title: "Nouvelle commande !",
          description: `Commande reçue de ${newOrder.customer}`,
        });
      }
    };

    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const newOrder = JSON.parse(pendingOrder);
      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders, {
          ...newOrder,
          id: Date.now().toString(),
          date: new Date().toISOString(),
          status: "non traité" as const
        }];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      });
      localStorage.removeItem('pendingOrder');
      toast({
        title: "Nouvelle commande !",
        description: `Commande reçue de ${newOrder.customer}`,
      });
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);

  const updateOrderStatus = (orderId: string, status: "traité") => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  return {
    orders,
    updateOrderStatus
  };
};