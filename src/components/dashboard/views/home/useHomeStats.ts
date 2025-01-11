import { useState, useEffect } from "react";

interface StoreStats {
  totalOrders: number;
  pendingOrders: number;
  totalViews: number;
  orderHistory: Array<{
    date: string;
    orders: number;
  }>;
}

export const useHomeStats = () => {
  const [stats, setStats] = useState<StoreStats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalViews: 0,
    orderHistory: [],
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('storeStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const handleNewOrder = () => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const processedOrders = orders.filter((order: any) => order.status === 'traité').length;
      const pendingOrders = orders.filter((order: any) => order.status === 'non traité').length;
      
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalOrders: processedOrders,
          pendingOrders: pendingOrders,
          orderHistory: [
            ...prevStats.orderHistory,
            { date: new Date().toLocaleDateString(), orders: processedOrders + pendingOrders }
          ],
        };
        localStorage.setItem('storeStats', JSON.stringify(newStats));
        return newStats;
      });
    };

    const handleStoreView = () => {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalViews: prevStats.totalViews + 1,
        };
        localStorage.setItem('storeStats', JSON.stringify(newStats));
        return newStats;
      });
    };

    // Écouter les changements dans le localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'orders') {
        handleNewOrder();
      }
    });

    // Écouter l'événement personnalisé pour les nouvelles commandes
    document.addEventListener('newOrder', handleNewOrder);
    document.addEventListener('storeView', handleStoreView);

    // Mettre à jour les statistiques au chargement
    handleNewOrder();

    return () => {
      window.removeEventListener('storage', handleNewOrder);
      document.removeEventListener('newOrder', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, []);

  return stats;
};